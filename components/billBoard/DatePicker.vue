<template>
<div class="DatePicker">
    <div class="dateTitle">
        <div @click="prevMonth" class="leftBtn">
            <s :class="lArrow"></s>
        </div>
        <div class="yearMonth">
            <span>{{year}}年</span>
            <span>{{month + 1}}月</span>
        </div>
        <div @click="nextMonth" class="rightBtn">
            <s :class="rArrow"></s>
        </div>
    </div>
    <div class="weekRow">
        <ul>
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
        </ul>
    </div>
    <div class="dayContainer">
        <ul v-for="day in dayArr">
            <li @click="getChoiceDate(d.value)" v-for="d in day" :style="d.style">{{d.value}}</li>
            <!-- <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li> -->
        </ul>
        
    </div>
</div>
</template>

<script>
export default {
    
    data(){
        return {
            
            rArrow: {end: true},
            lArrow: {end: false},
            today: '',
            year: '',
            month: '',
            day: '',
            week: '',
            
            dayArr: [
                [
                    {
                        value: 0,
                        style: {}
                    },
                    {
                        value: 0,
                        style: {}
                    },
                    {
                        value: 0,
                        style: {}
                    },{
                        value: 0,
                        style: {}
                    },
                    {
                        value: 0,
                        style: {}
                    },
                    {
                        value: 0,
                        style: {}
                    },
                    {
                        value: 0,
                        style: {}
                    }
                ],
                
            ]
        }
    },

    mounted(){
        this.init();

        

        
    },

    methods: {

        // 初始化
        init(){
            let now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth();
            this.day = now.getDate();
            this.week = now.getDay();

            let firstDayOfMonth = new Date(this.year, this.month, 1); // 当月的第一天
            let lastDayOfMonth = new Date(this.year, this.month, 0); // 上个月的最后一天
            let nowDayOfMonth = new Date(this.year, this.month + 1, 0); // 当月的最后一天
            
            this.render(firstDayOfMonth, nowDayOfMonth, lastDayOfMonth);

            // console.log(firstDayOfMonth.getDay());
            

        },

        // 渲染日期
        render(first, now, last){
            
            let dayArr = [];
            // console.log(this.month);
            if(first.getDay() === 0){
                let firstday = first;
                
                for(let i = 0; i<42; i++){
                    let day = (new Date(firstday)).getDate();
                    firstday = (new Date(firstday)).getTime() + 24*3600*1000;
                    dayArr.push(day);
                }

            }else{
                
                while((new Date(last)).getDay() !== 0){ // 如果最后上一个月的最后一天  不是周日  则往前一天判断
                    last = (new Date(last)).getTime() - 3600*24*1000;

                    
                }
                let lastday = (new Date(last)).getTime() - 3600*24*1000;
                for(let i = 0; i<42; i++){
                    lastday = lastday + 24*3600*1000;
                    
                    let day = (new Date(lastday)).getDate();
                    dayArr.push(day);
                }
                // console.log(last.getDay());
            }
            
            this.formatDay(dayArr);
        },

        // 格式日期
        formatDay(arr){
            // console.log(arr);
            let today = (new Date()).getDate();
            let sameMonth = (new Date()).getMonth();
            // console.log(today);
            let newArr = [];
            let weArr = [];
            for(let i=0; i<arr.length; i++){
                let obj = {};
                if((i+1)%7 !== 0){
                    obj.value = arr[i];
                    
                    if(today === arr[i] && this.month === sameMonth){
                        obj.style = {color: '#6ba8e7'}
                    }else{
                        obj.style = {};
                    }
                    weArr.push(obj);
                }else{
                    obj.value = arr[i];
                    if(today === arr[i] && this.month === sameMonth){
                        obj.style = {color: '#6ba8e7'}
                    }else{
                        obj.style = {};
                    }
                    weArr.push(obj);
                    newArr.push(weArr);
                    weArr = [];
                }
                
            }

            // console.log(newArr);

            this.dayArr = newArr;

            this.dayColor(newArr);
        },

        // 天数颜色设定
        dayColor(arr){
            let firstRow = arr[0];
            let lastRow = arr[arr.length-1];
            let lastSecondRow = arr[arr.length-2];
            firstRow.map((item) => {
                if(item.value > 7){
                    item.style = {color: '#dedede'};
                }
            });

            lastRow.map((item) => {
                if(item.value < 14){
                    item.style = {color: '#dedede'};
                }
            });

            lastSecondRow.map((item) => {
                if(item.value < 7){
                    item.style = {color: '#dedede'};
                }
            });
            // console.log(lastRow);
            this.dayArr[0] = firstRow;
            this.dayArr[arr.length-1] = lastRow;
            this.dayArr[arr.length-2] = lastSecondRow;
            
        },

        // 点击 上一个月
        prevMonth(){
            
            if(this.month > 0){
                this.month = this.month - 1;
                // console.log(this.month);

                let firstDayOfMonth = new Date(this.year, this.month, 1); // 当月的第一天
                let lastDayOfMonth = new Date(this.year, this.month, 0); // 上个月的最后一天
                let nowDayOfMonth = new Date(this.year, this.month + 1, 0); // 当月的最后一天
                
                // console.log(nowDayOfMonth.getDay());
                this.render(firstDayOfMonth, nowDayOfMonth, lastDayOfMonth);

                this.rArrow = {end: false};
                // if(this.month === 0){
                //     this.lArrow = {end: true};
                // }
                // console.log(this.month);
                
            }else{

                this.year = this.year - 1;
                this.month = 11;
                
                // this.lArrow = {end: true};
            }
            
        },

        // 下一个月
        nextMonth(){
            
            let thisYear = (new Date()).getFullYear();
            let sameMonth = (new Date()).getMonth();
            
            if(new Date(this.year, this.month+1) <= new Date(thisYear, sameMonth)){
                // console.log(this.month);
                this.month = this.month + 1;

                let firstDayOfMonth = new Date(this.year, this.month, 1); // 当月的第一天
                let lastDayOfMonth = new Date(this.year, this.month, 0); // 上个月的最后一天
                let nowDayOfMonth = new Date(this.year, this.month + 1, 0); // 当月的最后一天
                
                // console.log(nowDayOfMonth.getDay());
                this.render(firstDayOfMonth, nowDayOfMonth, lastDayOfMonth);

                this.lArrow = {end: false};
                // console.log(this.month);
                if(this.month === 12){
                    this.year += 1;
                    this.month = 0;
                    // this.rArrow = {end: true};
                }

                
                // console.log(this.month);
                
            }else{
                
                this.rArrow = {end: true};
            }

            if(this.month === sameMonth){
                this.rArrow = {end: true};
            }
        },

        // 点击 选择日期
        getChoiceDate(day){
            this.today = day;  
            let dateObj = {
                year: this.year,
                month: this.month + 1 >9?this.month + 1: '0'+(this.month + 1),
                day: day>9?day:'0'+day
            }

            

            this.$emit('choiceDate', dateObj);
        }
    }
}
</script>
