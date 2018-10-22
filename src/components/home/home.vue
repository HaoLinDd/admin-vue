<template>
  <div class="container">
    <el-container class="container">
      <el-header class="header">Header</el-header>
      <el-container class="container">
        <el-aside width="200px" class="aside">Aside</el-aside>
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
  }

}
</script>

<style>
.header {
  background-color: teal;
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
