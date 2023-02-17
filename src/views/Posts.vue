<template>
  <div class="bg-gray-100">
    <div class="container mx-auto py-12 px-5 lg:px-8">
      <nav class="px-2 rounded-md w-full mb-6">
        <ol class="list-reset flex">
          <li>
            <a href="/" class="text-blue-600 hover:text-blue-700">Home</a>
          </li>
          <li><span class="text-gray-500 mx-2">/</span></li>
          <li>
            <a
              @click="$router.go(-1)"
              href="#"
              class="text-blue-600 hover:text-blue-700"
              >Forum</a
            >
          </li>
          <li>
            <p href="#" class="text-gray-500 mx-2">/</p>
          </li>
          <li>
            <p href="#" class="text-black">
              {{ posts.length ? posts[0].categories : "" }}
            </p>
          </li>
        </ol>
      </nav>
      <!-- Post -->
      <section class="">
        <div class="flex flex-col gap-10">
          <div
            class="w-full p-4 md:p-5 mx-auto bg-white shadow-md border-b hover:bg-gray-50 cursor-pointer"
          >
            <div class="flex justify-between mb-2">
              <div class="flex items-center">
                <img
                  src="https://stackdiary.com/140x100.png"
                  alt="Author Photo"
                  class="hidden object-cover w-8 h-8 mr-2 rounded-full sm:block"
                />
                <h1
                  class="font-semibold text-black text-md xl:text-lg cursor-pointer"
                >
                  {{ posts.length ? posts[0].users : "" }}
                </h1>
                <span class="ml-2 text-gray-500 text-sm">
                  {{ posts.length ? posts[0].date : "" }}</span
                >
              </div>
              <div class="flex flex-row items-center gap-1 md:gap-2">
                <div
                  class="flex items-center p-2 cursor-pointer text-base md:text-lg lg:text-2xl"
                  @click="toggleReport"
                >
                  <i
                    class="fa fa-exclamation-triangle text-red-500 hover:text-red-800"
                  ></i>
                </div>
              </div>
            </div>
            <div class="mt-4 max-w-xs md:max-w-xl">
              <p class="text-black text-base lg:text-lg">
                {{ posts.length ? posts[0].content : "" }}
              </p>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <button
            class="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded text-blue-100 transition duration-500"
            @click="toggleComment()"
          >
            Add Comment
          </button>
        </div>
      </section>
      <!-- Report Modal-->
      <div
        class="fixed z-10 overflow-y-auto top-0 w-full left-0"
        v-show="isReport"
        id="isReport"
      >
        <div
          class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
          >
          <div
            class="inline-block align-center bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 center pt-5 pb-4 sm:p-6 sm:pb-4">
              <p class="text-lg font-semibold">
                Apakah anda yakin ingin melaporkan postingan ini ?
              </p>
            </div>
            <div class="px-4 py-2 text-center">
              <button
                type="button"
                class="py-2 px-4 bg-black text-white rounded hover:bg-gray-700 mr-2"
                @click="toggleReport()"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="addReport()"
                class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
              >
                Yes!
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Form -->
      <section class="my-2" v-if="isComment">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="p-4 md:p-5">
            <div
              class="text-white text-center font-bold p-4 mb-4"
              v-if="comment_show_alert"
              :class="comment_alert_variant"
            >
              {{ comment_alert_message }}
            </div>
            <vee-form :validation-schema="schema" @submit="addComment">
              <vee-field
                as="textarea"
                name="comment"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                placeholder="Your comment here..."
              ></vee-field>
              <ErrorMessage class="text-red-600" name="comment" />
              <div class="right">
                <button
                  type="submit"
                  class="py-1.5 px-3 rounded text-white bg-blue-600 block"
                  :disabled="comment_in_submission"
                >
                  Submit
                </button>
              </div>
            </vee-form>
          </div>
        </div>
      </section>
      <!-- Comments -->
      <section class="mt-24">
        <div
          class="flex flex-row justify-between p-2 font-bold border-b border-black my-3"
          v-if="posts.length && posts[0].reply"
        >
          <!-- Comment Count -->
          <h2 class="text-left text-lg">
            {{ `${posts[0].reply.length} Comments` }}
          </h2>
          <i class="fa fa-comments float-right text-blue-600 text-2xl"></i>
        </div>
        <div
          class="w-full p-4 md:p-5 mx-auto bg-white shadow-md border-b hover:bg-gray-50 cursor-pointer"
          v-if="posts.length && posts[0].reply"
          v-for="(reply, index) in posts[0].reply"
          :key="index"
        >
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <img
                src="https://stackdiary.com/140x100.png"
                alt="Author Photo"
                class="hidden object-cover w-8 h-8 mr-2 rounded-full sm:block"
              />
              <h1
                class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
              >
                {{ reply.name }}
              </h1>

              <span class="ml-2 text-gray-500 text-sm">
                {{ reply.datePosted }}
              </span>
            </div>
          </div>
          <div class="mt-4 max-w-xs md:max-w-xl">
            <p class="text-black text-base lg:text-lg">
              {{ reply.content }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  collection,
  doc,
  getDocs,
  getDoc,
  where,
  addDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { postsCollection, usersCollection, auth } from "@/includes/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      posts: [],
      isModal: false,
      isComment: false,
      isReport: false,
      schema: {
        comment: "required|min:3",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_message: "Please wait! Your comment is being submitted",
      sort: "1",
    };
  },
  components: {},
  created() {},
  async beforeRouteEnter(to, from, next) {
    const docRef = doc(postsCollection, to.params.id);
    const docSnapshot = await getDoc(docRef);

    next((vm) => {
      if (docSnapshot.exists()) {
        const post = docSnapshot.data();
        vm.posts.push({
          postID: docSnapshot.id,
          content: post.content,
          users: post.users,
          date: post.date,
          reply: post.reply,
          report: post.report,
          categories: post.categories,
        });
      } else {
        vm.$router.push({ name: "home" });
      }
    });
  },
  methods: {
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-gray-500";
      this.comment_alert_message =
        "Please wait! Your comment is being submitted";

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const userQuery = query(
        usersCollection,
        where("email", "==", auth.currentUser.email)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      const userDocId = userQuerySnapshot.docs[0].id;
      const userDocData = userQuerySnapshot.docs[0].data();
      const displayName = userDocData.displayName;

      const comment = {
        content: values.comment,
        datePosted: formattedDate,
        name: displayName,
        uid: userDocId,
      };

      const postRef = doc(postsCollection, this.$route.params.id);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        const reply = postSnapshot.data().reply || [];
        const newReply = [...reply, comment];
        await updateDoc(postRef, { reply: newReply });
      }

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_message = "Comment added!";
      resetForm();
    },
    async getComments() {
      const postRef = doc(postsCollection, this.$route.params.id);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const reply = postSnapshot.data().reply || [];
        this.posts[0].reply = reply;
      }
    },
    toggleComment() {
      this.isComment = !this.isComment;
    },
    addReport() {
      alert("Anda telah berhasil melaporkan postingan");
      windows.location.reload();
    },
    toggleReport() {
      this.isReport = !this.isReport;
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>

<style scoped>
.shadow1 {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
.right {
  text-align: -webkit-right;
}
</style>
