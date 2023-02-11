<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3 relative">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        :type="isPasswordVisible ? 'text' : 'password'"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <button
        class="absolute top-0 right-0 mt-1.5 mr-2.5 cursor-pointer hover:text-black"
        type="password"
        @click="togglePasswordVisibility"
      >
        <i class="fas fa-eye"></i>
      </button>
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      class="mt-8 block w-full bg-black text-white p-3 rounded transition hover:bg-gray-800 focus:outline-none focus:border-black rounded"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:6|max:100",
      },
      password: "",
      isPasswordVisible: false,
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_variant = "bg-blue-500";
      this.login_alert_msg = "Please wait! We are logging you in.";

      try {
        await this.authenticate(values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_msg = "Invalid login details." + " " + error;
        return;
      }

      this.login_alert_variant = "bg-green-500";
      this.login_alert_msg = "Success! You are now logged in.";
      this.$router.push("/");
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
};
</script>
