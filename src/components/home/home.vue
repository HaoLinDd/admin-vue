<template>
  <div class="container">
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img src="./element.svg" alt="黑马程序员">
          </el-col>
          <el-col :span="16">电商后台管理系统</el-col>
          <el-col :span="4">
            <a @click.prevent="handelLogout" :plain="true" href="#">退出</a>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="aside">
          <el-menu
            default-active="2"
            class="container"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            background-color="#35495e"
            text-color="#fff"
            active-text-color="#41b883">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">角色列表</el-menu-item>
              <el-menu-item index="2-2">权限列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">分类参数</el-menu-item>
              <el-menu-item index="3-2">商品分类</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">数据报表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from '../login/login'

export default {
  data () {
    return {
      value2: 0,
      value3: 0
    }
  },
  components: {
    Login
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handelLogout () {
      this.$confirm('确定要退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style>
.header {
  padding: 0;
  text-align: center;
  color: #fff;
  font-size: 25px;
  line-height: 60px;
  background-color: #35495e;
}
.header img {
  vertical-align: middle;
  display: block;
  margin: auto;
  transform: translatey(25%);
}
.header a {
  color: #fff;
}
.aside {
  background-color: aliceblue;
}
.main {
  background-color: #f0f9eb;
}
.container, .main, .aside {
  height: 100%;
}
.el-submenu__title i {
  color: #41b883;
}
</style>
