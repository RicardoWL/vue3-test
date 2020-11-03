<template>
    <el-container id="components-layout-demo-custom-trigger">
        <Sidebar/>
        <el-container>
            <el-header class="header" :height="'45px'">
                <div class="left-box">
                    <div class="collapse-btn" @click="collapse">
                        <menu-unfold-outlined v-if="isCollapse" class="trigger"/>
                        <menu-fold-outlined v-else class="trigger"/>
                    </div>
                    <a-breadcrumb class="breadcrumb">
<!--                        <a-breadcrumb-item><router-link to='/'>首页</router-link></a-breadcrumb-item>-->
                        <a-breadcrumb-item v-for="(item, index) in levelList" :key="index">{{item.meta.title}}
                        </a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
                <div class="right-info">
                    <a-dropdown :trigger="['click']">
                        <span style="cursor: pointer">之后填充姓名+头像</span>
                        <template v-slot:overlay>
                            <a-menu>
                                <a-menu-item key="3">
                                    退出登录
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </el-header>
<!--            <el-main class="content">-->
<!--                <router-view/>-->
<!--            </el-main>-->
            <section class="app-main">
                <router-view />
            </section>
        </el-container>
    </el-container>
</template>

<script>
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import Sidebar from './Siderbar'

  export default {
    name: "layout",
    components: {
      Sidebar,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    data() {
      return {
        collapsed: false,
        levelList: []
      };
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      // 折叠侧边栏
      collapse() {
        this.$store.dispatch('toggleSideBar')
      },
      getBreadcrumb() {
        const matched = this.$route.matched.filter((item) => !!item.name)
        this.levelList = matched
        if (matched.length === 1 && matched[0].path === '/') this.levelList = []
      },
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      isCollapse() {
        return !this.$store.getters.sidebar.opened
      },
    }
  }
</script>

<style lang="scss" scoped>
    #components-layout-demo-custom-trigger {
        height: 100vh;
    }

    .header {
        background: #fff;
        padding: 0;
        display: flex;
        justify-content: space-between;
        height: 45px;

        .left-box {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .breadcrumb {
                line-height: 40px;
            }

            .collapse-btn {
                line-height: 45px;
                cursor: pointer;

                .trigger {
                    font-size: 18px;
                    padding: 0 14px;
                    transition: color 0.3s;
                }

                &:hover {
                    .trigger {
                        color: #1890ff;
                    }
                }
            }
        }

        .right-info {
            padding: 0 14px;
            line-height: 45px;
        }
    }

    .content {
        margin: 15px 14px;
        padding: 10px 14px;
        background: #fff;
    }
    .app-main {
        /* 50= navbar  50  */
        height: calc(100vh - 45px);
        width: 100%;
        position: relative;
        overflow: auto;
        padding: 18px;
        box-sizing: border-box;
    }
</style>