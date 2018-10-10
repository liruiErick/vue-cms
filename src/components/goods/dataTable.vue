<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.shop.name }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.shop.id }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.shop.address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.shop.category }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="食品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="食品介绍"
        prop="description">
      </el-table-column>
      <el-table-column
        label="评分"
        prop="rating">
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
  import services from "../../store/services.js";

  export default {
    props: {
      dataList: Array
    },
    data() {
      return {
        mapJson: '../../../static/json/map.json',
        province: '',
        city: '',
        block: '',
      };
    },
    created() {
    },
    methods: {
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
            return services.delRestaurant({
              ids: rows[index]._id
            });
          })
          .then(result => {
            if (result.data.status === 200) {
              this.$store.dispatch("getShopList");
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
