import { getTableList, addTableList, deleteTableList } from "@/utils/api";

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
        }
    },
    actions: {
        getList({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            getTableList(params).then(res => {
                if (res) {
                    commit("SET_LIST", res);
                    commit("CHANGE_LOADING", false);
                }
            });
        },
        addList({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            addTableList(params).then(res => {
                if (res) {
                    commit("SET_LIST", res);
                    commit("CHANGE_LOADING", false);
                }
            });
        },
        deleteList({ commit }, { params, callback }) {
            commit("CHANGE_LOADING", true);
            deleteTableList(params).then(res => {
                if (res) {
                    commit("SET_LIST", res);
                    commit("CHANGE_LOADING", false);
                    callback();
                }
            });
        },
        clearList({ commit }) {
            commit("CLEAR_LIST");
        }
    }
};

export default analysis;
