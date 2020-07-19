<template>
  <div>
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
     
      <el-table-column
        type="index"
        label="#"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else-if='scope.row.level==2'>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsData: [
        {
          authName: "",
          path: "",
          level: ""
        }
      ]
    };
  },
  created() {
    this.loadRightsData();
  },
  methods: {
    async loadRightsData() {
      let res = await this.$http.get("rights/list");
      const { data, meta } = res.data;
      this.rightsData = data;
    },
    indexMethod(index) {
      return index;
    }
  }
};
</script>

<style>
</style>
