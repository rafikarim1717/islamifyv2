<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 right-0 px-4 py-3 md:py-4"
    :class="[minimized ? 'bg-gray-300 w-14 h-14' : 'bg-gray-300 w-full h-24']"
  >
    <!-- Track Info -->
    <div class="flex justify-between my-2 md:my-0">
      <div class="text-left" v-if="!minimized">
        <button
          type="button"
          @click.prevent="minimized = !minimized"
          class="text-gray-500"
        >
          <i class="fas fa-solid fa-compress fa-lg"></i>
        </button>
      </div>
      <div class="text-center center mb-1 md:mb-2" v-if="!minimized">
        <span class="font-bold text-lg md:text-xl">{{
          current_song.modified_name
        }}</span>
        <br />
        <span class="song-artist">{{ current_song.display_name }}</span>
      </div>
      <div class="text-right" v-if="!minimized">
        <button
          type="button"
          @click.prevent="minimized = !minimized"
          class="text-gray-500"
        >
          <i class="fas fa-solid fa-compress fa-lg"></i>
        </button>
      </div>
    </div>

    <div class="flex flex-nowrap gap-3 md:gap-4 items-center" v-if="!minimized">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio" id="player-play-btn">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime" v-if="!minimized">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        v-if="!minimized"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-blue-500 to-blue-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration" v-if="!minimized">{{ duration }}</div>
    </div>
    <div class="center" v-if="minimized">
      <button
        type="button"
        @click.prevent="minimized = !minimized"
        class="text-gray-500"
      >
        <i class="fas fa-solid fa-compress fa-lg"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";

export default {
  name: "Player",
  data() {
    return {
      minimized: false,
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio", "updateSeek"]),
  },
  computed: {
    ...mapState(usePlayerStore, [
      "playing",
      "duration",
      "seek",
      "playerProgress",
      "current_song",
    ]),
  },
};
</script>

<style scoped>
.center {
  text-align: -webkit-center;
}
</style>
