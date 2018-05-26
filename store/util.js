const Util = {

    url: function(){
        // return '/';
        // return '/api/';
        return 'http://39.107.14.227/';
    },

    baseUrl: function (param) { 
        return 'http://39.107.14.227/';
        // return '/';
        // return 'http://localhost:3000/api/';
    },

    // 星期转换表
    changeWeek(num){
        let week = parseFloat(num);
        switch(num){
            case 0:
                return '日';
            break;
            case 1:
                return '一';
            break;
            case 2:
                return '二';
            break;
            case 3:
                return '三';
            break;
            case 4:
                return '四';
            break;
            case 5:
                return '五';
            break;
            case 6:
                return '六';
            break;
        }
    },

    // 钱单位格式  num 数字  type string '万' '亿'  float  number  保留几位小数
    formatMoney({num, type, float}){
        
        if(typeof(num) !== 'number'){
            throw new Error(`${num} is not a Number`);
        }
        if(typeof(type) !== 'string'){
            throw new Error(`${type} is not a String`);
        }
        if( float && typeof(float) !== 'number'){
            throw new Error(`${float} is not a number`);
        }
        
        let money = parseFloat(num);
        let forMoney = 0;
        
        if(type === '万'){
            forMoney = (money / 10000).toFixed(float || float === 0?float:2);
        }else if(type === '亿'){
            forMoney = (money / 100000000).toFixed(float || float === 0?float:2);
        }

        return forMoney;
    }

}



export default Util;