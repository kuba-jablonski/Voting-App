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
    <p>I'd like to vote for:</p>
    <v-select
      v-model="selected"
      :items="optionStrings"
      label="Choose option"
      required
    ></v-select>
    <v-btn @click="submitVote" :disabled="selected === ''">Vote!</v-btn>
    <p>(Submit your vote to see results)</p>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db, auth } from "@/main";

export default {
  data() {
    return {
      options: [],
      selected: ""
    };
  },
  computed: {
    optionStrings() {
      return this.options.map(o => o.option);
    }
  },
  methods: {
    async submitVote() {
      const selectedId = this.options.find(o => o.option === this.selected).id;
      const pollRef = db.collection("polls").doc(`${this.$route.params.id}`);
      const optionRef = db
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .collection("options")
        .doc(selectedId);
      const batch = db.batch();

      batch.update(pollRef, {
        votes: firebase.firestore.FieldValue.increment(1),
        voters: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
      });
      batch.update(optionRef, {
        count: firebase.firestore.FieldValue.increment(1)
      });
      await batch.commit();
    }
  },
  mounted() {
    firebase
      .firestore()
      .collection("polls")
      .doc(`${this.$route.params.id}`)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.question = doc.data().question;
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
