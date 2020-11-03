<template>
    <ConfigProvider :locale="zhCN">
        <router-view />
    </ConfigProvider>
</template>

<script>
  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  export default {
    name: 'App',
    components: { ConfigProvider },
    data() {
      return {
        zhCN
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ecf0f5;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #d5d5d5;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #d5d5d5;
}
</style>
