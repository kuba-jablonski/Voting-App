<template>
  <div>
    <p>I'd like to vote for:</p>
    <v-select
      v-model="selected"
      :items="optionStrings"
      label="Choose option"
      required
    ></v-select>
    <v-btn @click="submitVote" :disabled="selected === ''">Vote!</v-btn>
    <p>(Submit your vote to see results)</p>
  </div>
</template>

<script>
import firebase from "firebase";
import { db, auth } from "@/main";

export default {
  props: ["options"],
  data() {
    return {
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
  }
};
</script>

<style></style>
