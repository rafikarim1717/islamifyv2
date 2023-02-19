<template>
  <!-- Header -->
  <header class="bg-white">
    <nav
      class="flex flex-wrap items-center justify-between w-full py-3 md:py-3 px-4 text-lg first-color border-b"
    >
      <router-link :to="{ name: 'home' }">
        <div class="cursor-pointer">
          <img
            src="../../assets/images/2.png"
            alt="Islamify Logo"
            class="w-14 h-14"
          />
        </div>
      </router-link>

      <button @click="isOpen = !isOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        class="w-full md:flex md:items-center md:w-auto"
        :class="isOpen ? 'block' : 'hidden'"
      >
        <ul
          class="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0"
        >
          <li>
            <router-link
              :to="{ name: 'home' }"
              @click="isOpen = false"
              class="md:p-4 py-2 block hover:text-blue-600"
              href="#"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              @click="isOpen = false"
              :to="{ name: 'home-forum' }"
              class="md:p-4 py-2 block hover:text-blue-600"
            >
              Forum
            </router-link>
          </li>
          <li>
            <router-link
              @click="isOpen = false"
              :to="{ name: 'blog' }"
              class="md:p-4 py-2 block hover:text-blue-600"
            >
              Blog
            </router-link>
          </li>
          <div
            class="relative self-center md:mx-2"
            v-if="userStore.userLoggedIn"
          >
            <!-- Dropdown toggle button -->
            <button
              @click="show = !show"
              class="flex items-center p-2 md:p-3 bg-gray-200 text-center rounded-md"
            >
              Settings
              <svg
                class="w-5 h-5 text-indigo-600 mt-1 font-semibold"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="show"
              class="absolute left-0 md:right-0 py-2 mt-2 bg-white rounded-md shadow-xl w-42"
            >
              <router-link
                v-if="isAdmin"
                @click="isOpen = false"
                :to="{ name: 'manage' }"
                class="block px-4 py-2 text-sm text-black hover:text-blue-600"
              >
                Manage
              </router-link>
              <router-link
                to="/"
                @click.prevent="signOut"
                class="block px-4 py-2 text-sm text-black hover:text-blue-600"
              >
                Logout
              </router-link>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";
import { auth, usersCollection } from "../../includes/firebase";
import { getDoc, getDocs, doc } from "@firebase/firestore";

export default {
  name: "AppHeader",
  data() {
    return {
      isOpen: false,
      show: false,
      isAdmin: false,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        if (user.email === "admin@yahoo.com") {
          this.isAdmin = true;
        }
      }
    });
  },
  methods: {
    signOut() {
      this.userStore.signOut();
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "/login" });
      }
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>
