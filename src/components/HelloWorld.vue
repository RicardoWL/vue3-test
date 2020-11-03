<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a-button type='primary' @click="changeNum">test</a-button>
    <span>{{num}}</span>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    console.log(props.msg)

    const num = ref(0)
    return {
      num
    }
  },
  mounted() {
    console.log(this.num)
  },
  methods: {
    changeNum() {
      this.num++
      console.log(this.num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
