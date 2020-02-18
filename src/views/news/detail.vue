<template>
  <div class="news-page" v-if="!loading">
    <div class="header" v-if="isHeader">
      <van-row>
        <van-col span="24">
          <van-nav-bar
            :fixed="true"
            :left-arrow="true"
            :left-text="$vantMessages[$vantLang].back"
            :title="$vantMessages[$vantLang].watchArticle"
            @click-left="$router.back()"
          ></van-nav-bar>
          <div class="van-hairline--bottom"></div>
        </van-col>
      </van-row>
    </div>
    <div class="main" ref="main">
      <div class="content">
        <van-row>
          <van-col>
            <van-row>
              <van-col span="24">
                <div class="text">
                  <p class="title">{{getLangContent(data.title, data.etitle)}}</p>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <div class="text">
                  <p
                    class="author"
                  >{{data.createDate|dateFormat}} {{getLangContent(data.author,data.eauthor)}}</p>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <div class="text">
                  <div v-html="getLangContent(data.content, data.econtent)" class="article"></div>
                </div>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div class="line"></div>
      <div class="comment">
        <com-ment
          :data="comment"
          v-for="comment in commentList"
          :key="comment.id"
          @click="selectBox"
        ></com-ment>
      </div>
    </div>
    <div class="footer">
      <div @click="showInput" class="input">
        <div class="text">{{$vantMessages[$vantLang].comment}}</div>
      </div>
      <div class="visited">
        <van-icon name="eye-o" size="24px" />
        <div>{{data.visitCount}}</div>
      </div>
      <div class="star">
        <van-icon @click="showLike()" name="like-o" size="24px" v-if="isClose==0" />
        <van-icon @click="showNoLike()" color="red" name="like" size="24px" v-else />
        <div>{{data.starCount}}</div>
      </div>
    </div>
    <div class="comment-inputs">
      <van-popup
        v-model="openChat"
        position="bottom"
        @closed="closeInput"
        :style="{ height: '2.5rem' }"
      >
        <div class="commenChat">
          <input
            :placeholder="$vantMessages[$vantLang].comment"
            v-model="formData.content"
            ref="sendInput"
            v-reset-page
            v-focus
            maxlength="150"
          />
          <button @click="addComment" :disabled="!formData.content>0">
            <img src="../../assets/pub-b.png" />
          </button>
        </div>
      </van-popup>
      <van-popup v-model="showReplyBox" position="bottom" :style="{ height: '44px' }">
        <div class="commenChat">
          <input
            :placeholder="$vantMessages[$vantLang].reply"
            v-model="replyFormData.content"
            v-focus
            v-reset-page
          />
          <button @click="replyUser" :disabled="!replyFormData.content>0">
            <img src="../../assets/pub-b.png" />
          </button>
        </div>
      </van-popup>
    </div>
  </div>
  <div class="load-box" v-else>
    <van-loading :vertical="true" type="spinner" />
  </div>
</template>

<script>
import { Col, Icon, Loading, NavBar, Popup, Row } from "vant";
import comMent from "./components/comment.vue";
import wxMixin from "@/wx_mixin.js";
import {
  addComment,
  addStar,
  deleteStar,
  fetchCommentList,
  fetchOne
} from "@/api/news.js";

export default {
  name: "News_page",
  mixins: [wxMixin],
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Loading.name]: Loading,
    comMent
  },
  data() {
    return {
      openChat: false,
      showReplyBox: false,
      isClose: true,
      data: {},
      isStar: null,
      loading: true,
      commentList: null,
      formData: {
        content: ""
      },
      replyFormData: {
        content: ""
      },
      selectUserId: null,
      focusState: false,
      isHeader: true
    };
  },
  props: ["id"],
  mounted() {
    this.$store.dispatch("addVisited", this.id);
    this.getData();
    this.getCommentList();
  },
  methods: {
    selectBox(userId) {
      this.selectUserId = userId;
      this.showReplyBox = true;
    },
    showLike() {
      addStar({
        articleId: this.id
      })
        .then(data => {
          this.$toast("成功点赞", "success");
          this.isClose = true;
          this.data.starCount = data;
        })
        .catch(() => {
          this.$toast("无需再点赞", "fail");
        });
    },
    showNoLike() {
      deleteStar(this.id)
        .then(data => {
          this.$toast("成功取消点赞", "success");
          this.data.starCount = data;
          this.isClose = false;
        })
        .catch(() => {
          this.$toast("无需再取消点赞", "fail");
        });
    },
    getCommentList() {
      fetchCommentList(this.id).then(data => {
        this.commentList = data;
      });
    },
    addComment() {
      addComment({
        articleId: this.id,
        content: this.formData.content
      })
        .then(() => {
          this.$toast("发表成功", "success");
          this.getCommentList();
        })
        .finally(() => {
          this.formData.content = "";
          this.openChat = false;
        });
    },
    replyUser() {
      addComment({
        articleId: this.id,
        content: this.replyFormData.content,
        replyUserId: this.selectUserId
      })
        .then(() => {
          this.$toast("回复成功", "success");
          this.getCommentList();
        })
        .finally(() => {
          this.replyFormData.content = "";
          this.showReplyBox = false;
        });
    },
    getData() {
      fetchOne(this.id)
        .then(data => {
          this.data = data;
          this.isClose = data.isStar != null;
          this.loading = false;
          this.initShareMessage(
            this.data.title,
            "好好浏览吧",
            window.location.href
          );
          this.$store.dispatch("updateNewItemVisitCount", {
            id: this.data.id,
            visitCount: this.data.visitCount
          });
        })
        .catch(() => {
          this.$router.replace("/not_found_error");
        });
    },
    showInput() {
      this.openChat = true;
      this.formData.content = "";
    },
    closeInput() {
      this.$nextTick(() => {
        this.$refs.sendInput.blur();
        this.$refs.main.scrollIntoView();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isHeader = !!from.name;
    });
  }
};
</script>
<style lang="scss">
.news-page {
  .header {
    position: fixed;
    height: 7vh;
    width: 100vw;
    top: 0;

    & + .main {
      height: 86vh !important;
      top: 7vh;
    }
  }
  .main {
    position: fixed;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 94vh;
    width: 100vw;
    & > .content {
      .title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        line-height: 26px;
        font-family: Microsoft YaHei, sans-serif;
      }

      .author {
        font-size: 15px;
        color: grey;
      }

      .text {
        max-width: 18rem;
        min-width: 18rem;
        margin-top: 1rem;
        margin-right: 1rem;
        margin-left: 1rem;
        font-size: 0.95rem;
        line-height: 1.5rem;
        font-family: Microsoft YaHei, sans-serif;
        color: #000;
        word-break: break-all;
      }

      .article {
        font-size: 18px !important;
        margin-bottom: 13px;
        line-height: 24px;
        br {
          display: none;
        }

        div {
          line-height: 24px;
          font-size: 18px;
        }
        p {
          text-indent: 0 !important;
          margin: 0;
          line-height: 24px;
          span {
            color: #000;
            font-size: 18px !important;
          }
        }
        img {
          max-width: 18rem;
          height: auto;
          display: block;
          margin: 0 auto;
        }
      }
    }
    .line {
      margin: auto;
      width: 90%;
      background-color: #666;
      height: 1px;
    }
    .comment {
      margin-bottom: 2.5rem;
      line-height: 1.2rem;
    }

    @media (min-width: 576px) {
      .comment {
        font-size: 0.6rem;
      }
    }
    @media (max-width: 576px) {
      .comment {
        font-size: 0.85rem;
      }
    }
  }

  & > .footer {
    height: 44px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    border: none;
    background-color: white;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input {
      float: left;
      width: 63%;
      border: 1px solid #fff;
      border-radius: 3rem;
      height: 28.7px;
      margin-left: 2%;
      background: #f6f8f9;
      display: flex;
      align-items: center;
      .text {
        font-size: 16px;
        margin-left: 11px;
      }
    }

    .visited {
      float: right;
      width: 16%;
      font-size: 16px;
      display: flex;
      align-items: center;
    }

    .star {
      float: right;
      width: 11%;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
  .comment-inputs {
    .commenChat {
      background-color: #f6f8f9;
      display: flex;
      align-items: center;
      input {
        height: 28.7px;
        width: 80%;
        border: 1px solid #fff;
        border-radius: 3rem;
        margin: auto;
        padding-left: 10px;
        &::placeholder {
          font-size: 16px;
        }
      }
      button {
        height: 44px;
        border: none;
        background-color: transparent;
        font-weight: 600;
        transition: filter 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        font: 0 !important;
        img {
          height: 28.7px;
        }
        &:disabled {
          filter: grayscale(100%);
        }
      }
    }
  }

  .load-box {
    position: fixed;
    top: 6%;
    height: 80vh;
    width: 100vw;
    padding-top: 60%;

    .van-loading {
      margin: 0 auto;
    }
  }
}

.van-nav-bar {
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.van-overlay {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
