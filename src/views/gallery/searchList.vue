<template>
  <div class="search-list">
    <div class="header">
      <form action="/">
        <van-search
                v-model="queryText"
                :placeholder="$vantMessages[$vantLang].searchTip"
                show-action
                shape="round"
                @cancel="onCancel"
        />
      </form>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$vantMessages[$vantLang].noMore"
        @load="onLoad"
      >
        <gallery-card :data="item" :key="item.id" v-for="item in listData"></gallery-card>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {List, Search} from "vant";
  import GalleryCard from "./components/Card.vue";
  import {fetchListByQuery} from "@/api/gallery.js"

  export default {
  components: {
    [Search.name]: Search,
    [List.name]: List,
    GalleryCard
  },
  data() {
    return {
      queryText: "",
      listData: [],
      loading: false,
      finished: false,
      params: {
        current: 1,
        size: 10,
        title: ""
      }
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
              this.listData = [];
            }
                data.records.forEach(item => {
                  this.listData.push(item);
            });
                this.params.current++;
            this.loading = false;
                  if (this.listData.length >= data.total) {
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
        this.listData = [];
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
  mounted() {
    this.$nextTick(() => {
       let input = document.getElementsByClassName("van-field__control");
       input[0].focus();
    });
  }
};
</script>
<style scoped lang="scss">
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
