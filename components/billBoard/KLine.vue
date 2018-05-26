<template>
<div class="kLineChart">
    <div id="kLineChart" style="height: 330px;background: #fff">

    </div>
    
</div>

</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Util from '~/store/util';
export default {
    data(){
        return {
            klineData: [],
            dates: [],// 日期
            data: [] // [开盘，收盘， 最低， 最高]
        }
    },

    computed: {
        ...mapGetters(['stock_KLine', 'currentStockDetails'])
    },

    watch: {
        'stock_KLine'(newVal, oldVal){
            console.log(newVal)
            // if(newVal.code){
                let prod_code = newVal.result?newVal.result.prod_code:[];
                // this.klineDataAction(newVal.stockCode);
                // setTimeout(() => {
                this.dataRestart(prod_code);
                this.renderCharts(this.dates, this.data);
                // }, 500);
            // }
            
        }
    },

    mounted(){
        
    },

    methods: {
        renderCharts(dates, data){
            // console.log(dates);
            let option = {
                
                legend: {
                    data: ['MA5', 'MA10', 'MA20', 'MA30'],
                    inactiveColor: '#777',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        // console.log(params);
                        // [开盘，收盘， 最低， 最高]
                        var dayK = params[0];
                        var date = dayK.axisValue;
                        var MA5 = params[1];
                        var MA10 = params[2];
                        var MA20 = params[3];
                        var MA30 = params[4];
                        return `${date} <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>
                                开盘:  ${dayK.data[1]}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>
                                收盘:  ${dayK.data[2]}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>
                                最低:  ${dayK.data[3]}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>
                                最高:  ${dayK.data[4]}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#C33733;"></span>
                                5日均价:  ${MA5.value}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#676767;"></span>
                                10日均价:  ${MA10.value}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#76ADB4;"></span>
                                20日均价:  ${MA20.value}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#DD9C85;"></span>
                                30日均价:  ${MA30.value}
                                <br />
                                `;
                    },
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLine: { lineStyle: { color: '#000' } }
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#000' } },
                    splitLine: { show: false }
                },
                grid: {
                    bottom: 80
                },
                dataZoom: [{
                    textStyle: {
                        color: '#000'
                    },
                    // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M14,26.4h-3v-10h3v10z M9,26.4h-3v-10h3v10z',
                    handleSize: '70%',
                    start: 70,
                    end: 100,
                    dataBackground: {
                        areaStyle: {
                            color: '#333'
                        },
                        lineStyle: {
                            opacity: 0.8,
                            color: '#ccc'
                        }
                    },
                    handleStyle: {
                        color: '#eee',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }, {
                    type: 'inside'
                }],
                animation: false,
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: data,
                        itemStyle: {
                            normal: {
                                color: '#f00',
                                color0: '#1cbf7b',
                                borderColor: '#f00',
                                borderColor0: '#1cbf7b'
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(5, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(10, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: this.calculateMA(20, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: this.calculateMA(30, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }
                ]
            };

            let kLine = this.$echarts.init(document.getElementById('kLineChart'));

            kLine.setOption(option);

            // console.log('K line');
        },

        // 数据重组  stock_KLine
        dataRestart(data){
            
            // console.log(data);
            let dates = [];
            
            let datas = [];
            data.length !== 0?data.map((dItem, index) => {
                let unit = [];
                
                let dateStr = dItem[0] + ''; 
                let date = `${dateStr.slice(0,4)}/${dateStr.slice(4,6)}/${dateStr.slice(6,8)}`;
                dates.push(date);
                // unit[0] = date;
                // unit[1] = dItem[1];
                // unit[2] = dItem[2];
                // unit[3] = dItem[4];
                // unit[4] = dItem[3];
                // console.log(unit);
                // [开盘，收盘， 最低， 最高]
                let data = [dItem[1], dItem[4], dItem[3], dItem[2]];
                datas.push(data);
                
                
            }):data;
            // console.log(kData);
            // return kData;  // 二维数组
            this.dates = dates;
            this.data = datas;
        
        },

        calculateMA(dayCount, data) {
            var result = [];
            for (var i = 0, len = data.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data[i - j][1];
                }
                result.push((sum / dayCount).toFixed(2));
            }
            // console.log(result);
            return result;
        }
        

        // k线图请求
        // klineDataAction(code){
        //     axios({
        //         method: 'get',
        //         url: Util.url() + 'stock/getKlineByCode',
        //         responseType:'json',
        //         params: {stockCode: code, month: 12}
        //     })
        //     .then((res)=>{
        //         if(res){
        //             console.log(res.data);
        //             this.renderCharts(res.data);
        //         }
                
        //     })
        // }
    }
}
</script>
