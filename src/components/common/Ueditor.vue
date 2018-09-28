<!--<template>-->
    <!--<div ref="wrap">-->
        <!--&lt;!&ndash;下面通过传递进来的id完成初始化&ndash;&gt;-->
        <!--&lt;!&ndash;<script :id="randomId" type="text/plain"></script>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->
<!--<style lang="scss">-->
<!--.edui-default {-->
    <!--line-height: initial-->
<!--}-->
<!--</style>-->
<!--<script>-->

<!--//主体文件引入-->
<!--import '/src/public/ueditor/ueditor.config.js'-->
<!--import '/src/public/ueditor/ueditor.all.min.js'-->
<!--import '/src/public/ueditor/lang/zh-cn/zh-cn.js'-->

<!--export default {-->
    <!--props: {-->
        <!--//配置可以传递进来-->
    <!--},-->
    <!--data() {-->
        <!--return {-->
            <!--//每个编辑器生成不同的id,以防止冲突-->
            <!--randomId: 'editor_' + (Math.random() * 100000000000000000),-->
            <!--//编辑器实例-->
            <!--instance: null,-->
            <!--ueditorConfig: {-->
                <!--initialFrameWidth: '100%',-->
                <!--initialFrameHeight: 400-->
            <!--}-->
        <!--};-->
    <!--},-->
    <!--//此时&#45;&#45;el挂载到实例上去了,可以初始化对应的编辑器了-->
    <!--mounted() {-->
        <!--this.initEditor()-->
        <!--this.initScript()-->
    <!--},-->

    <!--beforeDestroy() {-->
        <!--// 组件销毁的时候，要销毁 UEditor 实例-->
        <!--if (this.instance !== null && this.instance.destroy) {-->
            <!--this.instance.destroy();-->
        <!--}-->
    <!--},-->
    <!--methods: {-->
        <!--initScript() {-->
          <!--var oScript=document.createElement('script');-->
          <!--oScript.id = this.randomId;-->
          <!--oScript.type="text/plain";-->
          <!--this.$refs.wrap.append(oScript)-->
        <!--},-->
        <!--initEditor() {-->
            <!--//dom元素已经挂载上去了-->
            <!--this.$nextTick(() => {-->
                <!--console.log(this.ueditorConfig);-->
                <!--this.instance = UE.getEditor(this.randomId, this.ueditorConfig);-->
                <!--// 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去-->
                <!--this.instance.addListener('ready', () => {-->
                    <!--this.$emit('ready', this.instance);-->
                <!--});-->
            <!--});-->
        <!--}-->
    <!--}-->
<!--};-->
<!--</script>-->
