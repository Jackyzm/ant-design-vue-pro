import { getHeaderNotices, getUserCurrent } from '@/utils/api';

const header = {
    namespaced: true,
    state: {
        notices: [],
        fetchNotice: true,
        userCurrent: {},
    },
    mutations: {
        SET_NOTICE: (state, notices) => {
            state.notices = notices;
        },
        TOGGLE_FETCH_NOTICE: (state) => {
            const status = state.fetchNotice;
            state.fetchNotice = !status;
        },
        SET_USER_CURRENT: (state, userCurrent) => {
            state.userCurrent = userCurrent;
        },
        CHANGE_NOTICE: (state, type) =>{
            const newList = state.notices.filter(item => item.type !== type);
            state.notices = newList;
            if ( state.userCurrent && state.userCurrent.notifyCount ) {
                state.userCurrent.notifyCount = newList.length;
            }
        }
    },
    actions: {
        getHeaderNotice({ commit }) {
            getHeaderNotices().then((res)=>{
                if (res) {
                    commit('SET_NOTICE', res);
                }
            });
        },
        changeFetchNotice({ commit }) {
            setTimeout(()=>{
                commit('TOGGLE_FETCH_NOTICE');
            }, 500)
        },
        getUserCurrentData({ commit }) {
            getUserCurrent().then((res)=>{
                if (res) {
                    commit('SET_USER_CURRENT', res);
                }
            });
        },
        clearNotices({ commit }, { type }) {
            commit('CHANGE_NOTICE', type);
        },
    }
}

export default header;

