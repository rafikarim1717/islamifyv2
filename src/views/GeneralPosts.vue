<template>
  <div class="bg-gray-200">
    <!--Fullscreen Background-->
    <div
      v-show="isModal"
      class="bg-gray-900 opacity-50 absolute top-0 left-0 w-full h-full z-40"
    ></div>
    <!--post content modal make sure-->
    <div
      v-show="isModal"
      id="modal"
      class="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div
        class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-custom transform transition-all sm:my-5 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white p-4">
          <p class="text-black font-semibold text-lg text-center">
            Silahkan post
          </p>
          <input
            type="text"
            class="w-full bg-gray-200 p-2 mt-2"
            v-model="contentNew"
          />
        </div>
        <div class="flex px-4 py-2 text-center gap-2 justify-center">
          <button
            type="button"
            class="py-2 px-4 bg-black text-white rounded hover:bg-gray-700"
            @click="toggleModal()"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="addPost()"
            class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <section class="container mx-auto pt-12 pb-32">
      <nav class="px-5 rounded-md w-full mb-5">
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
            <p href="#" class="text-black">General Topic</p>
          </li>
        </ol>
      </nav>
      <div class="flex flex-col gap-8 px-5">
        <!-- <div
          class="bg-white text-black py-2 px-4 md:py-4 md:px-8 font-medium tracking-wider flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 rounded-md"
        >
          <p class="text-center md:text-left">
            Welcome to our Islamify community! To ensure that everyone can have
            a positive experience, please follow these rules:
          </p>
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div
              class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full"
            >
              <span class="text-white text-lg md:text-xl font-bold">1</span>
            </div>
            <p class="text-center md:text-left">
              Be respectful and civil to others
            </p>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div
              class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full"
            >
              <span class="text-white text-lg md:text-xl font-bold">2</span>
            </div>
            <p class="text-center md:text-left">
              Avoid using offensive or abusive language
            </p>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div
              class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full"
            >
              <span class="text-white text-lg md:text-xl font-bold">3</span>
            </div>
            <p class="text-center md:text-left">
              Stay on topic and avoid spamming
            </p>
          </div>

          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div
              class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full"
            >
              <span class="text-white text-lg md:text-xl font-bold">6</span>
            </div>
            <p class="text-center md:text-left">
              Report any inappropriate content or behavior
            </p>
          </div>
          <p class="text-center md:text-left">
            Thank you for your cooperation!
          </p>
        </div> -->
        <!--button add post-->
        <div class="mt-10">
          <button
            class="w-full md:w-auto float-right bg-blue-500 hover:bg-blue-500 py-3 md:py-4 px-4 md:px-8 rounded-full text-blue-100 transition duration-500"
            @click="toggleModal()"
          >
            Add Post
          </button>
        </div>
        <!--Post Collection -->
        <div class="">
          <div
            class="px-4 py-4 mx-auto bg-white shadow-md border-b-2 hover:bg-gray-50 cursor-pointer"
            v-for="post in generalPosts"
            :key="post.docID"
          >
            <router-link
              :to="{ name: 'posts', params: { id: post.docID } }"
              class="text-base md:text-lg lg:text-2xl cursor-pointer"
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
                  <span class="ml-2 text-gray-500 text-sm">{{
                    post.date
                  }}</span>
                </div>
                <div class="flex flex-row items-center gap-1 md:gap-2">
                  <div
                    class="flex items-center p-2 cursor-pointer text-base md:text-lg lg:text-2xl"
                    @click="toggleReport"
                  >
                    <i class="fa fa-regular fa-comment text-gray-500 fa-lg"></i>
                  </div>
                </div>
              </div>
              <div class="mt-4 max-w-custom-min md:max-w-max">
                <p class="text-black text-base md:text-lg xl:text-xl">
                  {{ post.content }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showPopup">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Success!
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    Anda telah berhasil membuat postingan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                @click="closePopup"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                OK
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocs, where, addDoc, query } from "firebase/firestore";
import { postsCollection, usersCollection, auth } from "@/includes/firebase";

export default {
  data() {
    return {
      isModal: false,
      showPopup: false,
      username: "",
      contentNew: "",
      generalPosts: [],
      // generalPostReplyCount: 0,
    };
  },
  components: {},
  created() {
    this.getGeneralPost();
  },
  methods: {
    async getGeneralPost() {
      const querySnapshot = await getDocs(
        query(postsCollection, where("categories", "==", "general"))
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.generalPosts.push({
          docID: doc.ref.id,
          content: doc.data().content,
          users: doc.data().users,
          date: doc.data().date,
          reply: doc.data().reply,
          report: doc.data().report,
        });
      });
    },
    //Get the document ID of the current user from the user collection, use the where() method in Firestore to query the collection based on the current user's email address or user ID.
    async addPost() {
      const user = auth.currentUser;
      if (user !== null) {
        const userQuery = query(
          usersCollection,
          where("email", "==", user.email)
        );
        const userSnapshot = await getDocs(userQuery);
        const userDoc = userSnapshot.docs[0];
        if (userDoc) {
          const username = userDoc.data().displayName;
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          const docRef = await addDoc(postsCollection, {
            content: this.contentNew,
            users: username,
            date: formattedDate,
            postID: "",
            reply: [],
            report: 0,
            categories: "general",
          });
          // alert("Post added successfully");
          this.isModal = !this.isModal;
          this.showPopup = !this.showPopup;
          console.log("Document written with ID: ", docRef.id);
          // window.location.reload();
        } else {
          console.error("User document not found");
          alert("Error adding post: User document not found");
        }
      } else {
        console.error("User not logged in");
        alert("Error adding post: User not logged in");
      }
    },
    addReport() {
      alert("Anda telah berhasil melaporkan postingan");
      // eslint-disable-next-line no-undef
      windows.location.reload();
    },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    closePopup() {
      this.showPopup = !this.showPopup;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.shadow1 {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
.shadow-custom {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
</style>
