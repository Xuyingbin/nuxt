<template>
<div class="themeInfoContainer">
    <div class="followTitle">
        <span>资讯</span>
        <b><nuxt-link to="/information">更多 ></nuxt-link></b>
        
    </div>
    <div class="infoContent">
        
        <div class="row ThemeList" style="margin:0;">
            
            
            <div class="col col-md-7" style="padding:0;">
                
                <info-list :indexInfomation="infomations"></info-list>
                
                
            </div>
            <div class="col col-md-5 loading-view" style="padding:0;">
                <theme-details></theme-details>
            </div>
            
        </div>
        
        
        
    </div>
    
    
</div>
</template>

<script>
import ThemeDetails from './themeDetails/ThemeDetails';
import InfoList from './InfoList';

import { mapGetters, mapActions } from 'vuex';
export default {    
    data(){
        return {
           infomations: null,  // 传给组件的数据

            timeArr: [],   // 当前资讯时间

            topInfo: null
        }
    },
    computed:{
        ...mapGetters(['indexInfomation'])
    },

    watch: {
        // 'indexInfomation'(newVal, oldVal){
        //     // console.log(newVal);
        //     let InfoList = [];
        //     for(let key in newVal.infomationMap){
        //         let dateArr = key?key.split('-'):[]
        //         let obj = {
        //             date: {
        //                 year: dateArr[0],
        //                 month: dateArr[1],
        //                 day: dateArr[2]
        //             },
        //             data: this.handleData(newVal.infomationMap[key])
        //         }
                
        //         InfoList.push(obj);
        //     }
        //     if(newVal.topInformationMap){
        //         for(let key in newVal.topInformationMap){
        //             let dateArr = key?key.split('-'):[];
        //             let top = newVal.topInformationMap[key];
        //             let obj = {
        //                 date: {
        //                     year: dateArr[0],
        //                     month: dateArr[1],
        //                     day: dateArr[2]
        //                 },
        //                 data: [{
        //                     id: top.id,
        //                     infomationName: top.infomationName,
        //                     date: {
        //                         // year: (new Date(item.infomationTime)).getFullYear(),
        //                         // month: (new Date(item.infomationTime)).getMonth() + 1,
        //                         // day: (new Date(item.infomationTime)).getDate(),
        //                         hour: (new Date(top.infomationTime)).getHours(),
        //                         minute: (new Date(top.infomationTime)).getMinutes() > 9?(new Date(top.infomationTime)).getMinutes(): '0' + (new Date(top.infomationTime)).getMinutes(),
        //                         // 判断最近的两次时间是否属于同一天  
        //                         // isSame: (new Date(item.infomationTime)).getMonth() + 1 === this.timeArr[0] 
        //                         //         && (new Date(item.infomationTime)).getDate() === this.timeArr[1] 
        //                     },
        //                     isTop: top.isTop,
        //                     infomationContent: top.infomationContent,
        //                     stockDetails: this.stockDataArr(top.stockDetails),
        //                     conceptStockInfo: top.conceptStockInfoVo?top.conceptStockInfoVo:null
        //                 }],
                            

                        
        //             }
        //             this.topInfo = obj;
        //         }
        //         // console.log(this.topInfo);
        //     }
    
            
        //     InfoList.unshift(this.topInfo);
        //     this.saveThemeInfos(InfoList);
        //     this.infomations = InfoList;
        //     // console.log(this.infomations);
        // }
    },
    created(){
        this.handleIndexInfomation(this.indexInfomation);
    },
    mounted(){
        // this.handleArry();
        // this.infomations = this.handleData(this.indexInfomation);
        // console.log(this.infomations);
        this.handleIndexInfomation(this.indexInfomation);
    },
    components: {
        ThemeDetails,
        InfoList
    },
    methods: {
        ...mapActions([
            'saveIndexInfoArr', 
            'saveCurrentInfo', 
            'getInfoRelationTheme', 
            'getRelationThemeQuo', 
            'saveCurrentTheme',
            'getThemeTransBillboard'
        ]),
        // 数据处理 
        handleData(data){
            // 
            let arr = [];
            // console.log(data);
            // 资讯id信息组
            let infoArr = []
            data?data.map( item => {
                
                // 重组数据结构
                let obj = {
                    id: item.id,
                    infomationName: item.infomationName,
                    date: {
                        // year: (new Date(item.infomationTime)).getFullYear(),
                        // month: (new Date(item.infomationTime)).getMonth() + 1,
                        // day: (new Date(item.infomationTime)).getDate(),
                        hour: (new Date(item.infomationTime)).getHours(),
                        minute: (new Date(item.infomationTime)).getMinutes() > 9?(new Date(item.infomationTime)).getMinutes(): '0' + (new Date(item.infomationTime)).getMinutes(),
                        // 判断最近的两次时间是否属于同一天  
                        // isSame: (new Date(item.infomationTime)).getMonth() + 1 === this.timeArr[0] 
                        //         && (new Date(item.infomationTime)).getDate() === this.timeArr[1] 
                    },
                    isTop: item.isTop,
                    infomationContent: item.infomationContent,
                    stockDetails: this.stockDataArr(item.stockDetails),
                    conceptStockInfo: item.conceptStockInfoVo?item.conceptStockInfoVo:null

                };

                let infoObj = {
                    id: item.id,
                    infoName: item.infomationName
                }

                

                // 储存上一次时间
                this.timeContrast(item.infomationTime);
                // console.log(this.timeArr);

                arr.push(obj);

                infoArr.push(infoObj);
            }):null;

            
            this.saveIndexInfoArr(infoArr); // 储存在state中

            
            
            return arr;
        },

        // 股票数组  处理
        stockDataArr(data){
            let arr = [];
            data.map((item) => {
                let obj = {
                    stockName: item.stockName,
                    stockCode: item.stockCode,
                    changeRate: item.changeRate,
                    associateStockId: item.associateStockId
                }

                arr.push(obj);
            });

            return arr;
        },

        // 时间对比 储存
        timeContrast(date){
            // console.log(date);
            this.timeArr = [
                (new Date(date)).getMonth() + 1, 
                (new Date(date)).getDate()
            ];   //[ 'month', 'day']
        },


        saveThemeInfos(data){
            let idArr = data.filter((item) => {
                // console.log(item.conceptStockInfoVo !== null);
               return item.conceptStockInfoVo !== null;
            });

            // console.log(idArr);
            console.log(idArr);

            // 储存当前资讯ID  发起请求  getInfoRelationTheme
            if(idArr && idArr.length!==0){
                // 储存当前资讯ID
                this.saveCurrentInfo({
                    id: idArr[0].data[0].id, 
                    infoName: idArr[0].data[0].infomationName
                });
                // 发起请求  发起资讯关联主题
                this.getInfoRelationTheme({
                    informationId: idArr[0].data[0].id
                });
                // 龙虎榜数据
                this.getThemeTransBillboard({conceptId: idArr[0].data[0].id});
                // 发起请求  主题行情
                
                // console.log(data[0])
                if(idArr[0].data[0].conceptStockInfo){
                    this.getRelationThemeQuo({
                        conceptStockId: idArr[0].data[0].conceptStockInfo.id
                    });
                    // console.log('你妈卖批')
                    // 储存当前主题ID
                    this.saveCurrentTheme({
                        id: idArr[0].data[0].conceptStockInfo.id,
                        themeName: idArr[0].data[0].conceptStockInfo.conceptStockName
                    })
                }
                
                
            }
        },

        handleIndexInfomation(data){
            let InfoList = [];
            for(let key in data.infomationMap){
                let dateArr = key?key.split('-'):[]
                let obj = {
                    date: {
                        year: dateArr[0],
                        month: dateArr[1],
                        day: dateArr[2]
                    },
                    data: this.handleData(data.infomationMap[key])
                }
                
                InfoList.push(obj);
            }
            if(data.topInformationMap){
                for(let key in data.topInformationMap){
                    let dateArr = key?key.split('-'):[];
                    let top = data.topInformationMap[key];
                    let obj = {
                        date: {
                            year: dateArr[0],
                            month: dateArr[1],
                            day: dateArr[2]
                        },
                        data: [{
                            id: top.id,
                            infomationName: top.infomationName,
                            date: {
                                // year: (new Date(item.infomationTime)).getFullYear(),
                                // month: (new Date(item.infomationTime)).getMonth() + 1,
                                // day: (new Date(item.infomationTime)).getDate(),
                                hour: (new Date(top.infomationTime)).getHours(),
                                minute: (new Date(top.infomationTime)).getMinutes() > 9?(new Date(top.infomationTime)).getMinutes(): '0' + (new Date(top.infomationTime)).getMinutes(),
                                // 判断最近的两次时间是否属于同一天  
                                // isSame: (new Date(item.infomationTime)).getMonth() + 1 === this.timeArr[0] 
                                //         && (new Date(item.infomationTime)).getDate() === this.timeArr[1] 
                            },
                            isTop: top.isTop,
                            infomationContent: top.infomationContent,
                            stockDetails: this.stockDataArr(top.stockDetails),
                            conceptStockInfo: top.conceptStockInfoVo?top.conceptStockInfoVo:null
                        }],
                            

                        
                    }
                    this.topInfo = obj;
                }
                // console.log(this.topInfo);
            }
    
            
            InfoList.unshift(this.topInfo);
            this.saveThemeInfos(InfoList);
            this.infomations = InfoList;
        }
    }
}
</script>

