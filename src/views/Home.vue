<template>
    <div class="home" v-if="isShowApp">
        <transition :name="transitionName">
            <keep-alive include="Gallery_list,News_list">
                <router-view v-wechat-title="getLangContent($route.meta.title,$route.meta.etitle)"/>
            </keep-alive>
        </transition>
    </div>
    <div class="loading-box" v-else>
        <van-loading :vertical="true" type="spinner"/>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {Loading} from 'vant'

    export default {
        name: "Home",
        mounted() {
            this.$store.dispatch("fetchUserInfo");
        },
        watch: {
            $route(to, from) {
                if (to.meta.index > from.meta.index) {
                    this.transitionName = "slide-left";
                } else if (to.meta.index < from.meta.index) {
                    this.transitionName = "slide-right";
                } else {
                    this.transitionName = "slide-none";
                }
            }
        },
        data() {
            return {
                transitionName: ""
            }
        },
        computed: mapState(['isShowApp']),
        components: {
            [Loading.name]: Loading
        }
    };
</script>
<style lang="scss">
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        will-change: transform;
        transition: 1000ms;
        position: fixed;
    }

    .slide-none-leave-active {
        opacity: 0;
        display: none;
    }

    .slide-none-enter {
        display: inline;
    }

    .slide-right-enter, .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .loading-box {
        padding-top: 60%;

        .van-loading {
            margin: 0 auto;
        }
    }
</style>
