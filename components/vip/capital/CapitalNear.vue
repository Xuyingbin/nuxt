<template>
  <div class="stock-lib-container">
    <div class="capital-nav-list">
        <ul>
          <li class="active">
            <span style="height:10px;"></span>
            <span>5</span>
            
            <span>日</span>
          </li>
          <li>
            <span style="height:10px;"></span>
            <span>10</span>
            
            <span>日</span>
          </li>
          <li>
            <span>1</span>
            <span>个</span>
            <span>月</span>
          </li>
          <li>
            <span>3</span>
            <span>个</span>
            <span>月</span>
          </li>
        </ul>
      </div>
      <div class="stock-lib">
          
          <table>
              <thead style="background: #e5e5e5;color:#000033">
                  <tr>
                      <th>营业部名称</th>
                      <th>上榜次数</th>
                      <th>动用资金(亿)</th>
                      
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
                  <tr>
                      <td>北京朝阳区朝阳路常营营业部</td>
                      <td>5</td>
                      <td>13.93</td>
                  </tr>
              </tbody>
          </table>

          <div class="page-container">
              <page-select 
                  @changePage="recentChangePage" 
                  :totalNum="100" 
                  :pageSize="10"
              ></page-select>
          </div>
      </div>
      <div class="invest-ad">
          <img src="../../../assets/image/invest-ad.jpg" alt="">
      </div>
  </div>
</template>

<script>
import PageSelect from '../../themeInvestment/PageSelect';
export default {
    data(){
        return {

        }
    },

    components: {
        PageSelect
    },

    methods: {
        recentChangePage(page){
            console.log(page);
        }
    }
}
</script>
