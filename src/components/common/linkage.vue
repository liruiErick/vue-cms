<template>
  <div class="w960 mgt30">
    <el-cascader
      :options="options"
      change-on-select
      @change="handleChange"
      v-model="data"
    ></el-cascader>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      options: Array
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      handleChange() {
        console.log(this.data)
//        this.$emit('data', this.getCascaderObj(this.data,this.options))
      },
      getCascaderObj(val, opt) {
        return val.map(function (value, index, array) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children;
              return itm;
            }
          }
          return null;
        });
      }
    }
  }
  ;
</script>

<style>
</style>
