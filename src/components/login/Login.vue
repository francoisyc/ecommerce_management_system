<template>
  <div class="login-wrapper">
    <el-row type="flex" class="loginForm" justify="center" align="middle">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
       <el-form :model="loginForm" :rules="rules"  ref="loginForm" label-width="100px"  label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录功能
    login() {
      axios
        .post("http://localhost:8888/api/private/v1/login", this.loginForm)
        .then(res => {
          const { data, meta } = res.data;
          console.log(data, meta);
          if (meta.status === 200) {
            alert("登录成功");
            this.$router.push("/home");
          } else {
            this.$message({
              type: "error",
              message: meta.msg,
              duration: 1000
            });
          }
        });
    },
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style>
.login-wrapper,
.loginForm{
    height: 100%;
}
.loginForm{
    background-color:#2D434C;
}
.login-content{
    min-width: 240px;
    background-color: #fff;
    padding: 20px 35px;
    border-radius: 10px;
}
</style>