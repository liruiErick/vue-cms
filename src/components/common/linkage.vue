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
      options:Array
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      handleChange(value){
        this.$emit('data',value)
      }
    }
  };
</script>

<style>
</style>
