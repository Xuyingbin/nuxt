<template>
<div>
    <!-- <com-header></com-header> -->
    
    <nuxt/>
    <!-- <router-view /> -->
    <com-footer></com-footer>
</div>
    
</template>

<script>
// import ComHeader from '~/components/ComHeader';
import ComFooter from '~/components/ComFooter';
export default{
    data(){
        return {
            headerStyle: {}
        }
    },
    components: {
        // ComHeader,
       
        ComFooter,
        // SideNavBar
    },

    methods: {
        handleScrolled(){
            let scrollY = window.scrollY || window.pageYOffset
            this.scrolled = scrollY > 50;
            
            if(this.scrolled){
                this.headerStyle = {
                    background: 'rgba(27,31,39,1)'
                }
                
            }else{
                this.headerStyle = {
                    background: 'rgba(27,31,39,0)'
                }
            }
        },
    }
}
</script>