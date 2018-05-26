<template>
<table class="CapitalFlow">
    <thead>
        <tr >
            <th v-for="head in themeTableInfo.thead">{{head}}</th>
            <!-- <th>涨幅</th>
            <th>领涨个股</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="body in themeTableInfo.tbody">
            
            <td><a href="javascript:;" @click="jumpTheme(body.id)">{{body.conceptStockName}}</a></td>
            <td :class="themeTableInfo.textStyle">{{formatData(body.chg)}}</td>
            <td><a href="javascript:;" :class="themeTableInfo.textStyle"
                @click="jumpStock({
                    stockName: body.stockDetailVo.stockName,
                    stockCode: body.stockDetailVo.stockCode,
                })"
            >{{body.stockDetailVo.stockName}}</a></td>
        </tr>
        
    </tbody>
</table>
</template>

<script>
export default {
    props: ["themeTableInfo"],
    data(){
        return {
            
        }
    },

    watch: {
        'themeTableInfo'(newVal, oldVal){
            console.log(newVal);
        }
    },

    mounted(){
        console.log(this.themeTableInfo);
    },


    methods: {
        // 格式数据
        formatData(data){
            if(data > 0){
                return '+'+(parseFloat(data)).toFixed(2) + '%';
            }else if(data < 0){
                return (parseFloat(data)).toFixed(2) + '%';
            }
        },

        // 跳转到股票详情
        jumpTheme(id){
            window.open('/themeDetails?id='+id);
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: id
            //     }
            // })
        },

        // 跳转股票详情
        jumpStock(obj){
            let {stockName, stockCode} = obj;

            window.open(`/stockDetails?code=${stockCode}&name=${stockName}`);

            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: stockCode,
            //         name: stockName
            //     }
            // })
        }
    }
}
</script>
