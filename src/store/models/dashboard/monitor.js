import { getTags } from '@/utils/api';

const monitor = {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        SET_DATA: (state, data) => {
            state.data = data;
        },
    },
    actions: {
        getTagsData({ commit }) {
            getTags().then((res)=>{
                if (res) {
                    commit('SET_DATA', res.list);
                }
            })
        },
    }
}

export default monitor;

