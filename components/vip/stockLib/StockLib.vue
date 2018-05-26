<template>
    <div class="stock-lib-container">
        <div class="stock-lib">
            <table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>当前股票池</th>
                        <th>发现价</th>
                        
                    </tr>
                </thead>
                <tbody v-if="aiStockLib && aiStockLib.list">
                    <tr v-for="stock in aiStockLib.list">
                        <td>{{dateFormat(stock.pulishDate)}}</td>
                        <td> 
                            <nuxt-link :to="'/stockDetails?name='+stock.name+'&code='+stock.code" target="_blank">
                                {{stock.name + ' ' + stock.code}}
                            </nuxt-link>
                        </td>
                        <td>{{priceFormat(stock.price)}}</td>
                    </tr>
                    <!-- <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr> -->
                    <!-- <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr>
                    <tr>
                        <td>2018-09-03</td>
                        <td>招商银行 090023</td>
                        <td>13.93</td>
                    </tr> -->
                </tbody>
            </table>

            <div class="page-container" v-if="aiStockLib && aiStockLib.count >= 10">
                <page-select 
                    @changePage="recentChangePage" 
                    :totalNum="aiStockLib.count" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>
        <div class="invest-ad">
            <img src="../../../assets/image/invest-ad.jpg" alt="">
        </div>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageSelect from '../../themeInvestment/PageSelect';
export default {
    data(){
        return {

        }
    },

    computed: {
        ...mapGetters(['aiStockLib']),
    },

    watch: {
        // 'aiStockLib'(newVal, oldVal){
        //     console.log(newVal);
        // }
    },

    components: {
        PageSelect
    },

    methods: {
        ...mapActions(['getAIStockLib']),
        // 翻页
        recentChangePage(page){
            this.getAIStockLib({
                pageNo: page
            });
            // console.log(page);
        },

        // 日期格式
        dateFormat(str){
            return str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6,8);
        },
        // 价格格式
        priceFormat(price){
            return (parseFloat(price)).toFixed(2);
        }
    }
}
</script>

