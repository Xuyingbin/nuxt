<template>
  <div class="sole-ref-container">
        <div class="sole-ref-list-container">
            <div class="sole-ref-list" v-if="nodeTaking && nodeTaking.dataList">
                <div @click="changeNews(info.infomation.id)" class="ref-list-item" v-for="info in nodeTaking.dataList">
                    <span class="date">{{dateFormat(info.infomation.infomationTime)}}</span>
                    <span class="text">{{titleLimitWords(info.infomation.infomationName)}}</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <!-- <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="ref-list-item">
                    <span class="date">2018-06-07  16:45</span>
                    <span class="text">万向钱潮披露三季报，公司前三季</span>
                    <i class="fa fa-angle-right"></i>
                </div> -->
            </div>
            <div class="page-container" v-if="nodeTaking && nodeTaking.count >= 10">
                <page-select 
                    @changePage="recentChangePage" 
                    :totalNum="nodeTaking.count" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>

        <div class="sole-ref-detail" v-if="referenceDetails">
            <h1>{{referenceDetails.details.infomation.infomationName}}</h1>
            <h3>
                <span>{{dateFormat(referenceDetails.details.infomation.infomationTime)}}</span> 
                <span>来源：{{referenceDetails.details.infomation.informationSource}}</span>
            </h3>
            <div class="content-text" v-html="referenceDetails.details.infomation.infomationContent">
                <!-- <p>次报道称，援引自内部人员消息，特斯拉已经和上海市政府达成协议，将在上海自贸区内，建一座特斯拉独资的工厂，目前双方还在商议国产时间等公告细节。</p>
                <p>另外，中金公司10月23日发布的最新研报认为，特斯拉此前已反复表示，会在今年年底前披露中国设厂的详细计划。可能的公布时间点包括公司11月1日的三季报，或者11月初Trump总统访华。</p>
                <p>这两则重磅消息看起来有些突然，但其实一路都是有迹可循，自今年以来，特斯拉落地上海的准备工作也是铺垫很久。</p>
                <p>017年6月，发改委、商务部发布《外商投资产业指导目录》取消了外资新能源汽车动力电池制造的准入限制以及同一家外商在国内建立合资纯电动汽车生产企业不超过两家的限制。 </p>
                <p>9月21日，商务部发言人高峰在发布会上称，将尽快研究出台减少新能源汽车制造领域外商投资限制的政策措施，持续推进这个领域的对外开放。</p>
                <p>此番言论也被市场解读为中国放宽新能源车投资限制，其中“新能源车”、“自贸区”、“独资”的字眼更是直指特斯拉。</p> -->

            </div>

            <div class="rela-stock">
                <div class="rela-title">
                    <span>相关个股</span>
                </div> 
                <h4 class="stock" v-for="stock in referenceDetails.details.stockVoList">
                    <nuxt-link :to="'/stockDetails?name='+stock.infoName + '&code=' + stock.infoCode" target="_blank">
                        {{stock.infoName}}
                    </nuxt-link>
                </h4>
                <!-- <h4 class="stock">平安银行</h4>
                <h4 class="stock">平安银行</h4> -->
            </div>
        </div>
        
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageSelect from '../../themeInvestment/PageSelect'
export default {
    data(){
        return {

        }
    },

    components:{
        PageSelect
    },

    computed: {
        ...mapGetters(['nodeTaking', 'referenceDetails']),

    },

    watch: {
        'nodeTaking'(newVal, oldVal){
            // console.log(newVal);
            if(newVal && newVal.dataList){
                this.getReferenceDetails({
                    id: newVal.dataList[0].infomation.id
                })
            }
        }
    },

    mounted(){
        if(this.nodeTaking){
           this.getReferenceDetails({
                id: this.nodeTaking.dataList[0].infomation.id
            }) 
        }
    },

    methods: {
        ...mapActions(['getReferenceDetails']),
        recentChangePage(val){
            // console.log(val);
            this.getInternalReference({
                pageNo: page,
                status: 4
            })

        },

        // 时间格式化
        dateFormat(time){
            if(typeof time === 'number'){
                return new Date(time).format('YYYY-MM-DD hh:mm');
            }else{
                return '';
            }
        },
        // 标题字数限制
        titleLimitWords(str){
            if(typeof str === 'string'){
                if(str.length > 26){

                    return str.substr(0, 26) + ' . . .';
                }else{
                    return str;
                }
            }else{
                return '';
            }
        },

        // 点击资讯  切换资讯详情
        changeNews(id){
            this.getReferenceDetails({
                id: id
            });
        }
    }
}
</script>
