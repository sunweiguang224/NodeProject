<!--模板-->
<template>
  <div class="list">
    <li v-for="item in lis" @click="showInfo">{{item}}</li>
    <input type="text" v-model="t1">
    {{t1}}
  </div>
</template>

<!--组件定义-->
<script>
  export default {
    data: function () {
      return {
        t1: 'wefewf',
      }
    },
    props: ['lis', 't1'],
    methods: {
      showInfo: function(e){
        alert(e.currentTarget.innerText);
      }
    }
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../common/css/util/variable';
  @import '../../../common/css/util/_mixin';
  .list {
    margin: auto;
    width: 100px;
    list-style: decimal;

    li {
      @include ellipsis(1);
    }
  }
</style>
