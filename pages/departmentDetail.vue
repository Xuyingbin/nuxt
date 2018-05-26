<template>
<section class="departmentDetail">
    <div class="themeTitle">
        <div class="container">
            <div class="theme" v-if="departmentBasicInfo">
                <h1><i></i><span>龙虎榜 > {{departmentBasicInfo.departmentData?departmentBasicInfo.departmentData.chi_name:chi_name }}</span></h1>
                
                <div class="follow">
                    <span 
                        v-if="!departmentBasicInfo.fellow" 
                        @click="addFollow({
                            infoToken: departmentBasicInfo.departmentData?departmentBasicInfo.departmentData.bo_code:bo_code
                        })">
                        <strong>+</strong>
                        <b>关注</b>
                    </span>
                    <span 
                        v-if="departmentBasicInfo.fellow"
                        @click="cancelFollow({
                            infoToken: departmentBasicInfo.departmentData?departmentBasicInfo.departmentData.bo_code:bo_code
                        })"
                    ><b>取消关注</b></span>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <!-- <div class="departTitle">
            <span>龙虎榜</span>
            <b> > </b> 
            <span>国泰君安证券股份有限公司南京太平南路证券营业部</span>
        </div> -->
        
        <div class="changeColumn">
            <div class="handle">
                <ul>
                    <li @click="handleCol('history')" :class="currentClassName==='history'?'active':''">历史交易数据统计</li>
                    <li @click="handleCol('business')" :class="currentClassName==='business'?'active':''">期间买卖详情统计</li>
                </ul>
            </div>
            <!-- <div class="display">
                <span>数据截至日期：2017-10-17</span>
            </div> -->
        </div>
        <confirm-box v-if="boxIsShow" :title="title"></confirm-box>
        <nuxt-child />
    </div>
</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConfirmBox from '~/components/alertBox/ConfirmBox';
import Util from '~/store/util';
import axios from 'axios';
export default {
    layout: 'Dashboard',
    name: 'DepartmentDetail',
    validate({ params, query }) {
        
        let id = query.id;
        let bool = /^[\d]{6}$/.test(id);
        if(bool){

            return true // 如果参数有效
        }else{

            return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
        }
    },
    data(){
        return {
            currentClassName: 'history',
             // 弹出框 是否显示
            boxIsShow: false,
            // 弹出框内容
            title: '',
            chi_name: '', // 营业部名称
            bo_code: '', // 营业部代码

            userPhone: ''
        }
    },

    head() {
        return {
        title: this.departmentBasicInfo.departmentData?
                this.departmentBasicInfo.departmentData.chi_name:
                this.chi_name + ' - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },
    async fetch ({ store, query }) {
        await Promise.all([
            axios.get(Util.baseUrl() + 'stock/getDepartmentDetail?bo_code='+query.id ),
            
        ])
        .then(res => {
            // console.log(res);
            let [ detail ] = res;
            store.commit('DEPARTMENT_DETAIL', detail.data);

        })

    },

    components: {
        ConfirmBox
    },

    computed: {
        ...mapGetters(['departmentDetail', 'optionalAddFollow', 'optionalCancelFollow', 'departmentStockList']),
        departmentBasicInfo(){
            return this.departmentDetail;
        },
        departmentName(){
            return this.departmentDetail?(this.departmentDetail.departmentData?this.departmentDetail.departmentData.chi_name:this.chi_name):'';
        }
    },

    watch: {
        '$route'(newVal, oldVal){
            if(newVal === oldVal){
                
                if(oldVal.path.indexOf('history') !== -1){
                
                    this.currentClassName = 'history';
                }else if(oldVal.path.indexOf('business') !== -1){
                    this.currentClassName = 'business';
                }
            }
            
        },
        'departmentDetail'(newVal, oldVal){
            console.log(newVal);
        },

        'optionalCancelFollow'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.departmentBasicInfo.fellow = false;
            }else{
                this.title = '取消关注失败';
                this.boxIsShow = true;
                let timer = setTimeout(() => {
                    this.boxIsShow = false;
                    this.title = '';
                    clearTimeout(timer);
                }, 1500)
            }
        },

        'optionalAddFollow'(newVal, oldVal){
            // console.log(newVal);
            if(this.userPhone){
                if(newVal.success && newVal.attention){
                    this.departmentBasicInfo.fellow = true;
                }else{
                    this.title = '关注失败';
                    this.boxIsShow = true;
                    let timer = setTimeout(() => {
                        this.boxIsShow = false;
                        this.title = '';
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
        },

        'departmentStockList'(newVal, oldVal){
            // console.log(newVal);
            // console.log(this.$route.query.id);
            this.bo_code = this.$route.query.id;
            this.chi_name = newVal?newVal.stockList[0].chi_name:'';
        }
    },

    
    mounted(){
        let phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
        this.userPhone = phone;
        this.getDepartDetail({
            userPhone: phone,
            bo_code: this.$route.query.id
        });
        // this.getDepartmentStockList({bo_code: this.$route.query.id})
        // console.log(this.departmentStockList);
        this.chi_name = this.departmentStockList?this.departmentStockList.stockList[0].chi_name:'';
        // console.log(this.$route.path);
        // 进入 回到顶部
        if(this.$route.path.indexOf('/departmentDetail') !== -1){
            // console.log(this.$route.path)
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            if(this.$route.path.indexOf('/history') !== -1){
                this.currentClassName = 'history';
            }else{
                // console.log('lll')
                this.currentClassName = 'business';
            }
        }

       
    },

    destroyed(){
        // 离开页面是 清除数据缓存
        this.clearDetails('department');
    },

    methods: {
        ...mapActions(['getDepartDetail', 'addDepartmentlFollowAction', 'cancelDepartmentFollowAction', 'clearDetails', 'getDepartmentStockList']),
        handleCol(path){
            this.currentClassName = path;
            this.$router.push({
                path: path,
                query: {
                    id: this.$route.query.id
                }
            });
        },

        addFollow(obj){
            this.addDepartmentlFollowAction({
                ...obj,
                userToken: this.userPhone,
                
                            
            })
        },

        cancelFollow(obj){
            this.cancelDepartmentFollowAction({
                ...obj,
                userToken: this.userPhone
                
            })
        }
    }
}
</script>

