<template>
  <v-container :style="{ maxWidth: '800px' }">
    <div class="mt-9" v-if="poll">
      <h1 class="mb-5 display-1">{{ poll.question }}</h1>
      <div class="body-2">Created by {{ poll.author.username }}</div>
      <div class="body-2">Total votes: {{ poll.votes }}</div>
      <v-btn to="/polls" depressed class="my-5 ">
        <v-icon left dark>mdi-chevron-left</v-icon>Back to list
      </v-btn>
      <div>
        <div class="option" v-for="option in options" :key="option.option">
          <span>{{ option.option }}</span>
          <div class="bar white--text" ref="bars">
            {{ option.count }}
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { db } from "@/main";

export default {
  data() {
    return {
      poll: null,
      options: []
    };
  },
  computed: {
    highestCount() {
      return Math.max(...this.options.map(o => o.count));
    }
  },
  methods: {
    animate(ref, count) {
      if (this.highestCount === 0) return;
      const targetWidth = (count / this.highestCount) * 100;
      if (targetWidth < 1) return;
      let width = 0;
      let id = setInterval(() => {
        if (width >= targetWidth) {
          clearInterval(id);
        } else {
          width++;
          ref.style.width = width + "%";
        }
      }, 5);
    },
    async fetchPoll() {
      const doc = await db()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .get();
      this.poll = doc.data();
    },
    async fetchOptions() {
      this.options = [];
      const snap = await db()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .collection("options")
        .get();
      snap.forEach(doc => {
        this.options.push({
          id: doc.id,
          ...doc.data()
        });
      });
    }
  },
  watch: {
    async $route() {
      await Promise.all([this.fetchPoll(), this.fetchOptions()]);
      this.options.forEach((o, i) => {
        this.animate(this.$refs.bars[i], o.count);
      });
    }
  },
  async mounted() {
    await Promise.all([this.fetchPoll(), this.fetchOptions()]);
    this.options.forEach((o, i) => {
      this.animate(this.$refs.bars[i], o.count);
    });
  }
};
</script>

<style scoped>
.bar {
  height: 20px;
  width: 20px;
  background-color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
