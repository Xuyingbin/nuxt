<template>
<div class="AlertWindow">
    <div class="confirm">
        <div class="title">
            <span>{{title}}</span>
        </div>

        <div class="operation" v-if="isLink?isLink:false">
            
            <router-link :to="isLink">确定</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["title", "isLink"]
}
</script>
