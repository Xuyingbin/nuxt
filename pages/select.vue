<template>
<section class="selectContainer">
    <div class="container">
        <div class="addStockContainer">
            <h2>添加自选</h2>
            <!-- <h3>体验只能预警超强功能</h3> -->
            
            <div class="addStock">
                <h4 v-show="add" @click="addNow">搜索添加</h4>
                <div v-show="!add" class="searchArea">
                    <div class="search_input">
                        <input 
                            type="text" 
                            placeholder="请输入股票代码名称或主题名称"
                            @focus="focusIn"
                            v-model="searchVal"
                        >
                            <!-- @input="valInput" -->
                        <span style="margin-left:10px;" @click="cancelAdd">取消添加</span>
                        
                    </div>
                    
                </div>
            </div>        
        </div>

        <div class="stockListContainer">
            <!-- 当没有点击立即添加时 并且没有自选股时 热门推荐显示 -->
            <popular-recom v-if="isPopularShow" :conceptCount="optionalHotRecommend?optionalHotRecommend.info.conceptCount:''"></popular-recom>

            <!-- 点击立即添加  搜索区域显示 -->
            <search-area v-if="isSearchArea" :searchVal="searchVal"></search-area>

            <!-- 当登录了 有自选股时 自选列表显示 -->
            <stock-table :optional="optionalList" v-if="isOptionalList"></stock-table>
        </div>


    </div>
    
</section>
</template>

<script>
import PopularRecom from '~/components/selectStock/PopularRecom';
import searchArea from '~/components/selectStock/SearchArea';
import StockTable from '~/components/selectStock/StockTable';
import QueryList from '~/components/selectStock/QueryList';
import Util from '~/store/util';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
export default {
    layout: 'Dashboard',
    data(){
        return {
            conceptCount: 0,
            // 立即添加
            add: true,
            // 热门推荐
            isPopularShow: true,
            // 搜索区域
            isSearchArea: false,
            // 自选列表
            isOptionalList: false,
            // 搜索值
            searchVal: '',

            userPhone: ''
        }
    },
    head() {
        return {
        title: '自选 - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },
    async fetch ({ store, params }) {
        await Promise.all([
            axios.get(Util.baseUrl() + 'selfSelectInfo/getRecommend?device=1')
            
        ])
        .then(res => {
            // console.log(res);
            let [ hot ] = res;

            store.commit('OPTIONAL_HOT_RECOMMEND', hot.data);

        })
    },
    components: {
        PopularRecom,
        searchArea,
        StockTable,
        QueryList
    },

    computed: {
        ...mapGetters(['optionalList', 'optionalHotRecommend']),
        
    },

    watch: {
        'optionalList'(newVal, oldVal){
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            // console.log(this.userPhone);
            // debugger;
            // console.log(newVal);
            // 如果登录了 并且 有自选股
            if(this.userPhone && newVal.success){
                if( newVal.mySelect && newVal.mySelect.length !== 0){
                     // console.log(this.userPhone);
                    // 自选股列表显示
                    this.isOptionalList = true;
                    // 搜索列表隐藏
                    this.isSearchArea = false;
                    // 热门推荐隐藏
                    this.isPopularShow = false;
                }else{
                    // console.log('ddsa;');
                    // 自选股列表隐藏
                    this.isOptionalList = false;
                    // 搜索列表隐藏
                    this.isSearchArea = false;
                    // 热门推荐显示
                    this.isPopularShow = true;
                }
                
            }else{
                

                sessionStorage.removeItem('qutouPhone');
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('isCertification');
                localStorage.removeItem('qutouPhone');
                localStorage.removeItem('userName');
                localStorage.removeItem('loginTime');
                localStorage.removeItem('isCertification');
            }
        },
        'optionalHotRecommend'(newVal, oldVal){
            this.conceptCount = newVal.info.conceptCount || '';
        }
    },

    mounted(){
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
         // 进入 回到顶部
        if(this.$route.path === '/select'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // 获取自选股列表
        this.getOptionalStockList({userToken: this.userPhone});
        
        // 热门推荐列表
        // this.getOptionalHotRecommend();
    },

    methods: {
        ...mapActions(['getOptionalStockList', 'clearSearchVal']),
        // 取消添加
        cancelAdd(bool){
            // 如果是取消  bool 为true  所以立即添加显示
            this.add = bool;
            this.searchVal = '';
            // 如果登录了 并且 有自选股
            if(
               
                
                this.optionalList.mySelect && this.optionalList.mySelect.length !== 0){
                // 自选股列表显示
                this.isOptionalList = true;
                // 搜索列表隐藏
                this.isSearchArea = false;
                // 热门推荐隐藏
                this.isPopularShow = false;


            }else{
                // 自选股列表隐藏
                this.isOptionalList = false;
                // 搜索列表隐藏
                this.isSearchArea = false;
                // 热门推荐显示
                this.isPopularShow = true;
            }
        },
        // 立即添加
        addNow(){
            // 清除搜索缓存
            this.clearSearchVal();
            // 登录的session 或 local
            let storage = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');
            // 如果登录

            if(storage){
                // 显示搜索条
                this.add = !this.add;
                
            // 如果没登录
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
        },

        // 当搜索框获得焦点的时候
        focusIn(){
            // console.log(bool);
            // 如果获取了焦点
            
                // 搜索栏出现
                this.isSearchArea = true;
                // 热门推荐关闭
                this.isPopularShow = false;
                // 自选列表关闭
                this.isOptionalList = false;
            
            
        },

        // // 数据输入修改
        // valInput(event){
        //     console.log(event);

        // }

        
    }
}
</script>
