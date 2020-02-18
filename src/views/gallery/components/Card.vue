<template>
  <div class="gallery-item" v-if="data" @click="toPage(data.id)">
    <div class="img-box">
      <img :src="data.mainImg|imgGallery">
    </div>
    <div class="text-box">
      <div class="like">
        <van-icon name="like" size="14px" color="#fff"/>
        <span>{{data.starCount}}</span>
      </div>
      <div class="date">
        <span>{{data.createDate|dateFormat}}</span>
      </div>
      <div class="title">
        <span>{{getLangContent(data.title, data.etitle)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {Icon} from "vant";
    import {mapState} from 'vuex'

    export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    toPage(id) {
      this.$router.push({
        params: { id: id },
        name: "Gallery_page"
      });
    },
    hasLiked(value) {
      let likedList = this.likedList;
      for (let index = 0; index < likedList.length; index++) {
          if (value === likedList[index]) {
          return true;
        }
      }
      return false;
    }
  },
  computed:mapState(['likedList'])
};
</script>
<style lang="scss">
.gallery-item {
  width: 94vw;
  height: 7rem;
  color: #fff;
  position: relative;
    margin: 0 3vw 8px 3vw;
  border-radius: 0.35rem;
  font-size: 16px;
  box-sizing: border-box;
  & > .img-box {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.35rem;
      object-fit: cover;
    }
  }
  & > .text-box {
    z-index: 2;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 0.35rem;
    & > .like {
      text-align: right;
      margin-right: 2%;
      margin-top: 2%;
      .van-icon-like{
        margin-right: 4px;
      }
    }
    & > .date {
      margin-top: 1rem;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      font-weight: 600;
    }
    & > .title {
      font-size: 0.8rem;
      letter-spacing: 0.2rem;
      font-weight: 600;
    }
    span{
      color:#fff;
    }
  }
}
</style>
