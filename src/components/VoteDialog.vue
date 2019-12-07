<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-card v-if="poll">
      <v-container>
        <div class="d-flex flex-column">
          <h2 class="mb-5">
            {{
              isAuthed ? "Vote to view poll results" : "Please login to vote"
            }}
          </h2>
          <p class="font-weight-light title primary--text">Question</p>
          <div class="px-4">
            <span class="font-weight-bold">{{ poll.question }}</span>
            <div class="d-flex align-center">
              <span class="mr-3">{{
                isAuthed ? "I'd like to vote for:" : "Login to vote for:"
              }}</span>

              <v-select
                :style="{ maxWidth: '300px' }"
                v-model="selected"
                :items="optionStrings"
                label="Choose option"
                required
              ></v-select>
            </div>
            <div class="d-flex">
              <v-btn depressed @click="$emit('close')">Back to list</v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                depressed
                :loading="loading"
                @click="submitVote"
                >{{
                  isAuthed ? "Vote and see results" : "See poll results"
                }}</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { db, auth } from "@/main";
import { mapGetters } from "vuex";

export default {
  props: ["open", "poll"],
  data() {
    return {
      author: null,
      question: null,
      voters: null,
      options: [],
      selected: "",
      loadingOptions: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["isAuthed"]),
    optionStrings() {
      return this.options.map(o => o.option);
    }
  },
  methods: {
    async submitVote() {
      if (!this.isAuthed || this.selected === "") {
        return this.$router.push(`/poll/${this.poll.id}`);
      }
      this.loading = true;
      try {
        const selectedId = this.options.find(o => o.option === this.selected)
          .id;
        const pollRef = db()
          .collection("polls")
          .doc(this.poll.id);
        const optionRef = db()
          .collection("polls")
          .doc(this.poll.id)
          .collection("options")
          .doc(selectedId);
        const batch = db().batch();

        batch.update(pollRef, {
          votes: db.FieldValue.increment(1),
          voters: db.FieldValue.arrayUnion(auth().currentUser.uid)
        });
        batch.update(optionRef, {
          count: db.FieldValue.increment(1)
        });
        await batch.commit();
        this.loading = false;
        this.$router.push(`/poll/${this.poll.id}`);
      } catch (e) {
        this.loading = false;
      }
    },
    async fetchOptions(id) {
      this.options = [];
      const snap = await db()
        .collection("polls")
        .doc(id)
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
    poll(val) {
      this.fetchOptions(val.id);
    }
  }
};
</script>

<style></style>
