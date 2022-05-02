<template>
  <div class="index-container">
    
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {
    },
    data() {
      return {
        
      }
    },
    created() {
    },
    mounted() {
      
    },
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
    },
  }
</script>
<style lang="scss" scoped>
  
</style>
