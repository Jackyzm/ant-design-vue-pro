import { getCharts } from '@/utils/api';

const analysis = {
    namespaced: true,
    state: {
        chartData: {},
        loading: true,
    },
    mutations: {
        SET_CHART_DATA: (state, chartData) => {
            state.chartData = chartData;
        },
        CLEAR_CHART_DATA: (state) => {
            state.chartData = {};
        },
        CHANGE_LOADING: (state, loading) => {
            state.loading = loading;
        },
    },
    actions: {
        getChartData({ commit }) {
            commit('CHANGE_LOADING', true);
            getCharts().then((res)=>{
                if (res) {
                    commit('SET_CHART_DATA', res);
                    commit('CHANGE_LOADING', false);
                }
            })
        },
        clearChartData({ commit }) {
            commit('CLEAR_CHART_DATA');
        }
    }
}

export default analysis;

