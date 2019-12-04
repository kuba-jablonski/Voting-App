import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Polls from "./views/Polls";
import PollsUser from "./views/PollsUser";
import Poll from "./views/Poll";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/polls",
      name: "polls",
      component: Polls
    },
    {
      path: "/polls/me",
      name: "myPolls",
      component: PollsUser
    },
    {
      path: "/poll/:id",
      name: "poll",
      component: Poll
    }
  ]
});
