<!--模板-->
<template>
  <div class="recursion" v-if="index <= list.length - 1">
    <recursion :list="list" :index="index + 1"/>
    {{list[index]}}
  </div>
</template>

<!--组件定义-->
<script>
  export default {
    name: 'recursion',
    data: function () {
      return {

      }
    },
    props: {
      list: Array,
      index: {
        type: Number,
        default: 0,
      },
    },
    methods: {

    },
    filters: {

    },
    computed: {

    },
    watch: {

    }
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../common/css/util/variable';
  @import '../../../common/css/util/_mixin';

  .recursion {
    border: 1px solid #ddd;padding: 5px;
  }
</style>
