<template>
    <div class="adminUser">
        <ShopForm :dialogState="shopList.formState"></ShopForm>
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
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'index',
        data() {
            return {
            }
        },
        components: {
            ShopForm,
            DataTable,
            TopBar,
            Pagination
        },
        methods: {
        },
        computed: {
            ...mapGetters([
                'shopList'
            ]),
            shopList() {
                debugger
                return this.$store.getters.shopList
            }
        },
        mounted() {
            debugger
            this.$store.dispatch('getShopList')
        }
    }
</script>

<style lang="">

</style>
