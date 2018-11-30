<template>
    <div class="adminUser">
        <UserForm :dialogState="formState" :groups="groups"></UserForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="adminUser"></TopBar>
                <DataTable :dataList="adminUserList.docs"></DataTable>
                <Pagination :pageInfo="adminUserList.pageInfo" pageType="adminUser"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import UserForm from './userForm'
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
              groups:[{
                _id:'E1XjEmqA',
                name:'超级管理员'
              },{
                _id:'EydZWWiR',
                name:'测试用户组'
              }]
            }
        },
        components: {
            DataTable,
            TopBar,
            UserForm,
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'adminUserList'
            ]),
            formState() {
                return this.$store.getters.adminUserFormState
            }
        },
        mounted() {
            this.$store.dispatch('getAdminUserList');
        }
    }
</script>

<style lang="">

</style>
