import { defineStore } from "pinia";
import { Howl } from "howler";
import helper from "@/includes/helper";
import { mapActions } from "pinia";
import usePlayerStore from "@/stores/player";
import { songsCollection } from "@/includes/firebase";
import {
  orderBy,
  getDocs,
  query,
  documentId,
  getDoc,
  setDoc,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";

export default defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
    showPlayer: false,
  }),
  actions: {
    // async newSong(song) {
    //   if (this.sound instanceof Howl) {
    //     this.sound.unload();
    //   }

    //   this.current_song = song;

    //   this.sound = new Howl({
    //     src: [song.url],
    //     html5: true,
    //   });

    //   console.log(this.current_song);

    //   this.sound.play();

    //   this.sound.on("play", () => {
    //     requestAnimationFrame(this.progress);
    //     this.showPlayer = true;
    //   });
    // },
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;
      let songDocID = this.current_song.docID;
      console.log(songDocID);
      // const songReff = doc(songsCollection, this.current_song);
      // console.log(songReff)
      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      const songRef = doc(songsCollection, songDocID);
      console.log(songRef);
      try {
        const docSnap = await getDoc(songRef);
        console.log(docSnap);
        let view_count = docSnap.data()?.view_count || 0;
        view_count++;
        await updateDoc(songRef, { view_count }, { merge: true });
      } catch (error) {
        console.log(error);
      }

      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
        this.showPlayer = true;
      });
    },

    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      const { x, width } = event.currentTarget.getBoundingClientRect();
      // Document = 2000, Timeline = 1000, clientX = 1000, Distance = 500
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      this.sound.seek(seconds);
      this.sound.once("seek", this.progress);
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
});
