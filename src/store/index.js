import Vue from "vue";
import Vuex from "vuex";
import analysis from "./models/dashboard/analysis";
import monitor from "./models/dashboard/monitor";
import workplace from "./models/dashboard/workplace";
import tableList from "./models/list/tableList";
import fakeList from "./models/list/fakeList";
import basicProfile from "./models/profile/basicProfile";
import advancedProfile from "./models/profile/advancedProfile";
import header from "./models/header";
import error from "./models/error";
// import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        header,
        analysis,
        monitor,
        workplace,
        tableList,
        fakeList,
        basicProfile,
        advancedProfile,
        error
    }
    //   getters
});

export default store;
