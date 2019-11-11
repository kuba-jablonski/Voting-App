<template>
  <form>
    <v-text-field v-model="email" label="E-mail"></v-text-field>
    <v-text-field v-model="password" label="Password"></v-text-field>
    <v-btn depressed color="primary" @click="submit">submit</v-btn>
  </form>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
    }
  }
};
</script>
