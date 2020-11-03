<template>
    <div class="indicator-wrapper">
        <div class="indicator-header">
            <div class="filter-block">
                <div class="filter-block-item">
                    <span>指标类别筛选：</span>
                    <span v-for="type in typeList" :key="type.value"
                          :class="[{'selected': typeIndex === type.value}, 'filter-item']"
                          @click="changeType(type.value)">{{type.name}}</span>
                </div>
                <div class="filter-block-item">
                    <span>分类筛选：</span>
                    <span :class="[{'selected': classIndex === '0'}, 'filter-item']"
                          @click="changeClass('0')">全部</span>
                    <span v-for="type in classList" :key="type.id"
                          :class="[{'selected': classIndex === type.id}, 'filter-item']"
                          @click="changeClass(type.id)">{{type.name}}</span>
                </div>
            </div>
            <a-button type="primary" @click="addIndicator()">新增指标</a-button>
        </div>
        <div class="data-content">
            <a-table :data-source="itemList" rowKey="id" size="small" :pagination="false" :loading="loading">
                <a-table-column key="name" title="指标名称" data-index="name" width="30%"/>
                <a-table-column key="code_name" title="指标描述" data-index="code_name"/>
                <a-table-column key="class_name" title="类别" data-index="class_name" width="30%"/>
                <a-table-column key="action" title="操作" width="200px">
                    <template v-slot="{ record }">
                        <a-button type="primary" @click="editIndicator(record)" size="small">编辑</a-button>
                        <a-popconfirm
                                title="确定要删除这条指标吗?"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="deleteIndicator(record)"
                        >
                            <a-button type="danger" size="small">删除</a-button>
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </a-table>
        </div>
        <div class="footer" v-show="count.count > 0">
            <a-pagination v-model:current="page" v-model:pageSize="pageSize" :total="parseInt(count.count)"
                          @change="getItemList"></a-pagination>
        </div>
    </div>

    <!-- 新增或编辑指标 -->
    <a-modal v-model:visible="visible" :title="title" :confirmLoading="confirmLoading"
             width="800px"
             @ok="handleOk" @cancel="handleCancel">
        <a-form :model="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-form-item label="指标名称">
                <a-input v-model:value="form.name" placeholder="请输入指标名称"/>
            </a-form-item>
            <a-form-item label="指标描述">
                <a-input v-model:value="form.code_name" placeholder="请输入指标描述"/>
            </a-form-item>
            <a-form-item label="类别">
                <a-select v-model:value="form.class_id" placeholder="请选择类别">
                    <template v-if="typeIndex === '1'" v-slot:dropdownRender="{ menuNode: menu }">
                        <v-nodes :vnodes="menu"/>
                        <a-divider style="margin: 4px 0;"/>
                        <div
                                style="padding: 4px 8px; cursor: pointer;"
                                @mousedown="e => e.preventDefault()"
                                @click="addWorkClass"
                        >
                            <IconFont type="icon-folder-add"/>
                            新增类别
                        </div>
                    </template>
                    <a-select-option v-for="item in classList" :key="item.id" :value="item.id">{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="考核标准">
                <a-textarea v-model:value="form.content" :rows="10"/>
                <span class="textarea-tips">
                    请输入考核标准，可替换字段用 <span style="color: #1890ff">{num}</span> 代替
                </span>
            </a-form-item>
        </a-form>
    </a-modal>

    <!-- 新增工作类别 -->
    <a-modal v-model:visible="visible2" title="新增工作类别" :confirmLoading="confirmLoading2"
             @ok="handleOk2" @cancel="handleCancel2">
        <a-form :model="form2" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item label="类别名称">
                <a-input v-model:value="form2.name" placeholder="请输入类别名称"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
  import {
    getIndicatorClassList,
    getIndicatorItemList,
    updateIndicator,
    deleteIndicator,
    updateWorkClass
  } from "../../../api";
  import {message} from 'ant-design-vue'

  export default {
    name: "indicator",
    components: {
      VNodes: (_, {attrs}) => {
        return attrs.vnodes;
      }
    },
    data() {
      return {
        loading: false,
        visible: false,
        confirmLoading: false,
        visible2: false,
        confirmLoading2: false,
        title: '',
        typeIndex: '1',
        typeList: [
          {value: '1', name: '工作称职指标'},
          {value: '2', name: '附加指标'}
        ],
        classIndex: '0',
        classList: [],
        itemList: [],
        selectedItem: null,
        count: {
          count: 0,
          page: 1,
          pageCount: 2,
          pageSize: 20,
        },
        page: 1,
        pageSize: 20,
        form: {
          name: '',
          code_name: '',
          class_id: [],
          content: ''
        },
        form2: {
          name: ''
        }
      }
    },
    setup() {

    },
    created() {
      this.getClassList()
      this.getItemList()
    },
    mounted() {
    },
    methods: {
      // 修改类别
      changeType(value) {
        this.typeIndex = value
        this.classIndex = '0'
        this.page = 1
        this.getClassList()
        this.getItemList()
      },
      changeClass(value) {
        this.classIndex = value
        this.page = 1
        this.getItemList()
      },
      // 获取分类列表
      getClassList() {
        const body = {
          type: this.typeIndex
        }
        getIndicatorClassList(body)
          .then((res) => {
            // console.log(res)
            if (res.code === 0) {
              this.classList = res.data
            }
          })
          .catch((e) => {
            console.log(e)
          })
      },
      // 获取指标列表
      getItemList() {
        this.loading = true
        const body = {
          type: this.typeIndex,
          page: this.page,
          pageSize: this.pageSize,
          class_id: this.classIndex
        }
        getIndicatorItemList(body)
          .then((res) => {
            // console.log(res)
            if (res.code === 0) {
              const {count, data} = res.data
              this.itemList = data
              this.count = count
            }
            this.loading = false
          })
          .catch((e) => {
            console.log(e)
            this.loading = false
          })
      },
      // 处理弹出框确认事件
      handleOk() {
        if (!this.form.name) {
          return this.$message.warning("请输入指标名称")
        }
        if (!this.form.code_name) {
          return this.$message.warning("请输入指标描述")
        }
        if (this.form.class_id.length===0) {
          return this.$message.warning("请选择类别")
        }
        if (!this.form.content) {
          return this.$message.warning("请输入考核标准")
        }
        // 进行指标新增或编辑事件
        this.confirmLoading = true
        const body = {
          id: this.selectedItem ? this.selectedItem.id : '',
          type: this.typeIndex,
          name: this.form.name,
          code_name: this.form.name,
          class_id: this.form.class_id,
          content: this.form.content
        }
        updateIndicator(body)
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.visible = false
              this.$message.success(this.title.substr(0, 2) + '成功')
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
      // 处理弹出框取消事件
      handleCancel() {
        this.form = {
          name: '',
          code_name: '',
          class_id: [],
          content: ''
        }
        this.selectedItem = null
      },
      // 新增指标
      addIndicator() {
        this.visible = true
        this.title = '新增' + this.typeList[this.typeIndex - 1].name
        this.form.class_id = this.classIndex === '0' ? [] : this.classIndex
      },
      // 修改指标
      editIndicator(item) {
        this.selectedItem = item
        this.visible = true
        this.title = '编辑【' + item.name + '】'
        this.form = {
          name: item.name,
          code_name: item.code_name,
          class_id: item.class_id,
          content: item.content
        }
      },
      // 删除指标
      deleteIndicator(item) {
        const body = {
          id: item.id
        }
        deleteIndicator(body)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功")
              this.getItemList()
            }
          })
          .catch((e) => {
            console.log(e)
            message.error("删除失败")
          })
      },
      addWorkClass() {
        this.visible2 = true
      },
      handleOk2() {
        this.confirmLoading2 = true
        const body = {
          name: this.form2.name
        }
        updateWorkClass(body)
          .then((res) => {
            if (res.code === 0) {
              this.visible2 = false
              this.$message.success('新增成功')
              this.handleCancel2()
              this.getClassList()
            }
            this.confirmLoading2 = false
          })
          .catch((e) => {
            console.log(e)
            this.confirmLoading2 = false
          })
      },
      handleCancel2() {
        this.form2.name = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    .indicator-wrapper {
        display: flex;
        flex-direction: column;

        .indicator-header {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-end;

            .filter-block {
                font-size: 16px;
                flex: 1;

                .filter-block-item {
                    .filter-item {
                        cursor: pointer;
                        font-size: 15px;
                        margin-left: 15px;
                    }

                    .selected {
                        color: #03a9f4;
                    }
                }

                .filter-block-item + .filter-block-item {
                    margin-top: 12px;
                }
            }
        }

        .data-content {
            margin-top: 20px;
            flex: 1;
            overflow: auto;

            .ant-btn + .ant-btn {
                margin-left: 10px;
            }
        }

        .footer {
            margin: 20px 0;
            text-align: center;
        }
    }

    .textarea-tips {
        position: absolute;
        bottom: -27px;
        left: 6px;
        line-height: 20px;
        font-size: 12px;
    }
</style>