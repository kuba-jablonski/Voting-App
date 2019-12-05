import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyA4udwa29H-PtXs182yJoc9xWK9X7G3qqs",
  authDomain: "vue-vote.firebaseapp.com",
  databaseURL: "https://vue-vote.firebaseio.com",
  projectId: "vue-vote"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore;
export const auth = firebase.auth();

let app;
auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("SET_UID", user.uid);
  } else {
    store.commit("SET_UID", null);
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
