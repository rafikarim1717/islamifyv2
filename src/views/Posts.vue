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
              <p href="#" class="text-black">What should i choose ?</p>
            </li>
          </ol>
        </nav>

        <div class="flex flex-col">
          <div
            class="px-4 py-4 mx-auto bg-white rounded-lg shadow-md border-b"
            style="cursor: auto"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  src="https://stackdiary.com/140x100.png"
                  alt="Author Photo"
                  class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                />
                <a
                  class="font-bold text-black cursor-pointer"
                  >John Doe</a
                >
              </div>
              <span class="text-sm font-light text-black"
                >Jan 15, 2022</span
              >
            </div>
            <div class="mt-2">
              <p class="mt-2 text-black">
                Dui urna vehicula tincidunt pretium consequat luctus mi, platea
                fermentum conubia tempus ac orci. Pellentesque dictum malesuada
                cubilia faucibus dignissim mi nascetur senectus, augue ad libero
                efficitur dolor duis lobortis, non etiam sociosqu.
              </p>
            </div>
          </div>
          <div
            class="px-4 py-4 mx-auto bg-white rounded-lg shadow-md "
            style="cursor: auto"
          >
            <div class="flex  justify-between">
              <div class="flex items-center">
                <img
                  src="https://stackdiary.com/140x100.png"
                  alt="Author Photo"
                  class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                />
                <a
                  class="font-bold text-black cursor-pointer"
                  >Bambang Sumanto</a
                >
              </div>
              <span class="text-sm font-light text-black"
                >Jan 18, 2022</span
              >
            </div>
            <div class="mt-2">
              <p class="mt-2 text-black">
                Dui urna vehicula tincidunt pretium consequat luctus mi, platea
                fermentum conubia tempus ac orci. Pellentesque dictum malesuada
                cubilia faucibus dignissim mi nascetur senectus, augue ad libero
                efficitur dolor duis lobortis, non etiam sociosqu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { collection, getDocs, getDoc, where, addDoc } from "firebase/firestore";
// import { alquranPostsCollection, auth } from "@/includes/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      isModal: false,
      //   username: "",
      //   contentNew: "",
      //   alquranPosts: [
      //     {
      //       postId: "",
      //       content: "",
      //       users: "",
      //       date: "",
      //       reply: 0,
      //       report: 0,
      //     },
      //   ],
      //   alquranPostReplyCount: 0,
    };
  },
  components: {},
  created() {
    // this.getAlquranPost();
  },
  methods: {
    // async getGeneralPost() {
    //   const querySnapshot = await getDocs(alquranPostsCollection);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     this.alquranPosts.push({
    //       postId: doc.data().id,
    //       content: doc.data().content,
    //       users: doc.data().users,
    //       date: doc.data().date,
    //       reply: doc.data().reply,
    //       report: doc.data().report,
    //     });
    //     console.log(this.generalPosts);
    //   });
    // },
    // addPost() {
    //   const user = auth.currentUser;
    //   this.username = user.displayName;
    //   // this.email = user.email
    //   if (user !== null) {
    //     // const postRef = generalPostsCollection;
    //     const currentDate = new Date();
    //     const docRef = addDoc(alquranPostsCollection, {
    //       content: this.contentNew,
    //       users: this.username,
    //       date: currentDate,
    //       postID: "",
    //       reply: 0,
    //       report: 0,
    //     })
    //       .then(() => {
    //         alert("Post added successfully");
    //         console.log("Document written with ID: ", docRef.id);
    //         window.location.reload();
    //       })
    //       .catch((error) => {
    //         alert(error);
    //         console.error("Error adding post: ", error);
    //       });
    //   }
    // },
    // report(postID) {
    //   // increment post.report
    //   this.alquranPosts = this.alquranPosts.map((post) => {
    //     if (post.postId === postID) {
    //       post.report++;
    //     }
    //     return post;
    //   });
    // },
    toggleModal() {
      this.isModal = !this.isModal;
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
