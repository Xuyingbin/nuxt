<template>
<table class="topTable" v-if="departInfo">
    <thead>
        <tr>
            <th v-for="head in departInfo.thead">{{head}}</th>
            <!-- <th>营业部名称</th>
            <th>介入个股数量</th>
            <th>当日买入额</th>
            <th>当日卖出额</th>
            <th>净买额</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="(body,index) in departInfo.tbody" @click="jumpDetail({id:body.rowId, type: body.type})">
            <td>{{index + 1}}</td>
            <td v-for="col in body.rowContent" :class="body.rowStyle">{{col}}</td>
            <!-- <td >{{body.rowValue}}</td> -->
            <!-- <td>5</td>
            <td>2658.23万</td>
            <td>2658.23万</td>
            <td class="textRed">2658.23万</td> -->
        </tr>
        <!-- <tr>
            <td>1</td>
            <td>华鑫证券有限责任公司北京菜市口大街证券营业部</td>
            <td>5</td>
            <td>2658.23万</td>
            <td>2658.23万</td>
            <td class="textRed">2658.23万</td>
        </tr>
        <tr>
            <td>1</td>
            <td>华鑫证券有限责任公司北京菜市口大街证券营业部</td>
            <td>5</td>
            <td>2658.23万</td>
            <td>2658.23万</td>
            <td class="textRed">2658.23万</td>
        </tr> -->
    </tbody>
</table>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ["departInfo"],
    data(){
        return {
            
        }
    },

    computed: {
        // ...mapGetters(['mechanism'])
    },

    watch: {
        // 'mechanism'(newVal, oldVal){
            // console.log(newVal);
    //     }
    },

    mounted(){
        console.log(this.departInfo);
    },

    methods: {
        jumpDetail(obj){
            let { id, type } = obj;
            // type 0 营业部详情  1 股票详情 
            if(type === 0){
                window.open('/departmentDetail/history?id=' + id);
                // this.$router.push({
                //     path: '/departmentDetail/history',
                //     query: {
                //         id: id
                //     }
                // })
            }else if(type === 1){
                // console.log(id);
                window.open('/stockDetails?name=' + id.name + '&code=' + id.code);
                // this.$router.push({
                //     path: '/stockDetails',
                //     query: id
                // })
            }
        }
    }
}
</script>
