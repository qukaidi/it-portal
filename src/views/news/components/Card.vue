<template>
  <div class="news-item" @click="toPage(data.id)">
    <div class="left">
      <div class="title">
        <a
                :class="hasVisited(data.id)?'linked':''"
                v-html="highText(getLangContent(data.title, data.etitle))"
        ></a>
      </div>
      <div class="footer">
        <span class="text">{{getLangContent(data.author,data.eauthor)}}</span>
        <span class="text">{{data.visitCount}}</span>
        <span class="text">{{$vantMessages[$vantLang].scan}}</span>
        <span class="text">{{data.createDate|dateFormat}}</span>
      </div>
    </div>
    <div class="right" v-if="data.mainImg&&data.mainImg!==''">
      <img :src="data.mainImg|imgFormat" class="van-card__img">
    </div>
  </div>
</template>

<script>
  import {Card, Icon, Loading} from "vant";
  import {mapState} from 'vuex'

  export default {
  components: {
    [Card.name]: Card,
    [Loading.name]: Loading,
    [Icon.name]: Icon
  },
  props: {
    data: {
      author: "",
      createDate: null,
      eauthor: "",
      etitle: "",
      id: -1,
      mainImg: "",
      starCount: 0,
      title: "",
      visitCount: 0
    },
    queryText: {
      type: String,
      default: ""
    }
  },
  methods: {
    toPage(id) {
      this.$router.push({
        params: { id: id },
        name: "News_page"
      });
    },
    hasVisited(value) {
      let visitedList = this.visitedList;
      for (let index = 0; index < visitedList.length; index++) {
        if (value == visitedList[index]) {
          return true;
        }
      }
      return false;
    },
    highText(text) {
      let filterText = text;
      if (this.queryText !== "" && filterText.length >= this.queryText.length) {
        let beginIndex = filterText
                .toLowerCase()
                .indexOf(this.queryText.toLowerCase());
        if (beginIndex !== -1) {
          let leftText = "";
          let centerText = "";
          let rightText = "";
          if (beginIndex === 0) {
            centerText = filterText.substring(0, this.queryText.length);
            rightText = filterText.substring(this.queryText.length);
          } else {
            leftText = filterText.substring(0, beginIndex);
            centerText = filterText.substring(
                    beginIndex,
                    beginIndex + this.queryText.length
            );
            rightText = filterText.substring(
                    beginIndex + this.queryText.length
            );
          }
          filterText = `${leftText}<span style='color:red'>${centerText}</span>${rightText}`;
        }
      }
      return filterText;
    }
  },
  computed:mapState(['visitedList'])
};
</script>

<style lang="scss">
  @media (min-width: 576px) {
    a {
      font-size: 24px;
    }
    .text {
      font-size: 16px;
    }

  }

  @media (max-width: 576px) {
    a {
      font-size: 18px;
    }
    .text {
      font-size: 12px;
    }
  }
.news-item {
  box-sizing: border-box;
  padding: 0.45rem 0.45rem;
  margin: 3px 0;
  height: 5rem;
  border-bottom: 1px solid #ebedf0;
  background-color: #fff;
  & > .left {
    display: inline-block;
    width: 72%;
    height: 100%;
    vertical-align: top;
    & > .title {
      height: 70%;
      word-break: break-word;
      & > a {
        color: #666;
        line-height: 1.2rem;
        max-height: 2.5rem;
        min-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        & > .linked {
          color: #969799 !important;
        }
      }
    }
    & > .footer {
      height: 30%;
      .text {
        color: #969799;
        font-weight: 400;
        line-height: 1rem;
        padding-right: 0.4rem;
      }
    }
  }
  & > .right {
    display: inline-block;
    width: 28%;
    height: 100%;
    img {
      border-radius: 3px;
      border: 0;
      height: 100%;
      width: 92%;
      object-fit: cover;
    }
  }

  & > div:only-child {
    width: 100% !important;
  }
}
.highlight-font {
  color: red !important;
}
</style>
