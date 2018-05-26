<template>
<section class="downLoadApp">
    <div class="imgContainer" :style="style">
        <div class="img"></div>
        <div class="container">
            <div class="introduceContainer">
                <div class="in-l">
                    <div class="t-top">
                        <h1>主题风向标</h1>
                        <h4><i></i><span>挖掘风口中的主题投资机会</span><i></i></h4>
                    </div> 

                    <div class="t-middle">
                        <h2><span>深度挖掘投资线索</span><span>准确把脉市场热点</span></h2>
                        <h4>
                            <p>把投资装进手机</p>
                            <p>随时随地进行操作</p>
                        </h4>
                        <h3><span>手握主题风向标</span><span>静看大盘风云</span></h3>
                    </div>

                    <div class="t-bottom">
                        <div class="QRImg">
                            <!-- <img v-show="iosActive" src="../../assets/image/QRCode_ios.png" alt="趣投风向标IOS版"> -->
                            <!-- <img v-show="androidActive" src="../../assets/image/QRCode_android.png" alt=""> -->
                        </div>
                        <div class="sysButton">
                            <ul>
                                <li @click="changeVersion(0)" :class="{active: iosActive}">
                                    <i></i><span>iOS版本下载</span>
                                </li>
                                <li @click="changeVersion(1)" :class="{active: androidActive}">
                                    <i></i><span>安卓版本下载</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="in-r">
                    
                </div>
            </div>
        </div>
    </div>
    
</section>
</template>

<script>
export default {
    data(){
        return {
            iosActive: true,
            androidActive: false,
        
            style: {
                minHeight: `${window.screen.height - 298}px`
            }
        }
    },

    mounted(){
        
    },
    methods: {
        changeVersion(type){
            if(type === 0){ // ios
                this.iosActive = true;
                this.androidActive = false;
            }else if(type === 1){ // Android
                this.androidActive = true;
                this.iosActive = false;
            }
        }
    }
}
</script>
