<template>
  <v-container :style="{ maxWidth: '800px' }">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          outlined
          label="Search"
          placeholder="Enter keyword here..."
          v-model="keyword"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          outlined
          label="Sort by"
          v-model="sortType"
          :items="sortOptions"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-list>
      <v-subheader>POLL LIST</v-subheader>
      <v-list-item
        v-for="(item, i) in filteredItems"
        :key="i"
        @click="handleClick(i)"
      >
        <v-list-item-icon>
          <v-chip>{{ item.votes }}</v-chip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.question }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text
            >by {{ item.author.username }} |
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
      :poll="filteredItems[activeIndex]"
    />
  </v-container>
</template>

<script>
import { auth, db } from "@/main";
import VoteDialog from "@/components/VoteDialog";

export default {
  components: {
    VoteDialog
  },
  data: () => ({
    items: [],
    activeIndex: null,
    voteDialog: false,
    sortType: "most popular",
    sortOptions: ["most popular", "most recent"],
    keyword: ""
  }),
  computed: {
    sortedItems() {
      const sorted = this.items
        .slice()
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

      return this.sortType === "most popular"
        ? sorted.sort((a, b) => b.votes - a.votes)
        : sorted;
    },
    filteredItems() {
      return this.sortedItems.filter(i =>
        i.question.toLowerCase().includes(this.keyword.trim().toLowerCase())
      );
    }
  },
  methods: {
    handleClick(i) {
      const poll = this.items[i];
      const uid = auth.currentUser && auth.currentUser.uid;
      const skipVoting = poll.author.id === uid || poll.voters.includes(uid);
      if (skipVoting) {
        return this.$router.push(`/poll/${this.items[i].id}`);
      }

      this.activeIndex = i;
      this.voteDialog = true;
    },
    convertTimestamp(s) {
      const d = new Date(s * 1000);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();

      return `${year}/${month}/${day}`;
    }
  },
  async mounted() {
    try {
      const snap = await db()
        .collection("polls")
        .get();
      snap.forEach(doc => {
        this.items.push({
          id: doc.id,
          ...doc.data()
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style></style>
