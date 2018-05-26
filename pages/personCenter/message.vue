<template>
<div class="myMessage">
    <div class="deTitle">
        <span><s></s><b>我的消息</b></span>
    </div>
    <div class="deContent">
        <div class="messageListContainer">
            <ul v-if="newsList.length !== 0">
                
                <li v-for="info in newsList">
                    <div class="m-l">
                        <i></i>
                    </div>
                    <div class="m-r">
                        <div class="m-top">
                            <span>{{info.type === 1?'公告':'私信'}}</span>
                            <span>{{info.date}}</span>
                        </div>
                        <div class="m-bottom">
                            <p v-if="info.type === 1" v-html="info.title"></p>
                            <p v-if="info.type === 2" >{{info.title}}</p>
                        </div>
                    </div>
                </li>
                <!-- <li>
                    <div class="m-l">
                        <i></i>
                    </div>
                    <div class="m-r">
                        <div class="m-top">
                            <span>公告</span>
                            <span>昨天 15:27 </span>
                        </div>
                        <div class="m-bottom">
                            <p><a href="javascript:;">2017年11月27日本站进行不停机更新，请所有用户注意，如出现问题请尽快联系本站</a></p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="m-l">
                        <i></i>
                    </div>
                    <div class="m-r">
                        <div class="m-top">
                            <span>公告</span>
                            <span>昨天 15:27 </span>
                        </div>
                        <div class="m-bottom">
                            <p><a href="javascript:;">2017年11月27日本站进行不停机更新，请所有用户注意，如出现问题请尽快联系本站</a></p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="m-l">
                        <i></i>
                    </div>
                    <div class="m-r">
                        <div class="m-top">
                            <span>公告</span>
                            <span>昨天 15:27 </span>
                        </div>
                        <div class="m-bottom">
                            <p><a href="javascript:;">2017年11月27日本站进行不停机更新，请所有用户注意，如出现问题请尽快联系本站</a></p>
                        </div>
                    </div>
                </li> -->
            </ul>
        </div>
        <div v-if="newsList.length !== 0" class="pageContainer">
            <page-select @changePage="changePage" :totalNum="totalNum" :pageSize="pageSize"></page-select>
        </div>
    </div>
</div>  
</template>

<script>
import PageSelect from '~/components/invest/PageSelect';
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            totalNum: 0,
            pageSize: 10,
            newsList: [],
            systemNewsList: [],
            perosonNewsList: [],

            userPhone: ''
            
        }
    },

    components: {
        PageSelect
    },

    computed: {
        ...mapGetters(['systemInfomations', 'personInfomations'])
    },

    watch: {
        'systemInfomations'(newVal, oldVal){
            // console.log(newVal);
            this.systemInfoHandle(newVal.articles);
            this.personInfoHandle(this.personInfomations.msgList);
            this.totalNum = newVal.articlestotalCount + this.personInfomations.msgtotalCount;
            this.newsList = [...this.systemNewsList, ...this.perosonNewsList];
        }
    },

    mounted(){
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');
        this.getInfomations({themePhone: this.userPhone});
    },

    methods: {
        ...mapActions(['getInfomations']),
        //  分页
        changePage(val){
            // console.log(val);
            this.getInfomations({no: val, themePhone: this.userPhone});
        },

        // 系统消息数据处理 type 1系统消息   2私信
        systemInfoHandle(data){
            let arr = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    let obj = {
                        id: item.id,
                        type: 1,
                        // title: item.context.replace(/<[^>]+>/g,"").replace(/[&][l][t][;][\w\s\n\/]+[&][g][t][;]/g,"").replace(/[&][n][b][s][p][;]/g,""),
                        title: item.context,
                        date: item.createTime
                    };
                    arr.push(obj)
                });
                this.systemNewsList = arr;
            }
        },
        // 个人消息数据处理

        personInfoHandle(data){
            let arr = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    let obj = {
                        id: item[0],
                        type: 2,
                        title: item[1],
                        date: item[3]
                    };
                    arr.push(obj)
                });
                this.perosonNewsList = arr;
            }
        },
    }
}
</script>

