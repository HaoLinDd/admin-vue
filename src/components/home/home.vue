<template>
  <div>
    <h1>我是一个主页</h1>
    <div class="block">
      <span class="demonstration">区分颜色</span>
      <el-rate
        v-model="value2"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
      <el-rate
        v-model="value3"
        show-text>
      </el-rate>
    </div>
    <router-view></router-view>
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
h1 {
color: teal;
}
</style>
