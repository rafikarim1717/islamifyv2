<template>
  <div class="bg-gray-100">
    <section class="container mx-auto py-12">
      <div class="flex flex-col gap-10 px-5 lg:px-8">
        <nav class="px-5 rounded-md w-full">
          <ol class="list-reset flex">
            <li>
              <a href="/" class="text-blue-600 hover:text-blue-700">Home</a>
            </li>
            <li><span class="text-gray-500 mx-2">/</span></li>
            <li>
              <a
                @click="$router.go(-1)"
                href="#"
                class="text-blue-600 hover:text-blue-700"
                >Forum</a
              >
            </li>
            <li>
              <p href="#" class="text-gray-500 mx-2">/</p>
            </li>
            <li>
              <p href="#" class="text-black">Alquran Topic</p>
            </li>
          </ol>
        </nav>
        <div class="self-center mt-10">
          <button
            class="bg-blue-600 hover:bg-blue-500 py-3 px-8 rounded-full text-blue-100 transition duration-500"
            @click="toggleModal()"
          >
            Add Post
          </button>
        </div>
        <div
          class="grid place-items-center"
          v-show="isModal"
          id="modal"
        >
          <div
            class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <label>Post A Content</label>
              <input
                type="text"
                class="w-full bg-gray-200 p-2 mt-2"
                v-model="contentNew"
              />
            </div>
            <div class="px-4 py-2 text-right">
              <button
                type="button"
                class="py-2 px-4 bg-black text-white rounded hover:bg-gray-700 mr-2"
                @click="toggleModal()"
              >
                <!-- <i class="fas fa-times"></i> Cancel -->
                Cancel
              </button>
              <button
                type="button"
                @click="addPost()"
                class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
              >
                <!-- <i class="fas fa-plus"></i> Create -->
                Submit
              </button>
            </div>
          </div>
        </div>

       
        <div class="">
          <div
            class="px-4 py-4 mx-auto bg-white shadow-md border-b hover:bg-gray-50 cursor-pointer"
            v-for="post in alquranPosts"
            :key="post.postID"
          >
            <div class="flex justify-between mb-2">
              <div class="flex items-center">
                <img
                  src="https://stackdiary.com/140x100.png"
                  alt="Author Photo"
                  class="hidden object-cover w-8 h-8 mr-2 rounded-full sm:block"
                />
                <a
                  class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                  >{{ post.users }}</a
                >
              </div>
              <div class="flex flex-row items-center gap-1 md:gap-2">
                <div
                  class="flex items-center p-2 cursor-pointer text-base md:text-lg lg:text-2xl"
                  @click="toggleReport()"
                >
                  <i
                    class="fa fa-exclamation-triangle text-red-500 hover:text-red-800"
                  ></i>
                </div>
                <router-link
                  :to="{ name: 'posts', params: { id: post.postID } }"
                  class="text-base md:text-lg lg:text-2xl cursor-pointer"
                >
                  <i
                    class="fa fa-solid fa-comment text-gray-600 hover:text-gray-800"
                  ></i>
                </router-link>
              </div>
            </div>
            <div class="mt-4 max-w-xs md:max-w-xl">
              <p class="text-black text-lg xl:text-xl">
                {{ post.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { collection, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { alquranPostsCollection, auth } from "@/includes/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      isModal: false,
      isReport: false,
      username: "",
      contentNew: "",
      alquranPosts: [
        // {
        //   postId: "",
        //   content: "",
        //   users: "",
        //   date: "",
        //   reply: 0,
        //   report: 0,
        // },
      ],
      alquranPostReplyCount: 0,
    };
  },
  components: {},
  created() {
    this.getAlquranPost();
  },

  methods: {
    async getAlquranPost() {
      const querySnapshot = await getDocs(alquranPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.alquranPosts.push({
          postID: doc.id,
          content: doc.data().content,
          users: doc.data().users,
          date: doc.data().date,
          reply: doc.data().reply,
          report: doc.data().report,
        });
        console.log(this.alquranPosts);
      });
    },
    addPost() {
      const user = auth.currentUser;
      this.username = user.email;
      // this.email = user.email
      if (user !== null) {
        // const postRef = generalPostsCollection;
        const currentDate = new Date();
        const docRef = addDoc(alquranPostsCollection, {
          content: this.contentNew,
          users: this.username,
          date: currentDate,
          postID: "",
          reply: 0,
          report: 0,
        })
          .then(() => {
            alert("Post added successfully");
            console.log("Document written with ID: ", docRef.id);
            window.location.reload();
          })
          .catch((error) => {
            alert(error);
            console.error("Error adding post: ", error);
          });
      }
    },
    addReport() {
      alert("Anda telah berhasil melaporkan postingan");
      windows.location.reload();
    },
    // report(postID) {
    //   // increment post.report
    // },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    toggleReport() {
      this.isReport = !this.isReport;
      // this.generalPosts = this.generalPosts.map((post) => {
      //   if (post.postId === postID) {
      //     post.report++;
      //   }
      //   return post;
      // });
    },
  },
};
</script>

<style scoped>
.shadow1 {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
</style>
