<template>
  <!-- Component Code -->

  <!-- Component Code -->

  <div
    class="relative h-screen w-full flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
    style="
      background-image: url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80);
    "
  >
    <div
      class="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-65"
    ></div>
    <div class="max-w-xs z-10 mb-6">
    <h2 class="text-2xl">This page is under development process</h2>
    </div>

    <div class="flex items-end justify-center z-10">
      <div class="m-2 sm:m-5">
        <span class="text-indigo-600 font-bold text-xl sm:text-5xl">{{ days }}</span>
        <p>Days</p>
      </div>
      <div class="m-2 sm:m-5">
        <span class="text-indigo-600 font-bold text-xl sm:text-5xl">{{ hours }}</span>
        <p>Hours</p>
      </div>
      <div class="m-2 sm:m-5">
        <span class="text-indigo-600 font-bold text-xl sm:text-5xl">{{ minutes }}</span>
        <p>Minutes</p>
      </div>
      <div class="m-2 sm:m-5">
        <span class="text-indigo-600 font-bold text-xl sm:text-5xl">{{ seconds }}</span>
        <p>Seconds</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: 110,
      hours: 13,
      minutes: 47,
      seconds: 20
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.seconds--;
      if (this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;
      }
      if (this.minutes < 0) {
        this.minutes = 59;
        this.hours--;
      }
      if (this.hours < 0) {
        this.hours = 23;
        this.days--;
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>