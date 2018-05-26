<template>
<div @click="checked" class="CheckBox">
    <i :class="{'active':active}"></i>
</div>
</template>

<script>
export default {
    props: ["checkedAll"],
    data(){
        return {
            active: false
        }
    },

    mounted(){
        this.$watch('checkedAll',function(newVal, oldVal){
            if(newVal){
                this.active = true;
            }else{
                this.active = false;
            }
        })
    },

    methods: {
        checked(){
            this.active = !this.active;

            this.$emit('checked', this.active);
        }
    }
}
</script>
