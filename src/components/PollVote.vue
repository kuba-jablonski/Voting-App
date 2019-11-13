<template>
  <div class="d-flex align-center flex-column">
    <h2 class="mb-5">Vote to view poll results</h2>
    <p class="font-weight-light title primary--text">Question</p>
    <div class="px-4">
      <span class="font-weight-bold">{{ question }}</span>
      <div class="d-flex align-center">
        <span class="mr-3">I'd like to vote for:</span>

        <v-select
          :style="{ maxWidth: '300px' }"
          v-model="selected"
          :items="optionStrings"
          label="Choose option"
          required
        ></v-select>
      </div>

      <v-btn @click="submitVote" :disabled="selected === ''">Vote!</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db, auth } from "@/main";

export default {
  props: ["options", "question"],
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
