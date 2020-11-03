<template>
<!--    <template v-if="!item.hidden">-->
<!--        <a-menu-item v-if="!item.children"-->
<!--                :key="item.key">-->
<!--            <router-link :to="resolvePath(item.path)">-->
<!--                <IconFont v-if="item.iconType" :type="item.iconType"/>-->
<!--                <span>{{item.name}}</span>-->
<!--            </router-link>-->
<!--        </a-menu-item>-->
<!--        <a-sub-menu v-else-->
<!--                    :key="item.key">-->
<!--            <template v-slot:title>-->
<!--                <IconFont v-if="item.iconType" :type="item.iconType"/>-->
<!--                <span>{{item.name}}</span>-->
<!--            </template>-->
<!--            <side-item v-for="route in item.children" :key="route.key" :item="route"-->
<!--                          :base-path="resolvePath(item.path)"></side-item>-->
<!--        </a-sub-menu>-->
<!--    </template>-->

    <div class="menuWrapper">
        <template
                v-if="!item.hidden">

            <router-link v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
                         :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <template v-slot:title>
<!--                        <IconFont v-if="item.iconType" :type="item.iconType"/>-->
                        <i :class="[item.iconCls, 'icon']"></i>
                        <span>{{item.meta.title}}</span>
                    </template>
                </el-menu-item>
            </router-link>

            <el-submenu v-else
                        :index="item.path"
                        popper-class="sidebar-submenu__vertical">
                <template v-slot:title>
<!--                    <IconFont v-if="item.iconType" :type="item.iconType"/>-->
                    <i :class="[item.iconCls, 'icon']"></i>
                    <span>{{item.meta.title}}</span>
                </template>

                <side-item v-for="route in item.children" :key="route.path" :item="route" :base-path="resolvePath(route.path)"></side-item>
            </el-submenu>

        </template>
    </div>
</template>

<script>
  import path from 'path'
  export default {
    name: "SideItem",
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(p) {
        return path.resolve(this.basePath, p)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .menuWrapper {
        .icon {
            font-size: 15px;
            margin-right: 19px;
            width: 15px;
            vertical-align: middle;
            text-align: center;
        }
    }
</style>

<style lang="scss">
    .sidebar-submenu__vertical {
        .el-menu {
            padding: 0;
        }
        .el-menu-item {
            &:focus,
            &:hover {
                color: #fff !important;
            }
        }
    }
</style>