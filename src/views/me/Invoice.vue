<template>
  <div class="invoice">
      <van-nav-bar @click-left="$router.back()">
      <div slot="left" class="arrow">
        <van-icon name="arrow-left" />
        {{$vantMessages[$vantLang].back}}
      </div>
      <div slot="title">{{$vantMessages[$vantLang].invoice.title}}</div>
    </van-nav-bar>
    <div class="content">
      <van-tabs color="#1989fa" animated>
        <van-tab :title="$vantMessages[$vantLang].invoice.values.TJ.label">
          <invoice-text
            v-bind:data="$vantMessages[$vantLang].invoice.values.TJ"
            v-bind:imgUrl="qrTjImg"
          ></invoice-text>
        </van-tab>
        <van-tab :title="$vantMessages[$vantLang].invoice.values.DL.label">
          <invoice-text
            v-bind:data="$vantMessages[$vantLang].invoice.values.DL"
            v-bind:imgUrl="qrDLImg"
          ></invoice-text>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
    import {Icon, NavBar, Tab, Tabs} from "vant";
    import InvoiceText from "@/components/InvoiceText.vue";
    import QrDLImg from "@/assets/qr-dl.png"
    import QrTJImg from "@/assets/qr-tj.png"

    export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    InvoiceText
  },
  data() {
    return {
      qrDLImg: QrDLImg,
      qrTjImg:QrTJImg
    }
  }
};
</script>
<style scoped lang="scss">
.invoice {
  min-height: 100%;
  background-color: #eee;
  .arrow {
    color: #1989fa;
  }
  .van-nav-bar {
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    width: 20rem;
  }
  .content {
    padding: 0.5rem 1rem;
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
}
</style>
