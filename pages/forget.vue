<template>
<section class="forgetPassword">
    <div class="container">
        <div class="backPassword">
            <div class="title">
                <span>找回密码</span>
            </div>
            <div class="formContainer">
                <div class="placeholderBox"></div>
                <form>
                    <div class="telContainer">
                        <label for="tel"></label>
                        <input v-model="telInfo.telNumber" @keyup="regTel" type="text" placeholder="手机号">
                        <span :class="telInfo.style">
                            
                        </span>                    
                    </div>
                    <div class="swipeBlock">
                        <label></label>
                        <div class="swipeContaienr" style="width:80%;">
                            <swipe-block @swipeSuccess="swipeSuccess"></swipe-block>
                        </div>
                    </div>
                    <div class="testArea" v-show="isTestSuccess">
                        <div class="testCodeContainer">
                            <label></label>
                            <input maxlength="6" v-model="testCodeInfo.info" type="text" placeholder="验证码">
                            <button @click="testCode" :disabled="!telInfo.telIsPass" :style="testCodeInfo.style" type="button">发送验证码</button>
                            <span v-show="testCodeInfo.isStart">{{testCodeInfo.time}}S</span>
                        </div>
                    </div>

                    <div class="nextStep">
                        <button type="button" @click="nextStep">下一步</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <confirm-box v-show="isShow" :title="alertTitle"></confirm-box>
</section>
</template>

<script>
import SwipeBlock from '~/components/register/SwipeBlock';
import { mapActions, mapGetters } from 'vuex';
import ConfirmBox from '~/components/alertBox/ConfirmBox';
export default {
    layout: 'Dashboard',
    data(){
        return {
            alertTitle: '',
            isShow: false, // 提示框
            isTestSuccess: false, // 滑块是否通过
            isAgree: true, //  是否同意协议
            // 手机号
            telInfo: {
                telNumber: '',
                telIsPass: false,
                style: {
                    textRed: false,
                    textGreen: false,
                    fa: true,
                    faCheckCircle: false,
                    faTimesCircle: false
                },
                info: ''  // 手机不符合格式，不支持港、澳、台地区手机号
            },
            //  验证码 
            testCodeInfo: {
                info: '',
                disabled: false,
                style: {
                    cursor: 'not-allowed',
                    background:  '#818080' // '# d3bc8a'
                },
                isStart: false,
                time: 59
            },
            

            
        }
    },
    head() {
        return {
        title: '忘记密码 - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },

    components: {
        SwipeBlock,
        ConfirmBox
    },

    computed: {
        ...mapGetters(['testCodeRegister', 'veriCode'])
    },

    watch: {
        'testCodeRegister'(newVal, oldVal){
            // console.log(newVal);
            
            if(newVal.success && newVal.result === 1 && newVal.status === 200){
                // 显示提示框  提示内容
                this.alertTitle = '发送成功';
                this.isShow = true;
                let timer = setTimeout(() => {
                    // 关闭提示框 并清除定时器
                    this.isShow = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 1500);
            }else{
                if(newVal.status === 201){
                    // 显示提示框  提示内容
                    this.alertTitle = newVal.remark;
                    this.isShow = true;
                    let timer = setTimeout(() => {
                        // 关闭提示框 并清除定时器
                        this.isShow = false;
                        this.alertTitle = '';
                        clearTimeout(timer);
                    }, 1500);
                }else{
                    // 显示提示框  提示内容
                    this.alertTitle = '发送失败';
                    this.isShow = true;
                    let timer = setTimeout(() => {
                        // 关闭提示框 并清除定时器
                        this.isShow = false;
                        this.alertTitle = '';
                        clearTimeout(timer);
                    }, 1500);
                }
                
            }
        },

        'veriCode'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.$router.push({
                    path: '/reset',
                    query: {
                        tel: this.telInfo.telNumber
                    }
                })
            }else{
                // 显示提示框  提示内容
                this.alertTitle = '请求失败';
                this.isShow = true;
                let timer = setTimeout(() => {
                    // 关闭提示框 并清除定时器
                    this.isShow = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 1500);
            }
        }
    },

    methods: {
        ...mapActions(['getTestCodeRegister', 'veriTestCode']),

        swipeSuccess(bool){
            this.isTestSuccess = bool;
        },


        //  验证码 发送
        testCode(){
            this.testCodeInfo.isStart = true; // 开始显示计数器
            this.testCodeInfo.disabled = true; // 按钮禁用
            this.testCodeInfo.style = {      //  按钮禁用样式
                cursor: 'not-allowed',
                background:  '#f4f4f4', // '#d3bc8a'
                color: '#666'
            };

            // 发起请求  获取验证码
            this.getTestCodeRegister({
                phone: this.telInfo.telNumber,
                sms_code_type: 'update_telphone'
            });

            let timer = setInterval(()=>{
                this.testCodeInfo.time -- ;
                
                if(this.testCodeInfo.time <= 2){
                    clearInterval(timer);

                    this.testCodeInfo.isStart = false; // 开始显示计数器
                    this.testCodeInfo.disabled = false; // 按钮禁用
                    this.testCodeInfo.style = {      //  按钮禁用样式
                        cursor: 'pointer',
                        background:  '#d3bc8a', // '#f4f4f4'
                        color: '#fff'
                    };

                    this.testCodeInfo.time = 59;
                }
            }, 1000);

            
        },

        // 手机号码格式验证
        regTel(){
            let reg = /^1[345678][0-9]{9}$/ig;
            let isPass = reg.test(this.telInfo.telNumber); // 验证手机号
            
            this.telInfo.telIsPass = isPass;
            if(this.telInfo.telNumber !== ''){
                if(isPass){
                    
                    
                    this.telInfo.style = {
                        textRed: false,
                        textGreen: true,
                        fa: true,
                        'fa-check-circle': true,
                        'fa-times-circle': false
                    } 
                    this.telInfo.telIsPass = true;

                    this.testCodeInfo.style = {      //  按钮禁用样式
                        cursor: 'pointer',
                        background:  '#d3bc8a', // '#f4f4f4'
                        color: '#fff'
                    };


                }else{
                    this.telInfo.style = {
                        textRed: true,
                        textGreen: false,
                        fa: true,
                        'fa-check-circle': false,
                        'fa-times-circle': true
                    } 
                    this.telInfo.telIsPass = false;
                }
            }else{
                this.telInfo.style = {
                        textRed: false,
                        textGreen: false,
                        fa: true,
                        'fa-check-circle': false,
                        'fa-times-circle': false
                    } 
                this.telInfo.telIsPass = false;
            }
            
            
        },

        nextStep(){
            this.veriTestCode({
                phone: this.telInfo.telNumber,
                captcha: this.testCodeInfo.info
            })
        }
    }
}
</script>
