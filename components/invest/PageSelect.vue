<template>
<div class="PageSelectComponent">
    <div><button :disabled="upDisabled" :class="{'up':true,'active':upActive}" @click="prevPage"> < </button>  </div>
    <div><button :disabled="downDisabled" :class="{'down':true,'active':downActive}" @click="nextPage"> > </button></div>
    <div class="pageNums">
        第<span>{{currentPage}}</span>/<span >{{totalPage}}</span>页
    </div>
    <div class="inputPageNums">
        <input @keyup="inputPage" v-model="inputCurrentPage" type="text">
    </div>
    <div @click="jumpPage" class="jump">
        跳转
    </div>
</div>
</template>

<script>
export default {
    props: ["totalNum", "pageSize", "currentPageNo"],// totalNum 总条数 pageSize 每页条数
    data(){
        return {
            currentPage: 1, // 当前页
            inputCurrentPage: 1, // 输入页当前页码
            // totalNum: 100, 
            // pageSize: 10,
            upActive: true,
            downActive: false,
            upDisabled: true,
            downDisabled: false
        }
    },
    watch: {
        'totalNum'(newVal, oldVal){
            if(this.totalPage === 1){
                this.downActive = true; // 下一页按钮样式禁用
                this.downDisabled = true; // 下一页按钮禁用
                this.upActive = true; // 上一页按钮样式禁用
                this.upDisabled = true; // 上一页按钮禁用
            }
        },
        'currentPageNo'(newVal, oldVal){
            // console.log('newVal' + newVal);
            // console.log('oldVal' + oldVal);
            if(newVal < 1){
                this.currentPage = 1;
                this.inputCurrentPage = 1;
            }else{
                this.currentPage = newVal;
                this.inputCurrentPage = newVal;
            }
            
        }
    },

    computed:{
        totalPage(){
            let reg = /^\d*$/ig;
            let isTotalNum = isNaN(parseInt(this.totalNum));
            let isPageSize = isNaN(parseInt(this.pageSize));
            
            if(!isTotalNum && !isPageSize){
                
                if(this.totalNum === 0){
                    return 1
                }else{

                    return Math.ceil(this.totalNum / this.pageSize);
                }
                
            }else{
                if(isTotalNum){

                    throw new Error('totalNum is not a number!');
                }
                if(isPageSize){
                    throw new Error('pageSize is not a number!');

                }
            }
            
            
            
        }
    },

    mounted(){
        // if(this.totalPage === 1){
        //     this.downActive = true; // 下一页按钮样式禁用
        //     this.downDisabled = true; // 下一页按钮禁用
        //     this.upActive = true; // 上一页按钮样式禁用
        //     this.upDisabled = true; // 上一页按钮禁用
        // }
        // this.currentPage = this.currentPageNo?this.currentPageNo:1;
        // this.inputCurrentPage = this.currentPageNo?this.currentPageNo:1;
    },

    methods: {
        // 下一页
        nextPage(){
            
            if(this.currentPage < this.totalPage){
                this.currentPage += 1;
                this.inputCurrentPage = this.currentPage;
                this.upActive = false; // 取消禁用样式
                this.upDisabled = false; // 取消上一页禁用按钮
                if(this.currentPage === this.totalPage){
                    this.downActive = true; // 下一页按钮样式禁用
                    this.downDisabled = true; // 下一页按钮禁用
                }
            }else{
                this.downActive = true;
                this.downDisabled = true; // 下一页按钮禁用
            }
            
            this.$emit('changePage', this.currentPage);

        },

        // 上一页
        prevPage(){
            
            if(this.currentPage > 1){
                this.currentPage -= 1;
                this.inputCurrentPage = this.currentPage;
                this.downActive = false; // 取消禁用样式
                this.downDisabled = false; // 取消下一页禁用按钮
                if(this.currentPage === 1){
                    this.upActive = true; // 上一页按钮样式禁用
                    this.upDisabled = true; // 上一页按钮禁用
                }
            }else{
                this.upActive = true;
                this.upDisabled = true; // 上一页按钮禁用
            }

            this.$emit('changePage', this.currentPage);
        },
        // 输入页码数
        inputPage(){
            let reg = /^\d+$/ig;
            if(reg.test(this.inputCurrentPage) && parseInt(this.inputCurrentPage) !== 0){// 输入当前页是否为数字
                this.inputCurrentPage = parseInt(this.inputCurrentPage);

                if(this.inputCurrentPage > this.totalPage){
                    this.inputCurrentPage = this.totalPage;
                    
                }
            }else if(this.inputCurrentPage !== ''){
                this.inputCurrentPage = 1;
            }
        },

        //  跳转页面
        jumpPage(){
            if(this.inputCurrentPage === this.totalPage){
                this.upActive = false; // 上一页按钮样式解禁
                this.upDisabled = false; // 上一页按钮解禁
                this.downActive = true; // 下一页按钮样式禁用
                this.downDisabled = true; // 下一页按钮禁用
            }
            if(this.inputCurrentPage === 1){
                this.downActive = false; // 下一页按钮样式解禁
                this.downDisabled = false; // 下一页按钮解禁
                this.upActive = true; // 上一页按钮样式禁用
                this.upDisabled = true; // 上一页按钮禁用
            }
            this.currentPage = this.inputCurrentPage;

            this.$emit('changePage', this.currentPage);
        }
    }
}
</script>

