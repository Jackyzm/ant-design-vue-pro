<template>
    <PageHeaderLayout title="基础详情页">
        <a-card :bordered="false">
            <DescriptionList size="large" title="退款申请" descriptionListStyle="margin-bottom: 32px;" :list="list1" />
            <a-divider style="margin-bottom: 32px;" />
            <DescriptionList size="large" title="用户信息" descriptionListStyle="margin-bottom: 32px;" :list="list2" />
            <a-divider style="margin-bottom: 32px;" />
            <div class="title">退货商品</div>
            <a-table
                style="margin-bottom: 24px;"
                :pagination="false"
                :loading="loading"
                :dataSource="goodsData"
                :columns="goodsColumns"
                rowKey="id"
            />
            <div class="title">退货进度</div>
            <a-table
                style="margin-bottom: 16px;"
                :pagination="false"
                :loading="loading"
                :dataSource="basicProgress"
                :columns="progressColumns"
            />
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import DescriptionList from "@/components/DescriptionList";
export default {
  name: "BasicProfile",
  components: {
    PageHeaderLayout,
    DescriptionList
  },
  mounted() {
    this.$store.dispatch("basicProfile/getList");
  },
  destroyed() {
    this.$store.dispatch("basicProfile/clearList");
  },
  computed: {
    basicProgress() {
      return this.$store.state.basicProfile.list.basicProgress || [];
    },
    basicGoods() {
      return this.$store.state.basicProfile.list.basicGoods || [];
    },
    loading() {
      return this.$store.state.basicProfile.loading;
    },
    goodsData() {
      let goodsData = [];
      if (this.basicGoods && this.basicGoods.length) {
        let num = 0;
        let amount = 0;
        this.basicGoods.forEach(item => {
          num += Number(item.num);
          amount += Number(item.amount);
        });
        goodsData = this.basicGoods.concat({
          id: "总计",
          num,
          amount
        });
      }
      return goodsData;
    }
  },
  data() {
    const progressColumns = [
      {
        title: "时间",
        dataIndex: "time",
        key: "time"
      },
      {
        title: "当前进度",
        dataIndex: "rate",
        key: "rate"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: text =>
          text === "success" ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="processing" text="进行中" />
          )
      },
      {
        title: "操作员ID",
        dataIndex: "operator",
        key: "operator"
      },
      {
        title: "耗时",
        dataIndex: "cost",
        key: "cost"
      }
    ];
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      };
      if (index === this.basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: "商品编号",
        dataIndex: "id",
        key: "id",
        customRender: (text, row, index) => {
          if (index < this.basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style="font-weight: 600">总计</span>,
            props: {
              colSpan: 4
            }
          };
        }
      },
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
        customRender: renderContent
      },
      {
        title: "商品条码",
        dataIndex: "barcode",
        key: "barcode",
        customRender: renderContent
      },
      {
        title: "单价",
        dataIndex: "price",
        key: "price",
        align: "right",
        customRender: renderContent
      },
      {
        title: "数量（件）",
        dataIndex: "num",
        key: "num",
        align: "right",
        customRender: (text, row, index) => {
          if (index < this.basicGoods.length) {
            return text;
          }
          return <span style="font-weight: 600">{text}</span>;
        }
      },
      {
        title: "金额",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        customRender: (text, row, index) => {
          if (index < this.basicGoods.length) {
            return text;
          }
          return <span style="font-weight: 600">{text}</span>;
        }
      }
    ];
    const list1 = [
      { term: "取货单号", text: "1000000000" },
      { term: "状态", text: "已取货" },
      { term: "销售单号", text: "1234123421" },
      { term: "子订单", text: "3214321432" }
    ];
    const list2 = [
      { term: "用户姓名", text: "付小小" },
      { term: "联系电话", text: "18100000000" },
      { term: "常用快递", text: "菜鸟仓储" },
      { term: "取货地址", text: "浙江省杭州市西湖区万塘路18号" },
      { term: "备注", text: "无" }
    ];
    return {
      progressColumns,
      goodsColumns,
      list1,
      list2
    };
  }
};
</script>

<style lang="less" scoped>
@import "./BasicProfile.less";
</style>

