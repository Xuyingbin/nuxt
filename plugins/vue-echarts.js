import Vue from 'vue';
import Echarts from 'echarts';
import $ from 'jquery';
Vue.prototype.$echarts = Echarts;
Vue.prototype.globalClick = function(callback){
    $(document).click(callback);
}