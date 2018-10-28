export default {
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRights () {
      const res = await this.$http.get('/rights/list')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  }
}
