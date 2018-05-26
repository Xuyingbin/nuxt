<template>
<section class="aboutUs">
    <div class="container">
        <div class="about">
            <div class="banner">
                <img src="~/assets/image/aboutBanner.png" alt="">
            </div>

            <div class="titleDetails">
                <h3> <span>主题风向标（www.ztfxb.com）</span> 是北京人人趣投网络科技有限公司推出的全新体验模式的主题投资平台。</h3>

                <p>伴随着新环境和证券市场新动向的发展，主题投资正越来越受到投资者的关注和欢迎，而且已经涌现了不少机会，如自贸区、一带一路、国企改革、注册制等。主题投资能够形成强板块效应，并且具有持续性强、涨幅大等特点，是当前投资环境下的最佳投资策略之一。</p>
                <p>主题风向标以最及时的政策、行业、创新或突发事件等资讯信息为驱动，形成投资主题，挖掘具有共同属性特征的龙头股票集合，并结合资金面和主力动向，从而帮助投资者更精确的把握投资机会。</p>
            </div>

            <div class="listDetails">
                <div class="row_1">
                    <div class="col_l">
                        <h4>1、主题的前瞻性</h4>
                        <p>专业团队第一时间获取、分析相关事件，梳理事件引发的核心逻辑，以寻找超预期为出发点，进行全方位事件解读。</p>
                    </div>
                    <div class="col_r">
                        <img src="~/assets/image/about_1.png" alt="">
                    </div>
                </div>
                <div class="row_2">
                    <div class="col_r">
                        <img src="~/assets/image/about_2.png" alt="">
                    </div>
                    <div class="col_l">
                        <h4>2、数据的关联度</h4>
                        <p>平台深入挖掘个股与事件之间的关联，打通资金面与主力之间的关联、最新数据与历史数据之间的关联，综合透视核心数据。</p>
                    </div>
                    
                </div>
                <div class="row_3">
                    <div class="col_l">
                        <h4>3、体验的直观感</h4>
                        <p>界面设计简洁生动，将多维的数据运用生动的表现形式，做到一目了然。为用户理清繁杂的查询思路，节省大量的查询时间。</p>
                    </div>
                    <div class="col_r">
                        <img src="~/assets/image/about_3.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    layout: 'Dashboard',
    head() {
        return {
        title: '关于我们 - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },
    
    mounted(){
         // 进入 回到顶部
        if(this.$route.path === '/about'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>

