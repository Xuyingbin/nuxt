import * as types from './types';
import axios from 'axios';
import Util from './util';

const mutations = {

    // 储存当前的资讯ID
    [types.SAVE_CURRENT_INFO](state, payload){
        state.saveCurrentInfo.data = payload;
    },

    // 储存当前的主题ID
    [types.SAVE_CURRENT_THEME](state, payload){
        state.saveCurrentTheme.data = payload;
    },

    // 储存当前股票信息
    [types.SAVE_CURRENT_STOCK](state, payload){
        state.saveCurrentStock.data = payload;
    },

    // 首页资讯 信息组
    [types.SAVE_INDEX_INFO_ARRAY](state, payload){
        state.saveIndexInfoArr.data = payload;
    },

    // 大盘指数
    [types.MARKET_INDEX](state, payload){
        state.marketIndex.data = payload;
    },
    // 主题成交额前五
    [types.THEME_TARDE_FIVE](state, payload){
        state.themeTradeFive.data = payload;
    },
    // 首页资讯
    [types.INFOMATIONS_INDEX](state, payload){
        state.indexInfomations.data = payload;
    },

    // 主题关联资讯 主题行情
    [types.INFO_RELATION_THEME_QUO](state, payload){
        state.themeQuo.data = payload;
    },

    // 主题概念相关信息
    [types.THEME_CONCEPT_INFO](state, payload){
        state.themeConceptInfo.data = payload;

    },

    // 资金流向
    [types.CAPITAL_FLOW](state, payload){
        state.capitalFlow.data = payload;
    },

    // 今日关注主题
    [types.TODAY_FOLLOW_THEME](state, payload){
        state.todayFollowTheme.data = payload;
    },


    // 今日资金流入
    [types.TODAY_INVEST_INFLOW](state, payload){
        state.todayInvestFlow.inflow.data = payload;
    },
    // 今日资金流出
    [types.TODAY_INVEST_OUTFLOW](state, payload){
        state.todayInvestFlow.outflow.data = payload;
    },
    // 近五日资金流入
    [types.FIVE_INVEST_INFLOW](state, payload){
        state.fiveInvestFlow.inflow.data = payload;
    },
    // 近五日资金流出
    [types.FIVE_INVEST_OUTFLOW](state, payload){
        state.fiveInvestFlow.outflow.data = payload;
    },

    // 领涨跌 主题
    [types.LEAD_UP_DOWN_THEME](state, payload){
        if(payload.leadConceptStock && payload.backwardConceptStock){

            state.leadUpTheme.data = payload.leadConceptStock;
            state.leadDownTheme.data = payload.backwardConceptStock;
        }
    },

    // 最新龙虎榜交易主题
    [types.NEW_BOARD_TRANS_THEME](state, payload){
        state.billboardTransTheme.newTheme.data = payload;
    },
    // 近五日龙虎榜交易主题
    [types.FIVE_BOARD_TRANS_THEME](state, payload){
        state.billboardTransTheme.FiveDaysTheme.data = payload;
    },

    // 龙虎榜列表
    [types.BOARD_LIST](state, data){
        state.billboard.stockBillboard.data = data;
    },
    // 机构席位一览
    [types.MECHANISM](state, payload){
        state.billboard.mechanism.data = payload;
    },
    // 个股详情
    [types.STOCK_DETAIL](state, data){
        state.billboard.stockDetail.data = data;
    },
    // 当前的股票
    [types.CURRENT_STOCK](state, data){
        state.billboard.currentStock = {...state.billboard.currentStock, ...data};
    },
    // 个股详情里的龙虎榜数据
    [types.STOCKDETAIL_BILLBOARD](state, data){
        state.billboard.stockDetail_billboard.data = data; 
    },
    // 个股K线图
    [types.STOCK_KLINE](state, payload){
        
        state.billboard.KLine.data = payload;
        
    },
    // 获取最近的龙虎榜交易日
    [types.BILLBOARD_TRANS_DAYS](state, payload){
        state.billboard.billboardDays.data = payload;
    },


    // 股票基本信息
    [types.STOCK_BASIC_INFO](state, payload){
        state.stockBasicInfo.data = payload;
    },
    // 个股关联主题
    [types.STOCK_CONCEPT_THEME](state, payload){
        state.stockConceptTheme.data = payload;
    },
    // 个股分时数据
    [types.MIN_TIME_DATA](state, payload){
        state.stockMinTime.data = payload;
    },
    // 个股 日期组
    [types.STOCK_DATE_ARR](state, payload){
        state.stockDateArr.data = payload;
    },

    // 主题 相关个股
    [types.THEME_CONCEPT_STOCK](state, payload){
        state.themeConceptStock.data = payload;
    },
    // 主题 相关资讯
    [types.THEME_CONCEPT_NEWS](state, payload){
        state.themeConceptNews.data = payload;
    },
    // 主题 资金流入流出
    [types.THEME_CAPITAL_FLOW](state, payload){
        state.themeCapitalFlow.data = payload;
    },
    // 主题基本信息 themeBasicInfo
    [types.THME_BASIC_INFO](state, payload){
        state.themeBasicInfo.data = payload;
    },
    // z主题  涨跌分时
    [types.THEME_UP_DOWN_MIN](state, payload){
        state.themeUpDownMin.data = payload;
    },
    // 主题交易龙虎榜
    [types.THEME_TRANS_BILLBOARD](state, payload){
        state.themeTransBillboard.data = payload;
    },
    // 主题 涨跌家数
    [types.THEME_UP_DOWN_COUNT](state, payload){
        state.themeUpDownCount.data = payload;
    },


    // 资讯 所有 列表
    [types.INFOMATION_LIST](state, payload){
        state.infomationList.data = payload;
    },
    // 资讯详情页
    [types.ARTICLE_DETAIL](state, payload){
        state.articleDetails.data = payload;
    },

    // 获取验证码
    [types.GET_TEST_CODE](state, payload){
        state.testCode.data = payload;
    },
    // 注册
    [types.REGISTER](state, payload){
        state.regisration.data = payload;
    },
    // 登录
    [types.LOGIN](state, payload){
        state.loginIfo.data = payload;
    },
    // 系统消息
    [types.SYSTEM_INFOMATIONS](state, payload){
        state.systemInfomations.data = payload;
    },
    // 个人消息
    [types.PERSON_INFOMATIONS](state, payload){
        state.personInfomations.data = payload;
    },
    // 个人关注的营业部
    [types.PERSON_FOLLOW_DEPARTMENT](state, payload){
        state.personFollowDepartment.data = payload;
    },
    // 个人关注的营业部 删除事件
    [types.PERSON_DELETE_DEPARTMENT](state, payload){
        state.deleteDepartment.data = payload;
    },
    // 修改密码
    [types.MODIFY_PASSWORD](state, payload){
        state.modifyPassword.data = payload;
    },

    // 营业部详情
    [types.DEPARTMENT_DETAIL](state, payload){
        state.departmentDetail.data = payload;
    },
    // 营业部热门列表
    [types.DEPARTMENT_HOT_LIST](state, payload){
        state.departmentHotList.data = payload;
    },
    // 营业部操作所有个股
    [types.DEPARTMENT_STOCK_LIST](state, payload){
        state.departmentStockList.data = payload;
    },
    // 营业部操作个股按类型查找的个股
    [types.DEPARTMENT_QUEY_STOCK](state, payload){
        state.departmentTypeStockList.data = payload;
    },

    // 搜索 查询个股 主题 搜索联想
    [types.QUERY_STOCK_THEME](state, payload){
        state.queryStockTheme.data = payload;
    },
    // 搜索  热门搜索 推荐
    [types.HOT_SEARCH_RECOMMEND](state, payload){
        state.queryHotSearch.data = payload;
    },
    // 自选列表
    [types.OPTIONAL_STOCK_LIST](state, payload){
        state.optionalList.data = payload;
    },
    // 清除搜索缓存
    [types.CLEAR_SEARCH_VAL](state, payload){
        // 清除
        if(payload.isClear && state.queryStockTheme.data){
            state.queryStockTheme.data = null;
        }
    },
    // 添加自选关注
    [types.OPTIONAL_ADD_FOLLOW](state, payload){
        state.optionalAddFollow.data = payload;
    },
    // 删除 搜索关注
    [types.OPTIONAL_CANCEL_FOLLOW](state, payload){
        state.optionalCancelFollow.data = payload;
    },
    // 删除自选列表里面的某项
    [types.OPTIONAL_LIST_CANCEL_FOLLOW](state, payload){
        state.optionalListCancelFollow.data = payload;
    },
    // 自选列表  排序 
    [types.OPTIONAL_LIST_SORT](state, payload){
        state.optionalListSort.data = payload;
    },
    // 自选 热门推荐 
    [types.OPTIONAL_HOT_RECOMMEND](state, payload){
        state.optionalHotRecommend.data = payload;
    },

    // 展示所有主题
    [types.SHOW_ALL_THEME_LIST](state, payload){
        state.showAllThemeList.data = payload;
    },
    // 热门推荐  一键添加
    [types.ONE_KEY_ADD](state, payload){
        state.onekeyAdd.data = payload;
    },

    // 验证验证码
    [types.VERI_TEST_CODE](state, payload){
        state.veriCode.data = payload;
    },

    // 重置密码
    [types.RESET_PASSWORD](state, payload){
        state.resetPassword.data = payload;
    },


    // 清除 stockDetail themeDetail departmentDetail缓存
    [types.CLEAR_STOCK](state, payload){
        state.stockBasicInfo.data = null;
        state.stockConceptTheme.data = null;
        state.stockMinTime.data = null;
        state.stockDateArr.data = null;
    },
    [types.CLEAR_THEME](state, payload){
        state.themeBasicInfo.data = null;
        state.themeCapitalFlow.data = null;
        state.themeConceptNews.data = null;
        state.themeConceptStock.data = null;
    },
    [types.CLEAR_DEPARTMENT](state, payload){
        state.departmentDetail.data = null;
        state.departmentHotList.data = null;
        state.departmentStockList.data = null;
        state.departmentTypeStockList.data = null;
    },

    // 实名认证
    [types.CERTIFICATION](state, payload){
        state.certification.data = payload;
    },


    // VIP
    // 智能股库
    [types.AI_STOCK_LIB](state, payload){
        state.aiStockLib.data = payload;
    },
    // 独家内参
    [types.INTERNAL_REFERENCE](state, payload){
        state.internalReference.data = payload;
    },
    // 独家内参资讯详情
    [types.REFERENCE_DETAILS](state, payload){
        state.referenceDetails.data = payload;
    },
    [types.NOTE_TAKING](state, payload){
        state.nodeTaking.data = payload;
    },

}

export default mutations;