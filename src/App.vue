<template>
  <v-app>
    <v-app-bar flat app>
      <v-toolbar-title class="headline text-uppercase">
        <span>2POLL</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="mr-3">
        <v-btn text>
          <span>About</span>
        </v-btn>
        <v-btn text>
          <span>Poll list</span>
        </v-btn>
      </v-toolbar-items>
      <v-btn v-if="!isAuthed" outlined @click="dialog = true">
        Sign in
      </v-btn>
      <v-btn v-if="isAuthed" outlined @click="signout">Sign out</v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <v-sheet>
          <v-container>
            <v-row align="center" justify="center" class="mb-4">
              <v-img :src="logo" alt="Logo" max-height="100" max-width="100" />
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
                  <login-form />
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container>
                  <signup-form />
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-container>
        </v-sheet>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <!-- <HelloWorld /> -->
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import IconBase from "@/components/icons/IconBase";
import IconGoogle from "@/components/icons/IconGoogle";
import IconFacebook from "@/components/icons/IconFacebook";
import IconTwitter from "@/components/icons/IconTwitter";
import IconGithub from "@/components/icons/IconGithub";

export default {
  name: "App",
  components: {
    LoginForm,
    SignupForm,
    IconBase,
    IconGoogle,
    IconFacebook,
    IconTwitter,
    IconGithub
  },
  data: () => ({
    dialog: false,
    logo: require("@/assets/poll-icon-4.jpg")
  }),
  computed: {
    ...mapGetters(["isAuthed"])
  },
  methods: {
    async signout() {
      await firebase.auth().signOut();
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit("SET_UID", user.uid);
      } else {
        this.$store.commit("SET_UID", null);
      }
    });
  }
};
</script>
