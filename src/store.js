import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {Locale} from "vant";
import zh from "@/lang/zh.js";
import en from "@/lang/en.js";

Vue.use(Vuex)
export default new Vuex.Store({
  state(){
    let currentLang=localStorage.getItem("currentLang");
    if(currentLang){
      Locale.use(currentLang==="zh"?"zh-CN":"en-US", currentLang==="zh"?zh:en);
    }else{
      currentLang="zh";
      Locale.use("zh-CN", zh);
    }
    return {
      visitedList:sessionStorage.getItem("visit")?sessionStorage.getItem("visit").split(",").map(value=>{
        return parseInt(value);
      }):[],
      likedList:sessionStorage.getItem("visit")?sessionStorage.getItem("visit").split(",").map(value=>{
        return parseInt(value);
      }):[],
      newsList:[],
      galleryList:[],
      userInfo:null,
      news1List:[],
      currentLang:currentLang,
      firstUrl:window.location.href,
      isShowApp:false
    }
  }
  ,
  mutations: {
    addVisited(state,item){
      let id=parseInt(item);
      let isExist = this.state.visitedList.filter(value => value === id);
      if(isExist.length<1)
      {
        this.state.visitedList.push(id)
        sessionStorage.setItem("visit",this.state.visitedList)
      }
    },
    addLiked(state,item){
      let id=parseInt(item);
      let isExist = this.state.likedList.filter(value => value === id);
      if(isExist.length<1)
      {
        this.state.likedList.push(id)
        sessionStorage.setItem("visit",this.state.likedList)
      }
    },
    addNewList(state,list)
    {
      list.forEach(value=>{
        this.state.newsList.push(value)
      })
    },
    addGalleryList(state,list)
    {
      list.forEach(value=>{
        this.state.galleryList.push(value)
      })
    },
    clearNewList(state)
    {
      state.newsList=[];
    },
    clearGalleryList(state)
    {
      state.galleryList=[];
    },
    updateNewItemVisitCount(state,params)
    {
      for(let index=0;index<state.newsList.length;index++)
      {
        if (state.newsList[index].id === params.id)
        {
          state.newsList[index].visitCount=params.visitCount;
          break;
        }
      }
    },
    updateNewItemStarCount(state,params)
    {
      for(let index=0;index<state.galleryList.length;index++)
      {
        if (state.galleryList[index].id === params.id)
        {
          state.galleryList[index].starCount=params.starCount;
          break;
        }
      }
    },
    add1Visited(state,item){
      let id=parseInt(item);
      let isExist=this.state.visitedList.filter(value=>value==id);
      if(isExist.length<1)
      {
        this.state.visitedList.push(id)
        sessionStorage.setItem("visit",this.state.visitedList)
      }
    },
    add1NewList(state,list)
    {
      list.forEach(value=>{
        this.state.news1List.push(value)
      })
    },
    clear1NewList(state)
    {
      state.news1List=[];
    },
    update1NewItemVisitCount(state,params)
    {
      for(let index=0;index<state.news1List.length;index++)
      {
        if (state.news1List[index].id === params.id)
        {
          state.news1List[index].visitCount=params.visitCount;
          break;
        }
      }
    },
    clearNewSwipe(state)
    {
      state.newsSwipe=[];
    },
    fetchUserInfo(state){
      axios.get("/api/user/info").then(response=>{
        state.userInfo=response.data.data;
        state.isShowApp=true;
      }).catch(error=>{
        if(error.response.status==401){
          window.location.href="/api/wx/auth_url?state="+window.location.href;
        }
      })
    },
    updateLang(state,lang){
      if (lang==="en") {
        Locale.use("en-US", en);
      } else if(lang==="zh") {
        Locale.use("zh-CN", zh);
      }
      state.currentLang=lang;
      localStorage.setItem("currentLang",lang);
    }
  },
  actions: {
    addVisited({commit},id)
    {
      commit("addVisited",id);
    },
    addLiked({commit},id)
    {
      commit("addLiked",id);
    },
    addNewList({commit},list)
    {
      commit("addNewList",list);
    },
    addGalleryList({commit},list)
    {
      commit("addGalleryList",list);
    },
    clearNewList({commit})
    {
      commit("clearNewList");
    },
    clearGalleryList({commit})
    {
      commit("clearGalleryList");
    },
    updateNewItemVisitCount({commit},params)
    {
      commit("updateNewItemVisitCount",params)
    },
    updateNewItemStarCount({commit},params)
    {
      commit("updateNewItemStarCount",params)
    },
    add1Visited({commit},id)
    {
      commit("add1Visited",id);
    },
    add1NewList({commit},list)
    {
      commit("add1NewList",list);
    },
    clear1NewList({commit})
    {
      commit("clear1NewList");
    },
    update1NewItemVisitCount({commit},params)
    {
      commit("update1NewItemVisitCount",params)
    },
    clearNewSwipe({commit})
    {
      commit("clearNewSwipe");
    },
    fetchUserInfo({commit}){
      commit("fetchUserInfo");
    }
  },
  getters:{
    info:state=>{
      let userInfo=null;
      if(state.userInfo){
        userInfo=Object.assign({},state.userInfo)
        let email = state.userInfo.email;
        let index =email.lastIndexOf("@");
        userInfo.extension = email.substring(index, email.length);
        userInfo.preName = email.substring(0, index);
      }
      return userInfo;
    },
    url:state=>{
      return state.firstUrl.split('#')[0]
    },
    isZh:state=>state.currentLang === "zh" ? true : false
  }
})
