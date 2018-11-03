export default {
  created () {
    this.loadCategories()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadCategories () {
      const res = await this.$http.get('/categories')
      console.log(res.data)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  }
}
