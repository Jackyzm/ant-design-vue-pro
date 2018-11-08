<template>
    <div class="Register">
        <h3>注册</h3>
        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" :options="{onValuesChange}">
            <a-form-item
                fieldDecoratorId="mail"
                :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: true,
                            message: '请输入邮箱地址！',
                        },
                        {
                            type: 'email',
                            message: '邮箱地址格式错误！',
                        },
                    ],
                }"
            >
                <a-input size="large" placeholder="邮箱" />
            </a-form-item>
            <a-popover :overlayStyle="{ width: 240 }" placement="right" :visible="visible">
                <template slot="content">
                    <div style="padding: 4px 0;">
                        <div v-if="passwordStatus == 'ok'" class="success">强度：强</div>
                        <div v-if="passwordStatus == 'pass'" class="warning">强度：中</div>
                        <div v-if="passwordStatus == 'poor'" class="error">强度：太短</div>
                        <div :class="`progress-${passwordStatus}`" v-if="passwordValue && passwordValue.length">
                            <Progress
                                v-if="passwordProgressMap[passwordStatus]"
                                :status="passwordProgressMap[passwordStatus]"
                                class="progress"
                                :strokeWidth="6"
                                :percent="passwordValue.length * 10 > 100 ? 100 : passwordValue.length * 10"
                                :showInfo="false"
                            />
                            <Progress
                                v-else
                                class="progress"
                                :strokeWidth="6"
                                :percent="passwordValue.length * 10 > 100 ? 100 : passwordValue.length * 10"
                                :showInfo="false"
                            />
                        </div>
                        <div style="margin-top: 10px;">
                            请至少输入 6 个字符。请不要使用容易被猜到的密码。
                        </div>
                    </div>
                </template>
                <a-form-item
                    :help="help"
                    fieldDecoratorId="password"
                    :fieldDecoratorOptions="{
                        rules: [
                            {
                                validator: checkPassword,
                            },
                        ],
                    }"
                >
                    <a-input size="large" type="password" placeholder="至少6位密码，区分大小写" />
                </a-form-item>
            </a-popover>
            <a-form-item
                fieldDecoratorId="confirm"
                :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: true,
                            message: '请确认密码！',
                        },
                        {
                            validator: checkConfirm,
                        },
                    ],
                }"
            >
                <a-input size="large" type="password" placeholder="确认密码" />
            </a-form-item>
            <InputGroup compact>
                <a-select
                    size="large"
                    :value="prefix"
                    @change="changePrefix"
                    style="width: 20%;"
                >
                    <a-select-option value="86">+86</a-select-option>
                    <a-select-option value="87">+87</a-select-option>
                </a-select>
                <a-form-item
                    style="width: 80%;"
                    fieldDecoratorId="mobile"
                    :fieldDecoratorOptions="{
                        rules: [
                        {
                            required: true,
                            message: '请输入手机号！',
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: '手机号格式错误！',
                        },
                        ],
                    }"
                >
                    <a-input size="large" placeholder="11位手机号" />
                </a-form-item>
            </InputGroup>
            <a-row :gutter="8">
                <a-col :span="16">
                    <a-form-item
                        fieldDecoratorId="captcha"
                        :fieldDecoratorOptions="{
                        rules: [
                            {
                            required: true,
                            message: '请输入验证码！',
                            },
                        ],
                        }"
                    >
                        <a-input size="large" placeholder="验证码" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-button
                        size="large"
                        :disabled="!!count"
                        class="getCaptcha"
                        @click="onGetCaptcha"
                    >
                        {{ count ? `${count} s` : '获取验证码' }}
                    </a-button>
                </a-col>
            </a-row>
            <a-form-item>
                <a-button
                    size="large"
                    :loading="submitting"
                    class="submit"
                    type="primary"
                    htmlType="submit"
                >
                    注册
                </a-button>
                <router-link class="login" to="/user/login">
                    使用已有账户登录
                </router-link>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { Input, Progress } from "ant-design-vue";
export default {
  name: "Register",
  components: {
    InputGroup: Input.Group,
    Progress // eslint-disable-line
  },
  computed: {},
  watch: {
    // eslint-disable-next-line
    passwordValue(val, oldVal) {
      if (val && val.length > 9) {
        return (this.passwordStatus = "ok");
      }
      if (val && val.length > 5) {
        return (this.passwordStatus = "pass");
      }
      this.passwordStatus = "poor";
    }
  },
  data() {
    const passwordProgressMap = {
      ok: "success",
      pass: "",
      poor: "exception"
    };
    return {
      count: 0,
      confirmDirty: false,
      visible: false,
      help: "",
      prefix: "86",
      passwordProgressMap,
      submitting: false,
      passwordValue: "",
      passwordStatus: ""
    };
  },
  methods: {
    onValuesChange(props, values) {
      if (values.password) {
        this.passwordValue = values.password;
      }
      console.log(props, values);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.$router.push({
            path: "/user/register-result",
            query: {
              mail: values.mail
            }
          });
        }
      });
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
    },
    checkPassword(rule, value, callback) {
      if (!value) {
        this.help = "请输入密码！";
        this.visible = !!value;
        callback("error");
      } else {
        this.help = "";
        if (!this.visible) {
          this.visible = !!value;
        }
        if (value.length < 6) {
          callback("error");
        } else {
          if (value && this.confirmDirty) {
            this.form.validateFields(["confirm"], { force: true });
          }
          callback();
        }
      }
    },
    checkConfirm(rule, value, callback) {
      if (value && value !== this.form.getFieldValue("password")) {
        callback("两次输入的密码不匹配!");
      } else {
        callback();
      }
    },
    changePrefix(value) {
      this.prefix = value;
    }
  }
};
</script>

<style lang="less">
@import "./Register.less";
</style>

