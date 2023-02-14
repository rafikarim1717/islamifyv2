<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 right-0 shadow-player px-4 py-2 md:py-3 lg:py-4"
    :class="[
      minimized
        ? 'bg-custom-content w-14 h-14'
        : 'bg-custom-content w-full md:h-28',
    ]"
  >
    <div class="center text-center mb-0 md:mb-3 lg:mb-3" v-if="!minimized">
      <p class="text-black text-sm md:text-md lg:text-lg font-semibold">
        {{ current_song.modified_name }}
      </p>
      <p class="mt-1 text-xs md:text-sm text-gray-600">
        {{ current_song.display_name ? current_song.display_name : "-" }}
      </p>
    </div>

    <div
      class="flex gap-3 items-center mt-2 md:mt-1 lg:mb-2 lg:mt-0"
      v-if="!minimized"
    >
      <button type="button" @click.prevent="minimized = !minimized">
        <img src="../assets/images/minimize.png" class="" />
      </button>
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio" id="player-play-btn">
        <i
          class="fa text-lg lg:text-xl"
          :class="{
            'fa-play text-gray-800': !playing,
            'fa-pause text-gray-800': playing,
          }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="text-md text-black mr-1">{{ seek }}</div>
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
          class="block h-2 rounded bg-gradient-to-r from-blue-600 to-blue-800"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="text-md text-black">{{ duration }}</div>
    </div>
    <div class="center mt-2" v-if="minimized">
      <button type="button" @click.prevent="minimized = !minimized">
        <img src="../assets/images/minimize.png" class="" />
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
.shadow-player {
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.bg-custom-content {
  background-color: lightgray;
}
</style>
