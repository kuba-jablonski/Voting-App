<template>
  <div class="bg">
    <v-container>
      <h1 class="mt-10 mb-5 display-2 font-weight-bold font-italic white--text">
        Poll simple. <br />
        Poll everywhere.
      </h1>
      <p class="mb-5 subtitle font-weight-light white--text">
        Ask a question, then watch
        <span class="font-weight-bold">LIVE</span> result.<br />
        Create public and private polls, free, unlimited, always.
      </p>
      <v-btn depressed color="white" class="mr-3" @click="$emit('openSignin')"
        >Get Started</v-btn
      >
      <v-btn to="/polls" depressed color="white">View poll list</v-btn>
      <vote-img class="img" />
    </v-container>
  </div>
</template>

<script>
import VoteImg from "@/components/icons/SvgVote";
export default {
  components: {
    VoteImg
  }
};
</script>

<style>
.img {
  height: 500px;
  width: 500px;
  position: absolute;
  top: 0;
  right: 100px;
}

.bg {
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(237, 69, 69, 1) 27%,
    rgba(250, 250, 250, 1) 75%
  );
}

.subtitle {
  border-left: 2px solid white;
  padding-left: 10px;
}

@media (max-width: 1100px) {
  .img {
    height: 400px;
    width: 400px;
  }
}
@media (max-width: 959px) {
  .img {
    display: none;
  }
  .bg {
    background: rgba(237, 69, 69, 1);
  }
}
</style>
