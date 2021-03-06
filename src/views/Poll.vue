<template>
  <v-container :style="{ maxWidth: '800px' }">
    <div v-if="poll">
      <h1 class="mb-3 headline">{{ poll.question }}</h1>
      <div class="subtitle-1 font-italic">
        Created by {{ poll.author.username }}
      </div>
      <div class="subtitle-1 font-italic">Total votes: {{ poll.votes }}</div>
      <v-btn to="/polls" depressed class="my-7 mr-2">
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
          <v-btn
            :loading="deleteInProgress"
            color="green darken-1"
            text
            @click="remove"
          >
            Yes
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="5000" color="red">
      {{ error }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
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
      dialog: false,
      snackbar: false,
      error: "",
      deleteInProgress: false
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
      if (count === 0) {
        return (ref.style.width = "20px");
      }
      const targetWidth = (count / this.highestCount) * 100;
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
      this.deleteInProgress = true;
      this.listeners.forEach(cb => cb());
      try {
        const batch = db().batch();
        batch.delete(
          db()
            .collection("polls")
            .doc(this.$route.params.id)
        );
        this.options.forEach(o => {
          batch.delete(
            db()
              .collection("polls")
              .doc(this.$route.params.id)
              .collection("options")
              .doc(o.id)
          );
        });
        await batch.commit();
        this.$router.push("/polls");
      } catch (e) {
        this.error = e.message ? e.message : "Something went wrong";
        this.snackbar = true;
      } finally {
        this.deleteInProgress = false;
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
  height: 23px;
  min-width: 20px;
  width: 20px;
  background-color: #ed4545;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
