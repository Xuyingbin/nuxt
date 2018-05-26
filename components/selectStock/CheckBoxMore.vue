<template>
<div @click="checked($event)" class="CheckBoxMore">
    <b class='' :data-label="labelId"></b>

</div>
</template>

<script>
import $ from 'jquery';
export default {
    props: ["labelId"],
    data(){
        return {
            active: false,
            selectArr: []
        }
    },

    methods: {
        checked($event){
            let target = $(event.target);
            let isHaveClass = target.hasClass('active');
            
            if(this.labelId === 'all'){
                
                if(isHaveClass){
                    $('.CheckBoxMore').find('b').removeClass('active');
                }else{
                    $('.CheckBoxMore').find('b').addClass('active');
                }
                this.active = true;
                
            }else{
                if(isHaveClass){
                    target.removeClass('active');
                    
                    $('.CheckBoxMore').eq(0).find('b').removeClass('active');
                }else{
                    
                    target.addClass('active');
                }
                
                // this.active = !this.active;
            }
            
            
            this.$emit('checkedMore', this.handleDataId());
        },


        // 处理id
        handleDataId(type){
            let checkbox = $('.CheckBoxMore');
            // console.log(checkbox);
            let arr = [];
            for(let i = 1; i<checkbox.length; i++){
                // console.log(checkbox[i]);
                
                let ele = checkbox[i];
                arr.push($(ele).find('.active').attr('data-label'));
                
            }
            
                
            arr = arr.filter((item) => {
                // console.log(item);
                return item;
            })

            // console.log(arr);
            return arr;
        }
    }
}
</script>
