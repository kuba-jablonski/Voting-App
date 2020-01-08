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
          :class="{ 'mt-n7': $vuetify.breakpoint.xs }"
          outlined
          label="Sort by"
          v-model="sortType"
          :items="sortOptions"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-slide-y-reverse-transition>
      <v-list class="mt-n4" two-line elevation="1" v-if="itemsLoaded">
        <v-subheader>POLL LIST</v-subheader>
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-chip color="primary">{{ item.votes }}</v-chip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.question }}</v-list-item-title>
            <v-list-item-subtitle
              >by {{ item.author.username }} |
              {{ item.createdAt.seconds | convertTimestamp }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-slide-y-reverse-transition>

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
    itemsLoaded: false,
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
      const poll = this.filteredItems[i];
      const uid = auth().currentUser && auth().currentUser.uid;
      const skipVoting = poll.author.id === uid || poll.voters.includes(uid);
      if (skipVoting) {
        return this.$router.push(`/poll/${poll.id}`);
      }

      this.activeIndex = i;
      this.voteDialog = true;
    },
    async fetchPolls() {
      let ref;
      if (this.$route.name === "myPolls") {
        ref = db()
          .collection("polls")
          .where("author.id", "==", this.$store.state.uid);
      } else {
        ref = db().collection("polls");
      }
      try {
        const snap = await ref.get();
        snap.forEach(doc => {
          this.items.push({
            id: doc.id,
            ...doc.data()
          });
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.itemsLoaded = true;
      }
    }
  },
  watch: {
    $route() {
      this.items = [];
      this.itemsLoaded = false;
      this.fetchPolls();
    }
  },
  filters: {
    convertTimestamp(s) {
      if (!s) return;

      const d = new Date(s * 1000);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();

      return `${year}/${month}/${day}`;
    }
  },
  mounted() {
    this.fetchPolls();
  }
};
</script>

<style></style>
