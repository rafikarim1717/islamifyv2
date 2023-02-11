<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="username"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="username" />
    </div>
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

    <!-- Password -->
    <div class="mb-3 relative">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :type="passwordType"
          placeholder="Password"
          v-bind="field"
          v-model="password"
        />
        <button
          class="absolute top-0 right-0 mt-1.5 mr-2.5 cursor-pointer hover:text-black"
          type="password"
          @click="switchVisibility"
        >
          <i class="fas fa-eye"></i>
        </button>
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3 relative">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        :type="passwordType"
        name="confirm_password"
        v-model="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <button
          class="absolute top-0 right-0 mt-1.5 mr-2.5 cursor-pointer hover:text-black"
          type="password"
          @click="switchVisibility"
        >
          <i class="fas fa-eye"></i>
        </button>
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>

    <button
      type="submit"
      :disabled="reg_in_submission"
      class="mt-8 block w-full bg-black text-white p-3 rounded transition hover:bg-gray-800 focus:outline-none focus:border-black rounded"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { auth, usersCollection } from "@/includes/firebase";
import { addDoc, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        username: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:6|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
      },
      passwordType: "password",
      password: "",
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait! Your account is being created.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["userLoggedIn"]),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait! Your account is being created.";
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        const docRef = await addDoc(usersCollection, {
          displayName: values.username,
          username: values.username,
          email: values.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg =
          "An unexpected error occurred. Please try again later.";
        console.log(error);
        return;
      }
      this.userLoggedIn = true;
      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "Success! Your account has been created.";
      window.location.reload();
    },
    switchVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>
