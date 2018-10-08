<template>
  <div class="adminUser">
    <GoodForm :dialogState="goodList.goodList.formState" :category="category"></GoodForm>
    <el-row class="dr-datatable">
      <el-col :span="24">
        <TopBar type="shopList"></TopBar>
        <DataTable :dataList="goodList.goodList.docs"></DataTable>
        <Pagination :pageInfo="goodList.goodList.pageInfo" pageType="shopList"></Pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import GoodForm from './goodForm.vue';
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
      GoodForm,
      DataTable,
      TopBar,
      Pagination
    },
    methods: {},
    computed: {
      ...mapGetters([
        'goodList',
        'category'
      ]),
      goodList() {
        return this.$store.getters.goodList
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
      this.$store.dispatch('getGoodList')
      this.$store.dispatch('getCategoryList')
    }
  }
</script>

<style lang="">

</style>
