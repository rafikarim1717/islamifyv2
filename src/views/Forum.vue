<template>
  <div class="bg-gray-100">
    <section class="container mx-auto py-12">
      <div class="flex flex-col gap-10 px-5 lg:px-8">
        <h2
          class="text-center text-3xl md:text-4xl font-semibold text-black mb-3"
        >
          Islamify Forum
        </h2>
        <div>
          <router-link to="/forum/generalPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-100 hover:bg-gray-100"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  General
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything and everything
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ generalPostCount }}</span>
                </div>
                <!-- <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-comment fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ generalPostReplyCount }}</span>
                </div> -->
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/shalatPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-100"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  Shalat
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything about Shalat
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ shalatPostCount }}</span>
                </div>
                <!-- <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-comment fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ shalatPostReplyCount }}</span>
                </div> -->
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/doaPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-100"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  Doa
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything about Doa
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ doaPostCount }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/alquranPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-100"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  Al-Quran
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything about Al-Quran
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ alquranPostCount }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/hadistPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-100"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  Hukum Islam
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything about Hukum Islam
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ hadistPostCount }}</span>
                </div>
                <!-- <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-comment fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ hadistPostReplyCount }}</span>
                </div> -->
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { collection, getDocs, getDoc, where } from "firebase/firestore";
import {
  generalPostsCollection,
  shalatPostsCollection,
  alquranPostsCollection,
  doaPostsCollection,
  hadistPostsCollection,
} from "@/includes/firebase";

export default {
  name: "Forum",
  data() {
    return {
      generalPosts: [],
      generalPostReplyCount: 0,
      shalatPosts: [],
      shalatPostReplyCount: 0,
      alquranPosts: [],
      alquranPostReplyCount: 0,
      doaPosts: [],
      doaPostReplyCount: 0,
      hadistPosts: [],
      hadistPostReplyCount: 0,
    };
  },
  components: {},
  computed: {
    generalPostCount() {
      return Object.keys(this.generalPosts).length;
    },
    shalatPostCount() {
      return Object.keys(this.shalatPosts).length;
    },
    alquranPostCount() {
      return Object.keys(this.alquranPosts).length;
    },
    doaPostCount() {
      return Object.keys(this.doaPosts).length;
    },
    hadistPostCount() {
      return Object.keys(this.hadistPosts).length;
    },
  },
  // watch: {
  //   generalPosts: function (posts) {
  //     Object.keys(posts).forEach((post) => {
  //       this.generalPostReplyCount += Object.keys(
  //         posts[post]["comments"]
  //       ).length;
  //     });
  //   },
  //   shalatPosts: function (posts) {
  //     Object.keys(posts).forEach((post) => {
  //       this.shalatPostReplyCount += Object.keys(
  //         posts[post]["comments"]
  //       ).length;
  //     });
  //   },
  //   alquranPosts: function (posts) {
  //     Object.keys(posts).forEach((post) => {
  //       this.alquranPostReplyCount += Object.keys(
  //         posts[post]["comments"]
  //       ).length;
  //     });
  //   },
  //   doaPosts: function (posts) {
  //     Object.keys(posts).forEach((post) => {
  //       this.alquranPostReplyCount += Object.keys(
  //         posts[post]["comments"]
  //       ).length;
  //     });
  //   },
  //   hadist: function (posts) {
  //     Object.keys(posts).forEach((post) => {
  //       this.alquranPostReplyCount += Object.keys(
  //         posts[post]["comments"]
  //       ).length;
  //     });
  //   },
  // },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.getGeneralPost();
    this.getAlquranPost();
    this.getDoaPost();
    this.getShalatPost();
    this.getHadistPost();
  },
  methods: {
    async getGeneralPost() {
      const querySnapshot = await getDocs(generalPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.generalPosts.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.generalPosts.length);
      });
    },
    async getShalatPost() {
      const querySnapshot = await getDocs(shalatPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.shalatPosts.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.shalatPosts.length);
      });
    },
    async getDoaPost() {
      const querySnapshot = await getDocs(doaPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.doaPosts.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.doaPosts.length);
      });
    },
    async getAlquranPost() {
      const querySnapshot = await getDocs(alquranPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.alquranPosts.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.alquranPosts.length);
      });
    },
    async getHadistPost() {
      const querySnapshot = await getDocs(hadistPostsCollection);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.hadistPosts.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.hadistPosts.length);
      });
    },
  },
};
</script>

<style scoped>
.shadow2 {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
