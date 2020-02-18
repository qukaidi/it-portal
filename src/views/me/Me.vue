<template>
  <div>
    <div class="card">
      <header>
        <div class="avatar">
          <img :src="info.avatar">
        </div>
      </header>
      <h3>{{info.name}}</h3>
      <div class="user-info">
        <div class="profile-list" v-if="info.mobile">
          <i class="van-icon van-icon-phone" style="padding-right: 0.3rem;"></i>
          {{$vantMessages[$vantLang].mobile}}：{{info.mobile}}
        </div>
        <div class="li" v-if="info.email">
          <i class="van-icon van-icon-invition" style="padding-right: 0.3rem;"></i>
          {{$vantMessages[$vantLang].email}}：
          <span>{{info.preName}}</span>
          <br>
          <span>{{info.extension}}</span>
        </div>
      </div>
    </div>
    <van-cell :title="$vantMessages[$vantLang].language">
      <div slot="right-icon">
        <div class="mobile-switch-lang">
          <span :class="{ active: isZh }" @click="updateLang('zh')">中文</span>
          <span :class="{ active: !isZh }" @click="updateLang('en')">EN</span>
        </div>
      </div>
    </van-cell>
    <van-cell is-link :title="$vantMessages[$vantLang].about" @click="inAbout"/>
    <van-cell is-link :title="$vantMessages[$vantLang].invoice.title" @click="invoice"/>
  </div>
</template>

<script>
  import {Cell, CellGroup, Icon, Switch} from "vant";
  import {mapGetters, mapMutations} from 'vuex'

  export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Switch.name]: Switch
  },
  methods: {
    inAbout() {
      this.$router.push("/About");
    },
    invoice() {
      this.$router.push("/Invoice");
    },
    ...mapMutations(['updateLang'])
  },
  computed:{
    ...mapGetters(['info','isZh'])
  }
};
</script>
<style lang="scss">
.mobile-switch-lang {
  color: #1989fa;
    font-size: 0.9rem;
  cursor: pointer;
  overflow: hidden;
  span {
    color: #969799;
    width: 2.56rem;
    line-height: 1.17rem;
    text-align: center;
    display: inline-block;
    border: 1px solid rgb(220, 222, 224);
    background-color: #f7f8fa;
    &:first-child {
      border-right: none;
      border-right-color: currentcolor;
      border-radius: 3px 0 0 3px;
    }
  }
  .active {
    color: #fff;
    border-color: #1989fa;
    background-color: #1989fa;
  }
}
.card {
  width: 100%;
  background: #fff;
  z-index: 1;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(235, 237, 240, 0.5);
  text-align: center;
    font-size: 0.9rem;
  header {
    position: relative;
    width: 20rem;
    height: 3rem;
    background-color: #c5cae9;
    display: flex;
    justify-content: center;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: inherit;
    }
    &::before {
      transform: skewY(-8deg);
      transform-origin: 100% 100%;
    }
    &::after {
      transform: skewY(8deg);
      transform-origin: 0 100%;
    }
    .avatar {
      position: absolute;
      top: 1.5rem;
      z-index: 5;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      border: 3px solid #fff;
      display: flex;
      justify-content: center;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: auto;
      }
    }
  }
  h3 {
    margin: 4rem 0 0;
  }
  .user-info {
    line-height: 1.5;
    margin-top: 1rem;
    .li {
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  }
}
.van-cell {
  line-height: 1.5rem !important;
    font-size: 0.9rem !important;
}
</style>
