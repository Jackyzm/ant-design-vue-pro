// import { getBasicProfile } from "@/utils/api";

const login = {
    namespaced: true,
    state: {
        login: {},
        loading: false
    },
    mutations: {
        CHANGE_LOGIN: (state, res) => {
            state.login = res;
        },
        CLEAR_LOGIN: state => {
            state.login = {};
        },
        CHANGE_LOADING: (state, loading) => {
            state.loading = loading;
        }
    },
    actions: {
        login({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            setTimeout(() => {
                if (params.type == "account") {
                    if (
                        (params.userName == "admin" &&
                            params.password == "888888") ||
                        (params.userName == "user" &&
                            params.password == "123456")
                    ) {
                        commit("CHANGE_LOGIN", {
                            type: "account",
                            status: "ok"
                        });
                        params.callback();
                    } else {
                        commit("CHANGE_LOGIN", {
                            type: "account",
                            status: "error"
                        });
                    }
                } else {
                    commit("CHANGE_LOGIN", {
                        type: "mobile",
                        status: "error"
                    });
                }
                commit("CHANGE_LOADING", false);
            }, 800);
        },
        clearLogin({ commit }) {
            commit("CHANGE_LOGIN");
        }
    }
};

export default login;
