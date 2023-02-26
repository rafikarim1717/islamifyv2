<template>
  <div class="bg-gray-200">
    <section class="container mx-auto pt-12 pb-32">
      <div class="flex flex-col gap-10 px-5 lg:px-8">
        <h2
          class="text-center text-3xl md:text-4xl font-semibold text-black mb-3"
        >
          Islamify Forum
        </h2>
        <div>
          <router-link to="/forum/generalPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-200 hover:bg-gray-200"
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
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/shalatPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-200"
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
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <router-link to="/forum/doaPosts">
            <div
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-200"
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
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-200"
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
              class="p-3 bg-white shadow2 flex justify-between hover:bg-gray-200"
            >
              <div class="flex flex-col p-2 gap-2">
                <h1
                  class="text-lg md:text-xl font-semibold hover:text-blue-600"
                >
                  Hadist
                </h1>
                <p class="text-sm md:text-md xl:text-lg text-gray-700">
                  Discuss anything about Hadist
                </p>
              </div>
              <div class="flex flex-row gap-1">
                <div class="flex gap-1 items-center p-2 md:p-3">
                  <i
                    class="fa fa-solid fa-align-justify fa-md md:fa-lg text-gray-600"
                  ></i>
                  <span class="">{{ hadistPostCount }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getDocs } from "firebase/firestore";
import { postsCollection } from "@/includes/firebase";

export default {
  name: "Forum",
  data() {
    return {
      generalPosts: [],
      shalatPosts: [],
      alquranPosts: [],
      doaPosts: [],
      hadistPosts: [],
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
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.getAllPost();
  },
  methods: {
    async getAllPost() {
      const querySnapshot = await getDocs(postsCollection);
      querySnapshot.forEach((doc) => {
        const post = { docID: doc.id, ...doc.data() };
        if (post.categories?.includes("general")) {
          this.generalPosts.push(post); // push to generalPosts array
        }
        if (post.categories?.includes("shalat")) {
          this.shalatPosts.push(post); // push to shalatPosts array
        }
        if (post.categories?.includes("alquran")) {
          this.alquranPosts.push(post); // push to alquranPosts array
        }
        if (post.categories?.includes("doa")) {
          this.doaPosts.push(post); // push to doaPosts array
        }
        if (post.categories?.includes("hadist")) {
          this.hadistPosts.push(post); // push to hadistPosts array
        }
      });
    },
  },
};
</script>

<style scoped>
.shadow2 {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>
