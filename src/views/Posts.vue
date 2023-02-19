<template>
  <div class="bg-gray-200 relative">
    <div class="container mx-auto pt-12 pb-32 px-5 lg:px-8">
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
            <p href="#" class="text-black capitalize">
              {{ posts.length ? posts[0].categories : "" }}
            </p>
          </li>
        </ol>
      </nav>
      <!-- Post -->
      <section class="my-4">
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
      <div
        v-if="isReport"
        class="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-50"
      ></div>
      <div
        v-if="isReport"
        id="isReport"
        class="absolute inset-0 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-lg p-8 center text-center">
          <h2 class="text-xl font-bold mb-4">Report Post</h2>
          <form class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label class="mb-1 font-semibold">Reason for Report</label>
              <textarea
                class="h-24 bg-gray-300 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                name="reason"
              ></textarea>
            </div>
            <div class="flex justify-center mt-4">
              <button
                type="button"
                @click="addReport()"
                class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-500"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showPopup">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Success!
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    Anda telah berhasil melaporkan postingan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                @click="closePopup"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                OK
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  getDocs,
  getDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { postsCollection, usersCollection, auth } from "@/includes/firebase";

export default {
  data() {
    return {
      showPopup: false,
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

      resetForm(); // reset the form

      setTimeout(() => {
        this.isComment = !this.isComment;
      }, 1000);
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
    async addReport() {
      const postRef = doc(postsCollection, this.$route.params.id);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const reportCount = postSnapshot.data().report || 0;
        await updateDoc(postRef, { report: reportCount + 1 });
      }

      this.isReport = !this.isReport;
      this.showPopup = !this.showPopup;
    },
    toggleReport() {
      this.isReport = !this.isReport;
    },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    closePopup() {
      this.showPopup = !this.showPopup;
      window.location.reload();
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
