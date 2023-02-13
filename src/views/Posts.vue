<template>
  <div class="bg-gray-100">
    <div class="container mx-auto py-12 px-5 lg:px-8">
      <!-- Post -->
      <section class="">
        <div class="flex flex-col gap-10">
          <nav class="px-2 rounded-md w-full">
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
                <p href="#" class="text-black">{{ "" }}</p>
              </li>
            </ol>
          </nav>

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
                  class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                >
                  {{ "rafikarim@Yahoo.com" }}
                </h1>
              </div>
            </div>
            <div class="mt-4 max-w-xs md:max-w-xl">
              <p class="text-black text-lg xl:text-xl">
                {{ "what should i choose ?" }}
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
        >
          <!-- Comment Count -->
          <h2 class="text-left text-lg">{{ "3 Comments" }}</h2>
          <i class="fa fa-comments float-right text-blue-600 text-2xl"></i>
        </div>
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
                class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
              >
                {{ "rafikarim@Yahoo.com" }}
              </h1>
            </div>
          </div>
          <div class="mt-4 max-w-xs md:max-w-xl">
            <p class="text-black text-lg xl:text-xl">
              {{ "what should i choose ?" }}
            </p>
          </div>
        </div>
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
                class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
              >
                {{ "rafikarim@Yahoo.com" }}
              </h1>
            </div>
          </div>
          <div class="mt-4 max-w-xs md:max-w-xl">
            <p class="text-black text-lg xl:text-xl">
              {{ "what should i choose ?" }}
            </p>
          </div>
        </div>
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
                class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
              >
                {{ "rafikarim@Yahoo.com" }}
              </h1>
            </div>
          </div>
          <div class="mt-4 max-w-xs md:max-w-xl">
            <p class="text-black text-lg xl:text-xl">
              {{ "what should i choose ?" }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: {},
      isModal: false,
      isComment: false,
      schema: {
        comment: "required|min:3",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_message: "Please wait! Your comment is being submitted",
      comments: [],
      sort: "1",
    };
  },
  components: {},
  created() {},
  methods: {
    checkID() {
      const id = this.$route.query.id;

      if (this.posts.postID) {
      }
      console.log(this.posts);
      return this.posts;
    },
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message =
        "Please wait! Your comment is being submitted";

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message = "Comment added!";

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();

      this.comments = [];

      snapshots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    toggleComment() {
      this.isComment = !this.isComment;
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
