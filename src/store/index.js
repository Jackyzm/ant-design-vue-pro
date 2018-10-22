import Vue from 'vue';
import Vuex from 'vuex';
// import user from './models/user';
import header from './models/header';
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        header
        // user
    },
    //   getters
})

export default store;
