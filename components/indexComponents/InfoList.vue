<template>
<div>
    <div class="ThemeList" v-if="indexInfomation">
        <div v-for="(infos,index) in indexInfomation" class="dayContainer">
            
            <div class="flag" v-if="infos.data[0].isTop !== '1'">
                <span>{{infos.date.month }}月</span>
                <span>{{infos.date.day }}</span>
            </div>
            <div v-for="(info, index) in infos.data" class="row" style="margin:0;">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea" 
                       >
                        <div class="time"><i></i><span>{{info.date.hour}}:{{info.date.minute}}</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div  class="t-header" v-if="info.conceptStockInfo"
                            @mouseover="relationDetail({
                                infoId:{
                                    id:info.id, 
                                    infoName: info.infomationName
                                },
                                themeId:{
                                    id: info.conceptStockInfo?info.conceptStockInfo.id:null, 
                                    themeName: info.conceptStockInfo?info.conceptStockInfo.conceptStockName:null
                                },
                            })"
                        >
                            <span v-if="info.conceptStockInfo"> <a href="javascript:;" @click="jumpThemeDetail(info.conceptStockInfo.id)" class="textRed">{{info.conceptStockInfo.conceptStockName}}</a></span>
                            <b v-if="info.isTop === '1'"></b>
                        </div>
                        <div class="t-content">
                            <p>
                                <b style="margrin-right: 15px;font-weight: bold;">{{info.infomationName}}</b>
                                <!-- 120 -->
                                <!-- <span>万向钱潮披露三季报，公司前三季度营收80.46亿元，净利6.22亿元，分别同比增长3.47%、0.06%，基本每股收益0.23元。股东名单方面，<a href="javascript:;" class="textRed" style="text-decoration:underline;">铝电池</a> 由1.92%升至2.19%，升至第二大股东，1.92%升至2.19%，升至第二大股东1.92%</span>  -->
                                <span>{{articleWordLimit(info.infomationContent)}}</span> 
                                <span class="lookMore"><nuxt-link :to="'/article?id='+info.id" target="_blank">查看更多</nuxt-link></span>
                            </p>
                        </div>
                        <div class="t-footer" v-if="info.stockDetails.length !== 0">
                            <span v-for="stock in info.stockDetails" 
                                @click="jumpStockDetail(stock)">
                                <i :class="stock.changeRate>=0?'up':'down'"></i>
                                <b :class="stock.changeRate>=0?'textRed':'textGreen'">{{stock.stockName}}</b>
                                <b :class="stock.changeRate>=0?'textRed':'textGreen'">{{stock.changeRate>0?'+'+chgFormat(stock.changeRate)+'%':chgFormat(stock.changeRate)+'%'}}</b>
                            </span>
                            <!-- <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="dayContainer">
            <div class="flag">
                <span>10月</span>
                <span>23</span>
            </div>
            <div class="row" style="margin:0;">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>16:15</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span> <a href="javascript:;" class="textRed">保险</a></span>
                        </div>
                        <div class="t-content">
                            <p>
                                
                                <span>万向钱潮披露三季报，公司前三季度营收80.46亿元，净利6.22亿元，分别同比增长3.47%、0.06%，基本每股收益0.23元。股东名单方面，<a href="javascript:;" class="textRed" style="text-decoration:underline;">铝电池</a> 由1.92%升至2.19%，升至第二大股东，1.92%升至2.19%，升至第二大股东1.92%</span> 
                                <span class="lookMore"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div class="dayContainer">
            <div class="flag">
                <span>10月</span>
                <span>23</span>
            </div>
            <div class="row" style="margin:0;">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>16:15</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span> <a href="javascript:;" class="textRed">保险</a></span>
                        </div>
                        <div class="t-content">
                            <p>
                                
                                <span>万向钱潮披露三季报，公司前三季度营收80.46亿元，净利6.22亿元，分别同比增长3.47%、0.06%，基本每股收益0.23元。股东名单方面，<a href="javascript:;" class="textRed" style="text-decoration:underline;">铝电池</a> 由1.92%升至2.19%，升至第二大股东，1.92%升至2.19%，升至第二大股东1.92%</span> 
                                <span class="lookMore"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        
    
        
    </div>
    <div class="getMore">
        <span><nuxt-link to="/information">更多</nuxt-link></span>
    </div>
    
</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ["indexInfomation"],
    data(){
        return {
            isHaveInfoData: false
        }
    },
    watch:{
        // 'indexInfoArr'(newVal, oldVal){
        //     // console.log(newVal);
        //     newVal.map((item) => {
        //         if(this.isHaveInfoData){ // 如果为true 储存当前资讯id
        //         console.log('idlas');
        //             this.saveCurrentInfo({id: item.id, infoName: item.infoName});

        //             return;
        //         }else{
        //             // 继续请求
        //             this.getInfoRelationTheme({informationId: item.id});
                    
        //         }
        //     });
        // },
        // 'indexInfomation'(newVal, oldVal){
            // if(newVal){  //  如果不为null   修改为true
            // console.log(newVal);
            //     this.isHaveInfoData = true;
            // }
        // }
    },
    computed:{
        // ...mapGetters(['indexInfoArr', 'themeConceptInfo'])
    },
    mounted(){
        // console.log(this.indexInfomation);
        // console.log(this.$store);
    },
    methods: {
        ...mapActions([
            'saveCurrentInfo', 
            'getInfoRelationTheme', 
            'saveCurrentTheme', 
            'getRelationThemeQuo',
            'saveCurrentStock'
            
        ]),
        // 文章字数限制
        articleWordLimit(str){
            
            return str.replace(/<[^>]+>/g,"").replace(/[&][l][t][;][\w\s\n\/]+[&][g][t][;]/g,"").replace(/[&][n][b][s][p][;]/g,"").replace(/[&][\w\d\s]*[;]/g, '').slice(0, 70)+'...';
        },

        // 涨跌幅 格式
        chgFormat(num){
            return (parseFloat(num)).toFixed(2);
        },

        // 关联详情
        relationDetail(obj){
            // console.log(obj);
            // 保存资讯信息
            this.saveCurrentInfo(obj.infoId);
            // this.getInfoRelationTheme({informationId: obj.infoId.id});

            // 保存主题信息
            this.saveCurrentTheme(obj.themeId);
            this.getRelationThemeQuo({conceptStockId: obj.themeId.id})

        },

        // 跳转股票详情页
        jumpStockDetail(obj){
            // console.log(obj);
            let {stockCode, stockName} = obj;
            let timer = setTimeout(()=>{
                this.saveCurrentStock({
                    stockCode: stockCode,
                    stockName: stockName
                });
                clearTimeout(timer);
            },0)
            
            // console.log(this.$route.path);
            window.open(`/stockDetails?code=${stockCode}&name=${stockName}`);
            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: stockCode,
            //         name: stockName
            //     }
            // })
        },
        jumpThemeDetail(id){
            window.open('/themeDetails?id='+id);
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: id
            //     }
            // })
        }
    }
}
</script>

