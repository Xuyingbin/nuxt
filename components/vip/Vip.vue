<template>
    <section class="Vip-container">
        <div class="nav-side-bar">
            <div class="vip-bar">
                <span class="vip-col" @click="listOpera">
                    <b>V I P</b> <i :class="close?'fa fa-angle-up active':'fa fa-angle-up'"></i> 
                </span>
                <ul :class="close?'close':''">
                    <li @click="changeContent('/stockLib')">
                        <i :class="index === '/stockLib'?'active':''"></i>
                        <a :class="index === '/stockLib'?'active':''">智能股库</a>
                    </li>
                    <li @click="changeContent('/reference')">
                        <i :class="index === '/reference'?'active':''"></i>
                        <a :class="index === '/reference'?'active':''">独家内参</a>
                        
                    </li>
                    <li  class="single-Li">
                        <i :class="index === '/capital'?'active':''"></i>
                        <a :class="index === '/capital'?'active':''" @click="changeContent('/capital')">游资动向
                            <b :class="secCol?'fa fa-angle-down active':'fa fa-angle-down'"></b>
                            
                        </a>
                        <ul :class="secCol?'ul-son open':'ul-son'">
                            <li :class="index === '/capitalNow'?'active':''" @click="changeContent('/capitalNow')"> <a>最近热门</a> </li>
                            <li :class="index === '/capitalNear'?'active':''" @click="changeContent('/capitalNear')"> <a>近期热门</a> </li>
                        </ul>
                        
                    </li>
                    <li @click="changeContent('/note')">
                        <i :class="index === '/note'?'active':''"></i>
                        <a :class="index === '/note'?'active':''">复盘笔记</a>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="vip-content">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            close: false,

            index:'/stockLib',

            // 二级栏目展开收缩
            secCol: false,
            // 二级目录标题
            secIndex: '',

        }
    },

    mounted(){
        // 智能股库
        this.getAIStockLib();
        // 独家内参
        this.getInternalReference();

        // 复盘笔记
        this.getInternalReference({
            status: 4
        });
    },

    methods: {
        ...mapActions(['getAIStockLib', 'getInternalReference']),
        listOpera(){
            this.close = !this.close;
        },

        changeContent(index){
            this.index = index;
            if(index === '/capital'){
                this.secCol = !this.secCol;
                
            }else{
                
                

                this.$router.push({
                    path: '/vip' + index
                });
            }
            
        }
    }
}
</script>
