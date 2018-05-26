<template>
<div class="tableContainer">
    
    <div class="titleNav">
        <ul>
            <li @click="handleNav(5)"><span :class="navIndex === 5?'active':''">全部</span></li>
            <li @click="handleNav(0)"><span :class="navIndex === 0?'active':''">主题</span></li>
            <li @click="handleNav(1)"><span :class="navIndex === 1?'active':''">股票</span></li>
        </ul>
    </div>
    <div class="stockTable">
        <table>
            <thead>
                <tr>
                    <th>
                        <check-box-more @checkedMore="checkedMore" :labelId="'all'"></check-box-more>
                    </th>
                    <th>代码</th>
                    <th>名称</th>
                    <th>最新价</th>
                    <!-- <th>涨跌额</th> -->
                    <th>涨跌幅</th>
                    <th>昨收</th>
                    <th>今开</th>
                    <th>最高价</th>
                    <th>最低价</th>
                    <th>相关主题</th>
                    <th>相关个股</th>
                    <th></th>
                </tr>
                
            </thead>

            <tbody v-if="optional && optional.mySelect">
                <tr v-for="list in optional.mySelect">
                    <td>
                        <check-box-more @checkedMore="checkedMore" :labelId="list.selectInfoId.toString()"></check-box-more>
                        <!-- <i class="deleteItem" @click="cancelFollow(list.selectInfoId)"></i> -->
                    </td>
                    <td v-if="list.infoType === 1">
                        {{list.infoCode}}
                    </td>
                    <td v-if="list.infoType === 0">
                        --
                    </td>
                    <td v-if="list.infoType === 1"> 
                        <nuxt-link 
                            :to="'/stockDetails?name='+list.infoName+'&code='+list.infoCode+'&marketCode='+list.dataType"
                            target="_blank"
                        >{{list.infoName}}</nuxt-link> 
                    </td>
                    <td v-if="list.infoType === 0"> 
                        <nuxt-link :to="'/themeDetails?id='+list.infoId">{{list.infoName}}</nuxt-link> 
                    </td>
                    
                    <td v-if="list.infoType === 1" class="textRed">{{list.currentPrice}}</td>
                    <td v-if="list.infoType === 0" class="textRed">--</td>
                    <!-- <td :class="list.chgPrice>=0?'textRed':'textGreen'">
                        {{list.chgPrice?dataFormat(list.chgPrice):'--'}}
                    </td> -->
                    <td :class="list.chg>=0?'textRed':'textGreen'">
                        {{chgFormat(list.chg)}}
                    </td>
                    <td>{{list.yesClosingPx?list.yesClosingPx:'--'}}</td>
                    <td>{{list.openPx?list.openPx:'--'}}</td>
                    <td>{{list.highPx?list.highPx:'--'}}</td>
                    <td>{{list.lowPx?list.lowPx:'--'}}</td>
                    <!-- 为个股时 -->
                    <td v-if="list.infoType === 1">
                        <!-- 相关主题 -->
                        <span v-for="theme in list.conceptList">
                            
                            <nuxt-link :to="'/themeDetails?id='+theme.id">{{theme.conceptStockName}}</nuxt-link> 
                            
                        </span>
                        <!-- <span>保险行业</span>
                        <span>保险行业</span> -->
                    </td>
                    <td v-if="list.infoType === 0">
                        <span>--</span>
                        <!-- <span>保险行业</span>
                        <span>保险行业</span> -->
                    </td>
                    <!-- 为主题时 -->
                    <td v-if="list.infoType === 0">
                        <!-- 相关个股 -->
                        <span v-for="stock in list.stockList">
                            <nuxt-link 
                                :to="'/stockDetails?name='+stock.name+'&code='+stock.code" target="_blank"
                            >{{stock.name}}</nuxt-link>
                        </span>
                        <!-- <span>保险行业</span>
                        <span>保险行业</span> -->
                    </td>
                    <td v-if="list.infoType === 1">
                        <span>--</span>
                        <!-- <span>保险行业</span>
                        <span>保险行业</span> -->
                    </td>
                    
                    <td><b class="topItem" 
                        @click="moveTop({
                            selfSelectInfoId: list.selectInfoId
                        })"
                    ></b></td>
                </tr>
                <!-- <tr>
                    <td>
                        <i class="deleteItem"></i>

                    </td>
                    <td>000001</td>
                    <td>中国平安</td>
                    <td>20.3</td>
                    <td>+30</td>
                    <td>+0.34%</td>
                    <td>20</td>
                    <td>21</td>
                    <td>45</td>
                    <td>30</td>
                    <td>
                        <span>保险行业</span>
                        <span>保险行业</span>
                        <span>保险行业</span>
                    </td>
                    <td>--</td>
                    <td><b class="topItem"></b></td>
                </tr> -->
            </tbody>
            
        </table>
        <div class="deleteBtn">
            <button @click="cancelFollow">删除</button>
        </div>
        <div class="pagegration" v-if="optional && optional.count > 5">
            <page-select
                @changePage="newChangePage" 
                :totalNum="optional.count" 
                :pageSize="10"
                :currentPageNo="currentPage"
            ></page-select>
        </div>
        
        <comfirm-box v-if="isShow" :title="alertText"></comfirm-box>
    </div>
    
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ComfirmBox from '../alertBox/ConfirmBox';
import PageSelect from '~/components/invest/PageSelect';
import CheckBoxMore from './CheckBoxMore';
import $ from 'jquery';
export default {
    props: ["optional"],
    data(){
        return {
            // 导航标识
            navIndex: 5,
            
            // checked: true,
            // 弹出框 是否显示
            isShow: false,
            // 提示内容
            alertText: '',
            // 当前页面
            currentPage:1,
            // pageNo
            pageNo: 1,
            selectArr: [],

            phone: ''
        }
    },

    components: {
        ComfirmBox,
        PageSelect,
        CheckBoxMore
    },

    computed: {
        
        ...mapGetters(['optionalListCancelFollow', 'optionalListSort'])
    },

    watch: {
       'optionalListCancelFollow'(newVal, oldVal){
           this.phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            //    console.log(newVal);
            if(newVal.success){
                this.getOptionalStockList({userToken: this.phone});
                $('.CheckBoxMore b').removeClass('active');
            }else{
                this.isShow = true;
                this.alertText = '删除失败';
                let timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(timer);
                },1500)
            }   
       },
       'optionalListSort'(newVal ,oldVal){
            this.phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            //    console.log(newVal);
            if(this.phone && newVal.success){
                this.getOptionalStockList({
                    userToken: this.phone,
                    pageNo: this.pageNo,
                    infoType: this.navIndex
                })
            }else{
                this.isShow = true;
                this.alertText = '置顶失败';
                let timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(timer);
                },1500)
            }
       }
    },

    mounted(){
        this.phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
        console.log(this.optional);
    },

    methods: {
        ...mapActions([
            'getOptionalStockList', 
            'cancelOptionalListFollowAction', 
            'handleoptionalListSort'
        ]),
        // checkedAll(){

        // },
        // 切换页面
        newChangePage(val){
            this.pageNo = val;
            // console.log(val);
            this.getOptionalStockList({
                userToken: this.phone,
                pageNo: val,
                infoType: this.navIndex
            })
        },

        // 数据格式化
        dataFormat(num){
            return (parseFloat(num)).toFixed(2);
        },
        // 涨跌幅格式
        chgFormat(chg){
            if(chg > 0){
                return '+' + (parseFloat(chg).toFixed(2)) + '%';
            }else{
                return (parseFloat(chg).toFixed(2)) + '%';
            }
        },
        // // 跳转主题详情
        // jumpTheme(obj){
        //     let { id } = obj;
        //     this.$router.jum
        // }

        // 导航栏切换
        handleNav(index){
            this.navIndex = index;
            this.getOptionalStockList({
                userToken: this.phone,
                infoType: index
            });
            // 根据组件写的逻辑  只有currentPageNo改变的时候 才会监听到currentPage数值
            //  并且 修改组件中的 currentPage
            //  如果currentPageNo 小于1 也会重置为1 
            // 现在需要重置 所以 每次改变比1小的数值

            --this.currentPage;
        },

        // 删除自选列表的某项
        cancelFollow(){
            this.cancelOptionalListFollowAction({
                ids: this.selectArr.join(',')
            });
        },

        // 置顶技能
        moveTop(obj){
            obj.phone = this.phone;
            this.handleoptionalListSort(obj);
        },

        checkedMore(ids){
            // 如果数组中存在
            
            
            // console.log(ids);
            this.selectArr = ids;

            
        }

    }
}
</script>
