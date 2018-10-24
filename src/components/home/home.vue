<template>
  <div class="container">
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            logo图标
            <!-- <img src="./logo.png" alt="黑马程序员"> -->
          </el-col>
          <el-col :span="16">电商后台管理系统</el-col>
          <el-col :span="4">
            <a href="#">退出</a>
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
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
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
          main
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style>
.header {
  padding: 0;
  background-color: #545c64;
}
.aside {
  background-color: aliceblue;
}
.main {
  background-color: bisque;
}
.container, .main, .aside {
  height: 100%;
}
</style>
