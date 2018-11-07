<template>
    <PageHeaderLayout>
        <a-card :bordered="false">
            <Result
                type="error"
                title="提交失败"
                description="请核对并修改以下信息后，再重新提交。"
                style="margin-top: 48px; margin-bottom: 16px;"
            >
                <template slot="extra">
                    <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85);font-weight: 500;margin-bottom: 16px;">
                        您提交的内容有如下错误：
                    </div>
                    <div style="margin-bottom: 16px;">
                        <a-icon style="color: #f5222d; margin-right: 8px;" type="close-circle-o" />您的账户已被冻结
                        <a style="margin-left: 16px;">
                            立即解冻 <a-icon type="right" />
                        </a>
                    </div>
                    <div>
                        <a-icon style="color: #f5222d; margin-right: 8px;" type="close-circle-o" />您的账户还不具备申请资格
                        <a style="margin-left: 16px;">
                            立即升级 <a-icon type="right" />
                        </a>
                    </div>
                </template>
                <a-button slot="actions" type="primary">返回修改</a-button>
            </Result>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import Result from "@/components/Result";

export default {
  name: "Error",
  components: {
    PageHeaderLayout,
    Result
  }
};
</script>

<style lang="less" scoped>
</style>

