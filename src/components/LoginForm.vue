<template>
  <form>
    <v-text-field v-model="email" label="E-mail"></v-text-field>
    <v-text-field v-model="password" label="Password"></v-text-field>
    <v-btn depressed color="primary" @click="submit">submit</v-btn>
    <v-snackbar v-model="snackbar" :timeout="5000" color="red">
      {{ errorMsg }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </form>
</template>

<script>
import { auth } from "@/main";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      snackbar: false,
      errorMsg: ""
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$emit("close");
      } catch (e) {
        this.errorMsg = e.message ? e.message : "Something went wrong";
        this.snackbar = true;
      }
    }
  }
};
</script>
