import axios from 'axios'

export default {
  created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      total: 0
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
          pagesize: 2
        }
      })
        .then(res => {
          const { data, meta } = res.data
          if (res.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    }
  }
}
