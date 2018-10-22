import axios from 'axios'

export default {

  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handelLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            const { data, meta } = res.data
            const { msg, status } = meta
            if (status === 200) {
              window.localStorage.setItem('token', data.token)
              this.$router.push('/')
              this.$message({
                showClose: true,
                center: true,
                type: 'success',
                message: msg
              })
            } else if (status === 400) {
              this.$message.error({
                message: msg,
                center: true
              })
            }
          })
      })
    }
  }
}
