<template>
    <div class="workClass-wrapper">
        <a-button type="primary" @click="addWorkClass()">新增类别</a-button>
        <a-button shape="circle" style="margin-left: 15px" @click="getItemList">
            <template v-slot:icon>
                <IconFont type="icon-sync"/>
            </template>
        </a-button>
        <div class="data-content">
            <a-table :data-source="itemList" rowKey="id" size="small" :pagination="false" :loading="loading">
                <a-table-column key="name" title="指标名称" data-index="name"/>
                <a-table-column key="action" title="操作" width="200px">
                    <template v-slot="{ record }">
                        <a-button type="primary" @click="editWorkClass(record)" size="small">编辑</a-button>
                        <a-popconfirm
                                title="确定要删除这条工作类别吗?"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="deleteWorkClass(record)"
                        >
                            <a-button type="danger" size="small">删除</a-button>
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </a-table>
        </div>
    </div>

    <!-- 新增或编辑工作类别 -->
    <a-modal v-model:visible="visible" :title="title" :confirmLoading="confirmLoading"
             @ok="handleOk" @cancel="handleCancel">
        <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item label="类别名称">
                <a-input v-model:value="form.name" placeholder="请输入类别名称"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
  import {getWorkClassList,updateWorkClass,deleteWorkClass} from "../../../api";

  export default {
    name: "workClass",
    data() {
      return {
        visible: false,
        title: '',
        loading: false,
        confirmLoading: false,
        itemList: [],
        selectedId: '',
        form: {
          name: ''
        }
      }
    },
    created() {
      this.getItemList()
    },
    mounted() {
    },
    methods: {
      getItemList() {
        this.loading = true
        const body = {
          type: 1
        }
        getWorkClassList(body)
          .then((res) => {
            if (res.code === 0) {
              this.itemList = res.data
            }
            this.loading = false
          })
          .catch((e) => {
            console.log(e)
            this.$message.error("获取数据失败")
            this.loading = false
          })
      },
      handleOk() {
        if (!this.form.name) {
          return this.$message.warning("请输入类别名称")
        }
        this.confirmLoading = true
        const body = {
          id: this.selectedId,
          name: this.form.name
        }
        updateWorkClass(body)
          .then((res) => {
            if (res.code === 0) {
              this.visible = false
              this.$message.success(this.title.substr(0,2)+'成功')
              this.handleCancel()
              this.getItemList()
            }
            this.confirmLoading = false
          })
          .catch((e) => {
            console.log(e)
            this.confirmLoading = false
          })
      },
      handleCancel() {
        this.form.name = ''
        this.selectedId = ''
      },
      addWorkClass() {
        this.visible = true
        this.title = '新增工作类别'
      },
      editWorkClass(item) {
        this.visible = true
        this.title = '编辑工作类别'
        this.selectedId = item.id
        this.form.name = item.name
      },
      deleteWorkClass(item) {
        const body = {
          id: item.id
        }
        deleteWorkClass(body)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功")
              this.getItemList()
            }
          })
          .catch((e) => {
            console.log(e)
            this.$message.error("删除失败")
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .workClass-wrapper {
        .data-content {
            margin-top: 20px;

            .ant-btn + .ant-btn {
                margin-left: 10px;
            }
        }
    }
</style>