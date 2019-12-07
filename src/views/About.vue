<template>
  <v-container>
    <!-- <h1 class="display-1 mb-5">About PollTime</h1> -->
    <div class="content">
      <h2 class="title primary--text">Project Purpose</h2>
      <p>
        This is a freeCodeCamp full-stack project, following the instruction of
        "dsagsadfhlsdaasdhlf"
      </p>
      <p>The project fullfills the following user stories:</p>
      <ul>
        <li>sadfsddsfsd</li>
        <li>sadfsddsfsd</li>
        <li>sadfsddsfsd</li>
        <li>sadfsddsfsd</li>
      </ul>
      <h2 class="title primary--text mt-5">Tech Stack</h2>
      <div class="d-flex ">
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase mr-5 "
        >
          <svg-vue class="svg" />Vue.js
        </div>
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase mr-5"
        >
          <svg-vuetify class="svg" />Vuetify
        </div>
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase"
        >
          <svg-firebase class="svg" />Firebase
        </div>
      </div>
      <h2 class="title primary--text mt-5">Author</h2>
      <p>
        Created by Jakub Jabłoński, a web developer based in Zielona Góra,
        Poland
      </p>
      <p class="d-flex align-center">
        <span class="mr-3">Get in touch with me:</span>
        <v-btn
          href="https://github.com/kuba-jablonski"
          target="_blank"
          text
          icon
          large
        >
          <v-icon large>$vuetify.icons.github</v-icon></v-btn
        >
        <v-btn
          href="https://www.linkedin.com/in/jakub-jab%C5%82o%C5%84ski-47a990138"
          target="_blank"
          text
          icon
          large
        >
          <v-icon large>$vuetify.icons.linkedin</v-icon></v-btn
        >
      </p>
      <p>
        View my portfolio at:
        <a
          class="font-weight-bold"
          href="https://jakub-jablonski.netlify.com/"
          target="_blank"
          >jakub-jablonski.netlify.com</a
        >
      </p>
    </div>

    <svg-info class="img" />
  </v-container>
</template>

<script>
import SvgVue from "@/components/icons/SvgVue";
import SvgVuetify from "@/components/icons/SvgVuetify";
import SvgFirebase from "@/components/icons/SvgFirebase";
import SvgInfo from "@/components/icons/SvgInfo";

export default {
  components: {
    SvgVue,
    SvgVuetify,
    SvgFirebase,
    SvgInfo
  }
};
</script>

<style scoped>
.svg {
  height: 50px;
  width: 50px;
}

.img {
  height: 500px;
  width: 500px;
  position: absolute;
  top: 0;
  right: 100px;
}

.content {
  position: relative;
  z-index: 1;
}
</style>
