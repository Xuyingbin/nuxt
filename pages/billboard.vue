<template>
<section class="billBoardContainer">
    
    <div class="container">
        <div class="billboardColumn">
            <div class="billboardLeft">
                <theme-label :title="billboardTitle"></theme-label>
                <div class="boardDate">
                    <div class="todayDate">
                        <span>{{day}}</span>
                        <span>{{year}}-{{month}}</span>
                    </div>
                    <div class="dateIcon">
                        <i @click="dateShow"></i>
                        <div :class="datePickerStyle">
                            <date-picker @choiceDate="changeDate"></date-picker>
                        </div>
                    </div>
                    <div class="todayBoard">
                        <span>{{this.boardList.code?this.boardList.stockHeroList.length:0}}</span>
                        <span>今日上榜数</span>
                    </div>
                </div>
                <div class="boardList" >
                    
                    <board-list @stockSort="stockSort"></board-list>
                </div>
            </div>
            <div class="billboardRight">
                <div class="stockTitle">
                    <span>{{this.currentStockDetails?this.currentStockDetails.stockName:''}}</span>
                    <span>{{this.currentStockDetails?this.currentStockDetails.stockCode:''}}</span>
                    <span>数据详情</span>
                </div>
                <div class="stockContainer">
                    <!-- k  线图 -->
                    <k-line></k-line>
                    
                    <!--  -->
                    <div class="stockDetails">
                        <ul>
                            <li>
                                
                                <span class="textRed">{{stockDetails.detail?stockDetails.detail.currentPrice:'**'}}</span>
                                <span>最新股价</span>
                            </li>
                            <li>
                                <span :class="changeRateClass">{{stockDetails.detail?stockDetails.detail.changeRate + '%':'**'}}<i></i></span>
                                <span>涨幅</span>
                            </li>
                            <li>
                                <span>{{stockDetails.detail?dataFormat(stockDetails.detail.circulation_value):'**'}}</span>
                                <span>流通市值（亿）</span>
                            </li>
                            <li>
                                <span>{{stockDetails.detail?stockDetails.detail.turnover_ratio + '%':'**'}}<i></i></span>
                                <span>换手</span>
                            </li>
                            <li>
                                <span>{{stockDetails.detail?stockDetails.detail.pe_rate + '%':'**'}}<i></i></span>
                                <span>市盈率</span>
                            </li>
                        </ul>
                    </div>
                    

                    <!-- 买卖营业部 -->
                    <department></department>
                </div>
            </div>
        </div>

        <div class="topTableContainer">
            
            <theme-label :title="topTableTitle"></theme-label>
            <div class="tableContainer">
                <top-table :departInfo="departTop"></top-table>
            </div>
        </div>

        <div class="topTableMechContainer" >
            
            <theme-label :title="topTableMechTitle"></theme-label>
            <div class="tableContainer">
                <top-table :departInfo="mechTop"></top-table>
            </div>
        </div>
    </div>
    
</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import themeLabel from "~/components/indexComponents/themeDetails/Label";
import BoardList from "~/components/billBoard/BoardList";
import KLine from "~/components/billBoard/KLine";
import Department from "~/components/billBoard/Department";
import TopTable from "~/components/billBoard/TopTable";
import DatePicker from "~/components/billBoard/DatePicker";

import Util from "~/store/util";
import $ from "jquery";
import axios from "axios";
export default {
  layout: "Dashboard",
  data() {
    return {
      //  龙虎榜列表
      billListData: null,
      // 涨跌幅

      datePickerStyle: { datePickerContainer: true, show: false }, // 日期表 隐藏

      year: "",
      month: "",
      day: "",
      week: "",
      billboardTitle: "龙虎榜",
      topTableTitle: "营业部上榜一览()",
      topTableMechTitle: "机构席位上榜一览()",
      todayDate: "",

      // 营业部上榜一览
      departTop: {
        thead: [
          "序号",
          "营业部名称",
          "介入个股数量",
          "当日买入额（万）",
          "当日卖出额（万）",
          "净买额（万）"
        ],
        tbody: [
          // {
          //     rowStyle: {textRed: true, textGreen: false},
          //     rowId: 0,
          //     rowContent: ["华鑫证券有限责任公司北京菜市口大街证券营业部", "5", "2658.23万", "2658.23万", "2658.23万"]
          // },
          // {
          //     rowStyle: {textRed: true, textGreen: false},
          //     rowId: 0,
          //     rowContent: ["华鑫证券有限责任公司北京菜市口大街证券营业部", "5", "2658.23万", "2658.23万", "2658.23万"]
          // },
          // {
          //     rowStyle: {textRed: true, textGreen: false},
          //     rowId: 0,
          //     rowContent: ["华鑫证券有限责任公司北京菜市口大街证券营业部", "5", "2658.23万", "2658.23万", "2658.23万"]
          // },
          // {
          //     rowStyle: {textRed: true, textGreen: false},
          //     rowId: 0,
          //     rowContent: ["华鑫证券有限责任公司北京菜市口大街证券营业部", "5", "2658.23万", "2658.23万", "2658.23万"]
          // }
        ]
      },

      // 机构上榜一览
      mechTop: {
        thead: [
          "序号",
          "上榜股票名称",
          "上榜机构次数(次)",
          "机构席位买入金额（万）",
          "机构席位卖出金额（万）",
          "机构净买入（万）"
        ],
        tbody: [
          // {
          //     rowStyle: {textRed: false, textGreen: true},
          //     rowId: 0,
          //     rowContent: ["今天国际", "5", "658.23万", "658.23万", "-658.23万"]
          // },
          // {
          //     rowStyle: {textRed: false, textGreen: true},
          //     rowId: 0,
          //     rowContent: ["今天国际", "5", "658.23万", "658.23万", "-658.23万"]
          // },
          // {
          //     rowStyle: {textRed: false, textGreen: true},
          //     rowId: 0,
          //     rowContent: ["今天国际", "5", "658.23万", "658.23万", "-658.23万"]
          // }
        ]
      }
    };
  },

  components: {
    themeLabel,
    BoardList,
    KLine,
    Department,
    TopTable,
    DatePicker
  },
  watch: {
    day(newVal, oldVal) {
      // console.log(newVal);
      this.week = new Date(`${this.year}-${this.month}-${this.day}`).getDay();

      this.topTableTitle = `营业部上榜一览( ${this.year}-${this.month}-${
        this.day
      }  星期${Util.changeWeek(this.week)} )`;
      this.topTableMechTitle = `机构席位上榜一览( ${this.year}-${this.month}-${
        this.day
      }  星期${Util.changeWeek(this.week)} )`;

      this.todayDate = `${this.year}-${this.month}-${this.day}`;

      // 获取席位一览
      this.getMechanismList({
        trading_day: this.todayDate
      });
    },
    boardList(newVal, oldVal) {
      if (newVal.code) {
        this.dataInit();
      }
    },
    departmentHotList(newVal, oldVal) {
      this.departmentHotListDataHandle(newVal.departmentData);
    },
    billboardDays(newVal, oldVal) {
      // console.log(newVal);
      let dates = newVal.days;
      this.year = dates[0].split("-")[0];
      this.month = dates[0].split("-")[1];
      this.day = dates[0].split("-")[2];

      this.getBoardList(this.paramsBillboardList);
    },
    // 机构席位一览
    mechanism(newVal, oldVal) {
      this.mechanismListDataHandle(newVal.stockHeroDeptinList);
    }
  },
  head() {
    return {
      title: "龙虎榜 - 主题风向标"
      //   meta: [
      //     {
      //       hid: "description",
      //       name: "description",
      //       content: "My custom description"
      //     }
      //   ]
    };
  },

  async fetch({ store, params }) {
    await Promise.all([axios.get(Util.baseUrl() + "stock/getHolidays?days=10")])
      .then(res => {
        // console.log(res);
        let [dates] = res;

        store.commit("BILLBOARD_TRANS_DAYS", dates.data);
        // console.log(Util.baseUrl() + 'stock/stockHeroDeptin?trading_day='+dates.data.days)
        return Promise.all([
          axios.get(
            Util.baseUrl() +
              "stock/getStockHeroList?sortKey=chg&sortType=ASC&searchDate=" +
              dates.data.days[0]
          ),
          axios.get(
            Util.baseUrl() +
              "stock/getBusinessDepartment?page_no=1&page_count=10&type=8"
          ),
          axios.get(
            Util.baseUrl() +
              "stock/stockHeroDeptin?trading_day=" +
              dates.data.days[0]
          )
        ]);
      })
      .then(res => {
        let [list, department, mecha] = res;
        store.commit("BOARD_LIST", list.data);
        store.commit("DEPARTMENT_HOT_LIST", department.data);
        store.commit("MECHANISM", mecha.data);
      });

    // let market_index = await axios.get(Util.baseUrl() + 'index');
    // let lead = await axios.get(Util.baseUrl() + 'conceptSort');
  },

  computed: {
    // 个股列表参数
    paramsBillboardList() {
      return {
        searchDate: `${this.year}-${this.month}-${this.day}`,
        // searchDate: '2017-04-17',
        sortKey: "chg",
        // sortType: 'DESC'
        sortType: "ASC"
      };
    },
    // 涨跌幅样式
    changeRateClass() {
      if (this.stockDetails && this.stockDetails.detail) {
        let rate = this.stockDetails.detail.changeRate;
        if (rate >= 0) {
          return "textRed";
        } else {
          return "textGreen";
        }
      } else {
        return "textRed";
      }
    },

    ...mapGetters([
      "mechanism",
      "boardList",
      "stockDetails",
      "currentStockDetails",
      "departmentHotList",
      "billboardDays"
    ])
  },

  created() {
    // 调用获取数据的方法
    // 获取龙虎榜列表 searchDate
    // this.getBoardList(this.paramsBillboardList);
    // this.$store.dispatch('getBoardList', this.paramsBillboardList);
    // console.log(this.billboardDays);
    // console.log(this.departmentHotList);
    // 上榜个股
    this.departmentHotListDataHandle(this.departmentHotList.departmentData);
    // 营业部机构
    this.mechanismListDataHandle(this.mechanism.stockHeroDeptinList);
    this.departmentHotListDataHandle(this.departmentHotList.departmentData);
    // 日期列表
    this.billboardDates();
  },

  mounted() {
    let year = new Date().getFullYear();
    let month =
      new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1);
    let day =
      new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate();
    this.topTableTitle = `营业部上榜一览(${year}-${month}-${day}  星期${Util.changeWeek(
      this.week
    )})`;
    this.topTableMechTitle = `机构席位上榜一览(${year}-${month}-${day}  星期${Util.changeWeek(
      this.week
    )})`;
    this.todayDate = `${year}-${month}-${day}`;
    // 进入 回到顶部
    if (this.$route.path === "/billboard") {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    document.addEventListener("click", e => {
      e.stopPropagation();
      let len = $(e.target).parents(".dateIcon").length;
      // console.log(len);
      if (len === 0) {
        this.datePickerStyle.show = false;
      }
    });

    // this.dataInit();
    // 获取营业部热门列表
    // this.getDepartmentHotList();
    // this.departmentHotListDataHandle(this.departmentHotList.departmentData);

    // 获取最近的龙虎榜交易日
    // this.getBillboardTransDay();

    // 获取席位一览
    // this.getMechanismList({
    //     trading_day: this.todayDate
    // });
  },

  methods: {
    ...mapActions([
      "getBillboardTransDay",
      "getBoardList",
      "getStockDetail",
      "currentStock",
      "getKLineData",
      "getDepartmentHotList",
      "getMechanismList",
      "getStockDetail_billboard"
    ]),
    //  获取选择日期
    changeDate(dateObj) {
      // console.log(dateObj);

      this.year = dateObj.year;
      this.month = dateObj.month;
      this.day = dateObj.day;
      this.week = new Date(
        `${dateObj.year}-${dateObj.month}-${dateObj.day}`
      ).getDay();

      this.datePickerStyle.show = false;

      this.getBoardList(this.paramsBillboardList);
      // 储存 股票信息

      let boardListItem = this.boardList.stockHeroList;
      let stockCode = boardListItem
        ? boardListItem[0].stockCode.split(".")[0]
        : null;
      // 股票详情参数
      let stockInfo = {
        stockName: boardListItem ? boardListItem[0].stockName : null,
        stockCode: stockCode,
        market: boardListItem ? boardListItem[0].stockCode.split(".")[1] : null
      };

      // k线图参数
      let kParams = {
        stockCode: stockCode,
        month: 3
      };

      this.currentStock(stockInfo);
      this.getStockDetail({ stockCode: stockCode });

      this.getKLineData(kParams); // k 线图
      // console.log(boardListItem);
    },

    // ssr
    billboardDates() {
      // console.log(newVal);
      let dates = this.billboardDays.days;
      this.year = dates[0].split("-")[0];
      this.month = dates[0].split("-")[1];
      this.day = dates[0].split("-")[2];

      this.getBoardList(this.paramsBillboardList);
    },

    // 数据初始化
    dataInit() {
      // setTimeout(() => {
      let boardListItem = this.boardList.stockHeroList;
      let stockCode = boardListItem
        ? boardListItem[0].stockCode.split(".")[0]
        : null;
      // 股票详情参数  格式化
      let stockInfo = {
        stockName: boardListItem ? boardListItem[0].stockName : null,
        stockCode: stockCode,
        market: boardListItem ? boardListItem[0].stockCode.split(".")[1] : null
      };
      // k线图参数
      let kParams = {
        stockCode: stockCode,
        month: 3
      };

      this.currentStock(stockInfo);
      this.getStockDetail({ stockCode: stockCode });

      this.getKLineData(kParams);

      // console.log(boardListItem);
      // 上榜详情
      this.getStockDetail_billboard({
        heroId: boardListItem[0].id
      });
      // console.log(boardListItem);
      // }, 2000);
    },

    // 钱  格式化
    dataFormat(data) {
      if (data) {
        return (parseFloat(data) / 100000000).toFixed(2);
      } else {
        return "**";
      }
    },

    //  打开日历表
    dateShow() {
      this.datePickerStyle.show = !this.datePickerStyle.show;
    },

    // 营业部热门列表  数据处理
    departmentHotListDataHandle(data) {
      let arr = [];
      if (data && data.length !== 0) {
        data.map(item => {
          let obj = {
            rowStyle: {
              textRed: item.buy_sum - item.sale_sum >= 0,
              textGreen: item.buy_sum - item.sale_sum < 0
            },
            // 营业部Id
            rowId: item.bo_code,
            // 0 属于营业部  1 属于股票详情
            type: 0,
            rowContent: [
              // 营业部名称
              item.chi_name,
              // 介入个股数量
              item.secu_num,
              // 买入
              // item.buy_sum,
              Util.formatMoney({ num: parseFloat(item.buy_sum), type: "万" }),
              // 卖出

              Util.formatMoney({ num: parseFloat(item.sale_sum), type: "万" }),
              // 净买入

              Util.formatMoney({
                num: parseFloat(item.buy_sum - item.sale_sum),
                type: "万"
              })
            ]
          };

          arr.push(obj);
        });

        this.departTop.tbody = arr;
      }
    },

    // 机构席位  数据处理
    mechanismListDataHandle(data) {
      // console.log(data);
      let arr = [];
      if (data && data.length !== 0) {
        data.map(item => {
          let obj = {
            rowStyle: {
              textRed: parseFloat(item.jg_net_buy_sum) >= 0,
              textGreen: parseFloat(item.jg_net_buy_sum) < 0
            },
            // 个股信息
            rowId: {
              code: item.secu_code.split(".")[0],
              // marketCode: item.secu_code.split('.')[1]?item.secu_code.split('.')[1]==='SS',
              name: item.secu_abbr
            },
            // 0 属于营业部  1 属于股票详情
            type: 1,
            rowContent: [
              // 上榜个股
              item.secu_abbr,
              // 上榜机构次数
              item.jg_on_the_list_num,
              // 机构买入
              // item.buy_sum,
              Util.formatMoney({
                num: parseFloat(item.jg_buy_sum),
                type: "万"
              }),
              // 机构卖出

              Util.formatMoney({
                num: parseFloat(item.jg_sale_sum),
                type: "万"
              }),
              // 净买入

              Util.formatMoney({
                num: parseFloat(item.jg_net_buy_sum),
                type: "万"
              })
            ]
          };

          arr.push(obj);
        });

        this.mechTop.tbody = arr;
      }
    },

    // 股票排序
    stockSort(obj) {
      // console.log(obj);

      this.getBoardList({
        ...obj,
        searchDate: `${this.year}-${this.month}-${this.day}`
      });
    }
  }
};
</script>
