<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="flex place-content-center items-center py-5">
          <img src="@/assets/images/1.png" alt="Islamify Logo" class="" />
        </div>
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="p-6 text-left">
          <!--Title-->
          <!-- Tabs -->
          <ul class="flex flex-wrap mb-6 space-x-3">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'login'"
                :class="{
                  'hover:text-white text-white bg-blue-700 shadow1': tab === 'login',
                  'hover:text-blue-700 shadow1': tab === 'register',
                }"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'register'"
                :class="{
                  'hover:text-white text-white bg-blue-600 shadow1': tab === 'register',
                  'hover:text-blue-600 shadow1': tab === 'login',
                }"
                >Register</a
              >
            </li>
          </ul>

          <app-login-form v-if="tab === 'login'" />
          <app-register-form v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "../includes/firebase";
import AppLoginForm from "@/components/Navbar/LoginForm.vue";
import AppRegisterForm from "@/components/Navbar/RegisterForm.vue";

export default {
  name: "Auth",
  components: {
    AppLoginForm,
    AppRegisterForm,
  },
  data() {
    return {
      tab: "login",
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
  // computed: {
  //   ...mapState(useModalStore, ["hiddenClass"]),
  //   ...mapWritableState(useModalStore, {
  //     modalVisibility: "isOpen",
  //   }),
  // },
  methods: {},
};
</script>

<style scoped>
.shadow1{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

</style>