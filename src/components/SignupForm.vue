<template>
  <form>
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" label="Password" required></v-text-field>
    <v-btn @click="submit">submit</v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      console.log(this.email, this.password);
    }
  }
};
</script>
