<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="text-md md:text-lg">Upload</span>
      <i class="fas fa-upload float-right text-blue-600 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-gray-400 hover:border-bg-blue-600 hover:border-solid"
        :class="{
          'bg-bg-blue-600 border-bg-blue-600 border-solid': is_dragover,
        }"
        @drag.prevent
        @dragstart.prevent.stop
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            :class="upload.variant"
            class="transition-all progress-bar"
            :style="{ width: `${upload.current_progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";
import {
  orderBy,
  limit,
  getDocs,
  query,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "Upload",
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  props: ["addSong"],
  methods: {
    upload($event) {
      this.is_dragover = false;

      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: "100",
            name: file.name,
            variant: "bg-red-400",
            icon: "fas fa-times",
            text_class: "text-red-400",
          });
          return;
        }

        const storageRef = ref(storage); // music-c2596.appspot.com
        const songsRef = storageRef(`songs/${file.name}`); // music-c2596.appspot.com/songs/example.mp3
        const task = songsRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-bg-blue-600",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const song = {
              uid: firebase.auth().currentUser.uid,
              display_name: firebase.auth().currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              categories: "",
              played_count: 0,
            };

            song.url = await getDownloadURL(ref(storage, task.snapshot));
            const songRef = await setDoc(songsCollection(song));
            const songSnapshot = await getDoc(songRef);

            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = "bg-blue-600";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-blue-600";
          }
        );
      });
    },
    // upload($event) {
    //   this.is_dragover = false;

    //   const files = $event.dataTransfer
    //     ? [...$event.dataTransfer.files]
    //     : [...$event.target.files];

    //   files.forEach((file) => {
    //     if (file.type !== "audio/mpeg") {
    //       return;
    //     }

    //     if (!navigator.onLine) {
    //       this.uploads.push({
    //         task: {},
    //         current_progress: "100",
    //         name: file.name,
    //         variant: "bg-red-400",
    //         icon: "fas fa-times",
    //         text_class: "text-red-400",
    //       });
    //       return;
    //     }

    //     const storageRef = storage.ref(); // music-c2596.appspot.com
    //     const songsRef = storageRef.child(`songs/${file.name}`); // music-c2596.appspot.com/songs/example.mp3
    //     const task = songsRef.put(file);

    //     const uploadIndex =
    //       this.uploads.push({
    //         task,
    //         current_progress: 0,
    //         name: file.name,
    //         variant: "bg-bg-blue-600",
    //         icon: "fas fa-spinner fa-spin",
    //         text_class: "",
    //       }) - 1;

    //     task.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         this.uploads[uploadIndex].current_progress = progress;
    //       },
    //       (error) => {
    //         this.uploads[uploadIndex].variant = "bg-red-400";
    //         this.uploads[uploadIndex].icon = "fas fa-times";
    //         this.uploads[uploadIndex].text_class = "text-red-400";
    //         console.log(error);
    //       },
    //       async () => {
    //         const song = {
    //           uid: auth.currentUser.uid,
    //           display_name: auth.currentUser.displayName,
    //           original_name: task.snapshot.ref.name,
    //           modified_name: task.snapshot.ref.name,
    //           categories: "",
    //           played_count: 0,
    //         };

    //         song.url = await task.snapshot.ref.getDownloadURL();
    //         const songRef = await songsCollection.add(song);
    //         const songSnapshot = await songRef.get();

    //         this.addSong(songSnapshot);

    //         this.uploads[uploadIndex].variant = "bg-blue-600";
    //         this.uploads[uploadIndex].icon = "fas fa-check";
    //         this.uploads[uploadIndex].text_class = "text-blue-600";
    //       }
    //     );
    //   });
    // },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>