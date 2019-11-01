<template>
  <v-dialog :value="open" @input="$emit('close')" max-width="600px">
    <v-card>
      <v-container>
        <h2>New Poll</h2>
        <v-form v-model="valid">
          <v-container>
            <v-text-field
              v-model="question"
              label="Question"
              required
            ></v-text-field>
            <template v-for="(option, i) in options">
              <v-text-field
                :key="option"
                :value="option"
                @input="handleInput(i, $event)"
              >
                <v-icon slot="append" @click="removeOptionField(i)"
                  >mdi-delete</v-icon
                >
                <v-icon slot="prepend" color="primary">mdi-adjust</v-icon>
              </v-text-field>
            </template>
            <v-row class="d-flex justify-end mb-4">
              <v-btn text color="primary" @click="addOptionField"
                >Add more options</v-btn
              >
            </v-row>
            <v-row>
              <v-btn
                depressed
                color="primary"
                class="mr-2"
                @click="addOptionField"
                >Submit</v-btn
              >
              <v-btn depressed @click="$emit('close')">Cancel</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      question: "",
      options: ["1", "2"]
    };
  },
  methods: {
    handleInput(i, event) {
      this.options[i] = event;
    },
    addOptionField() {
      this.options.push("");
    },
    removeOptionField(i) {
      this.options.splice(i, 1);
    }
  }
};
</script>

<style></style>
