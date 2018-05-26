<template>
<div>
   
    <div class="ThemeList" v-if="ssrList">
        <div class="dayContainer"  v-for="list in ssrList">
            
            <div class="flag" v-if="!list.isSame">
                
                <span>{{dateSplit(list.date)[1]}}月</span>
                <span>{{dateSplit(list.date)[2]}}</span>
            </div>
            <div class="row" style="margin:0;" v-for="info in list.infoMapList">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>{{timeFormat(info.infomation.infomationTime)}}</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span v-if="info.conceptVo" @click="jumpThemeDetail(info.conceptVo.infoId)"> <a href="javascript:;" class="textRed">{{info.conceptVo.infoName}}</a></span>
                        </div>
                        <div class="t-content">
                            
                            <p>
                                <strong style="margrin-right: 15px;">{{info.infomation.infomationName}}</strong>
                                <span>{{articleWordLimit(info.infomation.infomationContent)}}</span> 
                                <span class="lookMore" @click="jumpArticle(info.infomation.id)"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span v-for="stock in info.stockVoList" 
                                @click="jumpStockDetail({
                                    stockName: stock.infoName,
                                    stockCode: stock.infoCode
                                })"
                            >
                                <i :class="stock.chg>=0?'up':'down'"></i>
                                <b :class="stock.chg>=0?'textRed':'textGreen'">{{stock.infoName}}</b>
                                <b :class="stock.chg>=0?'textRed':'textGreen'">{{stock.chg>0?'+'+chgFormat(stock.chg)+'%':chgFormat(stock.chg)+'%'}}</b>
                            </span>
                            
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
        </div>
        <div class="dayContainer">
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
    
    
</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "~/utils/format";
export default {
    props: ["ssrList"],
  data() {
    return {
      

      //
      // lastDate: ''
    };
  },

  computed: {
    // ...mapGetters(["infomationList"]),
    // lastDate(){
    //     let date = '';
    //     for(let key in   this.infomationList.resultMap){
    //         date = key;
    //     }
    //     // 最后一次记录的时间
    //     return date;
    // }
    // ssrInfoList(newVal, oldVal){
    //     console.log(newVal);
    //     return this.initInfoList;
    // }
  },

  watch: {
    
  },
  mounted() {
    // console.log(this.indexInfoArr);
    console.log(this.ssrList);
    // console.log(this.infomationList);
  },
  methods: {
    // ...mapActions(["getInfomationList"]),

    

    // 文章字数限制
    articleWordLimit(str) {
      return (
        str
          .replace(/<[^>]+>/g, "")
          .replace(/[&][l][t][;][\w\s\n\/]+[&][g][t][;]/g, "")
          .replace(/[&][[n][b][s][p]][;]/g, "")
          .replace(/[&][\w\d\s]*[;]/g, "")
          .slice(0, 100) + "..."
      );
    },

    // 涨跌幅 格式
    chgFormat(num) {
      if (num) {
        return parseFloat(num).toFixed(2);
      } else {
        return "0.00";
      }
    },

    // 时间分割
    dateSplit(date) {
      return date.split("-");
    },

    

    // 时间格式
    timeFormat(time) {
      return new Date(time).format("hh:mm");
    },

    // 跳转股票详情页
    jumpStockDetail(obj) {
      let { stockCode, stockName } = obj;

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
    jumpThemeDetail(id) {
      window.open("/themeDetails?id=" + id);
      // this.$router.push({
      //     path: '/render/themeDetails',
      //     query: {
      //         id: id
      //     }
      // })
    },

    

    // 查看文章详情
    jumpArticle(id) {
      window.open("/article?id=" + id);
      // this.$router.push({
      //     path: '/render/article',
      //     query: {
      //         id: id
      //     }
      // })
    }
  }
};
</script>

