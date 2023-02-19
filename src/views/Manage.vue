<template>
  <section class="bg-gray-200">
    <div class="container mx-auto flex flex-col">
      <!-- Modal Delete-->

      <!-- Manage Forum-->
      <div class="my-4">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Forum
        </h2>
        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="grid md:grid-cols-2 gap-5 md:gap-6">
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">General Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in generalPosts"
                :key="post.docID"
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
                    <!-- <span class="ml-2 text-gray-500 text-sm">{{
                      post.date
                    }}</span> -->
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deletePost(post)">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Shalat Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in shalatPosts"
                :key="post.docID"
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
                    <!-- <span class="ml-2 text-gray-500 text-sm">{{
                      post.date
                    }}</span> -->
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deletePost(post)">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Doa Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in doaPosts"
                :key="post.docID"
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
                    <!-- <span class="ml-2 text-gray-500 text-sm">{{
                      post.date
                    }}</span> -->
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deletePost(post)">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Alquran Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in alquranPosts"
                :key="post.docID"
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
                    <!-- <span class="ml-2 text-gray-500 text-sm">{{
                      post.date
                    }}</span> -->
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deletePost(post)">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Hadist Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in hadistPosts"
                :key="post.docID"
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
                    <!-- <span class="ml-2 text-gray-500 text-sm">{{
                      post.date
                    }}</span> -->
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deletePost(post)">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Audio-->
      <div class="my-12">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Audio
        </h2>

        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1 mb-6 md:mb-0 shadow-lg">
              <app-upload ref="upload" :addSong="addSong" />
            </div>
            <div class="col-span-2">
              <div
                class="bg-white rounded border border-gray-200 relative flex flex-col"
              >
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                  <span class="text-lg">Content List</span>
                  <i
                    class="fa fa-compact-disc float-right text-blue-600 text-2xl"
                  ></i>
                </div>
                <div class="px-4 py-1">
                  <!-- Composition Items -->
                  <composition-item
                    v-for="(song, i) in songs"
                    :key="song.docID"
                    :song="song"
                    :updateSong="updateSong"
                    :index="i"
                    :removeSong="removeSong"
                    :updateUnsavedFlag="updateUnsavedFlag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from "@/components/Upload.vue";
import { songsCollection, postsCollection } from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "Manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      generalPosts: [],
      shalatPosts: [],
      doaPosts: [],
      alquranPosts: [],
      hadistPosts: [],
      unsavedFlag: false,
      isModal: false,
    };
  },
  async created() {
    this.getAllPost();
    const querySnapshot = await getDocs(songsCollection);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.addSong(doc);
      console.log(doc.id, " => ", doc.data());
    });
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
      console.log(this.generalPosts);
    },
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    async deletePost(post) {
      const postRef = doc(postsCollection, post.docID);
      await deleteDoc(postRef);
      // Remove post from corresponding category array
      switch (post.category) {
        case "general":
          this.generalPosts = this.generalPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "shalat":
          this.shalatPosts = this.shalatPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "alquran":
          this.alquranPosts = this.alquranPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "doa":
          this.doaPosts = this.doaPosts.filter((p) => p.docID !== post.docID);
          break;
        case "hadist":
          this.hadistPosts = this.hadistPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        default:
          break;
      }
      window.location.reload();
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      next(leave);
    }
  },
};
</script>

<style scoped>
.max-w-custom {
  max-width: 13rem;
}
</style>
