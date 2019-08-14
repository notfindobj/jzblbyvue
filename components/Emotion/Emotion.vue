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
      let imgHTML = `<img  style="width: 100%;" src="http://www.pic.jzbl.com/ItemFiles/Emoticon/QQ/${name}_QQ.gif">`;
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
