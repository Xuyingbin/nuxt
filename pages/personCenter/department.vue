<template>
<div class="departmentFollow">
    <div class="deTitle">
        <span><s></s><b>关注的营业部</b></span>
    </div>
    <div class="deContent">
        <div class="deEdit">
            <span @click="operaMethod"><i></i><b>{{operaText}}</b></span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>营业部名称</th>
                    <th>最新上榜个股</th>
                    <th>现价</th>
                    <th>涨幅</th>
                    <th>最新上榜日期</th>
                    <th>近五日上榜次数</th>
                </tr>
            </thead>
            <tbody v-if="personFollowDepartment">
                <tr v-for="depart in personFollowDepartment.bdvList">
                    <td><a href="javascript:;" @click="jumpDepartment(depart.bo_code)">{{depart.chi_name}}</a></td>
                    <td><a href="javascript:;" 
                        @click="jumpStock({
                           code: depart.stockDetailVo.stockCode,
                           name: depart.stockDetailVo.stockName
                        })"
                    >
                        {{depart.stockDetailVo.stockName}}
                    </a></td>
                    <td>{{depart.stockDetailVo.currentPrice}}</td>
                    <td :class="depart.stockDetailVo.changeRate>0?'textRed':'textGreen'">
                       {{depart.stockDetailVo.changeRate>=0?'+'+depart.stockDetailVo.changeRate+'%':depart.stockDetailVo.changeRate+'%'}}
                    </td>
                    <td>{{depart.trading_day?depart.trading_day:'近期未上榜'}}</td>
                    <td>
                        <span>{{depart.on_the_list_num}}</span>
                        <i v-show="deleteButton" @click="handleDeleteDepartment(depart.bo_code)"></i>
                    </td>
                </tr>
                <!-- <tr>
                    <td>银河证券北京常营三里河营业部</td>
                    <td>招商银行</td>
                    <td>22.3</td>
                    <td class="textGreen">-1.13%</td>
                    <td>2017/05/06</td>
                    <td><span>5</span><i></i></td>
                </tr>
                <tr>
                    <td>银河证券北京常营三里河营业部</td>
                    <td>招商银行</td>
                    <td>22.3</td>
                    <td class="textRed">+1.13%</td>
                    <td>2017/05/06</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>银河证券北京常营三里河营业部</td>
                    <td>招商银行</td>
                    <td>22.3</td>
                    <td class="textRed">+1.13%</td>
                    <td>2017/05/06</td>
                    <td>5</td>
                </tr> -->
            </tbody>
        </table>
        <div class="pageContainer" v-if="personFollowDepartment && personFollowDepartment.bdvList.length !== 0">
            <page-select @changePage="changePage" :totalNum="totalNum" :pageSize="pageSize"></page-select>
        </div>
    </div>
</div>
</template>

<script>
import PageSelect from '~/components/invest/PageSelect';
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            // 总条数
            totalNum: 0,
            // 每页条数
            pageSize: 10,
            // 删除按钮
            deleteButton: false,
            // 操作文本
            operaText: '编辑',
            // d当前页码
            currentPage: 1,
            // session

            phone: ''
        }
    },

    components: {
        PageSelect
    },

    computed: {
        ...mapGetters(['personFollowDepartment', 'deleteDepartment'])
    },

    watch: {
        'personFollowDepartment'(newVal, oldVal){
            // console.log(newVal);
            this.totalNum = newVal.totalCount;
        },
        // 'deleteDepartment'(newVal, oldVal){
        //     console.log(newVal);
        //     if(newVal.success){

        //     }
        // }
    },

    mounted(){
        this.phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');
        this.getPersonFollowDepartment({
            phone: this.phone
        });
    },

    methods: {
        ...mapActions(['getPersonFollowDepartment', 'personDeleteDepartment']),
        //  分页
        changePage(val){
            // console.log(val);
            this.currentPage = val;
            this.getPersonFollowDepartment({no: val, phone: this.phone});
        },

        // 编辑 点击操作
        operaMethod(){
            if(this.operaText === '编辑'){
                this.deleteButton = true;
                this.operaText = '完成';
            }else if(this.operaText === '完成'){
                this.deleteButton = false;
                this.operaText = '编辑';
            }
        },

        // 删除营业部选项
        handleDeleteDepartment(id){
            // console.log(id);
            this.personDeleteDepartment({infoToken: id, userToken: this.phone});

            // setTimeout(()=>{
            this.getPersonFollowDepartment({no: this.currentPage, phone: this.phone});
            // }, 100);
        },

        // 进入营业部详情
        jumpDepartment(id){
            this.$router.push({
                path: '/departmentDetail/history',
                query: {
                    id: id
                }
            })
        },

        // 进入股票详情
        jumpStock(obj){
            let { code, name } = obj;
            window.open(`/stockDetails?code=${id}&name=${name}`);
            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: code.substring(0,6),
            //         name: name
            //     }
            // })
        }
    }
}
</script>

