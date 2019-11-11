<template>
  <v-app>
    <v-app-bar flat app>
      <v-toolbar-title class="headline text-uppercase d-flex align-center">
        <v-img :src="logo" alt="Logo" max-height="45" max-width="45" />
        <span>Poll</span>
        <span class="font-weight-light">Time</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="mr-3">
        <v-btn to="/about" text>
          <span>About</span>
        </v-btn>
        <v-btn to="/polls" text>
          <span>Poll list</span>
        </v-btn>
      </v-toolbar-items>
      <v-btn v-if="!isAuthed" outlined @click="signinDialog = true">
        Sign in
      </v-btn>
      <!-- <v-btn
        v-if="isAuthed"
        outlined
        @click="signout"
      >Sign out</v-btn> -->
      <v-menu v-if="isAuthed" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Welcome
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="createDialog = true">
            <v-list-item-title>Create New</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>View My Polls</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="signout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <signin-dialog :open="signinDialog" @close="signinDialog = false" />
      <create-dialog :open="createDialog" @close="createDialog = false" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

import SigninDialog from "@/components/SigninDialog";
import CreateDialog from "@/components/CreateDialog";

export default {
  name: "App",
  components: {
    SigninDialog,
    CreateDialog
  },
  data: () => ({
    signinDialog: false,
    createDialog: false,
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
