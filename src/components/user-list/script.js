export default {
  created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      // 默认初始页为第一页
      currentPage: 1,
      total: 0,
      searchText: '',
      dialogFormVisible: false,
      // 编辑对话框
      editDialogForm: false,
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
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editRoleDialog: false,
      roles: [],
      editRoleUser: {
        username: '',
        rid: 0
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    /**
     * 显示当前页1
     */
    handleCurrentChange (page) {
      this.currentPage = page
      // 在页码改变的时候，请求加载该页码对应的数据
      this.loadUsersByPage(page)
    },
    /**
     * 更新数据
     */
    async loadUsersByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: 2,
          query: this.searchText
        }
      })
      const { data } = res.data
      if (res.status === 200) {
        this.tableData = data.users
        this.total = data.total
      }
    },
    /**
     * 搜索用户
     */
    handelSearch () {
      this.loadUsersByPage(1)
    },
    /**
     * 添加用户
     */
    async handleAddUser () {
      const res = await this.$http({
        method: 'post',
        url: '/users',
        data: this.addUserForm
      })
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
        this.loadUsersByPage(this.currentPage)
      }
    },
    /**
     * 处理用户状态
     */
    async handelChangeState (item) {
      const res = await this.$http({
        url: `/users/${item.id}/state/${item.mg_state}`,
        method: 'put'
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${item.mg_stauts ? '启用' : '禁用'}成功`
        })
      }
    },
    /**
     *  删除用户
     */
    handleDelete (item) {
      this.$confirm('确定要删除用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http({
          url: `/users/${item.id}`,
          method: 'delete'
        })
        const { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '已成功删除'
          })
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 编辑用户
     */
    async handelEditUser () {
      const { id, email, mobile } = this.editUserForm
      const res = await this.$http({
        url: `/users/${id}`,
        method: 'put',
        data: {
          email,
          mobile
        }
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.editDialogForm = false
        this.loadUsersByPage(this.currentPage)
      }
    },
    /**
     * 显示编辑用户对话框
     */
    async handelShowEditUser (item) {
      const res = await this.$http({
        url: `/users/${item.id}`,
        method: 'get'
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.editUserForm = data
        this.editDialogForm = true
      }
    },
    /**
     * 编辑用户角色
     */
    async handelEditRole () {
      const { id, rid } = this.editRoleUser
      const res = await this.$http({
        url: `users/${id}/role`,
        method: 'put',
        data: {
          rid
        }
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '分配角色成功'
        })
        this.editRoleDialog = false
      }
    },
    /**
     * 处理显示编辑用户分配角色对话框
     */
    async handelShowEditRole (user) {
      const userRes = await this.$http({
        url: `/users/${user.id}`
      })
      if (userRes.data.meta.status === 200) {
        this.editRoleUser = userRes.data.data
      }
      const res = await this.$http({
        url: `/roles`,
        method: 'get'
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.roles = data
        this.editRoleDialog = true
      }
    }
  }
}
