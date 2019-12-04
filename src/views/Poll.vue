<template>
  <v-container>
    <div v-if="poll === null">Loading...</div>
    <div class="mt-9" v-else>
      <h1 class="mb-5 display-1">{{ poll.question }}</h1>
      <div class="body-2">Created by {{ poll.author.username }}</div>
      <div class="body-2">Total votes: {{ poll.votes }}</div>
      <v-btn depressed class="my-5 ">
        <v-icon left dark>mdi-chevron-left</v-icon>Back to list
      </v-btn>
      <poll-results
        :options="options"
        :question="poll.question"
        :loaded="loaded"
      />
    </div>
  </v-container>
</template>

<script>
import { db } from "@/main";
import PollResults from "@/components/PollResults";

export default {
  components: { PollResults },
  data() {
    return {
      poll: null,
      options: [],
      loaded: false
    };
  },
  methods: {
    async fetchPoll() {
      const doc = await db
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .get();
      this.poll = doc.data();
    },
    async fetchOptions() {
      const snap = await db
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .collection("options")
        .get();
      snap.forEach(doc => {
        this.options.push({
          id: doc.id,
          ...doc.data()
        });
      });
    }
  },
  async mounted() {
    await Promise.all([this.fetchPoll(), this.fetchOptions()]);
    this.loaded = true;
  }
};
</script>
