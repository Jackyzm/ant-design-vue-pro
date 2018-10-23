import { getCharts } from '@/utils/api';

const analysis = {
    namespaced: true,
    state: {
        chartData: {},
    },
    mutations: {
        SET_CHART_DATA: (state, chartData) => {
            state.chartData = chartData;
        },
        CLEAR_CHART_DATA: (state) => {
            state.chartData = {};
        },
    },
    actions: {
        getChartData({ commit }) {
            getCharts().then((res)=>{
                if (res) {
                    commit('SET_CHART_DATA', res);
                }
            })
        },
        clearChartData({ commit }) {
            commit('CLEAR_CHART_DATA');
        }
    }
}

export default analysis;

