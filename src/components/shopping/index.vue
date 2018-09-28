<template>
  <div class="adminUser">
    <ShopForm :dialogState="shopList.formState" :category="category"></ShopForm>
    <el-row class="dr-datatable">
      <el-col :span="24">
        <TopBar type="shopList"></TopBar>
        <DataTable :dataList="shopList.shopList.docs"></DataTable>
        <Pagination :pageInfo="shopList.shopList.pageInfo" pageType="shopList"></Pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ShopForm from './shopForm'
  import DataTable from './dataTable.vue';
  import TopBar from '../common/TopBar.vue';
  import Pagination from '../common/Pagination.vue';
  import axios from 'axios'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'index',
    data() {
      return {
        mapJson: '../../../static/json/map.json',
        categoryOptions: []
      }
    },
    components: {
      ShopForm,
      DataTable,
      TopBar,
      Pagination
    },
    methods: {},
    computed: {
      ...mapGetters([
        'shopList',
        'category'
      ]),
      shopList() {
        let that = this
        if (this.$store.getters.shopList.formState.formData.addressTotal) {
          this.$store.getters.shopList.formState.formData.addressTotal = this.$store.getters.shopList.formState.formData.addressTotal.split('/')
          this.$store.getters.shopList.formState.formData.category = this.$store.getters.shopList.formState.formData.category.split('/')
        } else {
          (this.$store.getters.shopList.shopList.docs).forEach(function (value, index) {
            axios.get(that.mapJson).then(function (res) {
              if (res.status === 200) {
                var data = res.data
                for (var item in data) {
                  if (item === value.addressTotal.split('/')[0]) {//省
                    value.addressTotals = data[item] + '/'
                  } else if (item === value.addressTotal.split('/')[1]) {//市
                    value.addressTotals += data[item] + '/'
                  } else if (item === value.addressTotal.split('/')[2]) {//区
                    value.addressTotals += data[item]
                  }
                }
              }
            })
          })
        }
        return this.$store.getters.shopList
      },
      category() {
        let temp = []
        if (this.$store.getters.categoryList.categoryList.length > 0) {
          (this.$store.getters.categoryList.categoryList).forEach(function (item, index) {
            if (item.sub_categories.length) {
              const addnew = {
                value: item.name,
                label: item.name,
                children: []
              }
              item.sub_categories.forEach((subitem, index) => {
                if (index === 0) {
                  return
                }
                addnew.children.push({
                  value: subitem.name,
                  label: subitem.name,
                })
              })
              temp.push(addnew)
            }
          })
          return temp
        }
      }
    },
    mounted() {
      this.$store.dispatch('getShopList')
      this.$store.dispatch('getCategoryList')
    }
  }
</script>

<style lang="">

</style>
