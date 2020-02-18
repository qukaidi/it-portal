import axios from "axios"
import wx from "weixin-js-sdk";

export default {
    methods: {
        initShareMessage(title,desc,link){
            this.initConfig()
            wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: "",
                    success: function() {
                      alert("分享成功");
                    },
                    cancel: function() {
                      alert("取消分享");
                    }
                  });
              })
        },
        initConfig()
        {
            let url=window.__wxjs_is_wkwebview === true? this.$store.getters.url:window.location.href.split('#')[0];
            axios.get("/api/wx/config",{
                params: {
                   url: url
                }
              }).then(res=>{
                const resData=res.data;
                if(resData.code!=200)
                {
                    alert("初始化微信SDK失败")
                    return
                }
                wx.config({
                    debug: false,
                    appId: resData.data.appId,
                    timestamp: resData.data.timestamp,
                    nonceStr: resData.data.nonceStr,
                    signature: resData.data.signature,
                    jsApiList: ["onMenuShareAppMessage"]
                  });
            }).catch(res=>{
                alert("初始化微信SDK失败")
            })
        }
    },
}