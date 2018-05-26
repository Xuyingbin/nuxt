<template>
  <section class="Login">
      <div class="bgContaienr">
          <div class="container">
            <div class="title">
                <img src="~/assets/image/slogan.png" alt="">
            </div>
            <div class="loginForm">
                <div class="loginTitle">账号登录</div>
                <form>
                    <div class="form-group">
                        <label for=""></label>
                        <input v-model="telNumber" type="text" placeholder="手机号码">
                    </div>
                    <div class="form-group">
                        <label for=""></label>
                        <input v-model="password" type="password" placeholder="请输入密码">
                    </div>
                    <div class="buttonGroup">
                        <button type="button" @click="handleLogin">登录</button>
                    </div>
                </form>
                <div class="operaRow">
                    <div class="op-l">
                        <!-- class="active" -->
                        <i @click="checked" :class="{active: isChecked}"></i> 
                        <span>下次自动登录</span>
                    </div>
                    <div class="op-r">
                        
                        <nuxt-link to="/forget">忘记密码</nuxt-link> |
                        <nuxt-link to="/register">注册</nuxt-link>
                        
                    </div>
                    
                </div>
                <div class="operaRow" >
                        
                    <nuxt-link to="/" style="float: right;">返回首页</nuxt-link>
                        
                </div>
            </div>
          </div>
      </div>
            

          <confirm-box v-show="infoIsAlert" :title="alertTitle" :isLink="isLink"></confirm-box>
      <!-- <footer-single></footer-single> -->
  </section>
</template>

<script>
// import FooterSingle from '~/Footer';
import ConfirmBox from '~/components/alertBox/ConfirmBox';
import { mapActions, mapGetters } from 'vuex';
export default {
    layout: 'Login',
    data(){
        return{
            isChecked: false,
            // 密码
            password: '',
            // 账号
            telNumber: '',
            // 弹出框
            infoIsAlert: false,
            // 提示框内容
            alertTitle: '',
            isLink: ''
        }
    },
    head() {
        return {
        title: '登录 - 主题风向标',
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
        // FooterSingle,
        ConfirmBox
    },

    computed: { 
        ...mapGetters(['loginIfo'])
    },

    watch: {
        'loginIfo'(newVal, oldVal){
            console.log(newVal);
            // isCertification  1 是未认证  2 已认证
            if(newVal.success){
                

                if(newVal.isCertification === '2'){
                    // debugger;
                    // 如果自动登录勾选
                    if(this.isChecked){
                        localStorage.setItem('qutouPhone', newVal.uuid);
                        localStorage.setItem('loginTime', new Date());
                        localStorage.setItem('userName', String(newVal.data).substr(0, 3) + '****' + String(newVal.data).substr(7, 4));
                        localStorage.setItem('isCertification', newVal.isCertification);
                    }else{
                        sessionStorage.setItem('qutouPhone', newVal.uuid);
                        sessionStorage.setItem('userName', String(newVal.data).substr(0, 3) + '****' + String(newVal.data).substr(7, 4))
                        sessionStorage.setItem('isCertification', newVal.isCertification);
                    }
                    this.$router.push({path: '/'});
                }else{
                    this.alertTitle = '尊敬的用户， 您现在还未进行实名认证！'
                    this.infoIsAlert = true;
                    this.isLink = '/certificationPC?uuid=' + newVal.uuid;
                    
                }

                this.refreshSTORAGE();
                  
            }else{
                this.alertTitle = newVal.errMsg;
                this.infoIsAlert = true;

                let timer = setTimeout(()=>{
                    this.infoIsAlert = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 2000);
            }
        }
    },

    methods: {
        ...mapActions(['accountNumberLogin', 'refreshSTORAGE']),
        checked(){
            this.isChecked = !this.isChecked;
        },

        // 点击登录
        handleLogin(){
            // 如果输入不为空
            if(this.password !== '' && this.telNumber !== ''){
                this.accountNumberLogin({
                    userName: this.telNumber,
                    pwd: this.password
                });

            }else{
                this.infoIsAlert = true;
                this.alertTitle = '输入不能为空';

                let timer = setTimeout(() => {
                    this.infoIsAlert = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 2000);
            }
        }
    }
}
</script>
