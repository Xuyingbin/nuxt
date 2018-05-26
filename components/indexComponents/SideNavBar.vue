<template>
<div class="SideNavBar">
    <ul>
        <li @click="backTop">
            
            <i></i>
            
        </li>
        <li>
            <i></i>
            <span>订阅号</span>
            <b class="imgContainer dyh">
                <!-- <img src="/assets/image/dyh.jpg" alt="订阅号"> -->
            </b>
        </li>
        <li>
            <i></i>
            <span>服务号</span>
            <b class="imgContainer gzh">
                <!-- <img src="/assets/image/gzh.jpg" alt="公众号"> -->
            </b>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        backTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>
