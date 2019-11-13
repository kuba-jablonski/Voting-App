<template>
  <v-container>
    <div v-if="question === null">Loading...</div>
    <component
      v-if="question !== null"
      :is="activeComponent"
      :options="options"
      :question="question"
    />
  </v-container>
</template>

<script>
import firebase from "firebase";
// import { db, auth } from "@/main";
import PollVote from "@/components/PollVote";
import PollResults from "@/components/PollResults";

export default {
  components: { PollVote, PollResults },
  data() {
    return {
      author: null,
      question: null,
      voters: null,
      options: []
    };
  },
  computed: {
    uid() {
      return this.$store.state.uid;
    },
    activeComponent() {
      return this.voters.includes(this.uid) ? "poll-results" : "poll-vote";
    }
  },
  methods: {
    async fetchPoll() {
      console.log("fetching POLL");
      const doc = await firebase
        .firestore()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .get();
      const { author, question, voters } = doc.data();
      this.question = question;
      this.author = author;
      this.voters = voters;
      console.log("fetching POLL - DONE");
    },
    async fetchOptions() {
      console.log("fetching OPTIONS");
      const snap = await firebase
        .firestore()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .collection("options")
        .get();
      snap.forEach(doc => {
        console.log(doc.data());
        this.options.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log("fetching OPTIONS - DONE");
    }
  },
  mounted() {
    this.fetchPoll();
    this.fetchOptions();
  }
};
</script>
