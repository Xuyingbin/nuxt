<template>
<div class="themeArea">
    <div class="upTheme">
        <div class="title textRed">
            <span>今日领涨主题</span>
        </div>
        <div class="blockContent" v-if="leadTheme.leadUpTheme">
            
            <div class="top" 
                @click="jumpThemeDetails({
                    id: leadTheme.leadUpTheme[0].id
                })"
            >
                <span>{{formaterNum(leadTheme.leadUpTheme[0].chg) + '%'}}</span>
                <span>{{leadTheme.leadUpTheme[0].conceptStockName}}</span>
            </div>
            <div class="bottom">
                <div class="left"
                    @click="jumpThemeDetails({
                        id: leadTheme.leadUpTheme[1].id
                    })"
                >
                    <div class="disContent">
                        <span>{{formaterNum(leadTheme.leadUpTheme[1].chg) + '%'}}</span>
                        <span>{{leadTheme.leadUpTheme[1].conceptStockName}}</span>
                    </div>
                    <!-- <div class="hoverContent">
                        
                        <span><i></i>{{themeInfo.upTheme.left.name}}</span>
                    </div> -->
                </div>
                <div class="right"
                    @click="jumpThemeDetails({
                        id: leadTheme.leadUpTheme[2].id
                    })"
                >
                    <div class="disContent">
                        <span>{{formaterNum(leadTheme.leadUpTheme[2].chg) + '%'}}</span>
                        <span>{{leadTheme.leadUpTheme[2].conceptStockName}}</span>
                    </div>
                    <!-- <div class="hoverContent">
                        
                        <span><i></i>{{themeInfo.upTheme.right.name}}</span>
                    </div> -->
                </div>
            </div>
            
        </div>
    </div>
    <div class="downTheme">
        <div class="title textGreen">
            <span>今日领跌主题</span>
        </div>
        <div class="blockContent" v-if="leadTheme.leadUpTheme">
            <div class="top"
                @click="jumpThemeDetails({
                    id: leadTheme.leadDownTheme[0].id
                })"
            >
                <span>{{formaterNum(leadTheme.leadDownTheme[0].chg) + '%'}}</span>
                <span>{{leadTheme.leadDownTheme[0].conceptStockName}}</span>
            </div>
            <div class="bottom">
                <div class="left"
                    @click="jumpThemeDetails({
                        id: leadTheme.leadDownTheme[1].id
                    })"
                >
                    <div class="disContent">
                        <span>{{formaterNum(leadTheme.leadDownTheme[1].chg) + '%'}}</span>
                        <span>{{leadTheme.leadDownTheme[1].conceptStockName}}</span>
                    </div>
                    <!-- <div class="hoverContent">
                        
                        <span><i></i>{{themeInfo.downTheme.left.name}}</span>
                    </div> -->
                    
                </div>
                <div class="right"
                    @click="jumpThemeDetails({
                        id: leadTheme.leadDownTheme[2].id
                    })"
                >
                    <div class="disContent">
                        <span>{{formaterNum(leadTheme.leadDownTheme[2].chg) + '%'}}</span>
                        <span>{{leadTheme.leadDownTheme[2].conceptStockName}}</span>
                    </div>
                    <!-- <div class="hoverContent">
                        
                        <span><i></i>{{themeInfo.downTheme.right.name}}</span>
                    </div> -->
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    data(){
        return {
            themeInfo:{
                upTheme:{
                    top:{
                        name: '',
                        value: ''
                    },
                    left:{
                        name: '',
                        value: ''
                    },
                    right:{
                        name: '',
                        value: ''
                    }

                },
                downTheme:{
                    top:{
                        name: '',
                        value: ''
                    },
                    left:{
                        name: '',
                        value: ''
                    },
                    right:{
                        name: '',
                        value: ''
                    }

                }
            }
        }
    },

    

    computed: {
        ...mapGetters(['leadTheme'])
    },
    mounted(){
        // console.log(this.leadTheme);
    },
    methods: {
        formaterNum(num){
            return parseFloat(num).toFixed(2);
        },

        // 跳转 主题详情页
        jumpThemeDetails(obj){
            let {id} = obj;
            window.open('/themeDetails?id='+id);
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: id
            //     }
            // })
        }
    }
    

}
</script>


