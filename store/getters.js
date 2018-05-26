

const getters = {
    // 当前储存的资讯
    currentInfo(state){
        return state.saveCurrentInfo.data;
    },
    // 当前储存的主题
    currentTheme(state){
        return state.saveCurrentTheme.data;
    },
    // 当前储存的股票
    currentStock(state){
        return state.saveCurrentStock.data;
    },
    // 首页储存的资讯信息组
    indexInfoArr(state){
        return state.saveIndexInfoArr.data;
    },

    // 大盘指数
    marketIndexData(state){
        return state.marketIndex.data;
    },

    // 主题成交额前五
    themeTradeFive(state){
        return state.themeTradeFive.data;
    },
    // 首页资讯
    indexInfomation(state){
        return state.indexInfomations.data;
    },

    // 主题概念相关资讯
    themeConceptInfo(state){
        return state.themeConceptInfo.data;
    },
    // 主题行情
    relationThemeQuo(state){
        return state.themeQuo.data;
    },

    // 实名认证
    getCertification(state){
        return state.certification.data;
    },

    // 资金流向
    capitalFlow(state){
        return state.capitalFlow.data;
    },

    // 今日关注主题
    todayFollowTheme(state){
        return state.todayFollowTheme.data;
    },


    // 今日资金流入
    todayInvestInflow(state){
        return state.todayInvestFlow.inflow.data;
    },
    // 今日资金流出
    todayInvestOutflow(state){
        return state.todayInvestFlow.outflow.data;
    },
    // 近五日资金流入
    fiveInvestInflow(state){
        return state.fiveInvestFlow.inflow.data;
    },
    // 近五日资金流出
    fiveInvestOutflow(state){
        return state.fiveInvestFlow.outflow.data;
    },


    // 领涨跌主题
    leadTheme(state){
        return {
            leadUpTheme: state.leadUpTheme.data, 
            leadDownTheme: state.leadDownTheme.data
        }
    },


    // 最新龙虎榜交易主题
    newBoardTransTheme(state){
        if(state.billboardTransTheme.newTheme.data){
            return state.billboardTransTheme.newTheme.data;
        }
    },

    // 近五日龙虎榜交易主题
    fiveBoardTransTheme(state){
        if(state.billboardTransTheme.FiveDaysTheme.data){
            return state.billboardTransTheme.FiveDaysTheme.data;
        }
    },



    // 龙虎榜列表
    boardList(state){
        if(state.billboard.stockBillboard.data){
            return state.billboard.stockBillboard.data;
        }else{
            return '暂无数据';
        }
    },
    // 机构席位一览
    mechanism(state){
        return state.billboard.mechanism.data;
        
    },
    // 个股详情
    stockDetails(state){
        if(state.billboard.stockDetail.data){
            return state.billboard.stockDetail.data;
        }else{
            return '暂无数据';
        }
    },

    // 当前股票
    currentStockDetails(state){
        
        return state.billboard.currentStock;
       
    },

    // 个股详情里的 龙虎榜数据
    stockDetail_billboard(state){
        // if(state.billboard.stockDetail.data){
            return state.billboard.stockDetail_billboard.data;
        // }else{
        //     return '暂无数据';
        // }
    },

    // 个股 K线图
    stock_KLine(state){
        if(state.billboard.KLine.data){
            return state.billboard.KLine.data;
        }else{
            return '暂无数据';
        }
    },
    // 获取最近的龙虎榜交易日
    billboardDays(state){
        return state.billboard.billboardDays.data;
    },

    // 股票当前基本信息
    stockBasicInfo(state){
        return state.stockBasicInfo.data;
    },
    // 个股关联主题
    stockConceptTheme(state){
        return state.stockConceptTheme.data;
    },
    // 个股分时详情
    stockMinTime(state){
        return state.stockMinTime.data;
    },
    // 个股  日期组
    stockDateArr(state){
        return state.stockDateArr.data;
    },


    // 主题 相关个股
    themeConceptStock(state){
        return state.themeConceptStock.data;
    },
    // 主题 相关资讯
    themeConceptNews(state){
        return state.themeConceptNews.data;
    },
    // 主题 资金流入流出
    themeCapitalFlow(state){
        return state.themeCapitalFlow.data;
    },
    // 主题  基本信息
    themeBasicInfo(state){
        return state.themeBasicInfo.data;
    },
    // 主题 涨跌分时
    themeUpDownMin(state){
        return state.themeUpDownMin.data;
    },
    // 主题交易龙虎榜
    themeTransBillboard(state){
        return state.themeTransBillboard.data;
    },
    // 主题涨跌家数
    themeUpDownCount(state){
        return state.themeUpDownCount.data;
    },


    // 资讯 所有 列表
    infomationList(state){
        return state.infomationList.data;
    },
    // 资讯详情
    articleDetails(state){
        return state.articleDetails.data;
    },

    // 验证码
    testCodeRegister(state){
        return state.testCode.data;
    },
    // 注册信息
    regisration(state){
        return state.regisration.data;
    },
    // 登录信息
    loginIfo(state){
        return state.loginIfo.data;
    },
    // 系统消息 
    systemInfomations(state){
        return state.systemInfomations.data;
    },
    // 个人消息
    personInfomations(state){
        return state.personInfomations.data;
    },
    // 个人关注营业部
    personFollowDepartment(state){
        return state.personFollowDepartment.data;
    },
    // 个人关注的营业部 删除事件
    deleteDepartment(state){
        return state.deleteDepartment.data;
    },
    // 修改密码事件
    modifyPassword(state){
        return state.modifyPassword.data;
    },

    // 营业部详情
    departmentDetail(state){
        return state.departmentDetail.data;
    },
    // 营业部热门列表
    departmentHotList(state){
        return state.departmentHotList.data;
    },
    // 营业部操作所有的个股列表
    departmentStockList(state){
        return state.departmentStockList.data;
    },
    // 营业部操作个股按类型查找的个股   
    departmentTypeStockList(state){
        return state.departmentTypeStockList.data;
    },

    // 搜索个股 主题 搜索联想
    queryStockTheme(state){
        return state.queryStockTheme.data;
    },
    // 热门搜索 推荐
    queryHotSearch(state){
        return state.queryHotSearch.data;
    },
    // 自选列表
    optionalList(state){
        return state.optionalList.data;
    },
    // 添加自选关注
    optionalAddFollow(state){
        return state.optionalAddFollow.data;
    },
    // 删除 搜索列表关注
    optionalCancelFollow(state){
        return state.optionalCancelFollow.data;
    },
    // 自选列表的某项
    optionalListCancelFollow(state){
        return state.optionalListCancelFollow.data;
    },
    // 自选排序 置顶
    optionalListSort(state){
        return state.optionalListSort.data;
    },
    // 自选 热门推荐列表
    optionalHotRecommend(state){
        return state.optionalHotRecommend.data;
    },

    // 展示所有的主题列表
    showAllThemeList(state){
        return state.showAllThemeList.data;
    },
    // 热门推荐
    onekeyAdd(state){
        return state.onekeyAdd.data;
    },

    // 验证 验证码
    veriCode(state){
        return state.veriCode.data;
    },

    // 重置密码
    resetPassword(state){
        return state.resetPassword.data;
    },

    // Vip
    // 智能股库
    aiStockLib(state){
        return state.aiStockLib.data;
    },
    // 独家内参
    internalReference(state){
        return state.internalReference.data;
    },
    // 独家内参  详情
    referenceDetails(state){
        return state.referenceDetails.data;
    },
    // 复盘笔记
    nodeTaking(state){
        return state.nodeTaking.data;
    }
}

export default getters;