import Vue from 'vue';
import Router from 'vue-router';
import BasicLayout from '@/components/layouts/BasicLayout';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: ()=> import('@/routes/Dashboard/Analysis'),
        },
        {
            path: '/',
            component: BasicLayout,
            redirect: '/dashboard/analysis',
            children: [
                {
                    path: '/dashboard/analysis',
                    component: ()=> import('@/routes/Dashboard/Analysis'),
                },
                {
                    path: '/aaa',
                    component: ()=> import('@/routes/Dashboard/Analysis'),
                }
            ]
        },
        {
            path: '*',
            redirect: '/',
        }
    ]
})
