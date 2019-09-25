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
      <!-- <v-btn outlined>Sign in</v-btn> -->
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            Sign in
          </v-btn>
        </template>

        <v-sheet>
          <v-container>
            Hello world!
          </v-container>
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
        </v-sheet>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <!-- <HelloWorld /> -->
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default {
  name: "App",
  components: {
    LoginForm,
    SignupForm
  },
  data: () => ({
    dialog: false
  })
};
</script>
