 <template>
 <div>
     <el-button type="success" plain @click="go2goodAdd">添加商品</el-button>
  <el-table
    :data="goodsData"
    style="width: 100%"
  >
   <el-table-column
      type="index"
    >
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价值"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="goods_number"
      label="商品数量"
    >
    </el-table-column>
    <el-table-column
     
      label="创建时间"
    > <template slot-scope="scope">
        <span>{{scope.row.add_time | dateFilter}}</span>
    </template>
    </el-table-column>
   
    <el-table-column label="操作">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
Vue.filter('dateFilter',res => {
    return moment(res).format('YYYY--MM--DD')
})
export default {
  data() {
    return {
      goodsData: [
        {
          goods_name: "heihei",
          goods_price: "j",
          goods_number: "k",
          add_time: "j"
        }
      ]
    };
  },
  created(){
 this.loadGoodsData()
  },
  methods:{
      async loadGoodsData() {
          let res = await this.$http.get('goods',{
              params:{
                  pagenum:1,
                  pagesize:4,

              }
          })
          this.goodsData = res.data.data.goods
    
      },
      go2goodAdd(){
          this.$router.push('goods-add')
      }
  },
};
</script>

<style>
</style>