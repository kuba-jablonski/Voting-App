<template>
  <v-container>
    <v-list>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="item">
        <v-list-item
          :to="`/poll/${item.id}`"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-chip>{{ item.votes }}</v-chip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.question }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
              >by bob | 2019/09/09</v-list-item-action-text
            >
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    item: 1,
    items: []
  }),
  mounted() {
    firebase
      .firestore()
      .collection("polls")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          this.items.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>

<style></style>
