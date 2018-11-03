import Vue from 'vue';
import Vuex from 'vuex';
import analysis from './models/analysis';
import monitor from './models/monitor';
import workplace from './models/workplace';
import header from './models/header';
import error from './models/error';
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        header,
        analysis,
        monitor,
        workplace,
        error
    },
    //   getters
})

export default store;
