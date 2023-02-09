<template>
  <div class="bg-gray-100">
    <section
      class="container mx-auto flex items-center justify-center text-center py-12"
    >
      <div class="max-w-sm md:max-w-lg px-4">
        <div class="flex flex-col gap-3">
          <h2 class="text-3xl tracking-tight md:text-4xl text-black">
            Islamify website with collection of audio content to accompany your
            day
          </h2>
          <p class="mt-3 text-gray-500 px-8">
            Accompany your every day with islamify by listening to yout favorite
            dzikr that makes you calms everytime.
          </p>
        </div>
      </div>
    </section>

    <section class="container mx-auto py-6 px-3 md:px-6 lg:px-8">
      <div class="flex flex-row justify-center mt-2 mb-10">
        <button
          class="text-black font-semibold p-1 rounded-lg mx-1 focus:outline-none"
          @click="previousCategory"
          :disabled="selectedIndex === 0"
        >
          <i class="fa fa-solid fa-arrow-left"></i>
        </button>
        <button
          class="text-black p-3 rounded-lg mx-1"
          :class="{ 'bg-white font-bold': categories === selectedCategory }"
          v-for="categories in categories"
          :key="categories"
          @click="selectedCategory = categories"
        >
          {{ categories }}
        </button>
        <button
          class="text-black font-semibold p-1 rounded-lg mx-1"
          @click="nextCategory"
          :disabled="selectedIndex === categories.length - 1"
        >
          <i class="fa fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="bg-white rounded shadow3 relative flex flex-col py-2 mt-3">
        <div
          class="p-5 font-bold border-b text-center"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="text-lg md:text-xl">Content</span>
        </div>
        <li
          v-for="song in filteredSongs"
          :key="song.docID"
          :song="song"
          class="flex justify-between items-center px-3 py-3 cursor-pointer transition duration-300 hover:bg-gray-100"
        >
          <div
            @click.prevent="newSong(song)"
            class="w-3/4 px-3 py-3 cursor-pointer"
          >
            <p class="hover:text-blue-600 text-lg font-semibold">
              {{ song.modified_name }}
            </p>
            <span class="text-gray-500 text-sm">
              {{ "by " + "-" + song.display_name }}
            </span>
          </div>
          <div class="">
            <span class="">
              <i class="fa fa-regular fa-eye text-gray-700"></i>
              {{ song.view_count ? (song.view_count | 0) : 0 }}
            </span>
          </div>
        </li>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import usePlayerStore from "@/stores/player";
import { songsCollection } from "@/includes/firebase";
import { orderBy, limit, getDocs, query } from "firebase/firestore";
import AppSongItem from "@/components/SongItem.vue";
import IconSecondary from "@/directives/icon-secondary";

export default {
  name: "Home",
  components: {
    AppSongItem,
  },
  directives: {
    "icon-secondary": IconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false,
      searchQuery: null,
      categories: ["Ceramah", "Doa", "Dzikir", "Alquran"],
      selectedCategory: "Ceramah",
      selectedIndex: 0,
    };
  },
  // watch: {
  //   songs: {
  //     handler: function (newValue) {
  //       newValue.forEach((song) => {
  //         song.view_count = this.songs.view;
  //       });
  //     },
  //     deep: true,
  //   },
  // },

  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    filteredSongs() {
      return this.selectedCategory === "Ceramah"
        ? this.songs
        : this.songs.filter(
            (song) => song.categories === this.selectedCategory
          );
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
    // async getSongs() {
    //   if (this.pendingRequest) {
    //     return;
    //   }

    //   this.pendingRequest = true;
    //   let snapshots = onSnapshot;
    //   const docSnap = await getDoc(songsCollection(this.songs[this.songs.length - 1].docID));

    //   if (this.songs.length) {
    //     const lastDoc = docSnap;
    //     snapshots =  await getDoc(songsCollection,orderBy("modified_name"),startAfter(lastDoc),limit(this.maxPerPage));
    //   } else {
    //     snapshots = await getDoc(songsCollection,orderBy("modified_name"),limit(this.maxPerPage));
    //   }

    //   snapshots.forEach((document) => {
    //     this.songs.push({
    //       docID: document.id,
    //       ...document.data(),
    //     });
    //   });

    //   this.pendingRequest = false;
    // },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let queryy = query();

      if (this.songs.length) {
        const lastDoc = this.songs[this.songs.length - 1];
        (queryy = songsCollection),
          orderBy("modified_name"),
          startAfter(lastDoc),
          limit(this.maxPerPage);
      } else {
        (queryy = songsCollection),
          orderBy("modified_name"),
          limit(this.maxPerPage);
      }

      const snapshots = await getDocs(queryy);

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
    previousCategory() {
      this.selectedIndex--;
      this.selectedCategory = this.categories[this.selectedIndex];
    },
    nextCategory() {
      this.selectedIndex++;
      this.selectedCategory = this.categories[this.selectedIndex];
    },
  },
};
</script>

<style scoped>
.shadow3 {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>