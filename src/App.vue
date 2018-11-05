<template>
    <div id="app">
        <LocaleProvider :locale="locale">
            <router-view/>
        </LocaleProvider>
    </div>
</template>

<script>
import { LocaleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
    export default {
        name: "App",
        components:{
            LocaleProvider
        },
        data() {
            return {
                locale: zhCN,
            }
        }
    };
</script>

<style>

</style>
