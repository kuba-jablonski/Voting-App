<template>
  <v-form ref="loginForm" v-model="valid" @submit.prevent="submit">
    <v-text-field
      validate-on-blur
      v-model="email"
      :rules="[
        v => !!v || 'Field is empty',
        v => /.+@.+/.test(v) || 'Invalid email address'
      ]"
      label="E-mail"
    ></v-text-field>
    <v-text-field
      validate-on-blur
      v-model="password"
      :rules="[v => !!v || 'Field is empty']"
      label="Password"
      class="mb-2"
    ></v-text-field>
    <v-btn depressed color="primary" class="mr-2" type="submit">submit</v-btn>
    <v-btn depressed @click="$emit('close')">cancel</v-btn>
    <v-snackbar v-model="snackbar" :timeout="5000" color="red">
      {{ errorMsg }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { auth } from "@/main";

export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      loading: false,
      snackbar: false,
      errorMsg: ""
    };
  },
  methods: {
    async submit() {
      console.log("afafsd");
      console.log(this.$refs);
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        try {
          await auth().signInWithEmailAndPassword(this.email, this.password);
          this.$emit("close");
        } catch (e) {
          this.errorMsg = e.message ? e.message : "Something went wrong";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
