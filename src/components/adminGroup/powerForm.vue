<template>
    <div class="dr-adminGroupForm">
        <el-dialog width="35%" size="small" :title="$t('adminGroup.lb_give_power')" :visible.sync="roleState.show" :close-on-click-modal="false">
            <el-tree :data="treeData" show-checkbox node-key="_id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="closeTree">{{$t("main.cancelBtnText")}}</el-button>
                <el-button size="medium" type="primary" @click="savePower">{{$t("main.confirmBtnText")}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
import _ from "lodash";

export default {
  props: {
    roleState: Object,
    treeData: Array
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    savePower() {
      let currentNodes = this.$refs.tree.getCheckedNodes();
      let currentArr = [];
      currentNodes.length > 0 &&
        currentNodes.map((item, index) => {
          if (item.type ==="1") {
            currentArr.push(item._id);
          }
        });
      let params = this.roleState.formData;
      params.power = currentArr;
      services.updateAdminGroup(params).then(result => {
        if (result.data.status === 200) {
          this.$store.dispatch("hideAdminGroupRoleForm");
          this.$store.dispatch("getAdminGroupList");
          this.$message({
            message: this.$t("adminGroup.lb_updatePower_success"),
            type: "success"
          });
        } else {
          this.$message.error(result.data.message);
        }
        this.dialogState.show = false
        this.$router.go(0)
      });
    },
    closeTree() {
      this.$store.dispatch("hideAdminGroupRoleForm");
    }
  },
  updated() {
    this.$refs.tree &&
      this.$refs.tree.setCheckedKeys(this.roleState.formData.power);
  },
  created() {
  }
};
</script>
