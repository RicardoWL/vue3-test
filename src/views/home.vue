<template>
  <div class='wrapper' :class='{"preview-mode": !previewMode}'>
    <div class="left-box">
      <div class="first-box box" v-show=previewMode>
        <div class="title">
          <span class="title-text">人员列表</span>
          <ABadge class="handle-btn" :count="pendingList.length" :number-style="{fontSize: '12px'}">
            <div class="btn" :class="{'checked': checked}" @click="handlePending">
              待处理
            </div>
          </ABadge>
        </div>
        <a-input v-model:value="searchKey" placeholder="搜索">
          <template v-slot:prefix><SearchOutlined /></template>
        </a-input>
        <div class="tree-box">
          <a-tree v-show="departmentList.length >0"
                  :expanded-keys="expandedKeys"
                  :replaceFields="{key:'id'}"
                  :tree-data="departmentList"
                  @expand="onExpand"
                  @select="onSelect"
          >
          </a-tree>
          <div v-show="departmentList.length === 0">
            暂无数据
          </div>
        </div>
      </div>
      <div class="second-box box" v-show=previewMode>
        <div class="title">
          <span class="title-text">{{secondTitle}}</span>
        </div>
        <div class="pending-box" v-show="secondType===0">
          <div>
            <label>当前考核周期:</label>
            2020-10
          </div>
          <div>
            <a-checkbox v-model:checked="checked2" @change="onCheckChange">不显示已处理</a-checkbox>
          </div>
        </div>
        <div class="filter-block">
          <div class="filter-block-item date-filter" v-show="secondType===1">
            <div class="filter-label">
              考核周期：
            </div>
            <div class="filter-list">
              <a-month-picker v-model:value="dateValue" @change="onChange" :locale="locale" />
            </div>
          </div>
          <div class="filter-block-item">
            <div class="filter-label">考核类型：</div>
            <div class="filter-list">
              <span v-for="(item,index) in examineTypeMap" :key="item"
                    class="filter-item" :class="[{'active':leftExamineType===index}]"
                    @click="handleLeftExamineTypeClick(index)">
                {{item}}
              </span>
            </div>
          </div>
        </div>
        <div class="data-table">
          <a-table :data-source="list" rowKey="uuid" :pagination="false" :rowClassName="rowClass" :customRow="rowEvent">
            <template v-if="secondType!==2">
              <a-table-column key="name" title="姓名" align="center" data-index="name"></a-table-column>
              <a-table-column key="position" title="职位" align="center" data-index="position"></a-table-column>
              <a-table-column key="type" title="考核类型" align="center" data-index="type">
                <template v-slot="{ text: type }">
                  <span>{{type=='1'?'绩效考核':'人才评分'}}</span>
                </template>
              </a-table-column>
            </template>
            <a-table-column key="status" title="状态" align="center" data-index="status" v-if="secondType===0">
              <template v-slot="{ text: status }">
                <span>{{status==='1'?'待自评':'待上级考核'}}</span>
              </template>
            </a-table-column>
            <a-table-column key="date" title="考核周期" data-index="cycle_name.date" v-if="secondType===2"></a-table-column>
            <a-table-column key="score" title="分数" align="center" data-index="score" v-if="secondType!==0">
              <template v-slot="{ text: score }">
                <span>{{score || '/'}}</span>
              </template>
            </a-table-column>
            <a-table-column key="final_coefficient" title="最终系数" align="center" data-index="final_coefficient" v-if="secondType===2">
              <template v-slot="{ text: final_coefficient }">
                <span>{{final_coefficient || '/'}}</span>
              </template>
            </a-table-column>
          </a-table>
        </div>
      </div>
    </div>
    <div class="right-box box">
      <div class="icon-box" @click="previewMode=!previewMode">
        <DoubleLeftOutlined class="left-arr" :rotate="previewMode?0:180" style="font-size: 12px" />
      </div>
      <div class="title">
        <div class="title-text">{{rightTitle}}</div>
      </div>
      <div class="detail-info" v-if="detailContent">
        <div class="left-info">
          <span class="info-item">待考核人: {{detailContent.user_name}}</span>
          <span class="info-item">职位: {{detailContent.user_position}}</span>
          <span class="info-item">部门: {{detailContent.department_name}}</span>
        </div>
        <div class="right-info" v-if="detailContent.type === 2">
          <span class="info-item">当前级别: {{detailContent.rank_name}}</span>
        </div>
      </div>
      <div class="detail-table">
        <a-table :data-source="[]" :pagination="false" bordered>
          <a-table-column-group>
            <template v-slot:title><span style="color: #333">第一部分 不良事故（权重100%）</span></template>
            <a-table-column title="事故等级" align="center"></a-table-column>
            <a-table-column title="事故描述"></a-table-column>
            <a-table-column title="结果" align="center"></a-table-column>
            <a-table-column title="备注(发生事故描述)"></a-table-column>
          </a-table-column-group>
        </a-table>
        <a-table :data-source="[]" :pagination="false" bordered>
          <a-table-column-group>
            <template v-slot:title><span style="color: #333">第一部分 不良事故（权重100%）</span></template>
            <a-table-column title="事故等级" align="center"></a-table-column>
            <a-table-column title="事故描述"></a-table-column>
            <a-table-column title="结果" align="center"></a-table-column>
            <a-table-column title="备注(发生事故描述)"></a-table-column>
          </a-table-column-group>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons-vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import type1Data from '../assets/type1Data'
import type2Data from '../assets/type2Data'
import { deepClone, isNull } from '../utils'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { getDepartmentList, getPendingList, getDepartmentRankList } from "../api";
import Cookies from 'js-cookie'
import qs from 'qs'

export default {
  name: 'Home',
  components: {
    DoubleLeftOutlined,
    SearchOutlined
  },
  data() {
    return {
      locale,
      moment,
      uid: 439, // uid
      checked: false, // 待处理按钮选择
      pendingList: [],
      checked2: true,
      previewMode: true,
      secondTitle: '',
      secondType: 0,
      searchKey: '',
      originDepartmentList: [],
      departmentList: [],
      expandedKeys: [],
      form: {},
      dateValue: '',
      examineTypeMap: {
        0: '全部',
        1: '绩效考核',
        2: '人才评分'
      },
      leftExamineType: '0',
      columns0: [
        { title: '姓名', dataIndex: 'name'},
        { title: '职位', dataIndex: 'position'},
        { title: '考核类型', dataIndex: 'type'},
        { title: '状态', dataIndex: 'state'}
      ],
      columns1: [
        { title: '姓名', dataIndex: 'name'},
        { title: '职位', dataIndex: 'position'},
        { title: '考核类型', dataIndex: 'type'},
        { title: '分数', dataIndex: 'score'}
      ],
      columns2: [
        { title: '考核周期', dataIndex: 'date'},
        { title: '分数', dataIndex: 'score'},
        { title: '最终系数', dataIndex: 'final_coefficient'}
      ],
      columns: [],
      list: [],
      selectedRowIndex: -1,
      selectedRow: {},
      detailContent: null,
      rightTitle: '考核区'
    }
  },
  created() {
    Cookies.set('userid', 439)
    this.getDepartmentList()
    this.getPendingExamineList()
  },
  mounted() {
    console.log(Cookies.get('userid'))
    this.checked = true
    this.secondType = 0
    this.columns = this.columns0
    this.secondTitle = "待处理"
  },
  methods:{
    // 获取人员，部门列表
    getDepartmentList() {
      const body = {
        uid: Cookies.get('userid')
      }
      getDepartmentList(qs.stringify(body))
              .then((res) => {
                // console.log(res)
                let dataArr = []
                if (res.code === 0) {
                  dataArr = this.filterMemberData(res.data);
                  this.originDepartmentList = dataArr
                  this.departmentList = this.originDepartmentList
                }
              })
              .catch((e) => {
                console.log(e)
              })
    },
    // 过滤人员列表数据
    filterMemberData(dataArr) {
      let resArr = [];
      const _this = this
      resArr = dataArr
              .map(function(item) {
                if (!isNull(item.children)) {
                  item.children = _this.filterMemberData(item.children);
                }
                return item;
              })
              .filter(function(item) {
                return item.type !== 1 || !isNull(item.children);
              });
      return resArr;
    },
    // 获取待处理列表
    getPendingExamineList() {
      const body = {
        uid: Cookies.get('userid')
      }
      getPendingList(qs.stringify(body))
              .then((res) => {
                console.log(res)
                if (res.code === 0) {
                  this.pendingList = res.data.map((item) => {
                    item.uuid = item.id + '_' + item.type
                    return item
                  })
                  this.list = this.pendingList
                }
              })
              .catch((e) => {
                console.log(e)
              })
    },
    // 获取排行榜
    getRankList() {
      const body = {
        department_id: this.selectedNode.id,
        type: this.leftExamineType,
        page: 1,
        pageSize: 20,
        uid: this.uid
      }
      getDepartmentRankList(qs.stringify(body))
              .then((res) => {
                console.log(res)
              })
              .catch((e) => {
                console.log(e)
              })
    },
    // 点击待处理
    handlePending() {
      if (this.checked) {
        return
      }
      this.secondType = 0
      this.columns = this.columns0
      this.list = this.pendingList
      this.checked = true
      this.secondTitle = "待处理"
    },
    // 考核类型切换
    handleLeftExamineTypeClick(index) {
      this.leftExamineType = index
    },
    // 表格行样式修改
    rowClass(record, index) {
      // console.log(this.selectedRow)
      let className = ['table-row']
      if(this.selectedRowIndex === index) className.push('selected')
      return className.join(' ')
    },
    // 表格行点击事件
    rowEvent(record, index) {
      // console.log(record, index)
      const _this = this
      return {
        onclick() {
          // console.log("点击了行" + index)
          _this.selectedRowIndex = index
          _this.selectedRow = record
          console.log(record.type)
          const type = parseInt(record.type)
          if (type === 1) {
            _this.detailContent = type1Data
            _this.rightTitle = type1Data.cycle_name + ' 绩效考核'
          } else if (type === 2) {
            _this.detailContent = type2Data
            _this.rightTitle = type2Data.cycle_name + ' 人才评分'
          }
          console.log(_this.detailContent)
        }
      }
    },
    // 复选框[不显示已处理]，选择切换事件
    onCheckChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    // 时间变化
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // 树节点展开
    onExpand(expandedKeys) {
      // console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
    },
    // 树节点选择
    onSelect(selectedKeys, { selectedNodes }) {
      const selectedItem = selectedNodes[0].props
      if (selectedItem.type === 1) {
        this.secondType = 1
        this.secondTitle = selectedItem.title + ' - 排行榜'
      } else {
        this.secondType = 2
        this.secondTitle = selectedItem.title + '的历史考核'
      }
      this.selectedNode = selectedItem
      this.getRankList()
      this.checked = false
    },
    // 树搜索
    searchArrByTitle(dataArr, targetTitle) {
      if (targetTitle === '') {
        return dataArr;
      }
      let resArr = [];
      const _this = this
      resArr = dataArr
        .map(function(item) {
          if (!isNull(item.children)) {
            item.children = _this.searchArrByTitle(item.children, targetTitle);
          }
          return item;
        })
        .filter(function(item) {
          return item.title.indexOf(targetTitle) > -1 || !isNull(item.children);
        })
        .map(function(item) {
          if (item.type === 1) {
            if (!isNull(item.children) || item.title.indexOf(targetTitle) > -1) {
              item.expand = true;
              _this.expandedKeys.push(item.id)
              return item;
            } else {
              return null;
            }
          } else {
            return item;
          }
        });
      return resArr;
    }
  },
  watch:{
    searchKey(newVal) {
      console.log(newVal)
      this.expandedKeys = []
      this.departmentList = this.searchArrByTitle(deepClone(this.originDepartmentList), newVal);
      console.log(this.expandedKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    padding: 20px;
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    .box{
      background-color: #fff;
      border-radius: 5px;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      .title{
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        .title-text{
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
    .left-box{
      display: flex;
      width: 45%;
      margin-right: 10px;
      transition: all .5s;
      .first-box{
        width: 40%;
        max-width: 300px;
        min-width: 250px;
        margin-right: 10px;
        .handle-btn{
          position: absolute;
          top: 5px;
          right: -5px;
          .btn{
            width: 55px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            font-size: 12px;
            border: 1px solid rgba(0,0,0,.4);
            border-radius: 4px;
            cursor: pointer;
            &:hover{
              border-color: #03a9f4;
              color: #03a9f4;
            }
          }
          .checked{
            border-color: #03a9f4;
            background-color: #03a9f4;
            color: #fff;
            &:hover{
              color: #fff;
            }
          }
        }
        .tree-box{
          flex: 1;
          overflow: auto;
          margin-top: 10px;
          .ant-tree li{
            padding: 2px 0;
          }
        }
      }
      .second-box{
        flex: 1;
        .pending-box{
          margin: 0 5px 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .ant-checkbox + span {
            padding-right: 4px;
            padding-left: 4px;
          }
        }
        .filter-block {
          margin: 0 5px 10px 5px;
          .filter-block-item {
            display: flex;
            .filter-label {
              width: 80px;
            }
            .filter-list {
              display: inline-block;
              margin-left: 5px;
              flex: 1;
            }
          }
          .filter-block-item + .filter-block-item {
            margin-top: 10px;
          }
          .filter-block-item.date-filter {
            align-items: center;
          }
          .filter-item {
            margin-right: 10px;
            cursor: pointer;
          }
          .filter-item:hover,
          .filter-item.active {
            color: #03a9f4;
          }
        }
        .data-table{
          flex: 1;
          overflow: auto;
          .selected{
            background-color: #03a9f4;
            color: #ffffff;
            td:first-of-type{
              border-radius: 5px 0 0 5px;
            }
            td:last-of-type{
              border-radius: 0 5px 5px 0;
            }
            &:hover{
              td{
                background-color: #03a9f4;
                color: #ffffff;
              }
            }
          }
          .table-row{
            cursor: pointer;
          }
          .ant-table-thead > tr > th{
            background: #fff;
            border-bottom: 0;
          }
          .ant-table-tbody > tr > td{
            border-bottom: 0;
          }
          .ant-table-thead > tr > th,
          .ant-table-tbody > tr > td{
            padding: 10px 5px;
          }
        }
      }
    }
    .right-box{
      flex: 1;
      position: relative;
      transition: all .5s;
      .detail-info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left-info,
        .right-info{
          .info-item + .info-item{
            margin-left: 20px;
          }
        }
      }
    }
  }
  .preview-mode{
    .left-box{
      width: 0;
      margin-right: 0;
      opacity: 0;
    }
  }
  .icon-box{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    .left-arr{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    &:hover{
      border-color: #03a9f4;
      background-color: #03a9f4;
      .left-arr{
        color: #fff;
      }
    }
  }
</style>
