<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="500px">
    <v-sheet>
      <v-container>
        <v-row align="center" justify="center" class="mb-4">
          <icon-brand class="brand-icon" />
        </v-row>
        <v-row justify="center" class="mb-5 font-weight-light">
          <!-- Sign in with your social network account -->
          <v-btn @click="signIn" outlined color="primary">
            Sign in with Google</v-btn
          >
        </v-row>
        <v-row justify="center" class="font-weight-light mb-5">
          or use your email
        </v-row>

        <v-tabs grow>
          <v-tab>Sign in</v-tab>
          <v-tab>Register</v-tab>

          <v-tab-item>
            <v-container>
              <login-form @close="$emit('close')" />
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <signup-form @close="$emit('close')" />
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import IconBrand from "@/components/icons/IconBrand";
import { auth } from "@/main";

export default {
  props: ["open"],
  components: {
    LoginForm,
    SignupForm,
    IconBrand
  },
  methods: {
    signIn() {
      auth().signInWithRedirect(new auth.GoogleAuthProvider());
    }
  }
};
</script>

<style scoped>
.brand-icon {
  height: 100px;
  width: 100px;
  fill: #ed4545;
  margin-right: 8px;
}
</style>
