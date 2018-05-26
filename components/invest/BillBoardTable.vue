<template>
<table class="billBoardTable" v-if="billBoardTable">
    <thead >
        <tr>
            <th  v-for="head in billBoardTable.thead">
                <!-- :class="active==='chg_down'?'fa fa-long-arrow-down active':'fa fa-long-arrow-down'" -->
                
                {{head.name}}
                <b>
                    <span 
                        v-if="head.isSort"
                        :class="active==='ASC'+billBoardTable.type+head.sortKey?'fa fa-caret-down active':'fa fa-caret-down'"
                        @click="stockSort({
                            type: billBoardTable.type,
                            sortKey: head.sortKey,
                            sortType: 'ASC'
                        })"
                    ></span> 
                    <!-- :class="active==='chg_up'?'fa fa-long-arrow-up active':'fa fa-long-arrow-up'" -->
                    <span v-if="head.isSort"
                        
                        :class="active==='DESC'+billBoardTable.type+head.sortKey?'fa fa-caret-up active':'fa fa-caret-up'"
                        @click="stockSort({
                            type: billBoardTable.type,
                            sortKey: head.sortKey,
                            sortType: 'DESC'
                        })"
                    ></span> 
                </b>
                
            </th>
            <!-- <th>合计买入(亿)</th>
            <th>合计卖出(亿)</th>
            <th>净买入(亿)</th>
            <th>涨跌幅</th>
            <th>个股总数</th>
            <th>上榜个股</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="body in billBoardTable.tbody">
            <td><span><nuxt-link :to="'/themeDetails?id='+body.id" target="_blank">{{body.conceptName}}</nuxt-link> </span></td>
            <td class="textRed">{{ formatMoney(body.inAmount) }}</td>
            <td class="textRed">{{formatMoney(body.outAmount)}}</td>
            <td :class="body.netAmount>=0?'textRed':'textGreen'">{{formatMoney(body.netAmount)}}</td>
            <td :class="body.changeRate>=0?'textRed':'textGreen'">
                {{ body.changeRate === 0?0: body.changeRate + '%'}}
            </td>
            <td>{{body.heroCount}}</td>
            <td>
                <span v-for="stock in body.maxStockList">
                    <nuxt-link :to="'/stockDetails?code='+stock.stockCode+'&name='+stock.stockName" target="_blank">

                        {{stock.stockName}}
                    </nuxt-link>
                </span>
                <!-- <span>江西铜业</span>
                <span>江西铜业</span> -->
            </td>
        </tr>
        <!-- <tr>
            <td><span>有色金属</span></td>
            <td>1.45</td>
            <td>1.42</td>
            <td>0.03</td>
            <td>1.3%</td>
            <td>3</td>
            <td>
                <span>江西铜业</span>
                <span>江西铜业</span>
                <span>江西铜业</span>
            </td>
        </tr> -->
        
    </tbody>
</table>
</template>

<script>
import Util from '~/store/util';

export default {
    props: ["billBoardTable"],
    data(){
        return {
            // 排序方式 + 数据类型 + 排序类型
            active: ''
        }
    },

    mounted(){
        // console.log(this.billBoardTable);
    },
    methods: {
        formatMoney(num){
            // console.log(num);
            let money = parseFloat(num);
            let forMoney = 0;
            forMoney = (money / 100000000).toFixed(2);      
            return forMoney;
        },


        stockSort(obj){
            // console.log(obj)
            let {type, sortKey, sortType} = obj;
            this.active = sortType + type + sortKey;

            // console.log(this.active);
            
            this.$emit('sortMethod', {
                type, sortKey, sortType
            });
        }
    }
    
}
</script>
