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
    handelLogin () {
      axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          const { data, meta } = res.data
          const { msg, status } = meta
          window.localStorage.setItem('token', data.token)
          if (status === 200) {
            this.$router.push('/')
          } else if (status === 400) {
            window.alert(msg)
          }
        })
    },
    resetForm (formName) {
      this.$refs['loginFrom'].resetFields()
    }
  }
}
