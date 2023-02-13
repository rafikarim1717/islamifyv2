<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 right-0 px-4 py-4 md:py-4"
    :class="[minimized ? 'bg-gray-300 w-14 h-24' : 'bg-gray-300 w-full h-24']"
  >
    <div class="flex justify-between mb-3">
      <div class="text-left" v-if="!minimized">
        <button
          type="button"
          @click.prevent="minimized = !minimized"
          class="text-gray-500"
        >
          <i class="fas fa-compress md:fa-lg"></i>
        </button>
      </div>
      <div class="text-center md:mb-2" v-if="!minimized">
        <p class="text-md md:text-lg font-semibold">
          {{ current_song.modified_name }}
        </p>
        <!-- <p class="text-sm text-gray-600">{{ current_song.display_name }}</p> -->
      </div>
      <div class="text-right" v-if="!minimized">
        <button
          type="button"
          @click.prevent="minimized = !minimized"
          class="text-gray-500"
        >
          <i class="fas fa-compress md:fa-lg"></i>
        </button>
      </div>
    </div>

    <div class="flex gap-4 items-center mb-2 md:mb-0" v-if="!minimized">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio" id="player-play-btn">
        <i
          class="fa text-xl"
          :class="{
            'fa-play text-gray-500': !playing,
            'fa-pause text-blue-500': playing,
          }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="text-sm text-gray-600">{{ seek }}</div>
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
      <div class="text-sm text-gray-600">{{ duration }}</div>
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
