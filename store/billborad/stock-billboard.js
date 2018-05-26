
import Vue from 'vue'
import axios from 'axios'


import Util from '../util';


const stockBillboard = {
    axiosData: null,
    getData: function (path, initDate='', commit) {
        
        let bool = /\/billboard/.test(path);

        if(bool){
            let data = null;
            axios({
                method: 'get',
                url: Util.url() + 'stock/getStockHeroList',
                responseType:'json',
                params: {
                    searchDate: '2017-04-17',
                    sortKey: 'chg',
                    sortType: 'DESC'
                }
            }).then((res) => {
                
                this.axiosData = res.data;
                    
                commit("GETCHANNELS",res.data)
            });
            
            GETCHANNELS();
            
        }else{
            return null;
        }
    },
    GETCHANNELS(res){
        this.axiosData = res;
    }
}


export default stockBillboard;