import axios from 'axios'

export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  created () {
    axios.get('http://localhost:8888/api/private/v1/users', {
      headers: {
        Authorization: window.localStorage.getItem('token')
      },
      params: {
        pagenum: 1,
        pagesize: 5
      }
    })
      .then(res => {
        console.log(res)
        const { data, meta } = res.data
        if (res.status === 200) {
          this.tableData = data.users
        }
      })
  }
}
