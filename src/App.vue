<template>
  <v-app>
    <!-- NAV DRAWER -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      app
      v-model="drawer"
    >
      <v-list nav>
        <v-list-item-group active-class="primary--text">
          <v-list-item to="/" exact>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/about" exact>
            <v-list-item-title>
              About
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/polls" exact>
            <v-list-item-title>Poll List</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isAuthed" to="/polls/me" exact>
            <v-list-item-title>My Polls</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider v-if="isAuthed"></v-divider>
      <v-list v-if="isAuthed">
        <v-list-item-group>
          <v-list-item
            @click="
              drawer = false;
              createDialog = true;
            "
          >
            <v-list-item-title>
              Create New
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="signout" v-if="isAuthed" outlined block>Logout</v-btn>
          <v-btn
            @click="
              drawer = false;
              signinDialog = true;
            "
            v-if="!isAuthed"
            outlined
            block
            >Sign in</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <!-- END NAV DRAWER -->

    <!-- APP BAR -->
    <v-app-bar flat app :class="{ appbar: $route.path === '/' }">
      <router-link to="/" class="nav-brand">
        <v-toolbar-title
          class="headline text-uppercase d-flex align-center"
          :class="{
            'white--text': $route.path === '/' && $vuetify.breakpoint.mdAndUp
          }"
        >
          <icon-brand
            :class="{
              'brand-icon': true,
              'brand-icon-white':
                $route.path === '/' && $vuetify.breakpoint.mdAndUp
            }"
          />
          <span>Poll</span>
          <span class="font-weight-light">Time</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" class="mr-3">
        <v-btn to="/about" text>
          <span>About</span>
        </v-btn>
        <v-btn to="/polls" text>
          <span>Poll list</span>
        </v-btn>
      </v-toolbar-items>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp && !isAuthed"
        outlined
        color="primary"
        @click="signinDialog = true"
      >
        Sign in
      </v-btn>
      <v-menu v-if="$vuetify.breakpoint.mdAndUp && isAuthed" offset-y>
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
          <v-list-item to="/polls/me">
            <v-list-item-title>View My Polls</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="signout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- END APP BAR -->

    <v-content>
      <signin-dialog :open="signinDialog" @close="signinDialog = false" />
      <create-dialog :open="createDialog" @close="createDialog = false" />
      <router-view @openSignin="signinDialog = true" />
    </v-content>
  </v-app>
</template>

<script>
import { auth } from "@/main";
import { mapGetters } from "vuex";

import SigninDialog from "@/components/SigninDialog";
import CreateDialog from "@/components/CreateDialog";
import IconBrand from "@/components/icons/IconBrand";

export default {
  name: "App",
  components: {
    IconBrand,
    SigninDialog,
    CreateDialog
  },
  data: () => ({
    signinDialog: false,
    createDialog: false,
    drawer: false
  }),
  computed: {
    ...mapGetters(["isAuthed"])
  },
  methods: {
    async signout() {
      await auth.signOut();
    }
  }
};
</script>

<style scoped>
.appbar {
  background: linear-gradient(
    90deg,
    rgba(237, 69, 69, 1) 27%,
    rgba(250, 250, 250, 1) 75%
  ) !important;
}

.nav-brand {
  color: inherit !important;
  text-decoration: none;
}

.brand-icon {
  height: 45px;
  width: 45px;
  fill: #ed4545;
  margin-right: 8px;
}

.brand-icon-white {
  fill: white;
}

@media (max-width: 959px) {
  .appbar {
    background: white !important;
  }
}
</style>
