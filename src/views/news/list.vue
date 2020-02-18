<template>
  <div class="article-list">
    <div class="header">
      <div class="search-box" @click="toSearchPage">
        <van-row>
          <van-col>
            <van-icon name="search"/>
          </van-col>
          <van-col>
            <span class="text">{{$vantMessages[$vantLang].search}}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="main" ref="listBox">
        <van-swipe :autoplay="3000" :show-indicators="false">
            <van-swipe-item :key="item.id" v-for="item of swipeList">
                <slide v-bind="item"></slide>
            </van-swipe-item>
        </van-swipe>
      <van-list
        v-model="listLoading"
        :finished="finished"
        :finished-text="$vantMessages[$vantLang].noMore"
        @load="onLoad"
      >
        <news-card v-for="(data,index) in newsList" :key="index" :data="data"></news-card>
      </van-list>
    </div>
  </div>
</template>

<script>
    import {Col, Icon, List, Loading, NavBar, PullRefresh, Row, Search, Swipe, SwipeItem} from "vant";
    import NewsCard from "./components/Card.vue";
    import Slide from "./components/Slide.vue";
    import {mapState} from 'vuex'
    import {fetchList, fetchMainList} from '@/api/news.js'

    export default {
  name: "News_list",
  components: {
    [Loading.name]: Loading,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Search.name]: Search,
    [Row.name]: Row,
    [Col.name]: Col,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
    NewsCard,
    Slide
  },
  data() {
    return {
      swipeList: [],
      listLoading: false,
        page: {
            current: 1,
            size: 5
        },
      finished: false,
      scrollTop: 0,
    };
  },
  methods: {
    getSwipeList() {
        fetchMainList().then((data) => {
            this.swipeList = data;
      });
    },
    onLoad() {
        fetchList({
            current: this.page.current,
            size: this.page.size
        })
            .then(data => {
                this.$store.dispatch("addNewList", data.records);
                this.page.current++;
                this.listLoading = false;
                if (this.newsList.length >= data.total) {
                    this.page.current = 1;
                    this.finished = true;
          }
        });
    },
    toSearchPage() {
      this.$router.push({ name: "News_search" });
    }
  },
  mounted() {
    this.getSwipeList();
  },
  activated() {
    if (this.scrollTop > 0) {
      this.$refs.listBox.scrollTo(0, this.scrollTop);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.scrollTop = this.$refs.listBox.scrollTop;
    next();
  },
   computed:mapState(['newsList'])
};
</script>

<style lang="scss">
.article-list {
  height: 100%;
  & > .header {
    padding: 10px 16px;
    box-sizing: border-box;
    color: #666;
    height: 50px;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    .search-box {
      border-radius: 17px;
      background-color: #f7f8fa;
      padding-left: 10px;
      line-height: 24px;
      height: 100%;
      font-size: 16px;
      .van-icon {
        line-height: 29px;
        margin-right: 5px;
      }
      .text {
        color: #969799;
        line-height: 29px;
        font-size: 14px;
      }
    }
  }
  & > .main {
      height: calc(100vh - 50px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

      .van-swipe {
          height: 18vh;
          width: 100vw;
          padding-bottom: 6px;
          box-sizing: border-box;
      }
  }
}
</style>
