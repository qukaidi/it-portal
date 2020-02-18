<template>
  <div class="swiper-item" @click="toPage">
    <img :src="mainImg|imgFormat" class="img">
    <div class="text">
      <p v-html="getLangContent(title,etitle)"></p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1
    },
    mainImg: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    etitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    toPage() {
      this.$router.push({
        params: { id: this.id },
        name: "News_page"
      });
    }
  }
};
</script>
<style lang="scss">
.swiper-item{
 position: relative;
 height: 100%;
 border-radius: 0.35rem;
 text-align: center;
 width: 93% !important;
 box-sizing: border-box;
 margin: 3px 11px;
 &>.img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border-radius: 0.35rem;
 }
 &>.text{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.35rem;
     p {
      color: #fff;
      font-size: 0.8rem;
      word-wrap: break-word;
      word-break: break-all;
      font-weight: 600;
      line-height: 1.3rem;
    }
 }
}
</style>
