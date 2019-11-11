<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      :rules="usernameRules"
      v-model="username"
      label="Username"
    ></v-text-field>
    <v-text-field
      :rules="emailRules"
      v-model="email"
      label="E-mail"
    ></v-text-field>
    <v-text-field
      :rules="passwordRules"
      v-model="password"
      label="Password"
    ></v-text-field>
    <v-btn depressed color="primary" @click="submit">submit</v-btn>
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
      username: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => v.length <= 10 || "Username must be less than 10 characters",
        v => v.length > 3 || "Username must be longer than 3 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be atleast 6 characters"
      ],
      valid: false,
      snackbar: false,
      errorMsg: ""
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
          auth.currentUser.updateProfile({ displayName: this.username });
        } catch (e) {
          this.errorMsg = e.message ? e.message : "Something went wrong";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
