<template>
  <v-container>
    <v-list>
      <v-subheader>REPORTS</v-subheader>

      <v-list-item :to="`/poll/${item.id}`" v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-chip>{{ item.votes }}</v-chip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.question }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text
            >by {{ item.author }} |
            {{
              convertTimestamp(item.createdAt.seconds)
            }}</v-list-item-action-text
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <vote-dialog
      :open="voteDialog"
      @close="voteDialog = false"
      :poll="items[activeIndex]"
    />
  </v-container>
</template>

<script>
import firebase from "firebase";
import VoteDialog from "@/components/VoteDialog";

export default {
  components: {
    VoteDialog
  },
  data: () => ({
    items: [],
    activeIndex: null,
    voteDialog: false
  }),
  methods: {
    convertTimestamp(s) {
      const d = new Date(s * 1000);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();

      return `${year}/${month}/${day}`;
    }
  },
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
