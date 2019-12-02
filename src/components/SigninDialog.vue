<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-sheet>
      <v-container>
        <v-row align="center" justify="center" class="mb-4">
          <icon-brand class="brand-icon" />
        </v-row>
        <v-row justify="center" class="mb-5 font-weight-light">
          Sign in with your social network account
        </v-row>
        <v-row
          justify="space-around"
          class="mb-5 "
          :style="{ maxWidth: '450px', margin: '0 auto' }"
        >
          <icon-base height="40" width="40">
            <icon-google />
          </icon-base>
          <icon-base height="40" width="40">
            <icon-facebook />
          </icon-base>
          <icon-base height="40" width="40">
            <icon-twitter />
          </icon-base>
          <icon-base height="40" width="40">
            <icon-github />
          </icon-base>
        </v-row>
        <v-row justify="center" class="font-weight-light mb-5">
          Or use your email
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
import IconBase from "@/components/icons/IconBase";
import IconGoogle from "@/components/icons/IconGoogle";
import IconFacebook from "@/components/icons/IconFacebook";
import IconTwitter from "@/components/icons/IconTwitter";
import IconGithub from "@/components/icons/IconGithub";
import IconBrand from "@/components/icons/IconBrand";

export default {
  props: ["open"],
  components: {
    LoginForm,
    SignupForm,
    IconBase,
    IconGoogle,
    IconFacebook,
    IconTwitter,
    IconGithub,
    IconBrand
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
