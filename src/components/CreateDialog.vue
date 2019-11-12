<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-card>
      <v-container>
        <h2>New Poll</h2>
        <v-form ref="form" @submit.prevent="handleSubmit" v-model="valid">
          <v-container>
            <v-text-field
              v-model="question"
              label="Question"
              :rules="[v => !!v || 'Question is required']"
              required
            ></v-text-field>
            <template v-for="(option, i) in options">
              <v-text-field
                :key="i"
                :value="option"
                :rules="[v => !!v || 'Option is required']"
                @input="handleInput(i, $event)"
              >
                <v-icon slot="append" @click="removeOptionField(i)"
                  >mdi-delete</v-icon
                >
                <v-icon slot="prepend" color="primary">mdi-adjust</v-icon>
              </v-text-field>
            </template>
            <v-row class="d-flex justify-end mb-4">
              <v-btn text color="primary" @click="addOptionField"
                >Add more options</v-btn
              >
            </v-row>
            <v-row>
              <v-btn
                :loading="loading"
                depressed
                color="primary"
                class="mr-2"
                type="submit"
                >Submit</v-btn
              >
              <v-btn depressed @click="$emit('close')">Cancel</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="5000" color="red">
      Something went wrong
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import { db, auth } from "@/main";

export default {
  props: ["open"],
  data() {
    return {
      snackbar: false,
      loading: false,
      valid: false,
      question: "",
      options: ["", ""]
    };
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
      this.loading = true;
      if (this.$refs.form.validate()) {
        try {
          const { path } = await db.collection("polls").add({
            question: this.question,
            votes: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: {
              username: auth.currentUser.displayName,
              id: auth.currentUser.uid
            },
            voters: []
          });
          const batch = db.batch();
          this.options.forEach(o => {
            batch.set(db.collection(`${path}/options`).doc(), {
              count: 0,
              option: o
            });
          });
          await batch.commit();
          this.$emit("close");
        } catch (e) {
          this.snackbar = true;
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style></style>
