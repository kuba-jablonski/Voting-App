<template>
  <v-dialog :value="open" @input="clearDialog" max-width="600px">
    <v-card v-if="poll">
      <v-container>
        <h2>Vote and view poll results</h2>
        <p>{{ poll.question }}</p>
        <div>
          I'd like to vote for
          <v-select
            :loading="loadingOptions"
            v-model="selected"
            :items="optionStrings"
            label="Question"
            required
          ></v-select>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";

function transformOptions(arr) {
  return arr.map(o => ({ count: 0, option: o }));
}

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
    handleInput(i, event) {
      this.options[i] = event;
    },
    addOptionField() {
      this.options.push("");
    },
    removeOptionField(i) {
      this.options.splice(i, 1);
    },
    clearDialog() {
      this.author = null;
      this.question = null;
      this.voters = null;
      this.options = [];
      this.selected = "";
      this.$emit("close");
    },
    async handleSubmit() {
      console.log(this.question);
      console.log(this.options);
      await firebase
        .firestore()
        .collection("polls")
        .add({
          question: this.question,
          options: transformOptions(this.options),
          votes: 0
        });
    },
    async fetchPoll(id) {
      const doc = await firebase
        .firestore()
        .collection("polls")
        .doc(id)
        .get();
      const { author, question, voters } = doc.data();
      this.question = question;
      this.author = author;
      this.voters = voters;
    },
    async fetchOptions(id) {
      const snap = await firebase
        .firestore()
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
      console.log(val);
      this.fetchPoll(val.id);
      this.fetchOptions(val.id);
    }
  }
};
</script>

<style></style>
