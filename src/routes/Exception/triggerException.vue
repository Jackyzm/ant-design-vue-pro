<template>
    <a-card>
        <a-spin :spinning="isloading" wrapperClassName="trigger">
            <a-button type="danger" @click="triggerError(401)">
                触发401
            </a-button>
            <a-button type="danger" @click="triggerError(403)">
                触发403
            </a-button>
            <a-button type="danger" @click="triggerError(500)">
                触发500
            </a-button>
            <a-button type="danger" @click="triggerError(404)">
                触发404
            </a-button>
        </a-spin>
    </a-card>
</template>

<script>
export default {
    name: "TriggerException",
    data() {
        return {
            isloading: false
        }
    },
    methods: {
        triggerError(code) {
            this.isloading = true;
            this.$store.dispatch("error/setError", { code });
        },
    }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

