<template>
<section class="modifyPassword">
    <div class="container">
        <div class="passwordContainer">
            <div class="form">
                
                <form>
                    <div class="title">
                        <span>修改密码</span>
                    </div`>
                    <div class="form-group">
                        <label for="originalPwd"></label>
                        <input v-model="originalPwd" type="password" placeholder="原始密码">
                        <span></span>
                    </div>
                    <div class="form-group">
                        <label for="newPwd"></label>
                        <input @keyup="passwordTest($event)" v-model="newPwd" type="password" placeholder="新密码">
                        <span :style="alertStyle.style">{{alertStyle.content}}</span>
                    </div>
                    <div class="form-group">
                        <label for="newPwd"></label>
                        <input @keyup="twicePasswordTest($event)" v-model="twicePwd" type="password" placeholder="请再次输入" :disabled="newPwd === ''">
                        <span :style="twiceAlertStyle.style">{{twiceAlertStyle.content}}</span>
                    </div>
                    <div class="botton-group">
                        <button @click="confirm" type="button" class="confirm" :disabled="disabled" :style="confrimStyle">确认</button>
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
            originalPwd: '',// 原始密码
            newPwd: '', // 新密码
            twicePwd: '', // 第二次输入密码
            alertStyle: { // 提示样式  内容
                ispass: false,
                style: {
                    color: '#ccc'
                },
                content: '请输入6-12位字母或数字'
            },
           
            twiceAlertStyle: {
                ispass: false,
                style: {
                    color: '#ccc'
                },
                content: '请再次确认'
            },

            // 确认按钮样式
            confrimStyle: {
                background: '#ccc',
                cursor: 'not-allowed'
            },
            phone: ''
        }
    },
    head() {
        return {
        title: '修改密码 - 主题风向标',
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
        ...mapGetters(['modifyPassword']),
        disabled(){
            return this.alertStyle.ispass === false || this.twiceAlertStyle.ispass === false;
        }
    },

    watch: {
        'modifyPassword'(newVal, oldVal){
            // console.log(newVal);
            this.alertTitle = newVal.msg;
            this.isShow = true;
            
            setTimeout(()=>{
                this.alertTitle = '';
                this.isShow = false;

                if(newVal.data){
                    this.$router.push({
                        path: '/login'
                    })
                }
            }, 1500)
        },
        'disabled'(newVal, oldVal){
            // console.log(newVal);
            if(newVal){
                this.confrimStyle = {
                    background: '#ccc',
                    cursor: 'not-allowed'
                }
            }else{
                // #d3bc8a
                this.confrimStyle = {
                    background: '#d3bc8a',
                    cursor: 'pointer'
                }
            }
        }
    },

    mounted(){
        this.phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');;
    },

    methods: {
        ...mapActions(['modifyPersonPassword']),
        // 密码格式判断
        passwordTest(){
            let test = /^[\d\w.!@#$%&*/]{6,12}$/ig;

            let bool = test.test(this.newPwd);
            this.twicePwd = '';
            if(this.newPwd !== ''){
                if(bool){
                    this.alertStyle.style.color = '#32cf36';
                    this.alertStyle.content = '密码符合规范';
                    this.alertStyle.ispass = true; // 密码验证通过
                }else{
                    this.alertStyle.style.color = '#f00';
                    this.alertStyle.content = '密码不符合规范';
                    this.alertStyle.ispass = false;
                }
            }else{
                this.alertStyle.style.color = '#ccc';
                this.alertStyle.content = '请输入6-12位字母或数字';
                this.alertStyle.ispass = false;
            }
            
        },

        twicePasswordTest(){
            if(this.twicePwd !== ''){
                if(this.twicePwd === this.newPwd){
                    this.twiceAlertStyle.style.color = '#32cf36';
                    this.twiceAlertStyle.content = '';
                    this.twiceAlertStyle.ispass = true; // 密码验证通过
                }else{
                    this.twiceAlertStyle.style.color = '#f00';
                    this.twiceAlertStyle.content = '两次输入不相同';
                    this.twiceAlertStyle.ispass = false;
                }
            }else{
                this.twiceAlertStyle.style.color = '#ccc';
                this.twiceAlertStyle.content = '请再次确认';
                this.twiceAlertStyle.ispass = false;
            }
        },

        // 确认
        confirm(){
            this.modifyPersonPassword({
                phone: this.phone,
                oldPwd: this.originalPwd,
                password: this.newPwd
            });
        },

        // 返回
        back(){
            history.go(-1);
        }
    }
}
</script>

