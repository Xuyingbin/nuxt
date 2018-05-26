<template>
<div class="SearchBox">
    <div class="titleNav">
        <ul>
            <li @click="handleNav(2)"><span :class="navIndex === 2?'active':''">全部</span></li>
            <li @click="handleNav(0)"><span :class="navIndex === 0?'active':''">主题</span></li>
            <li @click="handleNav(1)"><span :class="navIndex === 1?'active':''">股票</span></li>
        </ul>
    </div>
    
    <div class="searchResult" v-if="queryStockThemeObj && noNull">
        <div class="resultNum" >
            找到 <b class="textRed">{{queryStockThemeObj.result.count}}</b> 个搜索结果
        </div>
        <ul>
            <li v-for="info in queryStockThemeObj.result.list">
                <span v-if="info.infoType === 0">
                    <nuxt-link :to="'/themeDetails?id='+info.infoId">

                        {{info.infoName}}
                    </nuxt-link>
                </span>
                <span v-if="info.infoType === 1">
                    <nuxt-link
                        :to="'/stockDetails?code='+info.infoCode+'&name='+info.infoName"
                    >

                        {{info.infoName}}( {{info.infoCode+'.'+info.dataType}} )
                    </nuxt-link>
                </span>
                
                <!-- 如果没有关注 或没有登录 -->
                <span v-if="!info.isAttention" class="addFollow" 
                    @click="addFollow({
                        
                        infoId: info.infoId,
                        infoToken: info.infoType === 0?info.infoName:info.infoCode,
                        infoType: info.infoType
                    })"
                ><b>+</b><strong>关注</strong></span>
                <!-- 已经关注 -->
                <span v-if="info.isAttention"
                    @click="cancelFollow({
                        
                        infoId: info.infoId,
                        
                        infoType: info.infoType
                    })"
                ><strong>取消关注</strong></span>
            </li>
            <!-- <li>
                <span>万达影视( 000001.sz )</span>
                <span class="addFollow"><b>+</b><strong>关注</strong></span>
            </li> -->
            <!-- <li>
                <span>人工智能化产业</span>
                <span>取消关注</span>
            </li> -->
            
        </ul>

        <div class="pagegration" v-if="queryStockTheme && queryStockTheme.result.count>10">
            <page-select 
                @changePage="newChangePage" 
                :totalNum="queryStockTheme.result.count" 
                :pageSize="10"
                :currentPageNo="currentPage"
            ></page-select>
        </div>
        <comfirm-box v-if="isAttentionShow" :title="titleText"></comfirm-box>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageSelect from '~/components/invest/PageSelect';
import ComfirmBox from '../alertBox/ConfirmBox';
export default {
    props: ["searchVal"],
    data(){
        return {
            timer: null,
            // 输入内容不为空 则显示搜索列表   为空时 不显示列表也不请求
            noNull: true,
            // 导航栏
            navIndex: 2,
            // 当前页
            currentPage: 1,

            // 关注信息
            followInfo: null,

            // 关注失败 显示弹出框
            isAttentionShow: false,
            // 提示文本
            titleText: '',

            userPhone: ''
        }
    },

    components: {
        PageSelect,
        ComfirmBox
    },

    computed: {
        ...mapGetters(['queryStockTheme', 'optionalAddFollow', 'optionalCancelFollow']),
        queryStockThemeObj(){
            return this.queryStockTheme?this.queryStockTheme:null;
        }
    },

    watch: {
        'searchVal'(newVal, oldVal){
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            // console.log('搜索内容' + newVal);
            if(newVal === ''){
                // 输入内容不为空 则显示搜索列表   为空时 不显示列表也不请求
                this.noNull = false;
            }else{
                

                this.noNull = true;
                //  搜索节流
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.getQueryStockTheme({
                        userToken: this.userPhone,
                        keyWords: newVal,
                        pageNo: 1
                    })
                    // console.log(newVal);
                }, 500);
            }
            
        },

        'optionalAddFollow'(newVal, oldVal){
            console.log(newVal)
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            if(this.userPhone){   
                // 如果关注成功
                if(newVal.success && newVal.attention){
                    
                    // console.log('关注成功');
                    
                    this.queryStockThemeObj.result.list.map((item) => {
                        // console.log(item.infoId);
                        // console.log(this.followInfo.infoId);
                        // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                        if(item.infoId === this.followInfo.infoId && item.infoType === this.followInfo.infoType){
                            // console.log('关注')
                            // 修改关注状态
                            item.isAttention = newVal.attention;
                        }
                    });
                    
                }else{
                    // 如果关注失败
                    this.titleText = '关注失败';
                    this.isAttentionShow = true;
                    let timer = setTimeout(()=>{
                        this.isAttentionShow = false;
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                // 如果没有登录
                this.$router.push({
                    path: '/login'
                })
            }
            // console.log(newVal);
        },

        'optionalCancelFollow'(newVal, oldVal){
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;

            // console.log(newVal);
            if(this.userPhone){   
                // 如果关注成功
                if(newVal.success){
                    // console.log('关注成功');
                    
                    this.queryStockThemeObj.result.list.map((item) => {
                        // console.log(item.infoId);
                        // console.log(this.followInfo.infoId);
                        // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                        if(item.infoId === this.followInfo.infoId && item.infoType === this.followInfo.infoType){
                            // console.log('关注')
                            // 修改关注状态
                            item.isAttention = false;
                        }
                    });
                    
                }else{
                    // 如果取消关注失败
                    this.titleText = '关注失败';
                    this.isAttentionShow = true;
                    let timer = setTimeout(()=>{
                        this.isAttentionShow = false;
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                // 如果没有登录
                this.$router.push({
                    path: '/login'
                })
            }
            // console.log(newVal);
        }

    },

    mounted(){
        // console.log(this.searchVal);
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
    },

    methods: {
        ...mapActions(['getQueryStockTheme', 'addOptionalFollowAction', 'cancelOptionalFollowAction']),
        newChangePage(val){
            // console.log(val);
            this.getQueryStockTheme({
                userToken: this.userPhone,
                infoType: this.navIndex,
                keyWords: this.searchVal,
                pageNo: val
            });
        },
        // 导航栏切换
        handleNav(index){
            this.navIndex = index;
            this.getQueryStockTheme({
                userToken: this.userPhone,
                infoType: index,
                keyWords: this.searchVal,
                pageNo: 1
            });
            // 根据组件写的逻辑  只有currentPageNo改变的时候 才会监听到currentPage数值
            //  并且 修改组件中的 currentPage
            //  如果currentPageNo 小于1 也会重置为1 
            // 现在需要重置 所以 每次改变比1小的数值
            --this.currentPage;
        },

        // 添加关注
        addFollow(obj){
            let { infoId, infoToken, infoType } = obj;
            this.followInfo = {
                // userToken: this.userPhone,
                infoId: infoId,
                infoType: infoType
            }
            // console.log(this.userPhone);
            // debugger;
            // console.log(obj);
            this.addOptionalFollowAction({...obj, userToken: this.userPhone});
        },

        // 取消关注
        cancelFollow(obj){
            let { infoId, infoType } = obj;
            this.followInfo = {
                infoId: infoId,
                infoType: infoType,
                phone: this.userPhone
            }
            this.cancelOptionalFollowAction({
                phone: this.userPhone,
                id: infoId,
                type: infoType
            });
        }
    }
}
</script>

