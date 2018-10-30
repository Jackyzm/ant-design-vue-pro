import { query } from '@/utils/api';

const error = {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        CHANGE_LOADING: (state) => {
            state.loading = !state.loading;
        }
    },
    actions: {
        setError({ commit }, { code }){
            commit('CHANGE_LOADING');
            query(code).then((res)=>{
                if (res) {
                    console.debug(res);
                    commit('CHANGE_LOADING');
                }
            })
        }
    }
}

export default error;

