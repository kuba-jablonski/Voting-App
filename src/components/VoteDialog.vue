<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-card v-if="poll">
      <v-container>
        <h2>Vote and view poll results</h2>
        <p>{{ poll.question }}</p>
        <div>
          I'd like to vote for
          <v-select
            v-model="selected"
            :items="options"
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
      question: "",
      selected: ""
    };
  },
  computed: {
    options() {
      return this.poll.options.map(p => p.option);
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
    }
  }
};
</script>

<style></style>
