import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import IconGithub from "@/components/icons/IconGithub.vue";
import IconLinkedin from "@/components/icons/IconLinkedin.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: {
      github: {
        component: IconGithub
      },
      linkedin: {
        component: IconLinkedin
      }
    }
  },
  theme: {
    themes: {
      light: {
        primary: "#ED4545",
        anchor: "#5D5D5D"
      }
    }
  }
});
