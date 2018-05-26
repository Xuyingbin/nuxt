<template>
<div>
<label-bar :title="navTitle"></label-bar>
<div class="RelatedShares" v-if="relationStock" :style="singleStyle">
    
    <div class="stocksList" v-for="stock in relationStock" >
        <div class="itemStock">
            <div class="itemTitle"
                @click="jumpStockDetail({
                    stockName: stock.stockName,
                    stockCode: stock.stockCode
                })"
            >
                <span>{{stock.stockName}}</span>
                <span>{{stock.stockCode+'.'+stock.stockType}}</span>
                <span v-if="!stock.stop" :class="stock.changeRate>=0?'textRed':'textGreen'">{{(stock.currentPrice).toFixed(2)}}</span>
                <span v-if="!stock.stop" :class="stock.changeRate>=0?'textRed':'textGreen'">
                    {{stock.changeRate>=0?'+'+(stock.changeRate).toFixed(2)+'%':(stock.changeRate).toFixed(2)+'%'}}
                </span>
                <span v-if="stock.stop" class="textRed">停牌</span>
            </div>
            <!-- 60个字 -->
            <div class="itemContent">
                <!-- <p>公司主营为计算机终端及外部设备、金融机具、税控机具及商用电子设备、计量仪表、安防产品、通信及网络产品、</p> -->
                <p>{{stock.associateReason}}</p>
            </div>
            <div class="itemFooter" v-if="stock.conceptStockInfoVos.length !== 0">
                <h3 v-for="theme in stock.conceptStockInfoVos" @click="jumpThemeDetail(theme.id)">{{theme.conceptStockName}}</h3>
                <!-- <h3>特色小镇</h3>
                <h3>京津冀一体化</h3> -->
            </div>
        </div>
        <!-- <div class="itemStock">
            <div class="itemTitle">
                <span>三一重工</span>
                <span>320045.SZ</span>
                <span class="textRed">20.36</span>
                <span class="textRed">+1.12%</span>
            </div>
            
            <div class="itemContent">
                <p>公司主营为计算机终端及外部设备、金融机具、税控机具及商用电子设备、计量仪表、安防产品、通信及网络产品、</p>
            </div>
            <div class="itemFooter">
                <h3>中国电子集团</h3>
                <h3>特色小镇</h3>
                <h3>京津冀一体化</h3>
            </div>
        </div> -->
    </div>
</div>
</div>

</template>

<script>
import LabelBar from './Label';
export default {
    props: ["relationStock","singleStyle"],
    data(){
        return {
            navTitle: '相关个股'
        }
    },
    components: {
        LabelBar
    },

    methods: {
        // 字数限制
        wordLimit(w){
            if(w.length > 42){

                return w.slice(0,42) + '...';
            }else{
                return w;
            }
        },

        // 跳转股票详情页
        jumpStockDetail(obj){
            let { stockName, stockCode } = obj;

            window.open(`/stockDetails?code=${stockCode}&name=${stockName}`);
            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: stockCode,
            //         name: stockName
            //     }
            // })
        },

        // 跳转主题详情页
        jumpThemeDetail(id){
            // console.log(id);
            window.open('/themeDetails?id='+id);
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: id
                    
            //     }
            // });

            // location.reload();
        }
    }
}
</script>

