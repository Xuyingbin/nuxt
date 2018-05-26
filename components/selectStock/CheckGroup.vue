<template>
<div class="CheckGroup" >
    <slot></slot>
</div>
</template>

<script>

export default {
    
    props: ['labelId'],
    data(){
        return {
            indexList: []
        }
    },
    components: {
        
    },

    methods: {
        checkedMore(){
            
            console.log(this.$el);

            
        }
    }
}
</script>
