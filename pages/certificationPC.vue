<template>
<section class="modifyPassword">
    <div class="container">
        <div class="passwordContainer">
            <div class="form">
                
                <form>
                    <div class="title">
                        <span>实名认证</span>
                    </div`>
                    <div class="form-group">
                        <label for="realName"></label>
                        <input v-model="realName" type="text" placeholder="真实姓名">
                        <span style="color: red">必填</span>
                    </div>
                    <div class="form-group">
                        <label for="idCard"></label>
                        <input v-model="idCard" type="text" placeholder="身份证号">
                        <span style="color: red">必填</span>
                    </div>
                    <div class="botton-group">
                        <button 
                            type="button" 
                            class="confirm" 
                            :style="submitStyle"
                            :disabled="!realNameIsPass && !testIdCard"
                            @click="submit"
                        >提交</button>
                        
                    </div>
                </form>
            </div> 
            
        </div>
        <confirm-box v-show="isShow" :title="alertTitle"></confirm-box>
    </div>
    
</section>
</template>

<script>
import ConfirmBox from '~/components/alertBox/ConfirmBox';
import { mapGetters, mapActions } from 'vuex';
export default {
    layout: 'Dashboard',

    validate({query}){
        // console.log(query);
        if(query.uuid){
            return true;
        }else{
            return false;
        }
    },
    head() {
        return {
        title: '实名认证 - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },
    data(){
        return {
            alertTitle: '',
            isShow: false, // 弹框隐藏
            realName: '',
            realNameIsPass: false,
            idCard: '',
            submitStyle: {
                cursor: 'not-allowed',
                background: '#ccc'   //  'D3BC8A'
            },
            testIdCard: false
        }
    },

    components: {
        ConfirmBox
    },

    computed: {
        ...mapGetters(['getCertification'])
    },

    watch: {
        'getCertification'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.isShow = true;
                this.alertTitle = '认证成功';
                let time = setTimeout(()=>{
                    this.isShow = false;
                    this.alertTitle = '';
                    this.$router.push({
                        path: '/login'
                    })
                    clearTimeout(time);
                
                }, 1500);
                sessionStorage.getItem('isCertification')?sessionStorage.setItem('isCertification', '2'):null;
                localStorage.getItem('isCertification')?localStorage.setItem('isCertification', '2'):null;

                
                
            }else{
                this.isShow = true;
                this.alertTitle = '认证失败';
                let time = setTimeout(()=>{
                    this.isShow = false;
                    this.alertTitle = '';
                    clearTimeout(time);
                }, 1500)
            }
        },
        'realName'(newVal, oldVal){
            // console.log(newVal);
            if(newVal !== ''){
                this.testIdCard = true;
            }else{
                this.testIdCard = false;
            }

            if(this.testIdCard && this.realNameIsPass){
                this.submitStyle = {
                    cursor: 'pointer',
                    background: '#D3BC8A'
                }
            }else{
                this.submitStyle = {
                    cursor: 'not-allowed',
                    background: '#ccc' 
                }
            }
        },

        'idCard'(newVal, oldVal){
            if(newVal !== ''){
                this.realNameIsPass = true;
            }else{
                this.realNameIsPass = false;
            }

            if(this.testIdCard && this.realNameIsPass){
                this.submitStyle = {
                    cursor: 'pointer',
                    background: '#D3BC8A'
                }
            }else{
                this.submitStyle = {
                    cursor: 'not-allowed',
                    background: '#ccc' 
                }
            }
        }
    },

    mounted(){
        // console.log(this.$route);
    },

    methods: {
        ...mapActions(['certification']),

        submit(){
            this.certification({
                qutouPhone: this.$route.query.uuid,
                realName: this.realName,
                idCard: this.idCard
            })
        }
    }
}
</script>

