<template>
    <div class="wrapper">
        <a-tabs type="card" @change="callback" :defaultActiveKey='defaultActiveKey'>
            <a-tab-pane key="1" tab="指标管理">
                <indicator/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="工作职称类别管理">
                <work-class/>
            </a-tab-pane>
            <a-tab-pane key="3" tab="不良事故管理">
                <accident/>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
  import Indicator from './component/indicator'
  import WorkClass from './component/workClass'
  import Accident from './component/accident'

  export default {
    name: "manageIndicator",
    components: {
      Indicator,
      WorkClass,
      Accident
    },
    data() {
      return {
        defaultActiveKey: '1'
      }
    },
    created() {
      const {tab} = this.$route.query
      if (tab) {
        this.defaultActiveKey = tab
      }
    },
    methods: {
      callback(key) {
        console.log(key);
        this.$router.replace({
          query: {
            tab: key
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100%;
        /*height: 100%;*/
        display: flex;
        flex-direction: column;
        background-color: #ECF0F5;
    }

    .wrapper {
        overflow: hidden;
    }

    .wrapper > .ant-tabs-card > .ant-tabs-content {
        margin-top: -16px;
    }

    .wrapper > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .wrapper > .ant-tabs-card > .ant-tabs-bar {
        border-color: #fff;
        margin-bottom: 10px;
    }

    .wrapper > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
    }

    .wrapper > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
        border-color: #fff;
        background: #fff;
    }
</style>