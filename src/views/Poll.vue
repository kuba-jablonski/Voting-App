<template>
  <v-container>
    <h1>{{ question }}</h1>
    <div class="option" v-for="option in options" :key="option.option">
      <span>{{ option.option }}</span>
      <div
        class="bar"
        :style="{ width: `${(option.count / options[0].count) * 100}%` }"
      >
        {{ option.count }}
      </div>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      options: []
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("polls")
      .doc(`${this.$route.params.id}`)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.question = doc.data().question;
      });

    firebase
      .firestore()
      .collection("polls")
      .doc(`${this.$route.params.id}`)
      .collection("options")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.data());
          this.options.push(doc.data());
        });
      });
  }
};
</script>

<style scoped>
.bar {
  height: 20px;
  background-color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
}
</style>
