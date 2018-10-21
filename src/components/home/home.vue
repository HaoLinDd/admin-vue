<template>
  <div>
    <h1>我是一个主页</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from '../login/login'

export default {
  components: {
    Login
  }

}
</script>

<style>
h1 {
color: teal;
}
</style>
