<template>
  <section class="bg-gray-100">
    <div class="container mx-auto flex flex-col">
      <div class="my-4">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Forum
        </h2>
        <div
          class="fixed z-10 overflow-y-auto top-0 w-full left-0"
          v-show="isModal"
          id="modal"
        >
          <div
            class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
              >&#8203;</span
            >
            <div
              class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label>Are you sure want to delete this item ?</label>
              </div>
              <div class="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  class="py-2 px-4 bg-black text-white rounded mr-2"
                  @click.prevent="isModal = !isModal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  @click="deletePost(post.docID)"
                  class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
                >
                  <i class="fa fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
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
                <div class="p-1 max-w-custom">
                  {{ post.content }}
                  <!-- <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span> -->
                </div>
                <div class="inline-flex gap-2 p-1">
                  <div class="">
                    <i
                      class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                    ></i>
                    {{ 0 }}
                  </div>
                  <div class="" @click="isModal = !isModal">
                    <i
                      class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                    ></i>
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
                <div class="p-1 max-w-custom">
                  {{ post.content }}
                  <!-- <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span> -->
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
                <div class="p-1 max-w-custom">
                  {{ post.content }}
                  <!-- <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span> -->
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
                <div class="p-1 max-w-custom">
                  {{ post.content }}
                  <!-- <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span> -->
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
                <div class="p-1 max-w-custom">
                  {{ post.content }}
                  <!-- <span class="text-gray-500 text-sm">
                    {{ post.users }}
                  </span> -->
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
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import {
  songsCollection,
  generalPostsCollection,
  shalatPostsCollection,
  alquranPostsCollection,
  doaPostsCollection,
  hadistPostsCollection,
  auth,
} from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";
import { collection, getDocs, getDoc, setDoc } from "firebase/firestore";

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
    getAllPost() {},
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
    async deletePost(docID) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "posts", docID));
        console.log("Post deleted successfully.");
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
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
