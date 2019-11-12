<template>
  <v-container>
    <h1>{{ question }}</h1>
    <!-- <div class="option" v-for="option in options" :key="option.option">
      <span>{{ option.option }}</span>
      <div
        class="bar"
        :style="{ width: `${(option.count / options[0].count) * 100}%` }"
      >
        {{ option.count }}
      </div>
    </div> -->
    <component
      v-if="question !== null"
      :is="activeComponent"
      :options="options"
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
  mounted() {
    firebase
      .firestore()
      .collection("polls")
      .doc(`${this.$route.params.id}`)
      .get()
      .then(doc => {
        const { author, question, voters } = doc.data();
        this.question = question;
        this.author = author;
        this.voters = voters;
      });

    firebase
      .firestore()
      .collection("polls")
      .doc(`${this.$route.params.id}`)
      .collection("options")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.data());
          this.options.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>

<style scoped>
.bar {
  height: 20px;
  background-color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
}
</style>
