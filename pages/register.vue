<template>
<section class="register">
    <div class="container">
        <div class="registerContainer">
            <div class="reTitile">
                <span>注册</span>
            </div>

            <div class="reForm">
                <form>
                    <div class="telContainer">
                        <label for="tel"></label>
                        <input v-model="telInfo.telNumber" @keyup="regTel" type="tel" placeholder="手机号">
                        <span :class="telInfo.style">{{telInfo.info}}</span>
                    </div>
                    <div class="swipeBlock">
                        <label></label>
                        <div class="swipeContaienr">
                            <swipe-block @swipeSuccess="swipeSuccess"></swipe-block>
                        </div>
                    </div>
                    <div class="testArea" v-show="isTestSuccess">
                        <div class="testCodeContainer">
                            <label></label>
                            <input v-model="testCodeInfo.info" type="text" placeholder="验证码" maxlength="6">
                            <button @click="testCode" :disabled="testCodeInfo.disabled" :style="testCodeInfo.style" type="button">发送验证码</button>
                            <span v-show="testCodeInfo.isStart">{{testCodeInfo.time}}S</span>
                        </div>
                        <div class="passwordConatiner">
                            <label for="password"></label>
                            <input v-model="passwordInfo.password" @keyup="passwordTest" type="password" placeholder="设置6-12密码">
                            <span :style="passwordInfo.style">{{passwordInfo.info}}</span>
                        </div>
                    </div>
                    <div class="agreement">
                        <label></label>
                        <i @click="checkedAgree" :class="{active: isAgree}"></i>
                        <span>我已阅读并接受<nuxt-link to="/agreements">用户协议</nuxt-link></span>
                    </div>
                    <div class="registerBtn">
                        <label></label>
                        <button :disabled="registerInfo.disabled" @click="register" type="button" :style="registerInfo.style">马上注册</button>
                    </div>
                    <div class="loginRow">
                        <label></label>
                        <span>已有账号 </span>
                        <nuxt-link to="/login">马上登录</nuxt-link>
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
import ConfirmBox from '~/components/alertBox/ConfirmBox';
import { mapGetters, mapActions } from 'vuex';

export default {
    layout: 'Dashboard',
    data(){
        return {
            alertTitle: '', // 注册成功
            isShow: false, // 提示框
            isTestSuccess: false, // 滑块是否通过
            isAgree: true, //  是否同意协议
            countDown: false, // 是否在倒计时
            // 手机号
            telInfo: {
                telNumber: '',
                telIsPass: false,
                style: {
                    textRed: false
                },
                info: ''  // 手机不符合格式，不支持港、澳、台地区手机号
            },
            //  验证码 
            testCodeInfo: {
                info: '',
                disabled: true,
                // 开始样式为禁用状态

                style: {
                    cursor: 'default',
                    background:  '#f4f4f4', // '#d3bc8a'
                    color: '#666'
                },
                isStart: false,
                time: 59
            },
            // 密码
            passwordInfo: {
                isPass: false,
                info: '请输入6-12位字母或数字',
                style: {
                    color: '#ccc'
                },
                password: ''
            },

            // 注册
            registerInfo: {
                disabled: true,
                style: {
                    cursor: 'default',
                    background: '#f4f4f4',  // #d3bc8a
                    color: '#666666'   // #fff
                }
            }
        }
    },

    head() {
        return {
        title: '注册 - 主题风向标',
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
        ...mapGetters(['regisration', 'testCodeRegister'])
    },

    watch: {
        'telInfo.telIsPass'(newVal, oldVal){
            if(!this.countDown){ // 如果不是还在倒计时  则执行
                this.testCodeInfo.disabled = !newVal;

                if(!newVal){
                    this.testCodeInfo.style = {
                        cursor: 'default',
                        background:  '#f4f4f4', // '#d3bc8a'
                        color: '#666'
                    }
                }else{
                
                        this.testCodeInfo.style = {
                            cursor: 'pointer',
                            background:  '#d3bc8a'
                        }
                    
                    
                }
            }
            
        },
        'regisration'(newVal, oldVal){
            console.log(newVal);
            if(newVal.success){
                this.alertTitle = '注册成功';
                this.isShow = true;

                let timer = setTimeout(()=>{
                    
                    this.$router.push({
                        path: '/login'
                        
                    });
                    clearTimeout(timer);
                }, 2000)
            }else{
                this.alertTitle = newVal.errMsg?newVal.errMsg:'请求超时';
                this.isShow = true;
                let timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(timer);
                }, 3000)
            }
        },
        'testCodeRegister'(newVal, oldVal){
            // 根据返回数据判断  1 表示此号未绑定可以注册  否则则是已绑定  已注册
            if(newVal.remark !== 1){
                // 显示提示框  提示内容
                this.alertTitle = newVal.remark;
                this.isShow = true;
                let timer = setTimeout(() => {
                    // 关闭提示框 并清除定时器
                    this.isShow = false;
                    clearTimeout(timer);
                }, 2000);
            }
        }
    },

    methods: {
        ...mapActions(['getTestCodeRegister', 'accountNumberRegister']),
        // 滑动验证成功
        swipeSuccess(bool){
            // console.log('bool'+bool);
            this.isTestSuccess = bool;
        },

        // 手机号码格式验证
        regTel(){
            let reg = /^1[345678][0-9]{9}$/ig;
            let isPass = reg.test(this.telInfo.telNumber); // 验证手机号
            
            this.telInfo.telIsPass = isPass;
            if(this.telInfo.telNumber !== ''){
                if(isPass){
                    
                    this.telInfo.info = '';
                    this.telInfo.style.textRed = false;
                }else{
                    this.telInfo.info = '手机不符合格式，不支持港、澳、台地区手机号';
                    this.telInfo.style.textRed = true;
                }
            }else{
                this.telInfo.info = '';
                this.telInfo.style.textRed = false;
                
            }
            
            this.registerFormat();
        },

        //  验证码 发送
        testCode(){
            this.testCodeInfo.isStart = true; // 开始显示计数器
            this.testCodeInfo.disabled = true; // 按钮禁用
            this.testCodeInfo.style = {      //  按钮禁用样式
                cursor: 'default',
                background:  '#f4f4f4', // '#d3bc8a'
                color: '#666'
            };

            // 发起请求  获取验证码
            this.getTestCodeRegister({
                phone: this.telInfo.telNumber,
                token:'update_telphone'
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
                    this.countDown = true;
            }, 1000);

            
        },

        // 密码格式判断
        passwordTest(){
            let test = /^[\d\w.!@#$%&*/]{6,12}$/ig;

            let bool = test.test(this.passwordInfo.password);
            if(this.passwordInfo.password !== ''){
                if(bool){
                    this.passwordInfo.style.color = '#32cf36';
                    this.passwordInfo.info = '密码符合规范';
                    this.passwordInfo.isPass = true;
                }else{
                    this.passwordInfo.style.color = '#f00';
                    this.passwordInfo.info = '密码不符合规范';
                    this.passwordInfo.isPass = false;
                }
            }else{
                this.passwordInfo.style.color = '#ccc';
                this.passwordInfo.info = '请输入6-12位字母或数字';
                this.passwordInfo.isPass = false;
            }

            this.registerFormat();
            
        },

        //  协议 勾选
        checkedAgree(){
            this.isAgree = !this.isAgree;

            this.registerFormat();
        },

        //  注册
        register(){
            if(this.registerInfo.disabled){
                this.isShow = false;
            }else{
                // this.isShow = true;

                // 注册请求
                this.accountNumberRegister({
                    phone: this.telInfo.telNumber,
                    captcha: this.testCodeInfo.info,
                    pwd: this.passwordInfo.password
                });
            }
        },

        //  格式是否合适
        registerFormat(){
            let testCodeIsPass = this.testCodeInfo.info !== '';
            if(this.telInfo.telIsPass && testCodeIsPass && this.passwordInfo.isPass && this.isAgree){
                this.registerInfo = {
                    disabled: false,
                    style: {
                        cursor: 'pointer',
                        background: '#d3bc8a',  
                        color: '#fff'  
                    }
                }
            }else{
                this.registerInfo = {
                    disabled: true,
                    style: {
                        cursor: 'default',
                        background: '#f4f4f4',  // #d3bc8a
                        color: '#666666'   // #fff
                    }
                }
            }
        }

    }

}
</script>
