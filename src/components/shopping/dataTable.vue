<template>
    <div>
      <el-table
        :data="dataList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺简介">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.addressTotals }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('shop.name')">
        </el-table-column>
        <el-table-column prop="address" :label="$t('shop.address')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" :label="$t('shop.description')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$t('main.dataTableOptions')" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain round @ @click="editShopInfo(scope.$index, dataList)"><i class="fa fa-edit"></i></el-button>
            <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="deleteShop(scope.$index, dataList)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import axios from 'axios'
export default {
  props: {
    dataList: Array
  },
  data() {
    return {
      mapJson:'../../../static/json/map.json',
      province:'',
      city:'',
      block:'',
    };
  },
  created() {
//    this.handleData(this.dataList)
  },
  methods: {
//    handleData(data){
//      var that = this
//      data.forEach(function (value,index) {
//        axios.get(that.mapJson).then(function(res){
//          if (res.status===200) {
//            var data = res.data
//            for (var item in data) {
//              if (item === value.addressTotal.split('/')[0]) {//省
//                value.addressTotal = data[item]
//              } else if (item === value.addressTotal.split('/')[1]) {//市
//                value.addressTotal += +'/'+data[item]+'/'
//              } else if (item === value.addressTotal.split('/')[2]) {//区
//                value.addressTotal += data[item]
//              }
//            }
//          }
//          else{
//            console.log(res.status)
//          }
//        })
//      })
//    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editShopInfo(index, rows) {
      this.$store.dispatch("showShopListForm", {
        edit: true,
        formData: rows[index]
      });
    },
    deleteShop(index, rows) {
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          return services.deleteAdminGroup({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getAdminGroupList");
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    }
  }
};
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
