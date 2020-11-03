<template>
    <div class="el-aside sidebar"
         :class="{'sidebar--collapse': isCollapse}">
        <router-link to='/' class="logo">
            <span v-show="!isCollapse" style="white-space: nowrap">品智科技后台</span>
            <img v-show="isCollapse" src="../../assets/logo.png" alt="品智科技后台">
        </router-link>

        <div class="scrollbar">
            <div class="scrollbar-content">
                <el-menu class="menu"
                         mode="vertical"
                         background-color="#272b2e"
                         text-color="#999"
                         active-text-color="#fff"
                         :default-active="$route.path"
                         :collapse="isCollapse">
                    <side-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></side-item>
                </el-menu>
            </div>
        </div>
<!--        <div class="scrollbar">-->
<!--            <div class="scrollbar-content">-->
<!--                <a-menu theme="dark" mode="inline"-->
<!--                        v-model:selectedKeys="selectedKeys" :openKeys="openedKeys"-->
<!--                        @select="menuChange" @openChange="subMenuOpen">-->
<!--                    <a-menu-item-group key="g1">-->
<!--                        <template v-slot:title><span>管理</span></template>-->
<!--                    </a-menu-item-group>-->
<!--                    <side-item v-for="route in routes" :key="route.key" :item="route"-->
<!--                               :base-path="route.path"></side-item>-->
<!--                </a-menu>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
  import iconList from '../../assets/iconList'
  import SideItem from "./SideItem";

  export default {
    name: "index",
    components: {
      SideItem
    },
    data() {
      return {
        collapsed: false,
        // selectedKeys: [1],
        iconList,
        openKeys: [],
      }
    },
    methods: {
      menuChange({selectedKeys}) {
        console.log(selectedKeys)
      },
      subMenuOpen(openKeys) {
        console.log(openKeys)
        this.openKeys = openKeys
      }
    },
    computed: {
      openedKeys() {
        let path = this.$route.path
        let pathOpen = path.split('/')
        pathOpen.pop()
        const subOpen = pathOpen.join('.')
        return this.openKeys.concat(subOpen)
      },
      selectedKeys() {
        return [this.$route.path.replace(/\//g, '.')]
      },
      routes() {
        return this.$store.getters.addRouters
      },
      isCollapse() {
        return !this.$store.getters.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
    .scrollbar {
        overflow: hidden;
        height: calc(100% - 75px);
    }

    .scrollbar-content {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-right: -10px; /* 隐藏右侧滚动条 */
        margin-bottom: -10px; /* 隐藏底部滚动条 */
    }

    .menu{
        width: 100%;
        border: none;
    }
    .logo {
        display: block;
        height: 32px;
        /*background: rgba(255, 255, 255, 0.2);*/
        margin: 16px;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        cursor: pointer;

        img {
            width: 32px;
        }
    }
</style>
<style lang="scss" scoped>
    .sidebar {
        position: relative;
        z-index: 999;
        width: 200px !important;
        height: 100%;
        background: #272b2e;
        overflow: hidden;
        transition: all 0.3s;
        &.sidebar--collapse {
            width: 55px !important;
            .header {
                padding: 0 18px;
                .title {
                    height: 0;
                    width: 0;
                    margin-left: 0px;
                    overflow: hidden;
                    visibility: hidden;
                }
            }
        }
        /*侧边栏顶部logo*/
        .header {
            height: 83px;
            padding: 0 18px;
            line-height: 83px;
            background: #272b2e;
            color: #fff;
            white-space: nowrap;
            .logo {
                display: inline-block;
                font-size: 21px;
                vertical-align: middle;
            }
            .title {
                display: inline-block;
                margin-left: 9px;
                font-size: 16px;
                vertical-align: middle;
            }
        }
    }
    .menu-scrollbar {
        height: calc(100% - 83px);
    }
    .menu {
        width: 100%;
        border: none;
    }
</style>

<style lang="scss">
    .sidebar {
        /*折叠时优先隐藏子菜单*/
        .el-menu--collapse,
        &.sidebar--collapse {
            span,
            .el-submenu__icon-arrow,
            .el-menu--inline {
                height: 0;
                width: 0;
                overflow: hidden;
                visibility: hidden;
            }
        }
        .el-menu--collapse {
            .el-submenu {
                &.is-opened {
                    i {
                        color: #fff;
                    }
                }
            }
        }
        /*滚动条颜色*/
        .el-scrollbar__thumb {
            background: transparent;
        }
        .el-submenu {
            &.is-active {
                .el-submenu__title,
                [slot='title'],
                i {
                    color: #fff;
                }
            }
        }
        .el-menu-item,
        .el-submenu__title {
            &:focus,
            &:hover {
                color: #fff !important;
                i {
                    color: #fff;
                }
            }
        }
    }
    .sidebar-scrollbar-wrapper {
        overflow-x: hidden;
    }
</style>