<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-card v-if="poll">
      <v-container>
        <div class="d-flex flex-column">
          <h2 class="mb-5">Vote to view poll results</h2>
          <p class="font-weight-light title primary--text">Question</p>
          <div class="px-4">
            <span class="font-weight-bold">{{ poll.question }}</span>
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
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import { db, auth } from "@/main";

export default {
  props: ["open", "poll"],
  data() {
    return {
      author: null,
      question: null,
      voters: null,
      options: [],
      selected: "",
      loadingOptions: false
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
      const pollRef = db.collection("polls").doc(this.poll.id);
      const optionRef = db
        .collection("polls")
        .doc(this.poll.id)
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
    },
    async fetchOptions(id) {
      this.options = [];
      const snap = await db
        .collection("polls")
        .doc(id)
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
  watch: {
    poll(val) {
      this.fetchOptions(val.id);
    }
  }
};
</script>

<style></style>
