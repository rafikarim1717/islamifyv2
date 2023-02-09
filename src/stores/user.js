import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    // async register(values) {
    //   const userCred = await createUserWithEmailAndPassword(
    //     auth,
    //     values.email,
    //     values.password
    //   ).then((userCred) => {
    //     // Register to firestore collection user
    //     addDoc(usersCollection(userCred.user.uid)),
    //       set({
    //           username: values.username,
    //           email: values.email,
    //       });
    //     // ...
    //   });

    //   // .then() addDoc(usersCollection(userCred.user.uid)),set({
    //   //   username: values.username,
    //   //   email: values.email,
    //   // });

    //   updateProfile,
    //     userCred.user({
    //       displayName: values.username,
    //     });

    //   this.userLoggedIn = true;
    // },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      this.userLoggedIn = true;
    },
    async signOut() {
      await signOut(auth);

      this.userLoggedIn = false;
    },
  },
});
