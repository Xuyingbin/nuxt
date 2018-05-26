<template>
<div class="BillboardTable" >
    <ul class="boardTitle">
        <li @click="boardClick('1')" :class="{'active': boardStatus === '1'}"><i></i>近五日</li>
        <li @click="boardClick('2')" :class="{'active': boardStatus === '2'}"><i></i>近十日</li>
        <li @click="boardClick('3')" :class="{'active': boardStatus === '3'}"><i></i>近一个月</li>
        <li @click="boardClick('4')" :class="{'active': boardStatus === '4'}"><i></i>近三个月</li>
    </ul>

    <table class="boardContent">
        <thead>
            <tr>
                <th>上榜股票</th>
                <th>上榜次数</th>
                <th>买入金额(亿)</th>
                <th>卖出金额(亿)</th>
                <th>净买入(亿)</th>
                
            </tr>
        </thead>
        <tbody v-if="themeTransBillboard">
            <tr 
                v-for="stockHero in themeTransBillboard.stockHeroList" 
                @click="jumpStockDetails({
                    secu_code: stockHero.secu_code,
                    stockName: stockHero.stockName
                })"
            >
                <td>{{stockHero.stockName}}</td>
                <td>{{stockHero.on_the_list_num}}</td>
                <td>{{formatMoney(stockHero.cumulative_buy_sum) }}</td>
                <td>{{formatMoney(stockHero.cumulative_sale_sum) }}</td>
                <td :class="stockHero.cumulative_net_balance >= 0?'textRed': 'textGreen'">
                    {{formatMoney(stockHero.cumulative_net_balance) }}
                </td>
            </tr>
            <!-- <tr>
                <td>平安证券</td>
                <td>5</td>
                <td>银河证券北京营业部</td>
                <td>1012.33亿元</td>
            </tr>
            <tr>
                <td>平安证券</td>
                <td>5</td>
                <td>银河证券北京营业部</td>
                <td>1012.33亿元</td>
            </tr>
            <tr>
                <td>平安证券</td>
                <td>5</td>
                <td>银河证券北京营业部</td>
                <td>1012.33亿元</td>
            </tr> -->
        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Util from '~/store/util';
export default {
    props: ["currentTheme"],
    data(){
        return {
            boardStatus: '1',
        }
    },

    computed:{
        ...mapGetters(['themeTransBillboard'])
    },

    

    watch:{
        'currentTheme'(newVal, oldVal){
            // console.log(newVal);
            this.getThemeTransBillboard({conceptId: newVal.id});
        },
        // 'themeTransBillboard'(newVal, oldVal){
        //     console.log(newVal);
        // }
    },

    mounted(){
        // this.getThemeTransBillboard({conceptId: this.currentTheme.id});
    },

    methods: {
        ...mapActions(['getThemeTransBillboard']),
        // 导航栏 切换
        boardClick(index){
            console.log(index);
            this.boardStatus = index;
            this.getThemeTransBillboard({
                conceptId: this.currentTheme.id,
                type: index
            })
        },
        // 资金格式化
        formatMoney(num){
            return (parseFloat(num) / 100000000).toFixed(2);
        },

        // 跳转股票详情页
        jumpStockDetails(obj){
            // console.log(obj);
            let { secu_code, stockName } = obj;
            let code = secu_code.split('.')[0];
            let marketCode = secu_code.split('.')[1];

            window.open(`/stockDetails?code=${code}&name=${stockName}`);
            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: code,
            //         // marketCode: marketCode,
            //         name: stockName
            //     }
            // })
            
        }
    }
}
</script>
