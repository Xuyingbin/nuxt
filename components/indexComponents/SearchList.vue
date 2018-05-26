<template>
<div>
    <!-- 用户输入为空 -->
    <div v-if="!listShow" class="SearchList">
        <dl v-if="query_history">
            <dt>最近搜索</dt>
            <dd v-for="info in query_history"
                @click="handleEnterDetails({
                        type: info.type,
                        id: info.id,
                        name: info.name,
                        code: info.code,
                        marketCode: info.dataType
                    })"
            >
                <span>{{info.name}}</span>
                <!-- <b>关注</b> -->
            </dd>
            <!-- <dd>
                <span>人工智能化</span>
                <b class="cancelFollow">取消关注</b>
            </dd>
            <dd>
                <span>中国产业链</span>
                <b>关注</b>
            </dd>  -->
        
            
        </dl>
        <dl v-if="queryHotSearch">
            <dt>热门搜索</dt>
            <dd v-for="info in queryHotSearch.hotLost"
                @click="handleEnterDetails({
                        type: info.infoType,
                        id: info.infoId,
                        name: info.infoName,
                        code: info.infoToken,
                        marketCode: info.dataType
                    })"
            >
                <span>{{info.infoName}}</span>
                <!-- <b>关注</b> -->
            </dd>
            <!-- <dd>
                <span>中国重汽</span>
                <b>关注</b>
            </dd>
            <dd>
                <span>人工智能化</span>
                <b>关注</b>
            </dd>
            <dd>
                <span>中国产业链</span>
                <b>关注</b>
            </dd> -->
        
        </dl>
    </div>
    <!-- 用户输入不为空 -->
    
    <div v-if="listShow" class="SearchList">
        <dl v-if="themeList && themeList.length !== 0">
            <dt>主题</dt>
            
            <dd v-for="theme in themeList">
                <span
                    @click="handleEnterDetails({
                        type: theme.type,
                        id: theme.id,
                        name: theme.name,
                        code: theme.code,
                        marketCode: theme.marketCode
                    })"
                >{{theme.name}}</span>
                <b 
                    @click="handleFollow({
                        isAttention: theme.follow,
                        infoId: theme.id,
                        infoToken: theme.name,
                        infoType: theme.type
                    })" 
                    :class="theme.follow?'cancelFollow':''"
                >
                    {{theme.follow?'取消关注':'关注'}}
                </b>
            </dd>
            <!-- <dd>
                <span>人工智能化</span>
                <b class="cancelFollow">取消关注</b>
            </dd>
            <dd>
                <span>中国产业链</span>
                <b>关注</b>
            </dd> -->
        
            
        </dl>
        <dl v-if="stockList && stockList.length !== 0">
            <dt>个股</dt>
            <dd v-for="stock in stockList">
                <span
                    @click="handleEnterDetails({
                        type: stock.type,
                        id: stock.id,
                        name: stock.name,
                        code: stock.code,
                        marketCode: stock.marketCode
                    })"
                >{{stock.name}}</span>
                <b 
                    @click="handleFollow({
                        isAttention: stock.follow,
                        infoId: stock.id,
                        infoToken: stock.code,
                        infoType: stock.type
                    })" 
                    :class="stock.follow?'cancelFollow':''"
                >
                    {{stock.follow?'取消关注':'关注'}}
                </b>
            </dd>
            <!-- <dd>
                <span>人工智能化</span>
                <b>关注</b>
            </dd>
            <dd>
                <span>中国产业链</span>
                <b>关注</b>
            </dd> -->
        
        </dl>
    </div>
    
</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ["searchValue"],
    data(){
        return {
            // 定时器个数
            timer: null,
            // 如用户搜索内容不为空，则显示搜索列表
            listShow: false,
            // 个股列表
            stockList: null,
            // 主题列表
            themeList: null,
            // 关注信息
            followInfo: null,
            query_history: '',

            userPhone: ''

        }
    },

    watch: {
        'searchValue'(newVal, oldVal){
            // console.log('搜索内容'+ newVal)
            if(newVal === ''){
                

                
            }else{
                this.listShow = true;
                //  搜索节流
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.getQueryStockTheme({
                        keyWords: newVal,
                        userToken: this.userPhone
                    });
                    // console.log(newVal);
                }, 500);
            }
            
        
        },
        'queryStockTheme'(newVal, oldVal){
            // console.log(newVal);
            this.handleDataGroup(newVal?newVal.result.list:[]);
        },
        'optionalAddFollow'(newVal, oldVal){
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            // console.log(newVal);
            if(this.userPhone){   
                // 如果关注成功
                if(newVal.success && newVal.attention){
                    // console.log('关注成功');
                    
                    if(this.followInfo && this.followInfo.infoType === 0){
                        this.themeList.map((item) => {
                            // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                            if(item.id === this.followInfo.infoId && item.type === this.followInfo.infoType){
                                // console.log('关注')
                                // 修改关注状态
                                item.follow = newVal.attention;
                            }
                        })
                    }else{
                        this.followInfo?this.stockList.map((item) => {

                            // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                                if(item.id === this.followInfo.infoId && item.type === this.followInfo.infoType){
                                    // console.log('关注')
                                    // 修改关注状态
                                    item.follow = newVal.attention;
                                }
                        }):null;
                    }
                    
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
            
        },
        'optionalCancelFollow'(newVal, oldVal){
            this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            if(this.userPhone){   
                // 如果取消关注成功
                if(newVal.success){
                    // console.log('关注成功');
                    
                    if(this.followInfo && this.followInfo.infoType === 0){
                        this.themeList.map((item) => {
                            // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                            if(item.id === this.followInfo.infoId && item.type === this.followInfo.infoType){
                                // console.log('关注')
                                // 修改关注状态
                                item.follow = true;
                            }
                        })
                    }else{
                        console.log(this.followInfo);
                        // debugger;
                        this.followInfo?this.stockList.map((item) => {
                            // 如果 infoId infoType 跟点击的Id相同 则修改关注状态
                                if(item.id === this.followInfo.infoId && item.type === this.followInfo.infoType){
                                    // console.log('关注')
                                    // 修改关注状态
                                    item.follow = false;
                                }
                        }):null;
                    }
                    
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
        }
    },

    computed: {
        ...mapGetters([
            'queryHotSearch', 
            'queryStockTheme',
            'optionalAddFollow',
            'optionalCancelFollow'
        ]),
        
    },

    created(){
        
        
        
    },

    mounted(){
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
        this.query_history = JSON.parse(sessionStorage.getItem('query_history'));
        this.getQueryHotSearch();
    },

    methods: {
        ...mapActions([
            'getQueryHotSearch', 
            'getQueryStockTheme', 
            'addOptionalFollowAction', 
            'cancelOptionalFollowAction'
        ]),
        
        // 点击进入个股 或主题详情
        handleEnterDetails(obj){
            console.log(obj);
            

            /**
             * 
             * type 0 为主题 1 为个股 
             * id 主题id
             * name 主题名称 或 个股名称
             * code 股票代码
             * 
            **/
            let { type, id, name, code, marketCode } = obj;

            if(type === 0){
                window.open('/themeDetails?id='+id);
                // this.$router.push({
                //     path: '/render/themeDetails',
                //     query: {
                //         id: id
                //     }
                // })
            }else if(type === 1){
                window.open(`/stockDetails?code=${code}&name=${name}`);
                // this.$router.push({
                //     path: '/render/stockDetails',
                //     query: {
                //         name: name,
                //         code: code,
                //         marketCode: marketCode
                //     }
                // })
            }

            this.handleHistorySearch(obj);

            this.$emit('ImClick', {follow: false, jump: true});
            
        },


        // 数据分组 个股组 和  主题组
        handleDataGroup(data){
            // console.log(data);
            let stockArr = [];
            let themeArr = [];
            if(data && data.length !== 0){
                
                data.map((item, index) => {
                    // 只取前20多条  （只是取一个大概）
                    if(index <= 20){
                        let obj = {
                            type: item.infoType,
                            id: item.infoId,
                            name: item.infoName,
                            code: item.infoCode,
                            marketCode: item.dataType,
                            follow: item.isAttention
                        }
                        // 如果是主题
                        if(item.infoType === 0){
                            
                            // 只取 5条
                            if(themeArr.length <= 5){
                                
                                themeArr.push(obj);
                            }else{
                                return;
                            }
                            
                        }

                        // 如果是个股
                        if(item.infoType === 1){
                            
                            // 只取 5条
                            if(stockArr.length <= 5){
                                stockArr.push(obj);
                            }else{
                                return;
                            }
                        }

                    }else{
                        return;
                    }
                });

                this.themeList = themeArr;
                // console.log(this.themeList);
                this.stockList = stockArr;
                // console.log(this.stockList);
            }
        },

        // 判断历史搜索  去重
        handleHistorySearch(obj){

            let query_history = JSON.parse(sessionStorage.getItem('query_history'));
            let themeBool = true; // 主题是否重复
            let stockBool = true; // 个股
            if(query_history && query_history.length !== 0){
                query_history.map( (item, index) => {
                    // debugger;
                    // 对比主题ID
                    if(obj.type === 0){
                        // debugger;
                        themeBool = item.id === obj.id;

                        if(index >= query_history.length - 1){
                            themeBool?null:query_history.unshift(obj);
                        }
                    }
                    // 对比股票code
                    if(obj.type === 1){
                        // debugger;
                        stockBool = item.code === obj.code;

                        if(index >= query_history.length - 1){
                            stockBool?null:query_history.unshift(obj);
                        }
                        
                    }
                });
            }else{
                query_history.unshift(obj);
            }
            
            // 只取 前三条记录
            sessionStorage.setItem('query_history', JSON.stringify(query_history.slice(0, 3)));
            // 更新 历史搜索
            this.query_history = JSON.parse(sessionStorage.getItem('query_history'));
            
        },

        // 点击关注 或取消关注
        handleFollow(obj){
            let { isAttention, infoId, infoToken, infoType } = obj;
            this.followInfo = {
                infoId: infoId,
                infoType: infoType
            }
            // isAttention 布尔值  
            // 如果为 true 为已关注 调用 取消关注 的方法 cancelOptionalFollowAction
            if(isAttention){
                this.cancelOptionalFollowAction({
                    phone: this.userPhone,
                    id: infoId,
                    type: infoType
                });
                
            }else{
                // 如果为 false 为没有关注 调用 关注 方法 addOptionalFollowAction
                this.addOptionalFollowAction({
                    userToken: this.userPhone,
                    infoId: infoId,
                    infoToken: infoToken,
                    infoType: infoType
                })

            }
            this.$emit('ImClick', {follow: true, jump: false});

        }


    }
}
</script>
