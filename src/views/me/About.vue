<template>
  <div class="about">
      <van-nav-bar @click-left="$router.back()">
      <div slot="left" class="arrow">
        <van-icon name="arrow-left"/>
        {{$vantMessages[$vantLang].back}}
      </div>
      <div slot="title">{{$vantMessages[$vantLang].about}}</div>
    </van-nav-bar>
    <div class="content">
      <div class="img-box">
          <img src="../../assets/it-background.jpg" alt>
        <div class="box-inner-content">
          <h3 class="title">IT Portal</h3>
          <span class="post">Better IT, better VWATJ!</span>
        </div>
      </div>
      <div class="text-box">
        <h4>{{$vantMessages[$vantLang].aboutIT.goal}}</h4>
        <p>{{$vantMessages[$vantLang].aboutIT.goalContent}}</p>
        <h4>{{$vantMessages[$vantLang].aboutIT.responsible}}</h4>
        <p>{{$vantMessages[$vantLang].aboutIT.responsibleContent.text}}</p>
        <ul>
          <li
            v-for="(repItem, reIndex) in $vantMessages[$vantLang].aboutIT.responsibleContent.list"
            :key="reIndex"
          >{{repItem}}</li>
        </ul>
        <h5>{{$vantMessages[$vantLang].aboutIT.header}}: Mr. Zhao, Yu</h5>
        <p>
          <i class="van-icon van-icon-phone" style="margin-right: 0.3rem;"></i>+86 22 5880 9135
        </p>
        <p>
          <i class="van-icon van-icon-printer" style="margin-right: 0.3rem;"></i>+86 22 5880 9120
        </p>
        <p>{{$vantMessages[$vantLang].aboutIT.footer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    import {Icon, NavBar} from "vant";

    export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  }
};
</script>
<style lang="scss">
.about {
  .arrow {
    color: #1989fa;
  }
  .van-nav-bar {
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    width: 20rem;
  }
  .content {
    box-sizing: border-box;
    padding: 0.5rem 1rem;
      height: calc(100vh - 50px);
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .img-box {
      width: 100%;
      overflow: hidden;
      position: relative;
      &:before {
        content: "";
        display: block;
        border: 30px solid rgba(255, 255, 255, 0.3);
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        opacity: 1;
        z-index: 2;
        transition: all 0.3s ease 0s;
      }
      &:hover:before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 10px solid rgba(255, 255, 255, 0.18);
      }
      &:hover:after {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
      }
      &:after {
        content: "";
        display: block;
        border: 8px solid rgba(255, 255, 255, 0.18);
        position: absolute;
        top: 30px;
        left: 30px;
        bottom: 30px;
        right: 30px;
        opacity: 1;
        z-index: 1;
        transition: all 0.5s ease 0s;
      }
      img {
        width: 100%;
        height: auto;
        transform: scale(1.2);
        transition: all 0.5s ease 0s;
      }
      &:hover img {
        transform: scale(1);
      }
      .box-inner-content {
        position: absolute;
        left: 45px;
        bottom: 125px;
        right: 45px;
        text-align: center;
        color: #fff;
        opacity: 0;
        transition: all 0.3s ease 0s;
      }
      &:hover .box-inner-content {
        opacity: 1;
        top: 30px;
        text-shadow: 0 0 10px #000;
      }
      .title {
        font-size: 26px;
        font-weight: bold;
        margin: 0;
      }
      .post {
        display: block;
        font-size: 16px;
        font-style: italic;
        margin-bottom: 10px;
        color: #fff;
      }
    }
    .text-box {
      margin-top: 1rem;
      h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }
      p,
      ul {
        font-size: 0.9rem;
        line-height: 1.5;
      }
      ul {
        list-style: disc;
        padding-left: 1rem;
      }
      li {
        padding: 0.3rem;
      }
    }
  }
}
</style>
