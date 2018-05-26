<template>
<div style='height:900px;overflow:auto'>
<table class="boardListTable">

    <thead>
        <tr>
            <th></th>
            <th>股票</th>
            <th>涨跌幅 
                <span 
                    :class="active==='chg_down'?'fa fa-long-arrow-down active':'fa fa-long-arrow-down'"
                    @click="stockSort('chg_down')"
                ></span> 
                <span 
                    :class="active==='chg_up'?'fa fa-long-arrow-up active':'fa fa-long-arrow-up'"
                    @click="stockSort('chg_up')"
                ></span> 
            </th>
            <th>净买入(元) 
                <span 
                    :class="active==='amount_down'?'fa fa-long-arrow-down active':'fa fa-long-arrow-down'"
                    @click="stockSort('amount_down')"
                ></span> 
                <span 
                    :class="active==='amount_up'?'fa fa-long-arrow-up active':'fa fa-long-arrow-up'"
                    @click="stockSort('amount_up')"
                ></span>
            </th>
        </tr>
    </thead>
    <tbody >
        <!-- <tr v-if="boardList.code" v-for="(stockBillboard,index) in boardList.stockHeroList" class="active"> -->
        <tr v-if="boardList.code" v-for="(stockBillboard,index) in boardList.stockHeroList" @click="
            stockDetail(
                {
                stockCode: stockBillboard.stockCode,
                index: index, 
                stockName: stockBillboard.stockName,
                heroId: stockBillboard.id
                }
        )">
            <td>
                <span>{{index + 1}}</span>
            </td>
            <td>
                <span>{{stockBillboard.stockName}}</span>
                <span>{{stockBillboard.stockCode}}</span>
            </td>
            <td :class="stockBillboard.chg >= 0?'textRed':'textGreen'">
                {{stockBillboard.chg}}%
            </td>
            <td :class="formatMoney(stockBillboard.netAmount)>=0?'textRed':'textGreen'">
                
                {{formatMoney(stockBillboard.netAmount)+'万'}}
                
            </td>
            
        </tr>
        
        <!-- <tr>
            <td>
                <span>1</span>
            </td>
            <td>
                <span>华讯方舟</span>
                <span>000687</span>
            </td>
            <td class="textGreen">
                -6.45%
            </td>
            <td class="textRed">3126.21万</td>
        </tr>
        <tr>
            <td>
                <span>1</span>
            </td>
            <td>
                <span>华讯方舟</span>
                <span>000687</span>
            </td>
            <td class="textGreen">
                -6.45%
            </td>
            <td class="textRed">3126.21万</td>
        </tr>
        <tr>
            <td>
                <span>1</span>
            </td>
            <td>
                <span>华讯方舟</span>
                <span>000687</span>
            </td>
            <td class="textGreen">
                -6.45%
            </td>
            <td class="textRed">3126.21万</td>
        </tr> -->
    </tbody>
    
</table>
<div v-if="!boardList.code" class="nodata">
    <span>{{boardList.msg}}</span>

</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    // props: ["billListData"],
    data(){
        return {
            active: 'chg_down'
        }
    },

    computed:{
        ...mapGetters(['boardList'])
    },
    mounted(){
       
    },

    methods: {
        ...mapActions(['currentStock', 'getStockDetail', 'getKLineData', 'getStockDetail_billboard']),
        // 钱  格式化
        formatMoney(m){
            let newM = (parseFloat(m) / 10000).toFixed(2);

            return newM;
        },

        //  个股详情
        
        stockDetail(stockInfo){
            // console.log(stockInfo);
            let {stockCode, index, stockName, heroId} = stockInfo;

            let stock = {
                stockCode: stockCode.split('.')[0],
                stockName: stockName,
                market: stockCode.split('.')[1],
                heroId: heroId
            }

            this.currentStock(stock);
            this.getStockDetail({stockCode: stockCode.split('.')[0]});
            // console.log(stock);

            this.getKLineData({
                stockCode: stockCode.split('.')[0],
                month: 12
            }); // k线图

            // 上榜详情
            this.getStockDetail_billboard({
                heroId: heroId
            })
        },

        stockSort(name){
            this.active = name;
            // 涨跌幅 正序
            if(name === 'chg_down'){
                this.$emit('stockSort', {
                    sortKey: 'chg',
                    sortType: 'ASC'
                })
            }
            // 涨跌幅 倒序
            if(name === 'chg_up'){
                this.$emit('stockSort', {
                    sortKey: 'chg',
                    sortType: 'DESC'
                })
            }
            if(name === 'amount_down'){
                this.$emit('stockSort', {
                    sortKey: 'netAmount',
                    sortType: 'ASC'
                })
            }
            if(name === 'amount_up'){
                this.$emit('stockSort', {
                    sortKey: 'netAmount',
                    sortType: 'DESC'
                })
            }
        }
    }

}
</script>

<style>
section.billBoardContainer .billboardColumn .billboardLeft .boardList .boardListTable tbody tr td:nth-child(1) span{
    width: 22px;
    height: 22px;
    line-height:22px;
}
section.billBoardContainer .billboardColumn .billboardLeft .boardList .nodata{
    width: 100%;
    text-align: center;
    line-height: 60px;
    color: #f00;
    background: #fff;
}
</style>
