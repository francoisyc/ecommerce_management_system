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
        <el-menu
          default-active="1-2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="home/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2"><template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template></el-menu-item>
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
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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