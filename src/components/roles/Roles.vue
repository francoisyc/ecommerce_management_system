<template>
  <div>
    <el-table
      :data="rolesData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        :index="indexMethod"
      >
        <el-table-column type="expand">

          <template slot-scope="scope">
            <el-row
              class="row1"
              v-for="item1 in scope.row.children" 
              :key="item1.id"
            >
              <el-col :span="4">
                <el-tag>{{item1.authName}}></el-tag>
              </el-col>
              <el-col :span="20">

                <el-row
                  class="row2"
                  v-for="item2 in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="4">
                    <el-tag type="success">{{item2.authName}}></el-tag>
                  </el-col>
                  <el-col :span="20">
                    <span v-for="item3 in item2.children">
                      <el-tag
                        closable
                        type="warning"
                      >{{item3.authName}}</el-tag>
                    </span>
                  </el-col>

                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-table-column>

      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            type="success"
            plain
            size="mini"
            icon="el-icon-check"
            @click="showAssignRightsDialog(scope.row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="角色授权"
      :visible.sync="dialogAssignRightsVisible"
    >

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          node-key="id"
    :default-expand-all="true"
          :props="defaultProps"
        >
        </el-tree>
        <el-button @click="dialogAssignRightsVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="assignRights()"
          
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      rolesData: [
        {
          roleName: "主管",
          roleDesc: "技术负责人"
        }
      ],
      dialogAssignRightsVisible: false,
      form: {},
      formLabelWidth: "120px",
      data: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        roleId:0
    };
  },
  created() {
    this.getRolesData();
    this.loadRightsData()
  },
  methods: {
    async getRolesData() {
      let res = await this.$http.get("roles");
      const { data, meta } = res.data;
      this.rolesData = data;
    },
    indexMethod(index) {
      return index;
    },
    async loadRightsData(){
        let res = await this.$http.get('rights/tree')
        const {data,meta} = res.data
        this.data = data
    },
    showAssignRightsDialog(row){ 
        this.roleId = row.id
        this.dialogAssignRightsVisible = true
        let keys=[]
        row.children.forEach(item2 => { 
            item2.children.forEach(item3 => {
                keys.push(item3.id)
            })
        });
       
        this.$nextTick(()=>{
            this.$refs.tree.setCheckedKeys(keys)
        })
        
    },
    async assignRights(){
        let keys1 = this.$refs.tree.getCheckedKeys()
        let keys2 = this.$refs.tree.getHalfCheckedKeys()
        let keys = keys1.concat(keys2)
        
       
        let res = await this.$http.post(`roles/${this.roleId}/rights`,{rids: keys.join(',')})
         console.log(res);
        
        if(res.data.meta.status === 200){
            this.dialogAssignRightsVisible = false
            this.loadRightsData()
        }
    }
  }
};
</script>

<style lang="less">
.row1 {
  border-bottom: 1px dashed #ccc;
  &:last-child {
    border: none;
  }
}
</style>
