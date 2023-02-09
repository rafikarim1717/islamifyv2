<template>
  <div class="" v-if="!userLoggedIn">
    <Auth />
  </div>
  <div v-if="loading" class="h-screen flex items-center justify-center">
    <div class="spinner w-6 h-6 mx-auto text-gray-600 animate-spin"></div>
  </div>
  <div class="" v-if="userLoggedIn && !loading">
    <app-header />
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>

    <!-- <app-footer class="bottom-0" /> -->
    <app-player v-if="showPlayer" />
  </div>
</template>

<script>
import AppHeader from "@/components/Navbar/Header.vue";
import AppFooter from "@/components/Navbar/Footer.vue";
import Auth from "@/components/Auth.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";
import { auth } from "./includes/firebase";
import AppPlayer from "@/components/Player.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    Auth,
    AppPlayer,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
    ...mapWritableState(usePlayerStore, ["showPlayer"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
      this.loading = false;
    }
  },
};
</script>

<style>
.slideFade-enter-active,
.slideFade-leave-active {
  transition: opacity 0.5s;
}

.slideFade-enter,
.slideFade-leave-to {
  opacity: 0;
}

.spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3490dc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
