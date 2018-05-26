<template>
<table class="CapitalFlow" v-if="capitalTableInfo">
    <thead>
        <tr>
            <th v-for="head in capitalTableInfo.thead">
                {{head.name}}
                <b v-if="head.isSort">
                    <span 
                        
                        :class="active==='ASC'+capitalTableInfo.type+head.sortKey?'fa fa-caret-down active':'fa fa-caret-down'"
                        @click="stockSort({
                            type: capitalTableInfo.type,
                            sortKey: head.sortKey,
                            sort: head.sort,
                            sortType: 'ASC'
                        })"
                    ></span> 
                    <!-- :class="active==='chg_up'?'fa fa-long-arrow-up active':'fa fa-long-arrow-up'" -->
                    <span
                        
                        :class="active==='DESC'+capitalTableInfo.type+head.sortKey?'fa fa-caret-up active':'fa fa-caret-up'"
                        @click="stockSort({
                            type: capitalTableInfo.type,
                            sortKey: head.sortKey,
                            sort: head.sort,
                            sortType: 'DESC'
                        })"
                    ></span> 
                </b>
            </th>
            <!-- <th>资金流入(亿)</th>
            <th>涨幅</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="body in capitalTableInfo.tbody">
            <td>
                <nuxt-link :to="'/themeDetails?id='+body.id" target="_blank">

                    {{body.itemName}}
                </nuxt-link>
            </td>
            <td :class="capitalTableInfo.textStyle">{{body.items[0]}}</td>
            <td :class="body.items[1]>=0?'textRed':'textGreen'">{{body.items[1] + '%'}}</td>
        </tr>
        <!-- <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr>
        <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr>
        <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr> -->
    </tbody>
</table>
</template>

<script>
export default {
    props: ["capitalTableInfo"],
    data(){
        return {
            active:''
        }
    },
    mounted(){
        // console.log(this.capitalTableInfo);
    },

    methods: {
        stockSort(obj){
            let {type, sortKey, sortType, sort} = obj;
            this.active = sortType + type + sortKey;
            // console.log(obj);
            this.$emit('sortCapitalFlow', obj);
        }
    }
}
</script>

