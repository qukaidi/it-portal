<template>
  <div class="box2">
    <img class="title-image" src="../assets/logo-c.png" alt />
    <hr />
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.company}}</label>
      <p>{{data.company}}</p>
    </div>
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.num}}</label>
      <p>{{data.num}}</p>
    </div>
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.addr}}</label>
      <p>{{data.addr}}</p>
    </div>
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.phone}}</label>
      <p>{{data.phone}}</p>
    </div>
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.bank}}</label>
      <p>{{data.bank}}</p>
    </div>
    <div class="inline-display">
        <label>{{$vantMessages[$vantLang].invoice.labels.vnum}}</label>
      <p>{{data.vnum}}</p>
    </div>
    <hr />
    <div class="qr-code">
      <img :src="imgUrl" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      company: {
        type: String,
        default: ""
      },
      num: {
        type: String,
        default: ""
      },
      addr: {
        type: String,
        default: ""
      },
      phone: {
        type: String,
        default: ""
      },
      bank: {
        type: String,
        default: ""
      },
      vnum: {
        type: String,
        default: ""
      }
    },
    imgUrl: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
.box2 {
  background-color: #fff;
  margin: 0 auto;
  font-size: 0.8rem;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 2px #eee;
  overflow-y: auto;
    max-height: 77vh;
  .title-image {
    width: 50%;
    margin-top: 0.3rem;
  }
  .inline-display {
    display: flex;
    line-height: 1.5;
    label {
      width: 25%;
      padding: 2%;
      text-align: right;
      color: #666;
    }
    p {
      width: 65%;
      padding: 2%;
      margin: 0;
      text-align: left;
    }
  }
  hr {
    border: none;
    border-top: 1px dashed #ddd;
    color: #fff;
    background-color: #fff;
    height: 1px;
    width: 100%;
  }
  .qr-code {
    img {
      width: 35%;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
