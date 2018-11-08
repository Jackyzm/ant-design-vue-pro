<template>
    <Result
        class="registerResult"
        type="success"
        description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
        style="margin-top: 56px;"
    >
        <template slot="title">
            <div class="title">
            你的账户：{{ mail ? mail : 'AntDesign@example.com' }} 注册成功
        </div>
        </template>
        <template slot="actions">
            <div class="actions">
                <a href="javascript:;">
                    <a-button size="large" type="primary">
                        查看邮箱
                    </a-button>
                </a>
                <router-link to="/">
                    <a-button size="large">返回首页</a-button>
                </router-link>
            </div>
        </template>
    </Result>
</template>

<script>
import Result from "@/components/Result";
export default {
  name: "RegisterResult",
  components: {
    Result
  },
  created() {
    this.mail = this.$route.query.mail;
  },
  data() {
    return {
      mail: ""
    };
  }
};
</script>

<style lang="less" scoped>
@import "./RegisterResult.less";
</style>

