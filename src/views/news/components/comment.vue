<template>
  <div class="comment-componet" @click="selected">
    <div class="left">
      <img class="user-avator" :src="data.user.avatar" />
    </div>
    <div class="right">
      <div class="user-name">
        <span class="username">{{data.user.name}}</span>
        <span class="date">{{data.createDate|timeFormat}}</span>
      </div>
      <div class="replay-content" v-if="data.replyUser">
        <span class="replay">回复</span>
        <span class="username">{{data.replyUser.name}}</span>
      </div>
      <div class="content">{{data.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    selected() {
      this.$emit("click", this.data.user.id);
    }
  }
};
</script>
<style lang="scss">
.comment-componet {
  width: 95vw;
  margin: 0.5rem;
  .left {
    display: inline-block;
    width: 17%;
    vertical-align: top;
    .user-avator {
      width: 2rem;
      height: 2rem;
      padding: 0.3rem;
      border-radius: 50%;
    }
  }
  .right {
    display: inline-block;
    width: 83%;
    .user-name {
      .username {
        color: #576a95;
      }
      .date{
        float: right;
        width: 46%;
        text-align: right;
      }
    }
    .replay-content {
      margin: 0.5rem 8px;
    }
    & > .content {
      color: #000;
      word-break: break-all;
      margin: 2px;
    }
  }
}
</style>
