<template>
    <div class="main">
        <div class="login">
            <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                <a-tabs
                    :animated="false"
                    class="tabs"
                    :activeKey="type"
                    @change="onTabChange"
                >
                    <a-tab-pane key="account" tab="账户密码登录">
                        <Alert
                            v-if="login.status === 'error' && login.type === 'account' && !submitting"
                            style="margin-bottom: 24px;"
                            message="账户或密码错误（admin/888888）"
                            type="error"
                            showIcon
                        />
                        <a-form-item
                            fieldDecoratorId="userName"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名！',
                                    },
                                ],
                            }"
                        >
                            <a-input size="large" name="userName" placeholder="admin/user">
                                <template slot="prefix">
                                    <a-icon type="user" class="prefixIcon" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            fieldDecoratorId="password"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ],
                            }"
                        >
                            <a-input type="password" size="large" name="password" placeholder="888888/123456">
                                <template slot="prefix">
                                    <a-icon type="lock" class="prefixIcon" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane key="mobile" tab="手机号登录">
                        <Alert
                            v-if="login.status === 'error' && login.type === 'mobile' && !submitting"
                            style="margin-bottom: 24px;"
                            message="验证码错误"
                            type="error"
                            showIcon
                        />
                        <a-form-item
                            fieldDecoratorId="mobile"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter mobile number!',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: 'Wrong mobile number format!',
                                    },
                                ],
                            }"
                        >
                            <a-input size="large" name="mobile" placeholder="mobile number">
                                <template slot="prefix">
                                    <a-icon type="mobile" class="prefixIcon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-row :gutter="8">
                            <a-col :span="16">
                                <a-form-item
                                    fieldDecoratorId="captcha"
                                    :fieldDecoratorOptions="{
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter Captcha!',
                                            },
                                        ],
                                    }"
                                >
                                    <a-input size="large" name="captcha" placeholder="captcha">
                                        <template slot="prefix">
                                            <a-icon type="mail" class="prefixIcon" />
                                        </template>
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-button
                                    :disabled="!!count"
                                    class="getCaptcha"
                                    size="large"
                                    @click="onGetCaptcha"
                                >
                                    {{ count ? `${count} s` : '获取验证码' }}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>
                <div>
                    <Checkbox :checked="autoLogin" @change="changeAutoLogin">
                        自动登录
                    </Checkbox>
                    <a style="float: right" href="javascript:;">
                        忘记密码
                    </a>
                </div>
                <a-form-item>
                    <a-button size="large" class="submit" type="primary" htmlType="submit" :loading="submitting">登录</a-button>
                </a-form-item>
                <div class="other">
                    其他登录方式
                    <a-icon class="icon" type="alipay-circle" />
                    <a-icon class="icon" type="taobao-circle" />
                    <a-icon class="icon" type="weibo-circle" />
                    <router-link class="register" to="/user/register">
                        注册账户
                    </router-link>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script>
import { Checkbox, Alert } from "ant-design-vue";
export default {
  name: "Login",
  components: {
    Checkbox,
    Alert
  },
  computed: {
    submitting() {
      return this.$store.state.login.loading;
    },
    login() {
      return this.$store.state.login.login || {};
    },
    activeFileds() {
      if (this.type == "account") {
        return ["userName", "password"];
      } else {
        return ["mobile", "captcha"];
      }
    }
  },
  mounted() {
    console.log(this);
  },
  destroyed() {
    this.$store.dispatch("login/clearLogin");
  },
  data() {
    return {
      type: "account",
      autoLogin: true,
      count: 0
    };
  },
  methods: {
    changeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    onTabChange(type) {
      this.type = type;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(
        this.activeFileds,
        { force: true },
        (err, values) => {
          if (!err) {
            this.$store.dispatch("login/login", {
              params: {
                ...values,
                type: this.type,
                callback: () => {
                  this.$router.push("/");
                }
              }
            });
          }
        }
      );
    },
    onGetCaptcha() {
      let count = 59;
      this.count = count;
      this.interval = setInterval(() => {
        count -= 1;
        this.count = count;
        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
@import "./Login.less";
</style>

