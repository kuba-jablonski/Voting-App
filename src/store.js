import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null
  },
  mutations: {
    SET_UID: (state, payload) => {
      state.uid = payload;
    }
  },
  actions: {},
  getters: {
    isAuthed: state => state.uid !== null,
    uid: state => state.uid
  }
});
