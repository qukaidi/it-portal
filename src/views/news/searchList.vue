<template>
  <div class="search-list">
    <div class="header">
      <van-search
              v-model="queryText"
              :placeholder="$vantMessages[$vantLang].searchTip"
              show-action
              shape="round"
              @cancel="onCancel"
      ></van-search>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$vantMessages[$vantLang].noMore"
        @load="onLoad"
      >
        <news-card
                :data="item"
                :key="item.id"
                :queryText="params.title"
                v-for="item in news1List"
        ></news-card>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {List, Search} from "vant";
  import NewsCard from "./components/Card.vue";
  import {mapState} from 'vuex'
  import {fetchListByQuery} from '@/api/news.js'

  export default {
  components: {
    [Search.name]: Search,
    [List.name]: List,
      NewsCard
  },
  mounted() {
    this.$store.dispatch("clear1NewList");
    this.$nextTick(() => {
      let input = document.getElementsByClassName("van-field__control");
      input[0].focus();
    });
  },
  data() {
    return {
      queryText: "",
      loading: false,
      finished: true,
      params: {
        current: 1,
        size: 10,
        title: ""
      },
      isFirstSearch: true
    };
  },
  methods: {
    onLoad() {
      if (this.params.title !== "") {
        fetchListByQuery({
          current: this.params.current,
          size: this.params.size,
          lang: this.$vantLang === 'zh-CN' ? 0 : 1,
          title: this.params.title
          })
              .then(data => {
                if (this.params.current === 1) {
              this.$store.dispatch("clear1NewList");
            }
                this.$store.dispatch("add1NewList", data.records);
                this.params.current++;
                this.loading = false;
                if (this.news1List.length >= data.total) {
                  this.params.current = 1;
              this.finished = true;
            }
          });
      } else {
        this.finished = true;
        this.loading = false;
      }
    },
    onCancel() {
      this.$router.go(-1);
    }
  },
  watch: {
    queryText(value) {
      if (value === "") {
        this.$store.dispatch("clear1NewList");
        return;
      }
      this.params.title = value;
      this.params.current = 1;
      if (this.finished) {
        this.finished = false;
      } else {
        this.onLoad();
      }
    }
  },
  computed:mapState(['news1List'])
};
</script>
<style lang="scss">
  .search-list {
    position: relative;

    .header {
      top: 0;
      width: 100vw;
      position: fixed;
      box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .main {
      position: absolute;
      top: 55px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 55px);
      width: 100vw;
    }
  }
</style>
