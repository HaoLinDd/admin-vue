import axios from 'axios'

export default {

  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handelLogin () {
      axios.post('http://localhost:8888/api/private/v1/login', this.loginFrom)
        .then(res => {
          const { data, meta } = res.data
          const { msg, status } = meta
          if (status === 200) {
            window.alert(data)
          } else if (status === 400) {
            window.alert(msg)
          }
        })
    }
  }
}
