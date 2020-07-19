<template>
  <el-container class="home-wrapper">
    <el-header>
      <el-row>
        <el-col
          :span="8"
          class="logo"
        >
          <img
            src="@/assets/logo.png"
            alt
          />
        </el-col>
        <el-col :span="8">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="welcome">
            <span>欢迎使用</span>
            <a
              href="#"
              @click.prevent="logout"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- :router是用来控制是否开启路由模式，如果开启了，下面的index就是路径 -->
        <el-menu
          :default-active="handlePath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"    
        >
          <el-submenu :index="item1.id+''" v-for="item1 in menusData" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item1.children" :key="item2.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2"><template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/roles">角色列表</el-menu-item>
            <el-menu-item index="/home/rights">权限列表</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      menusData:[]
    }
  },
  created(){
    this.loadLeftMenusData()
  },
  methods: {
    logout() {
      this.$confirm("您是否确定退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    async loadLeftMenusData(){
      let res = await this.$http.get("menus")
      this.menusData = res.data.data
    },
    handlePath(){
      let path =  this.$route.path
      return path.slice(1)
    }
   
  }
};
</script>

<style scoped lang="less">
.home-wrapper {
  height: 100%;
  .el-header {
    padding: 0;
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    .logo {
      text-align: left;
    }
    .title {
      margin: 0;
      line-height: 60px;
      color: #fff;
      font-size: 38px;
    }
    .welcome {
      line-height: 60px;
      text-align: right;
      padding-right: 30px;
      span {
        font-weight: bold;
      }
      a {
        color: #b07a17;
      }
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>