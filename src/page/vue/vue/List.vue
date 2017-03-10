<!--模板-->
<template>
  <div class="list" v-if="bool" :eee="'122'+3">
    {{num | addOne | addOne('1')}}
    <li v-for="(item, i) of lis1" @click="showInfo">{{item}} {{i}}</li>
    <input type="text" v-model="t1" @click="click11">
    <div v-html="html"></div>
    {{numComputed}}
    {{add}}
    <div v-if="type == 1">
      <p>11</p>
      <input type="text" v-on:keyup.enter="alert" placeholder="addone">
    </div>
    <div v-else v-show="false">
      <p>33</p>
      <input type="text" title="fffgg" class="ddd">
      <p>22</p>
    </div>
    <div style="margin-top: 30px;" @click="cc">
      {{ count }}
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  export default {
    data: function () {
      return {
        t1: 'wefewf',
        tt: '嘎嘎',
//        num: 0,
        add: 0,
        lis1: this.lis,
        count: this.$store.state.count
      }
    },
    props: {
      lis: Array,
      bool: null,
      html: null,
      num: null,
      type: null,
//      count: null,
//      store: null,
      wefefw: {
//        required: true,
      }
    },
    methods: {
      showInfo: function (e) {
        alert(e.currentTarget.innerText);
      },
      alert: function (event) {
//        this.lis1.push(3333);
        this.lis1 = [5];
      },
      click11(){
        this.$emit('bbb');
      },
      cc(){
//        this.$props.store.commit('increment');
        this.$store.state.count ++ ;
      }
    },
    filters: {
      addOne: function (value, num = 0) {
        return value + 1 + num;
      }
    },
    computed: {
      numComputed: function () {
        return this.num + 1;
      },
//      count(){
//        return this.$store.state.count;
//      }
    },
    watch: {
      html: function () {
        this.add = this.html + this.num;
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
