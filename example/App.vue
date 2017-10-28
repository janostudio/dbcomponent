<template>
    <div id="app">
      <div>
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
    data() {
      return {}
    },
    watch: {
        // '$route'() {
        //     this.updatePageTitle();
        //     this.$nextTick(() => {
        //         this.$refs.pageContent.scrollTop = 0;
        //         this.showSidebar = false;
        //     });
        // }
    },
    mounted() {
    },
    methods: {
    },
    components: {
    }
};
</script>

<style lang="css">
  .is-active{
    color: #fff000;
  }
</style>
