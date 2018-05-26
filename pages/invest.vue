<template>
<section class="investContainer">
  <div class="bannerContainer">
    <div class="container">
      <div class="themeTopContainer">
      
        
          <div style="width:50%">
            <theme-top :themeTopList="themeTopListUps"></theme-top>
          </div>
          <div style="width:50%">
            <theme-top :themeTopList="themeTopListDowns"></theme-top>
          </div>
        
      </div>
    </div>
    
  </div>
    
    <nuxt-child />
</section>
</template>

<script>
import ThemeTop from "~/components/invest/ThemeTop";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Util from "~/store/util";

export default {
  layout: "Dashboard",
  data() {
    return {
      themeTopListUps: {
        // 领涨主题
        title: "今日领涨主题",
        list: [
          {
            name: "",
            data: "",
            style: {
              background: "#b71d00"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#ff3c3c"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#ff3c3c"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#f10000"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#ff3c3c"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#ff3c3c"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#ff3c3c"
            }
          }
        ]
      },
      themeTopListDowns: {
        //  领跌主题
        title: "今日领跌主题",
        list: [
          {
            name: "",
            data: "",
            style: {
              background: "#4e9039"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#7faf71"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#7faf71"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#68a54a"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#7faf71"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#7faf71"
            }
          },
          {
            name: "",
            data: "",
            style: {
              background: "#7faf71"
            }
          }
        ]
      }
    };
  },
  async fetch({ store, params }) {
    await Promise.all([
      axios.get(Util.baseUrl() + "conceptSort?num=7"),
      axios.get(Util.baseUrl() + "todayAttentionConcept"),
      axios.get(
        Util.baseUrl() +
          "stock/getConceptHeroListPC?pageSize=10&pageNo=1&days=1"
      ),
      axios.get(
        Util.baseUrl() +
          "stock/getConceptHeroListPC?pageSize=10&pageNo=1&days=5"
      )
    ]).then(res => {
      // console.log(res);
      let [lead, followTheme, newBoard, fiveBoard] = res;

      store.commit("LEAD_UP_DOWN_THEME", lead.data);

      store.commit("TODAY_FOLLOW_THEME", followTheme.data);

      store.commit("NEW_BOARD_TRANS_THEME", newBoard.data);
      store.commit("FIVE_BOARD_TRANS_THEME", fiveBoard.data);
    });

    // let market_index = await axios.get(Util.baseUrl() + 'index');
    // let lead = await axios.get(Util.baseUrl() + 'conceptSort');
  },

  head() {
    return {
      title: '主题投资 - 主题风向标',
    //   meta: [
    //     {
    //       hid: "description",
    //       name: "description",
    //       content: "My custom description"
    //     }
    //   ]
    };
  },

  computed: {
    ...mapGetters(["leadTheme"])
  },
  watch: {
    //   'leadTheme'(newVal, oldVal){
    //     //   console.log(newVal);
    //       this.handleDataSoon(this.leadTheme);
    //   }
  },

  components: {
    ThemeTop
  },

  mounted() {
    // 进入 回到顶部
    if (this.$route.path === "/invest") {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    this.handleDataSoon(this.leadTheme);
    // this.getLeadTheme({
    //     num: 7
    // });
  },

  methods: {
    ...mapActions(["getLeadTheme"]),

    // 处理数据
    handleDataSoon(data) {
      let upColorArr = [
        "#b71d00",
        "#ff3c3c",
        "#ff3c3c",
        "#f10000",
        "#ff3c3c",
        "#ff3c3c",
        "#ff3c3c"
      ];
      let downColorArr = [
        "#4e9039",
        "#7faf71",
        "#7faf71",
        "#68a54a",
        "#7faf71",
        "#7faf71",
        "#7faf71"
      ];
      let upArr = [];
      let downArr = [];
      if (data.leadUpTheme && data.leadDownTheme) {
        // 拿到领涨 领跌数据
        let upTheme = data.leadUpTheme;
        let downTheme = data.leadDownTheme;
        // 处理领涨
        upTheme.map((item, index) => {
          let obj = {};
          // 主题名称
          obj.name = item.conceptStockName;
          // 主题数据
          obj.data = item.chg + "%";
          // 主题ID
          obj.id = item.id;
          // 主题样式
          obj.style = {
            background: upColorArr[index]
          };

          upArr.push(obj);
        });
        // 处理领跌
        downTheme.map((item, index) => {
          let obj = {};
          // 主题名称
          obj.name = item.conceptStockName;
          // 主题数据
          obj.data = item.chg + "%";
          // 主题ID
          obj.id = item.id;
          // 主题样式
          obj.style = {
            background: downColorArr[index]
          };

          downArr.push(obj);
        });

        this.themeTopListUps.list = upArr;
        this.themeTopListDowns.list = downArr;
      }
    }
  }
};
</script>
