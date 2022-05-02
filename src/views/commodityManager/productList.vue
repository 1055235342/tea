<template>
  <div class="box table-container">
    <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input v-model="queryForm.title" placeholder="名称" >
            <template slot="prepend">名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.title" placeholder="类型" >
            <template slot="prepend">类型</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.title" placeholder="类别" >
            <template slot="prepend">类别</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-button icon="el-icon-plus" type="primary" @click="add">
        添加
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="dialog = true">
        删除
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="dialog = true">
        下架
      </el-button>
    </vab-query-form>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="商品图片">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="row.img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="价格"
        prop="price"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="商品类型"
        prop="type"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="商品类别"
        prop="category"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="库存数"
        prop="inventory"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="销量"
        prop="sales"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="发货公司"
        prop="shipping"
        sortable
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">详情</el-button>
          <el-button type="text" @click="handleEdit(row)">下架</el-button>
          <el-button type="text" @click="handleEdit(row)">统计</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
    <el-drawer
      title="手动添加新的订单"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="商品" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.contact" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="dialog = false" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
  
</template>

<script>
  import { getList, doDelete } from '@/api/table'
  import TableEdit from './components/TableEdit'
  export default {
    name: '送货到家',
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          已送达: 'success',
          未送达: 'danger',
          未发货: 'danger',
          已发货: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        formLabelWidth: '80px',
        timer: null,
        dialog: false,
        loading: false,
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [{
          value: '1',
          label: '已上架'
        }, {
          value: '2',
          label: '仓库'
        }, {
          value: '3',
          label: '已下架'
        }],
        value: '1'
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      add(){
        this.$router.push({path: '/commodityManager/addDelivery'})
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style lang="scss">
.el-drawer__body {
    padding: 20px;
}
.demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    form {
      flex: 1;
    }
}
.demo-drawer__content 
  .demo-drawer__footer {
    display: flex;
    button {
      flex: 1;
    }
  }
</style>
