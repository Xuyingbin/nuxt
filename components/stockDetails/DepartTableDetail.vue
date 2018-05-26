<template>
    <div class="tableContainer" v-if="stockDetail_billboard">
        <h1><span>上榜理由：</span><b>{{stockDetail_billboard.result}}</b></h1>
        <table>
            <thead>
                <tr>
                    <th>买入营业部</th>
                    <th>买入金额(万元)</th>
                    <th>卖出营业部</th>
                    <th>卖出金额(万元)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(buy,index) in departBuys">
                    <!-- 买入营业部 -->
                    <td>
                        <!-- 判断是否是机构专用  如果是  不加链接 -->
                        <b v-if="buy && buy.boCode !== '--' && buy.boCode !== '21789' && buy.departmentName !== '机构专用'">
                            <nuxt-link :to="'/departmentDetail/history?id='+buy.boCode" target="_blank">{{buy.departmentName}}</nuxt-link>
                        </b>
                        <b v-else>{{buy?buy.departmentName:''}}</b>
                    </td>
                    <td><span v-if="buy" class="textRed">{{formatMoney(buy.in)}}</span></td>

                    <!-- 卖出营业部 -->
                    <td>
                        <!-- 判断是否是机构专用  如果是  不加链接 -->
                        <b v-if="departSales[index] && departSales[index].boCode !== '--' && departSales[index].boCode !== '21789' && departSales[index].departmentName !== '机构专用'">
                            <nuxt-link :to="'/departmentDetail/history?id='+departSales[index].boCode" target="_blank">{{departSales[index].departmentName}}</nuxt-link>
                        </b>
                        <b v-else>{{departSales[index]?departSales[index].departmentName:''}}</b>
                    </td>
                    <td><span v-if="departSales[index]" class="textGreen">{{formatMoney(departSales[index].in)}}</span></td>
                </tr>
                
                <!-- <tr v-for="(buy,index) in departBuys"> -->
                    <!-- <td v-if="buy && buy.boCode !== '--' && buy.boCode !== '21789' && buy.departmentName !== '机构专用'"><a :href="'/render/departmentDetail?id='+buy.boCode" target="_blank">{{buy.departmentName}}</a></td> -->
                    <!-- 判断是否是机构专用  如果是  不加链接 -->
                    <!-- <td v-else="buy && buy.boCode === '--' && buy.boCode === '21789' && buy.departmentName === '机构专用'"><span>{{buy.departmentName}}</span></td> -->


                    <!-- <td v-if="buy"><span class="textRed">{{formatMoney(buy.in)}}</span></span></td> -->
                    <!-- <td v-if="departSales[index] && departSales[index].boCode !== '--' && departSales[index].boCode !== '21789'"> -->
                        <!-- <a :href="'/render/departmentDetail/history?id='+departSales[index].boCode" target="_blank">{{buy.departmentName}}</a> -->
                    <!-- </td> -->

                    <!-- 判断是否是机构专用  如果是  不加链接 -->
                    <!-- <td v-if="departSales[index] && departSales[index].boCode === '--' && departSales[index].boCode === '21789' "><span>{{stockDetail_billboard.sales[index].departmentName}}</span></td> -->
                    <!-- <td v-if="departSales[index]"><span class="textGreen">{{formatMoney(departSales[index].in)}}</span></td> -->
                <!-- </tr> -->
                <!-- <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {

        }
    },
    watch: {
        // 'stockDetail_billboard'(newVal, oldVal){
        //     console.log(newVal);
        // }
    },

    computed:{
        ...mapGetters(['stockDetail_billboard']),

        departBuys(){
            return this.stockDetail_billboard.buys;
        },
        departSales(){
            return this.stockDetail_billboard.sales;
        }

    },

    mounted(){
        
    },

    methods: {
        formatMoney(num){
            return (parseFloat(num) / 10000).toFixed(2);
        }
    }


}
</script>

