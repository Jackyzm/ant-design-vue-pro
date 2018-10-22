import qs from 'qs';
import request from './request';

export async function getHeaderNotices() {
    return await request('/api/notices', {});
}

export async function getCharts() {
    return await request('/api/charts', {});
}

export async function getUserCurrent() {
    return await request('/api/userCurrent', {});
}

export async function getTags() {
    return await request('/api/tags', {});
}

export async function getNotice() {
    return await request('/api/project/notice', {});
}

export async function getActivities() {
    return await request('/api/activities', {});
}

export async function basicFormSubmit(params) {
    return await request('/api/form-basic', {
        method: 'POST',
        body: params,
    });
}

export async function getTableList(params) {
    return await request(`/api/table-list?${qs.stringify(params)}`, {});
}

export async function addTableList(params) {
    return await request('/api/table-list-put', {
        method: 'PUT',
        body: params,
    });
}

export async function deleteTableList(params) {
    return await request('/api/table-list-delete', {
        method: 'POST',
        body: params,
    });
}

export async function getFakeList(params) {
    return await request(`/api/fake-list?${qs.stringify(params)}`, {});
}

export async function getBasicProfile() {
    return await request('/api/profile/basic', {});
}

export async function getAdvancedProfile() {
    return await request('/api/profile/advanced', {});
}

export async function query(code) {
    return await request(`/api/${code}`, {});
}
