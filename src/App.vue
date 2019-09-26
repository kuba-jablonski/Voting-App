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
    </v-app-bar>
    <v-content>
      <signin-dialog :open="dialog" @close="dialog = false" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

import SigninDialog from "@/components/SigninDialog";

export default {
  name: "App",
  components: {
    SigninDialog
  },
  data: () => ({
    dialog: false
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
