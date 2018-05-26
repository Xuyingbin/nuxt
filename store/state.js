

const state = {
    // 当前资讯信息
    saveCurrentInfo: {
        data: null
    },
    // 当前主题信息  data:{id: null, themeName: null}
    saveCurrentTheme: {
        data: null
    },
    // 当前股票信息
    saveCurrentStock:{
        data: null
    },

    // 首页资讯信息组
    saveIndexInfoArr: {
        data: null
    },
    
    // 大盘指数
    marketIndex:{
        data: null
    },

    // 主题成交额前五
    themeTradeFive:{
        data: null
    },

    // 首页资讯
    indexInfomations:{
        data: null
    },
    // 主题行情
    themeQuo: {
        data: null
    },

    // 主题概念相关资讯
    themeConceptInfo:{
        data: null
    },


    // 资金流向
    capitalFlow:{
        data: null
    },



    // 今日关注主题
    todayFollowTheme: {
        data: null
    },

    // 今日资金流入流出
    todayInvestFlow:{
        // 流入
        inflow: {
            data: null
        },
        // 流出
        outflow: {
            data: null
        }
    },

    // 近五日资金流入流出
    fiveInvestFlow:{
        // 流入
        inflow: {
            data: null
        },
        // 流出
        outflow: {
            data: null
        }
    },

    // 龙虎榜交易主题
    billboardTransTheme:{
        newTheme: {
            data: null
        },
        FiveDaysTheme: {
            data: null
        }
    },
    // 领涨主题
    leadUpTheme:{
        data: null
    },
    // 领跌主题
    leadDownTheme: {
        data: null
    },

    // 龙虎榜
    billboard: {
        // 个股龙虎榜
        stockBillboard: {
            initDate: '',
            data: null
        },
        // 个股详情
        stockDetail: {
            data: null
        },
        // 机构席位一览
        mechanism: {
            data: null
        },
        // 当前股票信息
        currentStock: {
            stockCode: null,
            stockName: null,
            market: null,
        },
        // 个股详情里面的龙虎榜数据
        stockDetail_billboard:{
            data: null
        },
        // K线图
        KLine:{
            data: []
        },
        //  获取最近的龙虎榜交易日
        billboardDays: {
            data: null
        }
    },

    certification:{
        data: null
    },

    // 个股基本信息
    stockBasicInfo:{
        data: null
    },
    // 个股关联主题
    stockConceptTheme: {
        data: null
    },
    // 个股分时数据
    stockMinTime:{
        data: null
    },
    // 个股日期分组
    stockDateArr:{
        data: null
    },
    // 主题详情 相关个股
    themeConceptStock:{
        data: null
    },
    // 主题详情 相关资讯
    themeConceptNews:{
        data: null
    },
    // 主题详情 资金流入流出
    themeCapitalFlow:{
        data: null
    },
    // 主题详情 基本信息
    themeBasicInfo:{
        data: null
    },
    // 主题详情  主题涨跌分时
    themeUpDownMin:{
        data: null
    },
    // 主题详情  主题交易龙虎榜
    themeTransBillboard:{
        data: null
    },
    // 主题涨跌家数
    themeUpDownCount:{
        data: null
    },


    // 资讯 所有 列表
    infomationList:{
        data: null
    },
    // 资讯详情
    articleDetails:{
        data: null
    },

    // 验证码 
    testCode: {
        data: null
    },
    // 注册信息
    regisration: {
        data: null
    },
    // 登录信息
    loginIfo: {
        data: null
    },
    // 系统消息
    systemInfomations: {
        data: null
    },
    // 个人消息
    personInfomations: {
        data: null
    },
    // 个人关注的营业部
    personFollowDepartment: {
        data: null
    },
    // 删除营业部
    deleteDepartment: {
        data: null
    },
    // 修改密码 返回
    modifyPassword: {
        data: null
    },

    // 营业部详情
    departmentDetail: {
        data: null
    },
    // 营业部热门列表
    departmentHotList: {
        data: null
    },
    // 营业部操作的所有个股列表
    departmentStockList: {
        data: null
    },
    // 营业部操作个股按类型查找的个股
    departmentTypeStockList: {
        data: null
    },

    // 搜索 个股 主题 搜索联想
    queryStockTheme: {
        data: null
    },
    // 热门搜索
    queryHotSearch: {
        data: null
    },
    // 自选列表
    optionalList: {
        data: null
    },
    // 添加自选关注
    optionalAddFollow: {
        data: null
    },
    // 删除 搜索列表关注
    optionalCancelFollow: {
        data: null
    },
    // 删除自选列表里面的某项
    optionalListCancelFollow: {
        data: null
    },
    // 自选排序  置顶
    optionalListSort: {
        data: null
    },
    // 自选 热门推荐
    optionalHotRecommend: {
        data: null
    },

    // 展示所有的主题列表
    showAllThemeList: {
        data: null
    },
    // 热门推荐 一键添加
    onekeyAdd: {
        data: null
    },

    // 验证 验证码
    veriCode: {
        data: null
    },
    // 重置密码
    resetPassword: {
        data: null
    },


    // VIP
    // 智能股库
    aiStockLib: {
        data: null
    },
    // 独家内参
    internalReference: {
        data: null
    },
    // 独家内参  详情
    referenceDetails: {
        data: null
    },
    // 复盘笔记
    nodeTaking: {
        data: null
    }

}

export default state;