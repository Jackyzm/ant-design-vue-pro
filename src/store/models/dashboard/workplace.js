import { getNotice, getActivities } from '@/utils/api';

const workplace = {
    namespaced: true,
    state: {
        notice: [],
        activities: [],
    },
    mutations: {
        SET_NOTICE: (state, res) => {
            state.notice = res;
        },
        SET_ACTIVITIES: (state, res) => {
            state.activities = res;
        },

    },
    actions: {
        getNoticeData({ commit }) {
            getNotice().then((res)=>{
                if (res) {
                    commit('SET_NOTICE', res);
                }
            })
        },
        getActivitiesData({ commit }) {
            getActivities().then((res)=>{
                if (res) {
                    commit('SET_ACTIVITIES', res);
                }
            })
        }
    }
}

export default workplace;
