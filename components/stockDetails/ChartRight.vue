<template>
<div class="chartRight">
    <label-title :title="stockChart"></label-title>
    <div class="stock">
        
        <div class="chartArea">
            <theme-stock-chart></theme-stock-chart>
        </div>
    </div>
    
</div>
</template>

<script>

import LabelTitle from '../indexComponents/themeDetails/Label';
import ThemeStockChart from './ThemeStockChart';
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            
            stockChart: '个股相关主题',
            
        }
    },

    components: {
        LabelTitle,
        ThemeStockChart
    },

    computed:{
        ...mapGetters(['stockConceptTheme'])
    },

    watch: {
        
    },

    mounted(){
        
    },

    methods: {
        
    }
}
</script>
