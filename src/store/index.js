import Vue from 'vue';
import Vuex from 'vuex';
import analysis from './models/analysis';
import header from './models/header';
import error from './models/error';
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        header,
        analysis,
        error
    },
    //   getters
})

export default store;
