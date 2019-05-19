<template>
    <div class="ly-emotion">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'ly-emotion',
    mounted() {
      const name = this.$el.innerHTML;
      let imgHTML = `<img src="https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/2018new_${name}.png">`;
      this.$nextTick(() => {
        this.$el.innerHTML = imgHTML
      })
    },
  }
</script>
<style scoped>
    .ly-emotion {
        display: inline-block
    }

    .ly-static-emotion {
        width: 24px;
        height: 24px;
        display: inline-block;
    }
</style>
