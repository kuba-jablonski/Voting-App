<template>
  <v-container :style="{ maxWidth: '800px' }">
    <div class="mt-9" v-if="poll">
      <h1 class="mb-5 display-1">{{ poll.question }}</h1>
      <div class="body-2">Created by {{ poll.author.username }}</div>
      <div class="body-2">Total votes: {{ poll.votes }}</div>
      <v-btn to="/polls" depressed class="my-5 mr-2">
        <v-icon left dark>mdi-chevron-left</v-icon>Back to list
      </v-btn>
      <v-btn
        v-if="isAuthed && isAuthor"
        @click="dialog = true"
        outlined
        color="primary"
        class="my-5 "
      >
        <v-icon left dark>mdi-delete</v-icon>Delete this poll
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
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this poll?</v-card-title
        >
        <v-card-text>
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="remove">
            Yes
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import gsap from "gsap";
import { mapGetters } from "vuex";
import { db } from "@/main";

export default {
  data() {
    return {
      poll: null,
      options: [],
      listeners: [],
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["isAuthed", "uid"]),
    isAuthor() {
      return this.uid === this.poll.author.id;
    },
    highestCount() {
      return Math.max(...this.options.map(o => o.count));
    }
  },
  methods: {
    animate(ref, count) {
      if (this.highestCount === 0) return;
      const targetWidth = (count / this.highestCount) * 100;
      if (targetWidth < 1) return;
      gsap.to(ref, { width: targetWidth + "%" });
    },
    fetchPoll() {
      return db()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .onSnapshot(doc => {
          this.poll = {
            id: doc.id,
            ...doc.data()
          };
        });
    },
    fetchOptions() {
      return db()
        .collection("polls")
        .doc(`${this.$route.params.id}`)
        .collection("options")
        .onSnapshot(snap => {
          this.options = [];
          snap.forEach(doc => {
            this.options.push({
              id: doc.id,
              ...doc.data()
            });
          });
        });
    },
    async remove() {
      if (!this.isAuthed || !this.isAuthor) return;
      this.listeners.forEach(cb => cb());
      try {
        await db()
          .collection("polls")
          .doc(this.$route.params.id)
          .delete();
        const batch = db().batch();
        this.options.forEach(o => {
          batch.delete(
            db()
              .collection("polls")
              .doc(this.$route.params.id)
              .collection(`options`)
              .doc(o.id)
          );
        });
        await batch.commit();
        this.$router.push("/polls");
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    options() {
      this.$nextTick(() => {
        this.options.forEach((o, i) => {
          this.animate(this.$refs.bars[i], o.count);
        });
      });
    },
    $route() {
      this.listeners.forEach(cb => cb());
      this.listeners.push(this.fetchPoll(), this.fetchOptions());
    }
  },
  mounted() {
    this.listeners.push(this.fetchPoll(), this.fetchOptions());
  },
  beforeDestroy() {
    this.listeners.forEach(cb => cb());
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
