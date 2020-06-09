<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="user-breadcrumb"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入搜索内容"
          v-model="queryStr"
          class="input-with-select"
        >

          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryUserList"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button
          type="success"
          plain
          @click="showUserAddDialog"
        >添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row.id,scope.row.mg_state)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="showUserEditDialog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="delUserById(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            plain
            size="mini"
            icon="el-icon-check"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      backgroung
      layout="prev,pager,next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="curPage"
      @current-change="changePage"
    >
    </el-pagination>

    <el-dialog
      title="添加用户"
      :visible.sync="userAddDialog"
    >
      <el-form
        :model="userAddForm"
        :rules='userAddRules'
        ref="userAddForm"
      >
        <el-form-item
          label="用户名"
          label-width="120px"
        >
          <el-input
            v-model="userAddForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="密码"
          label-width="120px"
        >
          <el-input
            v-model="userAddForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="邮箱"
          label-width="120px"
        >
          <el-input
            v-model="userAddForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="手机"
          label-width="120px"
        >
          <el-input
            v-model="userAddForm.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="编辑用户"
      :visible.sync="userEditDialog"
      @close="closeUserEditDialog"
    >
      <el-form
        :model="userEditForm"
        :rules='userEditRules'
        ref="userEditForm"
      >
        <el-form-item
          label="用户名"
          label-width="120px"
        >
          <el-input
            v-model="userEditForm.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="邮箱"
          label-width="120px"
        >
          <el-input
            v-model="userEditForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="手机"
          label-width="120px"
        >
          <el-input
            v-model="userEditForm.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUser"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      userList: [],
      pageSize: 3,
      curPage: 1,
      total: 10,
      queryStr: "",
      userAddDialog: false,
      userAddForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      userAddRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      },
      userEditDialog: false,
      userEditForm: {
        id:-1,
        username: "",
        email: "",
        mobile: ""
      },
      userEditRules: {
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getUserList(curPage = 1) {
      this.$http
        .get("/users", {
          params: { pagenum: curPage, pagesize: 3, query: this.queryStr || "" }
          //   headers:{Authorization:localStorage.getItem('token')}
        })
        .then(res => {
          console.log(res);

          const { meta, data } = res.data;
          if (meta.status === 200) {
            this.userList = data.users;
            this.total = data.total;
          }
        });
    },
    changePage(curPage) {
      this.getUserList(curPage);
    },
    queryUserList() {
      this.curPage = 1;
      this.getUserList();
    },
    changeUserState(id, curState) {
      this.$http.put(`/users/${id}/state/${curState}`).then();
    },
    showUserAddDialog() {
      this.userAddDialog = true;
    },
    closeUserAddDialog() {
      this.$refs.userAddForm.resetFields();
    },
    addUser() {
      this.$refs.userAddForm.validate(valid => {
        if (valid) {
          this.$http.post("/users", this.userAddForm).then(res => {
            const { meta } = res.data;
            if (meta.status === 201) {
              this.userAddDialog = false;
              this.getUserList();
              this.curPage = 1;
            }
          });
        } else {
          return false;
        }
      });
    },
    delUserById(id) {
      this.$confirm("确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then(res => {
            const { meta } = res.data;
            if (meta.status === 200) {
              this.$message({
                type: "success",
                message: meta.msg
              });
              //   this.getUserList();
              //   this.curPage = 1;
              const index = this.userList.findIndex(item => item.id === id);
              this.userList.splice(index, 1);
              const totalPage = Math.ceil(this.userList.length / this.pageSize);
              if (curPage > totalPage) {
                this.getUserList(--this.curPage);
              }
            }
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showUserEditDialog(curUser){
         for(const key in this.userEditForm){
             this.userEditForm[key] = curUser[key]
        }
        this.userEditDialog = true
    },
    
    editUser(){
              this.$refs.userEditForm.validate(valid => {
                if(valid){
                  const {id,email,mobile} = this.userEditForm
                  this.$http.put(`/users/${this.userEditForm.id}`,{
                    email,
                    mobile}).then(res => {
                      const{data,meta} = res.data
                      if(meta.status === 200){
                        const index = this.userList.find(item => item.id === id)
                        editUser.email = data.email
                        editUser.mobile = data.mobile
                        this.userEditDialog = false
                  
                      }
                    })
                }else{

            }
        })
    },
    closeUserEditDialog(){
        this.$refs.userEditForm.resetFields()
    }
  }
};
</script>

<style>
.user-breadcrumb {
  line-height: 40px;
  background-color: #d4dae0;
  font-size: 18px;
  padding-left: 10px;
}
</style>
