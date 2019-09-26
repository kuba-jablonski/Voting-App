<template>
  <form>
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" label="Password" required></v-text-field>
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
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password);
      console.log(user);
    }
  }
};
</script>
