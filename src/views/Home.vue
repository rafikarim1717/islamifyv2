<template>
  <div class="bg-gray-200">
    <section
      class="container mx-auto pt-12 pb-32 px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center"
    >
      <h2 class="text-3xl md:text-4xl text-black">Islamify</h2>
      <p class="mt-3 text-gray-500 max-w-md">
        Accompany your every day with Islamify by listening to your favorite
        dzikr that makes you calm every time.
      </p>
    </section>

    <section class="container mx-auto py-6 px-3 md:px-6 lg:px-8 xl:px-20">
      <div class="flex flex-row justify-center mt-2 mb-10 mr-1">
        <button
          class="text-black font-semibold rounded-lg focus:outline-none mr-2"
          @click="previousCategory"
          :disabled="selectedIndex === 0"
        >
          <i class="fa fa-solid fa-arrow-left"></i>
        </button>
        <button
          class="text-black p-3 rounded-lg focus:outline-none"
          :class="{
            'shadow-custom font-bold': categories === selectedCategory,
          }"
          v-for="categories in categories"
          :key="categories"
          @click="selectedCategory = categories"
        >
          {{ categories }}
        </button>
        <button
          class="text-black font-semibold rounded-lg focus:outline-none ml-2"
          @click="nextCategory"
          :disabled="selectedIndex === categories.length - 1"
        >
          <i class="fa fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="bg-white rounded shadow3 relative flex flex-col">
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
          class="flex justify-between items-center px-2 py-4 cursor-pointer transition duration-300 hover:bg-gray-200"
        >
          <div
            @click.prevent="newSong(song)"
            class="w-3/4 px-3 py-1 cursor-pointer"
          >
            <p class="text-md md:text-lg font-semibold">
              {{ song.modified_name }}
            </p>
            <span class="text-gray-500 text-sm">
              {{ song.display_name }}
            </span>
          </div>
          <div class="mr-1 md:mr-3">
            <span class="">
              <i class="fa fa-regular fa-eye text-gray-700"></i>
              {{ song.view_count ? song.view_count : 0 }}
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
import { orderBy, limit, getDocs, query, startAfter } from "firebase/firestore";
import IconSecondary from "@/directives/icon-secondary";

export default {
  name: "Home",
  components: {},
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

  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    filteredSongs() {
      return this.selectedCategory === "Ceramah" || !this.selectedCategory
        ? this.songs.filter((song) => song.categories === "Ceramah")
        : this.songs.filter(
            (song) => song.categories === this.selectedCategory
          );
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
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
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.bg-custom-content {
  background-color: azure;
}
.shadow-custom {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
</style>
