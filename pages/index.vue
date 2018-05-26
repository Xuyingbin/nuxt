<template>
  <section class="indexContainer">
    
    <!-- banner区域 -->
      <div class="bannerContainer">
          <div class="container QR">
              <!-- 二维码 -->
              <q-r-code></q-r-code>
          </div>
      </div>
      <div class="container contentContainer">
          <div class="briefTitle">
              <!-- 简略数据 -->
              <brief-title></brief-title>
          </div>
          <!-- 主题标题 -->
          <div class="themeTitle">
              <div class="row">
                  <div class="col col-md-6">
                      <theme-module></theme-module>
                  </div>
                  <div class="col col-md-6">
                      <theme-charts></theme-charts>
                  </div>
              </div>
          </div>
          <!-- 关注主题 -->
          <div class="followTheme">
              <follow-theme ></follow-theme>
          </div>

          <!-- 资讯 -->
          <div class="themeInfo">
              <theme-info></theme-info>
          </div>
        
      </div>
    
  </section>
</template>

<script>

import Logo from '~/components/Logo.vue'
import QRCode from '~/components/QRCode'
import BriefTitle from '~/components/indexComponents/BriefTitle'
import ThemeModule from '~/components/indexComponents/ThemeModule'
import ThemeCharts from '~/components/indexComponents/themeCharts'
import FollowTheme from '~/components/indexComponents/FollowTheme'
import ThemeInfo from '~/components/indexComponents/ThemeInfo'
import InfoList from '~/components/indexComponents/InfoList'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Util from '~/store/util';

export default {
  layout: 'Dashboard',
  components: {
    Logo,
    QRCode,
    BriefTitle,
    ThemeModule,
    ThemeCharts,
    FollowTheme,
    ThemeInfo
  },
//   head () {
//     return {
//       title: this.title,
//       meta: [
//         { hid: 'description', name: 'description', content: 'My custom description' }
//       ]
//     }
//   },

    async fetch ({ store, params }) {
        await Promise.all([
            axios.get(Util.baseUrl() + 'index'),
            axios.get(Util.baseUrl() + 'conceptSort?num=3'),
            axios.get(Util.baseUrl() + 'todayAttentionConcept')
        ])
        .then(res => {
            // console.log(res);
            let [ market_index, lead, followTheme ] = res;
            
            let id = '';
            for(var key in  market_index.data.informations.topInformationMap){
                id = market_index.data.informations.topInformationMap[key].id;
            }
            store.commit('LEAD_UP_DOWN_THEME', lead.data);

            store.commit('MARKET_INDEX', {
                market: [
                    ...market_index.data.sectionExponential
                ],
                updown:{
                    upsNum: market_index.data.upsNum,
                    downNum: market_index.data.downNum,
                    dogfallNum: market_index.data.dogfallNum
                } 
            });
            store.commit('INFOMATIONS_INDEX', market_index.data.informations);

            store.commit('TODAY_FOLLOW_THEME', followTheme.data);

            return Promise.all([
                axios.get(Util.baseUrl() + 'informationAssociateTheme?informationId=' + id),
                axios.get(Util.baseUrl() + 'getConceptStockHeroListByDate?searchDate=1&conceptId=' + id)
                
            ])
        })
        .then(res => {
            let [ theme, billboard ] = res;
            store.commit('THEME_CONCEPT_INFO', theme.data);
            store.commit('THEME_TRANS_BILLBOARD', billboard.data);
            
        });

    },
    

    
    

  mounted(){
    // console.log(this);
    // this.getIndexData();
    // this.getLeadTheme({num: 3});
    this.getCapitalFlow();
  },

  methods: {
      ...mapActions(['getIndexData', 'getLeadTheme', 'getCapitalFlow', 'getInfoRelationTheme']),
  }
}
</script>
