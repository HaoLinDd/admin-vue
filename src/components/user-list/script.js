import axios from 'axios'

export default {
  created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      total: 0,
      searchText: '',
      dialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码为 3 - 16 位长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleCurrentChange (page) {
      // 在页码改变的时候，请求加载该页码对应的数据
      this.loadUsersByPage(page)
    },
    loadUsersByPage (page) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: {
          Authorization: window.localStorage.getItem('token')
        },
        params: {
          pagenum: page,
          pagesize: 2,
          query: this.searchText
        }
      })
        .then(res => {
          const { data } = res.data
          if (res.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    },
    // 搜索用户
    handelSearch () {
      this.loadUsersByPage(1)
    },
    // 添加用户
    handleAddUser () {
      axios({
        method: 'post',
        url: 'http://localhost:8888/api/private/v1/users',
        data: this.addUserForm,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        const { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          // 关闭对话框
          this.dialogFormVisible = false
          // 清空表单
          this.$refs['form'].resetFields()
        }
      })
    }
  }
}
