<template>

</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            searchVal: ''
        }
    },

    watch: {
        'searchVal'(newVal, oldVal){
            this.$emit('handleSearchVal', newVal);
        }
    },

    // computed: {

    // },

    mounted(){
        
    },

    methods: {
        cancelAdd(){
            this.$emit('cancelAdd', true);
            this.$emit('focusIn', false);
        },
        focusIn(){
            // console.log('获取焦点');
            this.$emit('focusIn', true);
        }
        
    }
}
</script>

