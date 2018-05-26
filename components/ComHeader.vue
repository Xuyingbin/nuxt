<template>
    <header :style="styleCls" class="header">
        <div class="container">
            <div class="row">
                <div class="col col-md-2">
                    <img src="~/assets/image/logo.png" alt="">
                </div>
                <div class="col col-md-7 col-md-offset-1 middleContent">
                    <ul class="navBar" :style="navBarPosition">
                        <!-- <li @click="handleNav($event,index)" :class="{'active':navStatus===index}" v-for="(nav,index) in navArr">{{nav}}</li> -->
                        <li @click="handleNav($event,0)" :class="{'active':navStatus===0}">
                            <!-- <nuxt-link to="/">首页</nuxt-link> -->
                            首页
                        </li>
                        <li @click="handleNav($event,1)" :class="{'active':navStatus===1}">
                            <!-- <nuxt-link to="/invest">主题投资</nuxt-link> -->
                            主题投资
                        </li>
                        <li @click="handleNav($event,2)" :class="{'active':navStatus===2}">
                            <!-- <nuxt-link to="/invest">主题投资</nuxt-link> -->
                            龙虎榜
                        </li>
                        <!-- <li><a href="javascript:;">龙虎榜</a></li> -->
                        <li @click="handleNav($event,3)" :class="{'active':navStatus===3}">
                            <!-- <nuxt-link to="/invest">主题投资</nuxt-link> -->
                            自选
                        </li>
                        <!-- <li><a href="javascript:;">自选</a></li> -->
                        <li @click="handleNav($event,4)" :class="{'active':navStatus===4}">
                            <!-- <nuxt-link to="/invest">主题投资</nuxt-link> -->
                            资讯
                        </li>
                        <!-- <li><a href="javascript:;">资讯</a></li> -->
                        <li @click="handleNav($event,5)" :class="{'active':navStatus===5}">
                            <!-- <nuxt-link to="/invest">主题投资</nuxt-link> -->
                            关于我们
                        </li>
                        <!-- <li><a href="javascript:;">关于我们</a></li> -->
                    </ul>
                    <div class="searchArea" :style="searchAreaPosition">
                        <i v-show="crossIsShow" @click="closeSearchArea" class="cross"></i>
                        <!-- @blur="()=>{searchListIsShow = false}"  -->
                        <input
                            id="searchValue"
                            @focus="()=>{searchListIsShow = true}"
                            
                            @keyup.enter="searchListInfo"
                            v-model="searchValue" 
                            type="text"
                        >
                        
                    </div>
                    <!-- style="display:none;" -->
                    <search-list v-show="searchListIsShow" :searchValue="searchValue" @ImClick="ImClick"></search-list>
                </div>
                <div class="col col-md-2" style="padding:0">
                    <div class="infoContainer">
                        <div @click="showSearchArea" class="search"><i></i></div>
                        
                        <div class="news" v-if="qutouPhone">
                            <i><b v-if="newsList.length !== 0"></b></i>
                            <div class="newsList">
                                <div class="newsTitle">
                                    <span>消息盒</span>
                                </div>
                                <ul v-if="newsList.length !== 0" class="newsContent">
                                    <li v-for="news in newsList" @click="jumpPersonInfoCenter">
                                        <h4>[{{news.type === 1?'公告':'私信'}}]</h4>
                                        <h4>{{wordLimit(news.title)}}</h4>
                                    </li>
                                    <!-- <li>
                                        <h4>[公告]</h4>
                                        <h4>系统在11月20日进行不停机更新，请注意</h4>
                                    </li>
                                    <li>
                                        <h4>[公告]</h4>
                                        <h4>系统在11月20日进行不停机更新，请注意</h4>
                                    </li> -->
                                    
                                </ul>
                                <div v-if="newsList.length >= 3" class="newsMore">
                                    <span @click="jumpPersonInfoCenter">查看更多</span>
                                </div>
                                <div v-if="newsList.length === 0" class="newsMore">
                                    <span>暂无消息</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="!qutouPhone" class="login"><nuxt-link to="/login">登录</nuxt-link> / <nuxt-link to="/register">注册</nuxt-link></div>
                        <div v-if="qutouPhone" class="lginNo" >
                            <a href="javascript:;" @click="jumpPersonCenter">{{qutouPhone}}</a>
                            <!-- <b  @click="outLogin">退出登录</b> -->
                            <ul class="selectList">
                                <li @click="jumpPersonCenter">个人中心</li>
                                <li @click="outLogin">退出登录</li>
                            </ul>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchList from '~/components/indexComponents/SearchList';
import $ from 'jquery';
export default {
    name: 'Header',
    props: ["styleCls"],
    data(){
        return {
            // 搜索结果框是否显示
            searchListIsShow: false,
            // 
            qutouPhone: '',
            searchAreaPosition: {},//  搜索区域位置
            navBarPosition: {},// 导航栏位置
            crossIsShow: true, // 
            searchValue: '',// 搜索值
            timer: null, // 时间栈
            navStatus: 0,
            navArr: ['首页', '主题投资', '龙虎榜', '自选', '资讯', '关于我们'], //  导航内容
            newsList: [ //  消息盒 32个字符
                // {
                //     id: 0,
                //     type: '公告',
                //     title: '系统在11月20日进行不停机更新，请注意'
                // },
                // {
                //     id: 1,
                //     type: '公告',
                //     title: '系统在11月20日进行不停机更新，请注意'
                // },
                // {
                //     id: 2,
                //     type: '私信',
                //     title: '你已成功注册，成为本站用户'
                // }
            ],
            systemNewsList: [],
            perosonNewsList: []
        }
    },

    components: {
        SearchList
    },

    computed: {
        ...mapGetters(['systemInfomations', 'personInfomations'])
    },

    watch: {
        'systemInfomations'(newVal, oldVal){
            // console.log(newVal);
            this.systemInfoHandle(newVal.articles);
            this.personInfoHandle(this.personInfomations.msgList);
            this.newsList = [...this.systemNewsList, ...this.perosonNewsList];
        },

        '$route'(newVal, oldVal){
            // console.log(newVal.path);
            let path = newVal.path;
            if(path === '/' > -1){
                this.navStatus = 0;
            }else if(path.indexOf('/invest') > -1){
                this.navStatus = 1;

            }else if(path.indexOf('/billboard') > -1){
                this.navStatus = 2;
            }else if(path.indexOf('/select') > -1){
                this.navStatus = 3;
            }else if(path.indexOf('/information') > -1){
                
                this.navStatus = 4;
            }else if(path.indexOf('/about') > -1){
                this.navStatus = 5;
            }
            // console.log(path.indexOf('/information'));

            // console.log(this.navStatus);
        }
        
    },

    mounted(){
        this.routerPath();
        // 获取消息列表
        this.qutouPhone = sessionStorage.getItem('userName') || localStorage.getItem('userName');
        this.getInfomations({
            themePhone: this.qutouPhone
        });
        // 获取uuid
        

        // 全局绑定点击数事件
        this.globalClick(this.handleClickOut)

    },
    methods:{
        ...mapActions(['getInfomations', 'clearSearchVal', 'getQueryStockTheme']),

        // 搜索
        searchListInfo(){
            let phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            getQueryStockTheme({keyWords: searchValue, userToken: phone});
        },

        //  关闭搜索区域
        closeSearchArea(){
            this.searchAreaPosition = {height: '0'};
            
            setTimeout(()=>{
                this.navBarPosition = {height: '40px'};
                // 清除搜索缓存
                this.clearSearchVal();
            },500);
            this.crossIsShow = false;
            this.searchListIsShow = false;
        },
        // 打开搜索区域
        showSearchArea(){
            setTimeout(()=>{
                this.searchAreaPosition = {height: '40px'};

            },500);
            this.navBarPosition = {height: '0'};
            this.crossIsShow = true;
        },

        

        //  导航栏点击
        handleNav(event,index){
            this.navStatus = index;
            switch (index){
                case 0:   // 首页
                    this.$router.push({
                        path: '/',
                        
                    });
                break;
                case 1:  // 主题投资
                    this.$router.push({
                        path: '/invest'
                    });
                break;
                case 2: // 龙虎榜
                    this.$router.push({
                        path: '/billboard'
                    });
                break;
                case 3: // 自选股
                    this.$router.push({
                        path: '/select'
                    });
                break;
                case 4: // 资讯
                    this.$router.push({
                        path: '/information'
                    });
                break;
                case 5: // 关于我们
                    this.$router.push({
                        path: '/about'
                    });
                break;
                

            }
        },

        // 路由地址判断
        routerPath(){
            let path = this.$route.path;
            // console.log(path);
            switch(path){
                case '/':
                    this.navStatus = 0;
                break;
                case '/invest':
                
                    this.navStatus = 1;
                break;
                case '/invest/investCon':
                    this.navStatus = 1;
                break;
                case '/invest/themeSearch':
                    this.navStatus = 1;
                break;
                case '/billboard':
                    this.navStatus = 2;
                break;
                case '/select':
                    this.navStatus = 3;
                break;
                case '/information':
                    this.navStatus = 4;
                break;
                case '/about':
                    this.navStatus = 5;
                break;
                default :
                    this.navStatus = -1;
                
            }
        },

        // 进入个人中心
        jumpPersonCenter(){
            this.$router.push({
                path: '/personCenter'
                
            })
        },

        // 退出登录
        outLogin(){
            sessionStorage.removeItem('qutouPhone');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('isCertification');
            localStorage.removeItem('qutouPhone');
            localStorage.removeItem('userName');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('isCertification');

            location.reload();
        },

        // 系统消息数据处理 type 1系统消息   2私信
        systemInfoHandle(data){
            let arr = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    let obj = {
                        id: item.id,
                        type: 1,
                        title: item.title,
                        date: item.createTime
                    };
                    arr.push(obj)
                });
                this.systemNewsList = arr;
            }
        },
        // 个人消息数据处理

        personInfoHandle(data){
            let arr = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    let obj = {
                        id: item[0],
                        type: 2,
                        title: item[4],
                        date: item[3]
                    };
                    arr.push(obj)
                });
                this.perosonNewsList = arr;
            }
        },

        // 跳转个人中心 消息页
        jumpPersonInfoCenter(){
            this.$router.push({
                path: '/personCenter/message'
            })
        },

        // 字数限制
        wordLimit(w){
            if(w.length >= 19){
                return w.substring(0, 20) + '...';
            }else{
                return w;
            }
        },

        // 搜索列表点击后  隐藏该列表
        ImClick(bool){
            // bool { follow: true, jump: false }  不跳转页面
            // bool { follow: false, jump: true }  跳转页面
            if(bool.jump){
                this.searchListIsShow = !bool;
            }
        },

        // 判断是否点击在目标外
        handleClickOut(event){
            // console.log(event.target);
            // 如果不在目标元素内
            if($(event.target).parents('.SearchList').length === 0 && $(event.target).attr('id') !== 'searchValue'){
                // 隐藏
                this.searchListIsShow = false;
            }
        }
    }
}
</script>