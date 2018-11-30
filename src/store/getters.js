export default {
    count(state) {
        return state.count
    },
    loginState: state => state.loginState,
    adminUserFormState: state => state.adminUser.formState,
    adminUserList: state => state.adminUser.userList,
    adminGroupFormState: state => state.adminGroup.formState,
    adminGroupRoleFormState: state => state.adminGroup.roleFormState,
    adminGroupList: state => state.adminGroup.roleList,
    adminResourceFormState: state => state.adminResource.formState,
    adminResourceList: state => state.adminResource.resourceList,
    bakDataList: state => state.bakDataList,
    systemOptionLogs: state => state.systemOptionLogs,
    basicInfo: state => state.basicInfo,
    tempShoplist: state => state.tempShoplist,
    shopList: state => state.shop,
    goodList: state => state.good,
    categoryList: state => state.category
}
