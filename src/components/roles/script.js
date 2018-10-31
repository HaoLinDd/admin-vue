export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData: [],
      rightDialogVisible: false,
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      currentRighting: null,
      defaultChecked: []
    }
  },
  methods: {
    /**
     * 加载用户角色列表
     */
    async loadRoles () {
      const res = await this.$http.get('/roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    },
    /**
     * 显示角色授权对话框
     */
    async showRightDialog (role) {
      this.currentRighting = role
      const tmp = []
      role.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            tmp.push(level3.id)
          })
        })
      })
      this.defaultChecked = tmp
      const res = await this.$http.get('/rights/tree')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.treeData = data
        this.rightDialogVisible = true
      }
    },
    async handleEditRight () {
      let checkedNodes = this.$refs['rightTree'].getCheckedNodes()
      checkedNodes = checkedNodes.concat(this.$refs['rightTree'].getHalfCheckedNodes())
      const tmp = []
      checkedNodes.forEach(item => {
        tmp.push(item.id)
      })
      const res = await this.$http({
        url: `/roles/${this.currentRighting.id}/rights`,
        method: 'post',
        data: {
          rids: tmp.join(',')
        }
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.rightDialogVisible = false
        this.loadRoles()
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }
    },
    async handleDeleteRight (role, right) {
      const res = await this.$http({
        url: `/roles/${role.id}/rights/${right.id}`,
        method: 'delete'
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        role.children = data
        this.$message({
          type: 'success',
          message: '删除角色成功'
        })
      }
    }
  }
}
