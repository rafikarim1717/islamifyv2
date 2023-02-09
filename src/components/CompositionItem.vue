<template>
  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4"></div>
  <div class="p-3 mb-4 rounded hover:bg-gray-100 cursor-pointer">
    <div v-show="!showForm">
      <h4 class="inline-block text-xl lg:text-2xl">
        {{ song.modified_name }}
      </h4>
      <button
        @click.prevent="isModal = !isModal"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right md:float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-gray-600 float-right md:float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div
      class="fixed z-10 overflow-y-auto top-0 w-full left-0"
      v-show="isModal"
      id="modal"
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
          class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label>Are you sure want to delete this item ?</label>
          </div>
          <div class="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              class="py-2 px-4 bg-black text-white rounded mr-2"
              @click.prevent="isModal = !isModal"
            >
              Cancel
            </button>
            <button
              type="button"
              @click.prevent="deleteSong"
              class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
            >
              <i class="fa fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        @submit="edit"
        :validation-schema="schema"
        :initial-values="song"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Categories</label>
          <vee-field
            name="categories"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="categories" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Artist</label>
          <vee-field
            name="artist"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none"
            placeholder="Enter Artist"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="artist" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-blue-600 mr-2"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      isModal: false,
      schema: {
        modified_name: "required",
        categories: "alpha_spaces",
        artist: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-600",
      alert_message: "Please wait! Updating song info",
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song info";

      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong! Try again later";
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success!";
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docID).delete();

      this.removeSong(this.index);
    },
  },
};
</script>
