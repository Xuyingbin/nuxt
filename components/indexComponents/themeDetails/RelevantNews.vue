<template>
<div class="RelevantNews">
    <label-bar :title="navTitle"></label-bar>
    <div class="relevantInfo" v-if="relationInfo" :style="releStyle">
        <ul class="infoList">
            <li v-for="info in relationInfo">
                <div class="time">{{dateFormat(info.infomationTime)}}</div>
                <div class="infoTitle">
                    <span>
                        <nuxt-link :to="'/article?id='+info.id" target="_blank">
                            {{wordLimit(info.infomationName)}}
                        </nuxt-link>
                        
                    </span>
                </div>
            </li>
            <!-- <li>
                <div class="time">9月27日</div>
                <div class="infoTitle">
                    <span>第九届“一带一路”生态农业与食品安全论坛举行</span>
                </div>
            </li>
            <li>
                <div class="time">9月27日</div>
                <div class="infoTitle">
                    <span>生态农业板块走强 西部牧业涨停</span>
                </div>
            </li> -->
        </ul>
    </div>
</div>
</template>

<script>
import LabelBar from './Label';
import '~/utils/format';
export default {
    props: ["relationInfo", "releStyle"],
    data(){
        return {
            navTitle: '相关资讯'
        }
    },
    components: {
        LabelBar
    },
    methods: {
        // 时间格式
        dateFormat(date){
            let dateStr = (new Date(date)).format('MM-DD');
            return dateStr?dateStr.split('-')[0] + '月' + dateStr.split('-')[1] + '日':'';
        },

        // 字数限制
        wordLimit(w){
            if(w.length > 42){

                return w.slice(0,42) + '...';
            }else{
                return w;
            }
        }
    }
}
</script>
