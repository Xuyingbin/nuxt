<template>
<div class="SwipeBlockContainer">
    <div class="bottomBox">
        <span>请按住滑块，拖到最右边</span>
        <div class="success"><span>{{testSuccess}}</span></div>
        <div id="MoveBlock" class="block" :style="blockStyle">
            <span v-show="swipeBlock"> > > </span>
            <i v-show="successBlock"></i>
        </div>

    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    data(){
        return {
            successBlock: false,
            swipeBlock: true,
            testSuccess: '',
            blockStyle: {
                left: 0
            }
        }
    },

    mounted(){
        this.swipe();
    },

    methods: {
        //  滑动验证
        swipe(){
            let el = document.getElementById('MoveBlock');
            let $this = this;
            el.onmousedown = function(e){
                let X = e.clientX - el.offsetLeft;
                // console.log(X);
                document.onmousemove = function(e){
                    let endx = e.clientX - X;
                    el.style.left = endx + 'px';
                    let width = $('.bottomBox').width() - $(el).width();
                    el.parentNode.children[1].style.width = endx + 'px';
                    // console.log(width);

                    if(endx <= 0){ // 临界值
                        el.style.left = 0 + 'px';
                        el.parentNode.children[1].style.width = 0 + 'px';
                    }

                    if(parseInt(el.style.left) >= width){ // 验证成功
                        el.style.left = width + 'px';
                        el.parentNode.children[1].style.width = width + 'px';

                        $this.successBlock = true;
                        $this.swipeBlock = false;
                        $this.testSuccess = '验证通过';
                        $this.$emit('swipeSuccess', $this.successBlock);

                        el.onmousedown = null;
                    }
                }
            }

            document.onmouseup = function() {
                document.onmousemove = null
            }
            

            
        },

        
        
    }
}
</script>
