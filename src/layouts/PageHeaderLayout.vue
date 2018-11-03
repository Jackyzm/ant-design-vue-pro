<template>
    <div style="margin: -24px -24px 0;" :class="wrapperClassName">
        <slot name="top" />
        <PageHeader key="pageheader" :routerLocation="$route">
            <template slot="extraContent">
                <slot name="extraContent" />
            </template>
            <template slot="content">
                <slot name="content" />
            </template>
        </PageHeader>
        <div class="content">
            <!-- <slot name="content" /> -->
            <slot/>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
export default {
    name: "PageHeaderLayout",
    components:{
        PageHeader
    },
    props:{
        wrapperClassName: {
            type:String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
@import './PageHeaderLayout.less';
</style>
