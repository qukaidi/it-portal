<template>
  <div class="gallery-page">
    <van-nav-bar :fixed="true" @click-left="$router.back()">
      <div class="arrow" slot="left" v-if="isHeader">
        <van-icon name="arrow-left"/>
        {{$vantMessages[$vantLang].back}}
      </div>
      <div slot="title">
        <p class="titles">{{getLangContent(data.title, data.etitle)}}</p>
      </div>
      <div slot="right">
        <van-icon name="like-o" size="1rem" @click="showLike()" v-if="isClose==0" color="red"/>
        <van-icon name="like" size="1rem" @click="showNoLike()" v-else color="red"/>
      </div>
    </van-nav-bar>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$vantMessages[$vantLang].noMore"
        @load="onLoad"
      >
        <van-row>
          <van-col span="8" v-for="item in showList" :key="item.id">
            <div class="imgBox">
              <img v-lazy="item.url" preview="0" class="photo" @click="previewIsClose=false" />
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {Col, Icon, List, NavBar, Row} from "vant";
  import {addStar, deleteStar, fetchOne} from "@/api/gallery.js"

  export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Icon.name]: Icon
  },
  data() {
    return {
      data: {},
      showList: [],
      loading: false,
      finished: false,
      index: 0,
      isLoadFinish: false,
      isClose: true,
      isStar: null,
      previewIsClose: true,
      isHeader: true
    };
  },
  props: ["id"],
  mounted() {
    this.$preview.on("close", () => {
      this.previewIsClose = true;
    });
  },
  created() {
    this.getData();
  },
  methods: {
    onLoad() {
      if (this.isLoadFinish) {
        let i = this.index;
        let imgItemList = this.data.imgItemList;
        let maxIndex = imgItemList.length > 18 ? 18 : imgItemList.length;
        let secondMaxInde =
          imgItemList.length > this.index + maxIndex
            ? this.index + maxIndex
            : imgItemList.length;
        for (; i < secondMaxInde; i++) {
          this.showList.push(imgItemList[i]);
        }
        this.index = i;
        this.loading = false;
        if (this.showList.length >= imgItemList.length) {
          this.index = 0;
          this.finished = true;
        }
      }
    },
    getData() {
        fetchOne(this.id).then(data => {
            this.data = data;
            this.isClose = data.isStar == null ? false : true;
        this.isLoadFinish = true;
        this.onLoad();
        }).catch(() => {
          this.$router.replace("/not_found_error")
        });
    },
    showLike() {
        addStar({
          galleryId: this.id
        })
            .then(data => {
            this.$store.dispatch("updateNewItemStarCount", {
              id: this.data.id,
                starCount: data
            });
              this.$toast("成功点赞", "success");
            this.isClose = true;
        })
            .catch(() => {
              this.$toast("无需再点赞", "fail");
        });
    },
    showNoLike() {
        deleteStar(this.id)
            .then(data => {
            this.$store.dispatch("updateNewItemStarCount", {
              id: this.data.id,
                starCount: data
            });
              this.$toast("成功取消点赞", "success");
            this.isClose = false;
        })
            .catch(() => {
              this.$toast("无需再取消点赞", "fail");
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.previewIsClose) {
      next();
    } else {
      this.$preview.self.close();
      next(false);
    }
  },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.isHeader = !!from.name
      })
    }
};
</script>
<style lang="scss">
.gallery-page {
  position: relative;
  .imgBox {
    width: 5.7rem;
    height: 5.7rem;
    margin: 0.383rem;
  }
  .titles {
    width: 12rem;
    margin-top: 0px;
    margin-bottom: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-nav-bar {
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .photo {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .main {
    height: calc(100vh - 46px) !important;
    top: 46px;
    overflow-y: scroll;
    position: absolute;
  }
}
.pswp__button--zoom {
  display: none !important;
}
.pswp__button--fs {
  display: none !important;
}
</style>
