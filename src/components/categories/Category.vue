<template>
 <div>
     <el-button type="success" plain @click="showAddCatDialog">添加分类</el-button>
     <el-table
      :data="catData"
      style="width: 100%">
      <el-table-tree-column 
      file-icon="icon icon=file"
      folder-icon="icon icon-folder"
      prop="cat_name"
      label="分类名称"
      width="180"
      tree-key="cat_id"
      parent-key="cat_pid"
      level-key="cat_level"
      :indent-size="35">
          
      </el-table-tree-column>
      
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180">
        <template slot-scope="scope">
            <span>{{ scope.row.cat_deleted ? '否' : '是'}}</span>
            </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级">
        <template slot-scope="scope">
            <span v-if="scope.row.cat_level==0">一级</span>
            <span v-else-if="scope.row.cat_level==1">二级</span>
            <span v-else>三级</span>
            </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="dialogAddCatVisible" >
  <el-form :model="addCatForm" label-width="80px">
    <el-form-item label="分类名称" >
      <el-input v-model="addCatForm.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级名称" >
      <el-cascader :options="options" clearable v-model='addCatForm.cat_pid_arr' :props="defaultProps">
          
      </el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddCatVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCat">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import Vue from 'vue'
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name,ElTreeGrid) 
export default {
  data(){
      return {
          catData:[{
              cat_name:'chong',
              name:'xxx',
              cat_level:'yiji',
              cat_deleted:false
          }],
          dialogAddCatVisible : false,
          addCatForm:{
              cat_name : '',
              cat_pid_arr:[]
          },
          options1:[{
              value:'gg',
              label:'ff',
              children:['ff']
          }],
          options :[{

          }],
          defaultProps:{
              label : "cat_name",
              value : "cat_id"
          }
      }
  },
  created(){
      this.loadCatData()
      this.loadCatData2()
  },
  methods:{
      async loadCatData(){
          let res = await this.$http.get('categories',{
              params:{
                  type:3,
                  pagenum:1,
                  pagesize:4
              }
          })
          console.log(res);
          
          this.catData = res.data.data.result
      },
      async loadCatData2(){
          let res = await this.$http.get('categories',{
              params:{
                  type:2
              }
          })
         this.options = res.data.data
      },
      showAddCatDialog(){
          this.dialogAddCatVisible = true
      },
      async addCat(){
          let { cat_name,cat_pid_arr} = this.addCatForm
          let res = await this.$http.post('categories',{
              cat_pid:cat_pid_arr[cat_pid_arr.length - 1],
              cat_name,
              cat_level:cat_pid_arr.length
          })
          if(res.data.meta.status === 201){
              this.dialogAddCatVisible = false
              this.loadCatData()
          }
      }
  }
};
</script>

<style>
</style>
