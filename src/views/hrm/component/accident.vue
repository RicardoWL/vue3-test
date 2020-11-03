<template>
    <div class="accident-wrapper">
        <a-button type="primary" @click="addAccident()">新增不良事故</a-button>
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
                        <a-button type="primary" @click="editAccident(record)" size="small">编辑</a-button>
                        <a-popconfirm
                                title="确定要删除这条不良事故吗?"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="deleteAccident(record)"
                        >
                            <a-button type="danger" size="small" :loading="record.loading">删除</a-button>
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </a-table>
        </div>
    </div>

    <!-- 新增或编辑不良事故 -->
    <a-modal v-model:visible="visible" :title="title" :confirmLoading="confirmLoading"
             width="800px"
             @ok="handleOk" @cancel="handleCancel">
        <a-spin :spinning="spinning">
            <a-form :model="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-form-item label="标题">
                    <a-input v-model:value="form.name" placeholder="请输入标题"/>
                </a-form-item>
                <a-form-item label="内容">
                    <div class="content-list">
                        <div class="content-item">
                            <div class="content-item_content level">事故等级</div>
                            <div class="content-item_content desc">事故描述</div>
                            <div class="content-item_content percent">扣除系数</div>
                        </div>
                        <div class="content-item">
                            <div class="content-item_content level">一级</div>
                            <div class="content-item_content desc">
                                <a-textarea v-model:value="form.content1" :rows="4" placeholder="请输入事故描述" />
                            </div>
                            <div class="content-item_content percent">
                                <a-input v-model:value="form.percent1" />
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-item_content level">二级</div>
                            <div class="content-item_content desc">
                                <a-textarea v-model:value="form.content2" :rows="4" placeholder="请输入事故描述" />
                            </div>
                            <div class="content-item_content percent">
                                <a-input v-model:value="form.percent2" />
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-item_content level">三级</div>
                            <div class="content-item_content desc">
                                <a-textarea v-model:value="form.content3" :rows="4" placeholder="请输入事故描述" />
                            </div>
                            <div class="content-item_content percent">
                                <a-input v-model:value="form.percent3" />
                            </div>
                        </div>
                    </div>
                </a-form-item>
            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
  import {getAccidentList,updateAccident,deleteAccident,getAccidentItem} from "../../../api";
  export default {
    name: "accident",
    data() {
      return {
        visible: false,
        title: '',
        loading: false,
        spinning: false,
        confirmLoading: false,
        itemList: [],
        selectedId: '',
        form: {
          name: '',
          content1: '',
          content2: '',
          content3: '',
          percent1: '',
          percent2: '',
          percent3: '',
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
        getAccidentList(body)
          .then((res) => {
            if (res.code === 0) {
              this.itemList = res.data.data.map((item) => {
                item.loading = false
                return item
              })
            }
            this.loading = false
          })
          .catch((e) => {
            console.log(e)
            this.$message.error("获取数据失败")
            this.loading = false
          })
      },
      getItemDetail() {
        this.spinning = true
        const body = {
          id: this.selectedId
        }
        getAccidentItem(body)
          .then((res) => {
            if (res.code === 0) {
              console.log(res)
              const {data} = res
              this.form = {
                name: data.name,
                content1: data.content1,
                content2: data.content2,
                content3: data.content3,
                percent1: data.percent1,
                percent2: data.percent2,
                percent3: data.percent3,
              }
            }
            this.spinning = false
          })
          .catch((e) => {
            console.log(e)
            this.spinning = false
          })
      },
      handleOk() {
        if (!this.form.name) {
          return this.$message.warning("请输入标题")
        }
        if (!this.form.content1 ||
          !this.form.content2 ||
          !this.form.content3 ||
          !this.form.percent1 ||
          !this.form.percent2 ||
          !this.form.percent3) {
          return this.$message.warning("请完善不良事故内容")
        }
        this.confirmLoading = true
        const body = {
          id: this.selectedId,
          name: this.form.name,
          content1: this.form.content1,
          content2: this.form.content2,
          content3: this.form.content3,
          percent1: this.form.percent1,
          percent2: this.form.percent2,
          percent3: this.form.percent3,
        }
        updateAccident(body)
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
        this.form = {
          name: '',
          content1: '',
          content2: '',
          content3: '',
          percent1: '',
          percent2: '',
          percent3: '',
        }
        this.selectedId = ''
      },
      addAccident() {
        this.visible = true
        this.title = '新增不良事故'
      },
      editAccident(item) {
        this.visible = true
        this.title = '编辑【' + item.name + '】'
        this.selectedId = item.id
        this.getItemDetail()
      },
      deleteAccident(item) {
        item.loading = true
        const body = {
          id: item.id
        }
        deleteAccident(body)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功")
              this.getItemList()
            }
            item.loading = false
          })
          .catch((e) => {
            console.log(e)
            this.$message.error("删除失败")
            item.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.accident-wrapper{
    .data-content {
        margin-top: 20px;

        .ant-btn + .ant-btn {
            margin-left: 10px;
        }
    }
}

.content-list{
    display: flex;
    flex-direction: column;
    .content-item{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .content-item_content{
            text-align: center;
            input{
                width: 60%;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }
        }
        .level{
            flex: 1;
        }
        .desc{
            flex: 5;
        }
        .percent{
            flex: 1;
        }
    }
    .content-item+.content-item{
        margin-top: 20px;
    }
}
</style>