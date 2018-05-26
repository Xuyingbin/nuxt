<template>
  <div class="departmentFollow">
    <div class="deTitle">
        <span><s class="real-name"></s><b>实名认证</b></span>
    </div>
    <div class="deContent">
        <div class="user-info">
            <div class="certification">
                <img src="~/assets/image/certification.png" alt="">

                <span>您已完成实名认证</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            realName: '',
            idCard: ''
        }
    }
}
</script>

<style>

</style>
