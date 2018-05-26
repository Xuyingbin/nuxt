<template>
<div class="row" v-if="marketIndexData">
    <div class="col col-md-8 leftUnit" style="padding-right:0" >
        <div  v-for="plateInfo in marketIndexData.market" class="unit">
            <div class="block left">
                {{plateInfo.stockName}}
            </div>
            <div class="block right">
                <div class="top">
                    <span :class="plateInfo.currentPrice>=0?'textRed':'textGreen'">
                        {{formaterNum(plateInfo.currentPoint)}}
                    </span>
                </div>
                <div class="bottom">
                    <span :class="plateInfo.currentPrice>=0?'textRed':'textGreen'">
                        {{formaterNum(plateInfo.currentPrice)}}
                    </span>
                    <span :class="plateInfo.changeRate>=0?'textRed':'textGreen'">
                        {{formaterNum(plateInfo.changeRate) + '%'}}
                    </span>
                </div>
            </div>
        </div>
        <!-- <div class="unit">
            <div class="block left">
                深证指数
            </div>
            <div class="block right">
                <div class="top">
                    <span class="textRed">1103.24</span>
                </div>
                <div class="bottom">
                    <span class="text-l textRed">
                        +2.22
                    </span>
                    <span class="text-r textRed">
                        +1.13%
                    </span>
                </div>
            </div>
        </div>
        <div class="unit">
            <div class="block left">
                中小板指数
            </div>
            <div class="block right">
                <div class="top">
                    <span class="textRed">1103.24</span>
                </div>
                <div class="bottom">
                    <span class="text-l textRed">
                        +2.22
                    </span>
                    <span class="text-r textRed">
                        +1.13%
                    </span>
                </div>
            </div>
        </div>
        <div class="unit">
            <div class="block left">
                创业板指数
            </div>
            <div class="block right">
                <div class="top">
                    <span class="textRed">1103.24</span>
                </div>
                <div class="bottom">
                    <span class="text-l textRed">
                        +2.22
                    </span>
                    <span class="text-r textRed">
                        +1.13%
                    </span>
                </div>
            </div>
        </div> -->
    </div>
    <div class="col col-md-4" >
        <div class="upDownData">
            <div class="block-l">
                <span>涨跌家数</span>
            </div>
            <div class="block-r">
                <div class="block">
                    <div class="top textRed">
                        {{marketIndexData.updown.upsNum}}
                    </div>
                    <div class="bottom textRed">
                        涨
                    </div>
                </div>
                <div class="block">
                    <div class="top textGreen">
                        {{marketIndexData.updown.downNum}}
                    </div>
                    <div class="bottom textGreen">
                        跌
                    </div>
                </div>
                <div class="block">
                    <div class="top textRed">
                        {{marketIndexData.updown.dogfallNum}}
                    </div>
                    <div class="bottom textGray">
                        平
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return {
            plateInfos: [
                {
                    name: '上证指数',
                    total: {
                        value: '1103.24',
                        style: 'textRed'
                    },
                    start: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    },
                    end: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    }
                    
                },
                {
                    name: '深证指数',
                    total: {
                        value: '1103.24',
                        style: 'textRed'
                    },
                    start: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    },
                    end: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    }
                },
                {
                    name: '中小板指数',
                    total: {
                        value: '1103.24',
                        style: 'textRed'
                    },
                    start: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    },
                    end: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    }
                },
                {
                    name: '创业板指数',
                    total: {
                        value: '1103.24',
                        style: 'textRed'
                    },
                    start: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    },
                    end: {
                        value: '+22.3%',
                        style: {'text-l':true, 'textRed': true}
                    }
                }
            ],
            upDownData:{
                up:{
                    value: '1103'
                },
                down:{
                    value: '1103'
                },
                flat:{
                    value: '1103'
                }
            }
        }
    },
    
    
    computed:{
        ...mapGetters(['marketIndexData'])
    },

    watch: {
        'marketIndexData'(newVal, oldVal){
            console.log(newVal);
        }
    },
    created(){
        // console.log(this);
    },
    mounted(){
        // console.log(this.marketIndexData);
        
        // console.log(this);
    },
    methods: {
        ...mapActions(['getIndexData']),
        formaterNum(num){
            return parseFloat(num).toFixed(2);
        }
    }
}
</script>