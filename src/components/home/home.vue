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
            :router="true"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            background-color="#35495e"
            text-color="#fff"
            active-text-color="#41b883">
            <el-submenu :index="level1.path" v-for="level1 in menus" :key="level1.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ level1.authName }}</span>
              </template>
              <el-menu-item
                :index="'/' + level2.path"
                v-for="level2 in level1.children"
                :key="level2.id">
                {{level2.authName}}
              </el-menu-item>
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
  created () {
    this.loadMenus()
  },
  data () {
    return {
      menus: []
    }
  },
  components: {
    Login
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    /**
     * 登录
     */
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
    },
    /**
     * 加载菜单权限列表
     */
    async loadMenus () {
      const res = await this.$http({
        url: `/menus`,
        methods: 'get'
      })
      const { meta: { status }, data } = res.data
      if (status === 200) {
        this.menus = data
      }
    }
  }
}
</script>

<style>
.header {
  padding: 0;
  text-align: center;
  color: #fff;
  font-size: 26px;
  line-height: 60px;
  background-color: #35495e;
  letter-spacing: 2px;
}
.header img {
  vertical-align: middle;
  display: block;
  margin: auto;
  transform: translatey(25%);
}
.header a {
  color: #fff;
  font-size: 24px;
  text-decoration: transparent;
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
