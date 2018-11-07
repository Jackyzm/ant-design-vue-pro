import { getFakeList } from "@/utils/api";

const analysis = {
    namespaced: true,
    state: {
        list: {},
        loading: true
    },
    mutations: {
        SET_LIST: (state, res) => {
            state.list = res;
        },
        CLEAR_LIST: state => {
            state.list = {};
        },
        CHANGE_LOADING: (state, loading) => {
            state.loading = loading;
        },
        SET_MORE_LIST: (state, res) => {
            state.list = state.list.concat(res);
        }
    },
    actions: {
        getList({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            getFakeList(params).then(res => {
                if (res) {
                    commit("SET_LIST", res);
                    commit("CHANGE_LOADING", false);
                }
            });
        },
        clearList({ commit }) {
            commit("CLEAR_LIST");
            commit("CHANGE_LOADING", false);
        },
        getMoreList({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            getFakeList(params).then(res => {
                if (res) {
                    commit("SET_MORE_LIST", res);
                    commit("CHANGE_LOADING", false);
                }
            });
        }
    }
};

export default analysis;
