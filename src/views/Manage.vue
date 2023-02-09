<template>
  <section class="bg-gray-100">
    <div class="container mx-auto flex flex-col">
      <div class="my-4">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Forum
        </h2>
        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="grid md:grid-cols-2 gap-3 md:gap-6">
            <div
              class="bg-white rounded border border-gray-200 shadow3 relative flex flex-col py-2"
            >
              <div
                class="px-6 py-5 font-bold border-b-2 border-gray-200 text-center"
              >
                <span class="text-lg md:text-xl">General Topic</span>
                <!-- Icon -->
              </div>
              <li
                v-for="post in generalPosts"
                :key="post.docID"
                class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
              >
                <div class="p-1 max-w-xl">
                  {{ post.content }}
                  <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span>
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
                    {{ 0 }}
                  </div>
                </div>
              </li>
            </div>
            <div
              class="bg-white rounded border border-gray-200 shadow3 relative flex flex-col py-2"
            >
              <div
                class="px-6 py-5 font-bold border-b-2 border-gray-200 text-center"
              >
                <span class="text-lg md:text-xl">Shalat Topic</span>
                <!-- Icon -->
              </div>
              <li
                v-for="post in shalatPosts"
                :key="post.docID"
                class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
              >
                <div class="p-1 max-w-xl">
                  {{ post.content }}
                  <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span>
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
                    {{ 0 }}
                  </div>
                </div>
              </li>
            </div>
            <div
              class="bg-white rounded border border-gray-200 shadow3 relative flex flex-col py-2"
            >
              <div
                class="px-6 py-5 font-bold border-b-2 border-gray-200 text-center"
              >
                <span class="text-lg md:text-xl text-center">Doa Topic</span>
                <!-- Icon -->
              </div>
              <li
                v-for="post in doaPosts"
                :key="post.docID"
                class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
              >
                <div class="p-1 max-w-xl">
                  {{ post.content }}
                  <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span>
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
                    {{ 0 }}
                  </div>
                </div>
              </li>
            </div>
            <div
              class="bg-white rounded border border-gray-200 shadow3 relative flex flex-col py-2"
            >
              <div
                class="px-6 py-5 font-bold border-b-2 border-gray-200 text-center"
              >
                <span class="text-lg md:text-xl text-center"
                  >Alquran Topic</span
                >
                <!-- Icon -->
              </div>
              <li
                v-for="post in alquranPosts"
                :key="post.docID"
                class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
              >
                <div class="p-1 max-w-xl">
                  {{ post.content }}
                  <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span>
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
                    {{ 0 }}
                  </div>
                </div>
              </li>
            </div>
            <div
              class="bg-white rounded border border-gray-200 shadow3 relative flex flex-col py-2"
            >
              <div
                class="px-6 py-5 font-bold border-b-2 border-gray-200 text-center"
              >
                <span class="text-lg md:text-xl text-center">Hadist Topic</span>
                <!-- Icon -->
              </div>
              <li
                v-for="post in hadistPosts"
                :key="post.docID"
                class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
              >
                <div class="p-1 max-w-xl">
                  {{ post.content }}
                  <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span>
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
                    {{ 0 }}
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div class="my-12">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Audio
        </h2>
        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1 mb-6 md:mb-0">
              <app-upload ref="upload" :addSong="addSong" />
            </div>
            <div class="col-span-2">
              <div
                class="bg-white rounded border border-gray-200 relative flex flex-col"
              >
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                  <span class="text-md md:text-xl">Update</span>
                  <i
                    class="fa fa-compact-disc float-right text-blue-600 text-2xl"
                  ></i>
                </div>
                <div class="px-3 py-2">
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
        <div class="mt-8 px-3 md:px-6">
          <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1 mb-6 md:mb-0">
              <app-upload ref="upload" :addSong="addSong" />
            </div>
            <div class="col-span-2">
              <div
                class="bg-white rounded border border-gray-200 relative flex flex-col"
              >
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                  <span class="card-title">{{}}</span>
                  <i
                    class="fa fa-compact-disc float-right text-blue-400 text-2xl"
                  ></i>
                </div>
                <div class="p-6">
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
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import {
  songsCollection,
  generalPostsCollection,
  shalatPostsCollection,
  alquranPostsCollection,
  doaPostsCollection,
  hadistPostsCollection,
} from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";
import { collection, getDocs, getDoc, where } from "firebase/firestore";

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
    };
  },
  async created() {
    // const snapshot = await songsCollection,where("uid", "==", auth.currentUser.uid)
    //   .get();

    // snapshot.forEach(this.addSong);
    // const querySnapshot = getDocs(songsCollection,where("uid", "==", true));

    // querySnapshot,forEach((doc) => {
    //   this.addSong(doc);
    // });
    this.getGeneralPost();
    this.getAlquranPost();
    this.getDoaPost();
    this.getShalatPost();
    this.getHadistPost();
    const querySnapshot = await getDocs(songsCollection);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.addSong(doc);
      console.log(doc.id, " => ", doc.data());
    });
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
      });
    },
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
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
