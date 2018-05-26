<template>
<section class="modifyPassword">
    <div class="container">
        <div class="passwordContainer">
            <div class="form">
                
                <form>
                    <div class="title">
                        <span>重置密码</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="newPwd"></label>
                        <input @keyup="passwordTest($event)" v-model="newPwd" type="password" placeholder="新密码">
                        <span :style="alertStyle.style">{{alertStyle.content}}</span>
                    </div>
                    <div class="form-group">
                        <label for="passwordAgain"></label>
                        <input v-model="passwordAgain" type="password" :style="alertAgainStyle.inputStyle" placeholder="确认密码" :disabled="alertAgainStyle.disabled">
                        <span :style="alertAgainStyle.style">{{alertAgainStyle.content}}</span>
                    </div>
                    <div class="botton-group">
                        <button @click="confirm" type="button" :disabled="!alertStyle.isPass || !alertAgainStyle.isPass" class="confirm" :style="confirmStyle">确认</button>
                        <button @click="back" type="button" class="back">返回</button>
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
    data(){
        return {
            alertTitle: '',
            isShow: false, // 弹框隐藏
            passwordAgain: '',// 第二次
            newPwd: '', // 新密码
            alertStyle: { // 提示样式  内容
                style: {
                    color: '#ccc'
                },
                isPass: false,
                content: '请输入6-12位字母或数字'
            },
            alertAgainStyle: { // 提示样式  内容
                style: {
                    color: '#ccc',
                    
                },
                inputStyle: {
                    cursor: 'not-allowed'
                },
                disabled: true,
                isPass: false,
                content: ''
            },

            // confirm style
            confirmStyle: {
                
                background: '#ccc', // #c7aa75
                cursor: 'not-allowed'
                
            }
        }
    },

    head() {
        return {
        title: '重置密码 - 主题风向标',
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
        ConfirmBox
    },

    computed: {
        ...mapGetters(['resetPassword'])
    },

    watch: {
        'resetPassword'(newVal, oldVal){
            console.log(newVal);
            this.alertTitle = newVal.msg;
            this.isShow = true;
            if(newVal.result === 1){
                // console.log('kkk')
                let timer = setTimeout(()=>{
                    this.alertTitle = '';
                    this.isShow = false;

                    if(newVal.data){
                        this.$router.push({
                            path: '/login'
                        })
                    }
                }, 1500)
            }else{
                let timer = setTimeout(()=>{
                    this.alertTitle = '';
                    this.isShow = false;

                   
                    this.$router.push({
                        path: '/forget'
                    })
                    
                }, 1500);
            }
            
        },
        'passwordAgain'(newVal, oldVal){
            // console.log(newVal);
            if(newVal !== this.newPwd){
                this.alertAgainStyle.style.color = '#f00';
                this.alertAgainStyle.content = '两次输入密码不同';
                this.alertAgainStyle.isPass = false;
                this.confirmStyle = {
                    background: '#ccc', // #c7aa75
                    cursor: 'not-allowed'
                }
            }else{
                this.alertAgainStyle.style.color = '#32cf36';
                this.alertAgainStyle.content = '两次输入密码相同';
                this.alertAgainStyle.isPass = true;
                this.confirmStyle = {
                    background: '#c7aa75', // #ccc
                    cursor: 'pointer'
                }
            }
        }
    },

    methods: {
        ...mapActions(['resetUserPassword']),
        // 密码格式判断
        passwordTest(){
            let test = /^[\d\w.!@#$%&*/]{6,12}$/ig;

            let bool = test.test(this.newPwd);
            if(this.newPwd !== ''){
                if(bool){
                    this.alertStyle.style.color = '#32cf36';
                    this.alertStyle.content = '密码符合规范';
                    this.alertStyle.isPass = true;
                    this.alertAgainStyle.disabled = false;
                    this.alertAgainStyle.inputStyle.cursor = 'text';
                }else{
                    this.alertStyle.style.color = '#f00';
                    this.alertStyle.content = '密码不符合规范';
                    this.alertStyle.isPass = false;
                    this.alertAgainStyle.disabled = true;
                    this.alertAgainStyle.inputStyle.cursor = 'not-allowed';
                }
            }else{
                this.alertStyle.style.color = '#ccc';
                this.alertStyle.content = '请输入6-12位字母或数字';
                this.alertStyle.isPass = false;
                this.alertAgainStyle.disabled = true;
                this.alertAgainStyle.inputStyle.cursor = 'not-allowed';
            }
            
        },

        

        // 确认
        confirm(){
            if(this.alertStyle.isPass && this.alertAgainStyle.isPass){
                this.resetUserPassword({
                    password: this.newPwd,
                    passwordagain: this.passwordAgain,
                    phone: this.$route.query.tel?this.$route.query.tel:null
                })
            }
            // this.modifyPersonPassword({
            //     oldPwd: this.originalPwd,
            //     password: this.newPwd
            // });
        },

        // 返回
        back(){
            history.go(-1);
        }
    }
}
</script>

