import * as types from './types';
import axios from 'axios';
import Util from './util';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// let STORAGE = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
let STORAGE = null;

const actions = {
   
    // 更新 STORAGE
    refreshSTORAGE(){
        // STORAGE = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
        STORAGE = null;
    },
    // 储存当前资讯ID  SAVE_CURRENT_INFO
    saveCurrentInfo({commit, state}, obj){
        commit(types.SAVE_CURRENT_INFO, obj);
    },
    // 储存首页面的资讯信息组 SAVE_INDEX_INFO_ARRAY
    saveIndexInfoArr({commit, state}, obj){
        commit(types.SAVE_INDEX_INFO_ARRAY, obj);
    },

    // 储存当前主题名称 ID   SAVE_CURRENT_THEME
    saveCurrentTheme({commit, state}, obj){
        commit(types.SAVE_CURRENT_THEME, obj);
    },
    // 储存当前股票名称 ID   SAVE_CURRENT_THEME
    saveCurrentStock({commit, state}, obj){
        commit(types.SAVE_CURRENT_STOCK, obj);
    },

    // 首页数据   
    // 大盘指数  MARKET_INDEX   主题成交前五 THEME_TARDE_FIVE  首页资讯 INFOMATIONS_INDEX
    getIndexData({commit, state}){
        axios({
            method: 'get',
            url: Util.url() + 'index',
            responseType:'json'
            // params: obj
        })
        .then((res)=>{
            if(res){
                // console.log(res);
                // 大盘指数
                commit(types.MARKET_INDEX, {
                    market: [
                        ...res.data.sectionExponential
                    ],
                    updown:{
                        upsNum: res.data.upsNum,
                        downNum: res.data.downNum,
                        dogfallNum: res.data.dogfallNum
                    } 
 
                });
                // 主题成交前五
                commit(types.THEME_TARDE_FIVE, res.data.conceptTradeMoney);

                commit(types.INFOMATIONS_INDEX, res.data.informations);
            }
            
        })
    },

    // 资金流向 CAPITAL_FLOW
    getCapitalFlow({commit, state}){
        axios({
            method: 'get',
            url: Util.url() + 'fundFlowTopFive',
            responseType:'json'
            // params: obj
        })
        .then((res)=>{
            if(res){
                // 资金流向
                commit(types.CAPITAL_FLOW, res.data.netInflow);


            }
            
        })
    },

    // 获取资讯关联主题    主题概念相关信息: THEME_CONCEPT_INFO
    getInfoRelationTheme({commit, state}, obj){

        axios({
            method: 'get',
            url: Util.url() + 'informationAssociateTheme',
            responseType:'json',
            params: obj
        })
        .then((res)=>{
            if(res){
                // commit(types.INFO_RELATION_THEME_QUO, res.data);
                // console.log(res.data);
                // if(res.data.code){
                    
                    commit(types.THEME_CONCEPT_INFO, res.data);
                // }


            }
            
        })
    },

    // 关联  主题行情 INFO_RELATION_THEME_QUO
    getRelationThemeQuo({commit, state}, obj){
        if(obj.conceptStockId){
            axios({
                method: 'get',
                url: Util.url() + 'conceptStockManage/getConceptChangeRate',
                responseType:'json',
                params: obj
            })
            .then((res)=>{
                if(res){
                    // commit(types.INFO_RELATION_THEME_QUO, res.data);
                    // console.log(res.data);
                    // if(res.data.code){
                        
                        commit(types.INFO_RELATION_THEME_QUO, res.data);
                    // }
    
    
                }
                
            })
        }
        
    },
    

    // 获取今日关注主题  TODAY_FOLLOW_THEME
    getTodayFollowTheme({commit, state}){
        axios({
            method: 'get',
            url: Util.url() + 'todayAttentionConcept',
            responseType:'json'
            // params: obj
        })
        .then((res)=>{
            if(res){
                commit(types.TODAY_FOLLOW_THEME, res.data);
            }
            
        })
    },


    // 获取今日资金流入流出
    getTodayInvestFlow({commit, state}, obj){
        // if(obj){
            axios({
                method: 'get',
                url: Util.url() + 'fundflow/getFundflowPC',
                responseType:'json'
                // params: obj
            })
            .then((res)=>{
                if(res){
                    // console.log(res.data);
                    // if(obj.type === 'in'){

                        commit(types.TODAY_INVEST_INFLOW, res.data.inResult);
                    // }else if(obj.type === 'out'){
                        commit(types.TODAY_INVEST_OUTFLOW, res.data.outResult);

                    // }
                   
                }
                
            })
        // }else{
            // throw 'the params is error';
        // }
    }, 
    // 获取近五日资金流入流出
    getFiveInvestFlow({commit, state}, obj){
        // if(obj){
            axios({
                method: 'get',
                url: Util.url() + 'fundflow/getFundflowFiveDays',
                responseType:'json'
                // params: obj
            })
            .then((res)=>{
                if(res){
                    // if(obj.type === 'in'){

                        commit(types.FIVE_INVEST_INFLOW, res.data.inResult);
                    // }else if(obj.type === 'out'){
                        commit(types.FIVE_INVEST_OUTFLOW, res.data.outResult);

                    // }
                   
                }
                
            })
        // }else{
            // throw 'the params is error';
        // }
    }, 


    // 获取领涨 领跌主题 LEAD_UP_DOWN_THEME {num: 3}
    getLeadTheme({commit, state}, obj){
        if(obj){
            
            axios({
                method: 'get',
                url: Util.url() + 'conceptSort',
                responseType:'json',
                params: obj
            })
            .then((res)=>{
                if(res){
                    commit(types.LEAD_UP_DOWN_THEME, res.data);
                       
                }
                
            })
            
        }else{
            throw 'the params is error';
        }

    },
    // 获取最近的龙虎榜交易日
    getBillboardTransDay({commit, state},obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getHolidays',
            responseType:'json',
            params: {days: 10, ...obj}
        })
        .then((res)=>{
            if(res){
                commit(types.BILLBOARD_TRANS_DAYS, res.data);
            }
            
        }) 
    },
    // 获取机构席位一览 MECHANISM
    /*****
     * 
     * trading_day	String	日期格式为：yyyyMMdd或yyyy-MM-dd
     * 
     */
    getMechanismList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/stockHeroDeptin',
            responseType:'json',
            params: obj
        })
        .then((res)=>{
            if(res){
                commit(types.MECHANISM, res.data);
            }
            
        }) 
    },

    // 获取龙虎榜交易主题 NEW_BOARD_TRANS_THEME FIVE_BOARD_TRANS_THEME
    getBoardTransTheme({commit, state}, obj){
        if(obj){
            axios({
                method: 'get',
                url: Util.url() + 'stock/getConceptHeroListPC',
                responseType:'json',
                params: {pageSize: 10, pageNo: 1, ...obj}
            })
            .then((res)=>{
                if(res){
                    if(obj.days === 1){

                        commit(types.NEW_BOARD_TRANS_THEME, res.data);
                    }else if(obj.days === 5){
                        commit(types.FIVE_BOARD_TRANS_THEME, res.data);
                    }
                }
                
            })
        }else{
            throw 'the params is error';
        }
    },


    // 获取龙虎榜列表 BOARD_LIST
    /**
     * searchDate	String	要获取龙虎榜的日期
     * sortKey	String	排序字段：chg涨跌幅，in买入，netAmount净额
     * sortType	String	排序方式：ASC正序，DESC倒序
     */
    getBoardList({commit, state}, obj){
        
        if(obj){
            axios({
                method: 'get',
                url: Util.url() + 'stock/getStockHeroList',
                responseType:'json',
                params: {
                    sortKey: 'chg',
                    sortType: 'ASC',
                    ...obj
                }
            })
            .then((res)=>{
                if(res){
                    commit(types.BOARD_LIST, res.data);
                }
                
            })
        }else{
            throw 'the params is error';
        }
        

    },
    // 个股详情
    /**
     *  stockCode	String	股票代码
     *  marketCode	String	市场代码
     *  userPhone	String	uuid
     * 
     * 
     */
    getStockDetail({commit, state}, obj){
        if(obj){
            axios({
                method: 'get',
                url: Util.url() + 'stock/getStockDetails',
                responseType:'json',
                params: obj
            })
            .then((res)=>{
                if(res){
                    commit(types.STOCK_DETAIL, res.data);
                }
                
            })
        }else{
            throw 'the params is error';
        }
    },

    // 当前选择的股票
    currentStock({commit, state}, obj){
        if(obj){

            commit(types.CURRENT_STOCK, obj);
             
        }else{
            throw 'the params is error';
        }
    },

    // 获取个股详情里面的龙虎榜数据
    /*****
     * stockCode	String	股票代码
     * dateStr	String	要获取的日期
     * heroId	Integer	龙虎榜记录ID(传入后将覆盖其他查询条件，只用ID查找)
     */
    getStockDetail_billboard({commit, state}, obj){
        if(obj){

            axios({
                method: 'get',
                url: Util.url() + 'stock/getStockDepartment',
                responseType:'json',
                params: obj
            })
            .then((res)=>{
                if(res){
                    commit(types.STOCKDETAIL_BILLBOARD, res.data);
                }
                
            })
             
        }else{
            throw 'the params is error';
        }
    },

    // 获取K线图数据 STOCK_KLINE
    getKLineData({commit, state}, obj){
        if(obj){

            axios({
                method: 'get',
                url: Util.url() + 'stock/getKlineByCode',
                responseType:'json',
                params: {...obj, month: 12}
            })
            .then((res)=>{
                if(res){
                    // console.log(res.data);
                    commit(types.STOCK_KLINE, res.data);
                }
                
            });
             
        }else{
            throw 'the params is error';
        }
    },


    // 获取股票详情
    getStockDetails({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getStockDetails',
            responseType:'json',
            // params: obj
            params: {userPhone: STORAGE, ...obj}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                if(res.data.code){
                    // console.log(res.data);
                    // 股票基本信息
                    commit(types.STOCK_BASIC_INFO, {...res.data.detail, fellow: res.data.fellow, isStoped: res.data.isStoped});
                    // 个股关联主题
                    commit(types.STOCK_CONCEPT_THEME, res.data.conceptList);
                    // 分时 数据
                    commit(types.MIN_TIME_DATA, res.data.minTime);
                    // 日期组
                    commit(types.STOCK_DATE_ARR, res.data.dates);
                }
            }
            
        })
    },
    // 获取个股分时数据
    getTimeChart({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getStockDetails',
            responseType:'json',
            // params: obj
            params: {userPhone: STORAGE, ...obj}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                if(res.data.code){
               
                    // 分时 数据
                    commit(types.MIN_TIME_DATA, res.data.minTime);
                    
                }
            }
            
        })
    },

    // 获取主题详情  obj:{conceptId: 0}
    getThemeDetails({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'conceptDetail',
            responseType:'json',
            // params: obj
            params: {phone: STORAGE, ...obj}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                if(res.data.code){
                    // 相关个股
                    commit(types.THEME_CONCEPT_STOCK, res.data.sdvList);
                    // 相关资讯
                    commit(types.THEME_CONCEPT_NEWS, res.data.infomationList);
                    // 基本信息
                    commit(types.THME_BASIC_INFO, {...res.data.conceptStockInfoVo, });
                    // 资金流入流出
                    commit(types.THEME_CAPITAL_FLOW, res.data.stockFlowList);
                }
            }
            
        })
    },
    // 获取主题 涨跌分时 THEME_UP_DOWN_MIN {conceptStockId: 0}
    getThemeUpDownMin({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'conceptStockManage/getConceptChangeRate',
            responseType:'json',
            params: obj
            // params: {...obj, stockCode: '601718'}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                // if(res.data.code){
                    
                commit(types.THEME_UP_DOWN_MIN, res.data.list);
                   
                // }
            }
            
        })
    },
    // 获取主题交易龙虎榜 {searchDate: '1', conceptId: 3}
    getThemeTransBillboard({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'getConceptStockHeroListByDate',
            responseType:'json',
            params: {type: '1', ...obj}
            // params: {...obj, stockCode: '601718'}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                // if(res.data.code){
                    
                commit(types.THEME_TRANS_BILLBOARD, res.data);
                   
                // }
            }
            
        })
    },
    // 获取主题涨跌家数
    getThemeUpDownCount({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/getThemeDetails',
            responseType:'json',
            params: {infoType: 0, ...obj}
            // params: {...obj, stockCode: '601718'}
        })
        .then((res)=>{
            if(res){
                // console.log(res.data);
                if(res.data.success){
                    
                commit(types.THEME_UP_DOWN_COUNT, res.data.details);
                   
                }
            }
            
        })
    },


    // 导航 总资讯列表 {pageNo: 1}
    getInfomationList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'infomation/getInfomationsPC',
            responseType:'json',
            params: {pageNo: 1, ...obj}
        })
        .then((res) => {
            if(res){
                commit(types.INFOMATION_LIST, res.data);
            }
        })
    },
    // 获取资讯详情页 {infoId: 0}
    getArticleDetail({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'infomation/getInfomation',
            responseType:'json',
            params: obj
            
        })
        .then((res) => {
            if(res){
                commit(types.ARTICLE_DETAIL, res.data);
            }
        })
    },

    // 获取验证码  注册   { phone: $('#userPhone').val(), sms_code_type:'update_telphone' }
    getTestCodeRegister({commit, state}, obj){
        axios({
            method: 'get',
            url: 'http://182.92.174.190/' + 'member/mobileSendMessageService',
            responseType: 'json',
            params: obj
        }).then((res) => {
            if(res){
                commit(types.GET_TEST_CODE, res.data);
            }
        });
    },

    // 验证码 验证  registration/registrationForApp VERI_TEST_CODE
    /****
     * phone  手机号
     * captcha  验证码
     * 
     */
    veriTestCode({commit, state}, obj){
        let params = new URLSearchParams();

        for(let key in obj){
            params.append(key, obj[key]);
        }

        axios({
            method: 'post',
            url: Util.url() + 'registration/registrationForApp',
            responseType: 'json',
            data: params
        }).then((res) => {
            if(res){
                commit(types.VERI_TEST_CODE, res.data);
            }
        });
    },
 
    // 重置密码 find_password/mobileCheckpasswordByLink
    /******
     * password 第一次输入的密码
     * passwordagain 第二次输入的密码
     * phone 用户手机号
     */
    resetUserPassword({commit, state}, obj){
        let params = new URLSearchParams();

        for(let key in obj){
            params.append(key, obj[key]);
        }

        axios({
            method: 'post',
            url: Util.url() + 'find_password/mobileCheckpasswordByLink',
            responseType: 'json',
            data: params
        }).then((res) => {
            if(res){
                commit(types.RESET_PASSWORD, res.data);
            }
        });
    },

    // 注册账号 参数phone captcha验证码 pwd  invitePhone邀请人手机号
    accountNumberRegister({commit, state}, obj){
        let param = new URLSearchParams();

        for(let key in obj){
            param.append(key, obj[key]);
        }

        axios({
            method: 'post',
            url: Util.url() + 'registration/registrationForPC',
            responseType: 'json',
            data: param
        }).then((res) => {
            if(res){
                commit(types.REGISTER, res.data);
            }
        });
    },

    // 登录账号  参数userName手机号  pwd
    accountNumberLogin({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'registration/loginMthodForApp',
            responseType: 'json',
            params: obj
        }).then((res) => {
            if(res){
                commit(types.LOGIN, res.data);
            }
        });
    },

    // 获取消息  系统消息 个人信息 { themePhone:userId, no:pageNum, type: 1} 1 个人 2 系统
    getInfomations({commit, state}, obj){
        // console.log(STORAGE)
        axios({
            method: 'get',
            url: Util.url() + 'member_index/findSystemMessageForApp',
            responseType: 'json',
            params: {type: '3', themePhone: STORAGE, no: 1, ...obj}
        }).then((res) => {
            if(res && res.data){
                

                commit(types.SYSTEM_INFOMATIONS, {articles:res.data.articles, articlestotalCount: res.data.articlestotalCount });
                
                commit(types.PERSON_INFOMATIONS, {msgList:res.data.msgList, msgtotalCount: res.data.msgtotalCount });

                
            }
        });
    },

    // 获取个人关注的营业部  
    getPersonFollowDepartment({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'visitorStock/attentionBusinessDepartment',
            responseType: 'json',
            params: {phone: STORAGE, no: 1, ...obj}
        }).then((res) => {
            if(res && res.data.success){
                commit(types.PERSON_FOLLOW_DEPARTMENT, res.data);
            }
        });
    },
    // 个人营业部删除事件 PERSON_DELETE_DEPARTMENT
    personDeleteDepartment({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/deleteSelfSelectAtHero',
            responseType: 'json',
            params: {
                userToken: STORAGE,
                // infoToken: infoToken,
                infoType:2,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.PERSON_DELETE_DEPARTMENT, res.data);
            }
        });
    },

    // 修改密码
    modifyPersonPassword({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'find_password/revisePassWordByOldPwd',
            responseType: 'json',
            params: {
                // oldPwd:'',
                // password:'',
                
                phone: STORAGE,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.MODIFY_PASSWORD, res.data);
            }
        });
    },

    // 获得营业部详情 DEPARTMENT_DETAIL
    /**
     *  bo_code	String	营业部代码
        userPhone	String	手机号或UUID
     */
    getDepartDetail({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getDepartmentDetail',
            responseType: 'json',
            params: {
                userPhone: STORAGE,
                
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.DEPARTMENT_DETAIL, res.data);
            }
        });
    },

    // 营业部热门列表 DEPARTMENT_HOT_LIST {page_no: 1, page_count: 10, type: 8}
    /**
     *  page_no	Integer	页面编号（不传默认1）
     *  page_count	Integer	页内记录数（不传默认10，最大200）
     *  type	String	1：近五日 2：近十日 3：近1个月 4：近3个月 5：近半年 6：近一年（不传默认1）7:近三日8：近一日
     * 
     */
    getDepartmentHotList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getBusinessDepartment',
            responseType: 'json',
            params: {
                page_no: 1,
                page_count: 10,
                type: 8,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.DEPARTMENT_HOT_LIST, res.data);
            }
        });
    },
    // 营业部操作的所有个股 DEPARTMENT_STOCK_LIST {page_no: 1, page_count: 10, bo_code: 88888}
    /** 
     *  page_no	Integer	页面编号（不传默认1）
     *  page_count	Integer	页内记录数（不传默认10，最大200）
     *  bo_code	String	营业部代码
    */
    getDepartmentStockList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getDeptStockSale',
            responseType: 'json',
            params: {
                page_no: 1,
                page_count: 10,
                // bo_code: 8,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.DEPARTMENT_STOCK_LIST, res.data);
            }
        });
    },

    // 营业部操作个股列表（按类型查找） DEPARTMENT_QUEY_STOCK
    /***
     *  page_no	Integer	页面编号（不传默认1）
        page_count	Integer	页内记录数（不传默认10，最大200）
        bo_code	String	营业部代码
        type	String	1：近五日 2：近十日 3：近1个月 4：近3个月 5：近半年 6：近一年（不传默认1）7:近三日8：近一日
     */
    getDepartmentTypeStockList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'stock/getDeptStockSaleByType',
            responseType: 'json',
            params: {
                type: '1',
                page_no: 1,
                page_count: 10,
                ...obj
            }
        }).then((res) => {
            if(res){
                let requestType = obj.type || '1';
                commit(types.DEPARTMENT_QUEY_STOCK, {...res.data, requestType: requestType});
            }
        });
    },


    // 头部查询 个股 主题  搜索联想
    /**
     * infoType  查询的数据类型 0主题 1单股 2其他
     * keyWords  查询的关键字
     * pageNo  页数
     * userToken  uuid
     */
    getQueryStockTheme({commit, state}, obj){
        // console.log(obj);
        let params = new URLSearchParams();
        
        // params.append('userToken', STORAGE);
        for(let key in obj){
            
            params.append(key, obj[key]);
        }
        // params.append('pageNo', '1');
        // console.log(params);
        
        axios({
            method: 'post',
            url: Util.url() + 'selfSelectInfo/searchInfoN',
            responseType: 'json',
            // data: {
            //     pageNo: 1,
            //     userToken: STORAGE,
            //     ...params
            // }
            data: params
        }).then((res) => {
            // console.log(res);
            if(res){
                commit(types.QUERY_STOCK_THEME, res.data);
            }
        });
    },
    // 热门搜索 推荐 HOT_SEARCH_RECOMMEND
    /****
     * rows：10  查询条数 主题10条 个股10条
     */
    getQueryHotSearch({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/hotSearch',
            responseType: 'json',
            params: {
                rows: 3,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.HOT_SEARCH_RECOMMEND, res.data);
            }
        });
    },

    // 自选股列表
    /****
     * userToken	String	用户唯一标识
     * 
     * infoType	Integer	数据类型 0 主题 1 个股
     */
    getOptionalStockList({commit, state}, obj){
        // console.log(STORAGE);
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/showMySelectPC',
                responseType: 'json',
                params: {
                    userToken: STORAGE,
                    // infoType: 5,
                    ...obj
                }
            }).then((res) => {
                if(res){
                    // commit(types.OPTIONAL_STOCK_LIST, {login: true, ...res.data});
                    commit(types.OPTIONAL_STOCK_LIST, {login: true, ...res.data});
                }
            });
        // }else{
        //     commit(types.OPTIONAL_STOCK_LIST, {login: false})
        // }
        
    },

    // 清除搜索缓存
    clearSearchVal({commit, state}){
        commit(types.CLEAR_SEARCH_VAL, {isClear: true});
    },

    // 添加自选关注  OPTIONAL_ADD_FOLLOW
    /*****
     * userToken	String	用户唯一标识
     * infoId	Integer	自选信息ID
     * infoToken	String	主题名称或股票代码
     * infoType	Integer	自选信息类型
     */
    addOptionalFollowAction({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/addInfo',
                responseType: 'json',
                params: {
                    userToken: STORAGE,
                    ...obj
                }
            }).then((res) => {
                if(res){
                    // commit(types.OPTIONAL_ADD_FOLLOW, {login: true, ...res.data});
                    commit(types.OPTIONAL_ADD_FOLLOW, { ...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_ADD_FOLLOW, {login: false})
        // }
    },

    // 添加营业部关注  OPTIONAL_ADD_FOLLOW
    /*****
     * userToken	String	用户唯一标识
     * 
     * infoToken	String	主题名称或股票代码
     * infoType	 Integer	2 自选信息类型
     */
    addDepartmentlFollowAction({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/addInfoAtHero',
                responseType: 'json',
                params: {
                    userToken: STORAGE,
                    infoType: 2,
                    ...obj
                }
            }).then((res) => {
                if(res){
                    commit(types.OPTIONAL_ADD_FOLLOW, {login: true, ...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_ADD_FOLLOW, {login: false})
        // }
    },

    // 删除 搜索列表关注 OPTIONAL_CANCEL_FOLLOW
    /****
     * id	String	主题或单股ID
     * type	String	数据类型 0主题 1单股
     * phone	String	用户标识
     * 
     */
    cancelOptionalFollowAction({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/deleteSelfSelect',
                responseType: 'json',
                params: {
                    phone: STORAGE,
                    ...obj
                }
            }).then((res) => {
                if(res){
                    commit(types.OPTIONAL_CANCEL_FOLLOW, {login: true, ...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_CANCEL_FOLLOW, {login: false})
        // }
    },
    // 删除 营业部关注 OPTIONAL_CANCEL_FOLLOW
    /****
     * infoToken	String	主题或单股ID
     * infoType	String	数据类型 0主题 1单股 2营业部
     * userToken	String	用户标识
     * 
     */
    cancelDepartmentFollowAction({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/deleteSelfSelectAtHero',
                responseType: 'json',
                params: {
                    userToken: STORAGE,
                    infoType: 2,
                    ...obj
                }
            }).then((res) => {
                if(res){
                    // commit(types.OPTIONAL_CANCEL_FOLLOW, {login: true, ...res.data});
                    commit(types.OPTIONAL_CANCEL_FOLLOW, { ...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_CANCEL_FOLLOW, {login: false})
        // }
    },
    // 删除 自选列表 OPTIONAL_LIST_CANCEL_FOLLOW
    /*****
     * 
     * ids	String	自选信息主键加逗号拼接的字符串
     * 
     */
    cancelOptionalListFollowAction({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/deleteBatch',
                responseType: 'json',
                params: obj
            }).then((res) => {
                if(res){
                    // commit(types.OPTIONAL_LIST_CANCEL_FOLLOW, {login: true, ...res.data});
                    commit(types.OPTIONAL_LIST_CANCEL_FOLLOW, {...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_LIST_CANCEL_FOLLOW, {login: false})
        // }
    },

    // 自选列表  排序 OPTIONAL_LIST_SORT
    /****
     * selfSelectInfoId	String	
     * type  数据类型 0主题 1单股
     * phone	String	用户唯一标识
     */
    handleoptionalListSort({commit, state}, obj){
        // if(STORAGE){
            axios({
                method: 'get',
                url: Util.url() + 'selfSelectInfo/upSelect',
                responseType: 'json',
                params: obj
            }).then((res) => {
                if(res){
                    // commit(types.OPTIONAL_LIST_SORT, {login: true, ...res.data});
                    commit(types.OPTIONAL_LIST_SORT, { ...res.data});
                }
            });
        // }else{
            // commit(types.OPTIONAL_LIST_SORT, {login: false})
        // }
    },

    // 自选 热门推荐列表 OPTIONAL_HOT_RECOMMEND
    /****
     * 
     * pageNo	Integer	当前页,默认为第一页
     * 
     */
    getOptionalHotRecommend({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/getRecommend',
            responseType: 'json',
            params: {
                pageNo: 1,
                device: 1,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.OPTIONAL_HOT_RECOMMEND, res.data);
            }
        });
    },

    // 展示所有主题列表 SHOW_ALL_THEME_LIST
    /****
     * key String  关键字 
     * 
     */
    getAllThemeList({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/showAllInfo',
            responseType: 'json',
            params: obj
        }).then((res) => {
            if(res){
                commit(types.SHOW_ALL_THEME_LIST, res.data);
            }
        });
    },
    // 一键添加 热门推荐 ONE_KEY_ADD
    /****
     * infos	String	infoId:infoType:infoToken,infoId:infoType:infoToken拼接的字符串
     * 
     * userToken	String	用户标识或手机号
     */
    handleOnekeyAdd({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'selfSelectInfo/quickAdd',
            responseType: 'json',
            params: {
                userToken: STORAGE,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.ONE_KEY_ADD, res.data);
            }
        });
    },
    // 清除  stockDetail themeDetail departmentDetail 缓存
    clearDetails({commit, state}, str){
        if(str === 'stock'){
            commit(types.CLEAR_STOCK, {clear: true});
        }else if(str === 'theme'){
            commit(types.CLEAR_THEME, {clear: true});
        }else if(str === 'department'){
            commit(types.CLEAR_DEPARTMENT, {clear: true});
        }else{
            return ;
        }
    },


    // SEO 
    /****
     * content
     * 
     */
    serverRending({commit, state}, obj){
        axios.defaults.headers.post['Content-Type'] = 'text/html';
        let params = new URLSearchParams();

        for(let key in obj){
            params.append(key, obj[key]);
            // console.log(params);
        }
        

        axios({
            method: 'post',
            url: Util.url() + 'infomation/getInfomationNew',
            responseType: 'json',
            data: params
        }).then((res) => {
            if(res){
                console.log(res.data);
                // commit(types.SEVICE_RENDER, res.data);
            }
        });
    },


    // 实名认证 CERTIFICATION
    /*****
     * 
     *  idCard	是	string	身份证号
        realName	是	string	真实姓名
        qutouPhone	是	string	手机端是手机号，pc端是uuid
     * 
     * 
     */
    certification({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'member_index/certification',
            responseType: 'json',
            params: {
                qutouPhone: STORAGE,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.CERTIFICATION, res.data);
            }
        });
    },

    // VIP  智能股库  AI_STOCK_LIB
    /******
     * pageNo 分页
     * 
     * rows 每页显示的条数
     */
    getAIStockLib({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'aiStockDataPool/getAiStocks',
            responseType: 'json',
            params: {
                pageNo: 1,
                rows: 10,
                ...obj
            }
        }).then((res) => {
            if(res){
                commit(types.AI_STOCK_LIB, res.data);
            }
        });
    },
    // VIP 
    // 独家内参 INTERNAL_REFERENCE
    // 复盘笔记 NOTE_TAKING 
    /******
     * status: 数据类型 1主题投资，2快讯，3独家内参，4复盘笔记 主题投资和快讯一起 默认值为1
     * 
     * pageNo: 页码
     */
    getInternalReference({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'infomation/getInfomationsByStatusPC',
            responseType: 'json',
            params: {
                pageNo: 1,
                status: 3,
                ...obj
            }
        }).then((res) => {
            if(res){
                // console.log(obj);
                let status = obj.status || 3;
                if(status === 3){

                    commit(types.INTERNAL_REFERENCE, res.data);
                }else if(status === 4){
                    commit(types.NOTE_TAKING, res.data);
                }
            }
        });
    },
    // 独家内参  资讯详情 REFERENCE_DETAILS
    /******
     *  id :  文章id
     * 
     */
    getReferenceDetails({commit, state}, obj){
        axios({
            method: 'get',
            url: Util.url() + 'infomation/getInfomationDetail',
            responseType: 'json',
            params: obj
        }).then((res) => {
            if(res){
                commit(types.REFERENCE_DETAILS, res.data);
            }
        });
    }
}
export default actions;