<template>
    <div class="gallery-list">
        <div class="top">
            <div class="search-box" @click="iconSearch">
                <van-row>
                    <van-col>
                        <van-icon name="search"/>
                    </van-col>
                    <van-col>
                        <span class="text">{{$vantMessages[$vantLang].search}}</span>
                    </van-col>
                </van-row>
            </div>
            <van-icon name="clock-o" slot="left" class="iconSearch" @click="isShowDatePickPopup=true"/>
        </div>
        <div class="main" ref="listBox">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :offset="0">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :finished-text="$vantMessages[$vantLang].noMore"
                        @load="onLoad"
                >
                    <gallery-card :data="item" :key="item.id" v-for="item in galleryList"></gallery-card>
                </van-list>
                <template v-slot:loosing>
                    <div class="loosing">
                        <img src="../../assets/logo-c.png"/>
                    </div>
                </template>
            </van-pull-refresh>
        </div>
        <van-popup v-model="isShowDatePickPopup" position="bottom" :close-on-click-overlay="false">
            <van-datetime-picker
                    v-model="selectedDate"
                    type="year-month"
                    :min-date="minDate"
                    @cancel="isShowDatePickPopup=false"
                    @confirm="selectDate"
            />
        </van-popup>
    </div>
</template>

<script>
    import {Col, DatetimePicker, Icon, List, NavBar, Popup, PullRefresh, Row} from "vant";
    import GalleryCard from "./components/Card.vue";
    import {mapState} from "vuex";
    import {fetchList} from "@/api/gallery.js"

    export default {
        name: "Gallery_list",
        components: {
            [List.name]: List,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [DatetimePicker.name]: DatetimePicker,
            [Row.name]: Row,
            [Col.name]: Col,
            [Popup.name]: Popup,
            [PullRefresh.name]: PullRefresh,
            GalleryCard
        },
        data() {
            return {
                finished: false,
                loading: false,
                selectedDate: new Date(),
                minDate: new Date(2018, 0, 1),
                query: {
                    page: 1,
                    size: 7,
                    date: ""
                },
                isShowDatePickPopup: false,
                isLoading: false,
                scrollTop: 0,
                isRefresh: false,
                isToSearch: false
            };
        },
        methods: {
            onLoad() {
                let params = {current: this.query.page, size: this.query.size, order: 1};
                if (this.query.date != "") {
                    params.date = this.query.date;
                }
                fetchList(params)
                    .then(data => {
                        if (this.isRefresh) {
                            this.$store.dispatch("clearGalleryList");
                            this.$toast("刷新成功");
                            this.isRefresh = false;
                            this.finished = false;
                        } else if (this.query.page === 1) {
                            this.$store.dispatch("clearGalleryList");
                            this.finished = false;
                        }
                        this.$store.dispatch("addGalleryList", data.records);
                        this.query.page++;
                        this.loading = false;
                        if (this.galleryList.length >= data.total) {
                            this.query.page = 1;
                            this.finished = true;
                        }
                        this.isLoading = false;
                    });
            },
            iconSearch() {
                this.$router.push("/Gallery_search");
            },
            selectDate() {
                let date = new Date(this.selectedDate);
                this.query.date = `${date.getFullYear()}-${parseInt(date.getMonth()) + 2}-1`
                this.isShowDatePickPopup = false;
                this.query.page = 1;
                this.onLoad();
            },
            onRefresh() {
                this.isRefresh = true;
                this.query.page = 1;
                if (this.query.date !== "") {
                    this.query.date = "";
                    this.selectedDate = new Date()
                }
                this.onLoad();
            }
        },
        activated() {
            if (this.isToSearch && this.galleryList.length === 0) {
                this.query.page = 1;
                this.query.date = "";
                this.selectedDate = new Date();
                this.onLoad();
            }
            if (this.scrollTop > 0) {
                this.$refs.listBox.scrollTo(0, this.scrollTop);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.isToSearch = to.name === 'Gallery_search';
            this.scrollTop = this.$refs.listBox.scrollTop;
            next();
        },
        computed: mapState(["galleryList"])
    };
</script>

<style lang="scss">
    .gallery-list {
        height: 100%;
        width: 100vw;
        & > .top {
            width: 100%;
            padding-top: 10px;
            padding-left: 16px;
            padding-bottom: 6px;
            box-sizing: border-box;
            color: #666;
            & > .search-box {
                border-radius: 17px;
                background-color: #f7f8fa;
                padding-left: 10px;
                line-height: 24px;
                height: 31px;
                font-size: 16px;
                padding-top: 3px;
                width: 87%;
                display: inline-block;
                .van-icon {
                    line-height: 24px;
                    margin-right: 5px;
                }
                .text {
                    color: #969799;
                    line-height: 24px;
                    font-size: 14px;
                }
            }
            .iconSearch {
                font-size: 20px;
                color: #1989fa;
                display: inline-block !important;
                width: 3%;
                margin-left: 3%;
                bottom: 5px;
            }
        }
        & > .main {
            height: calc(100vh - 57px);
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .loosing {
                text-align: center;
                & > img {
                    width: 51vw;
                    height: 34px;
                    margin-bottom: 40px;
                    transform: scale(0.7, 0.7);
                    filter: grayscale(100%);
                }
            }
            .van-list__finished-text:only-child {
                height: 40vh;
            }
        }
    }
</style>
