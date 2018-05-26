<template>
<div class="QRCode">
    <div class="QRImg">
        <img v-show="iosActive" src="../assets/image/QRCode_ios.png" alt="">
        <img v-show="androidActive" src="../assets/image/QRCode_android.png" alt="">
    </div>
    <div class="sysType">
        <span>
            <i @click="typeChange($event, 'ios')" :class="{'ios':true, 'active':iosActive}"><strong></strong></i>
            <b>下载</b>
            <i @click="typeChange($event, 'android')" :class="{'android':true, 'active':androidActive}"><strong></strong></i>
        </span>
    </div>
</div>

</template>


<script>
export default {
    data(){
        return {
            iosActive: true,
            androidActive: false,
        }
    },
    methods:{
        typeChange($event, type){
            // console.log(type);
            if(type === 'ios'){
                this.iosActive = true;
                this.androidActive = false;
            }else if(type === 'android'){
                this.iosActive = false;
                this.androidActive = true;
            }
        }
    }
}
</script>