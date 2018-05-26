<template>
<section class="ThemeSearchMore">
    <div class="container">
        <div class="crumbs">
            <span><router-link to="/invest/investCon">主题投资 > </router-link></span>
            <b>主题检索</b>
        </div>

        <div class="searchRow">
            <dl v-if="allThemeFirstWord">
                <dt>检索：</dt>
                <dd 
                    v-for="w in allThemeFirstWord" 
                    @click="handleFirst(w)"
                    :class="w === currentW?'active':''"
                >{{w}}</dd>
                <dd
                    @click="handleFirst('all')"
                    :class="'all' === currentW?'active':''"
                >全部</dd>
                <!-- <dd>4</dd>
                <dd>5</dd>
                <dd>A</dd>
                <dd>B</dd>
                <dd>C</dd>
                <dd>E</dd>
                <dd>F</dd>
                <dd>G</dd>
                <dd>H</dd>
                <dd>I</dd>
                <dd>J</dd>
                <dd>K</dd>
                <dd>L</dd>
                <dd>M</dd>
                <dd>N</dd>
                <dd>O</dd>
                <dd>P</dd>
                <dd>Q</dd>
                <dd>R</dd>
                <dd>S</dd>
                <dd>T</dd>
                <dd>U</dd>
                <dd>V</dd>
                <dd>W</dd>
                <dd>X</dd>
                <dd>Y</dd>
                <dd>Z</dd> -->
            </dl>
        </div>

        <div class="resultArea" v-if="themeList">
            <dl v-for="themeObj in themeList">
                <dt>{{themeObj.identify}}</dt>
                <dd v-for="theme in themeObj.concepList">
                    <nuxt-link :to="'/themeDetails?id='+theme.id" target="_blanck">
                        {{theme.conceptStockName}}
                    </nuxt-link>
                </dd>
                
            </dl>
            <!-- <dl>
                <dt>4</dt>
                <dd>4G概念股</dd>
                
            </dl>
            <dl>
                <dt>5</dt>
                <dd>5G概念股</dd>
                
            </dl>
            <dl>
                <dt>A</dt>
                <dd>安防概念股</dd>
                <dd>AMC概念股</dd>
                
            </dl>
            <dl>
                <dt>B</dt>
                <dd>北斗导航概念股</dd>
                <dd>保险概念股</dd>
                <dd>白银概念股</dd>
                
            </dl> -->
        </div>
    </div>
    
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return {
            // 当前字母
            currentW: 'all',

            wordArr: null
        }
    },

    computed:{
        ...mapGetters(['showAllThemeList']),
        // 所有主题列表
        themeList(){
            if(
                this.showAllThemeList && 
                this.showAllThemeList.conceptClassify && 
                this.showAllThemeList.conceptClassify.result.length !== 0
            ){
                
                return this.showAllThemeList.conceptClassify.result
            }else{
                
                return false;
            }
        },
        // 所有主题的首字母
        allThemeFirstWord(){
            // console.log(this.showAllThemeList)
            let list = this.showAllThemeList?this.showAllThemeList.conceptClassify:false;
            if(list){
                // let arr = [];
                // list.map((item) => {
                //     arr.push(item.identify);
                // });
                // this.currentW = arr[0];
                return this.showAllThemeList.conceptClassify.allIdentify;
            }else{
                
                return false;
            }
        }
    },

    watch: {
        
    },

    mounted(){
        this.getAllThemeList();
    },

    methods: {
        ...mapActions(['getAllThemeList']),
        // 点击 根据首字母查找
        handleFirst(w){
            
            this.currentW = w;
            if(w !== 'all'){
                
                this.getAllThemeList({
                    key: w
                })
            }else{
                this.getAllThemeList()
            }
            
        }
    }
}
</script>

