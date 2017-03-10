<!--模板-->
<template>
  <div v-if="isShow === true">
    <div class="recursion" v-if="index <= list.length - 1">
      <recursion :list="list" :index="index + 1"/>
      {{list[index]}}
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  export default {
    name: 'recursion',
    data: function () {
      return {
//        isShow: true
      }
    },
    props: {
      list: Array,
      index: {
        type: Number,
        default: 0,
      },
      isShow: {
        type: Boolean,
        default: true,
      },
    },
    methods: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../common/css/util/variable';
  @import '../../../common/css/util/_mixin';

  .recursion {
    border: 1px solid #ddd;
    padding: 5px;
  }
</style>
