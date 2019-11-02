import Vue from "vue";
import firebase from "firebase";
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
  projectId: "vue-vote",
  storageBucket: "vue-vote.appspot.com",
  messagingSenderId: "977007321934",
  appId: "1:977007321934:web:3da7a71bd727fb70e8741f",
  measurementId: "G-4DLYW0C3D0"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
