<template>
  <div data-v-e5b34d4e="" data-v-5f88f7f4="" class="mask">
    <div data-v-e5b34d4e="" class="modal">
      <div data-v-e5b34d4e="" class="modal-body">
        <a data-v-e5b34d4e="" @click="closeDialog" href="javascript:;" class="icon iconfont modal-close text-white">󰄪</a>
        <span data-v-5f88f7f4="">{{message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      message:{
        type: String
      }
    },
    methods:{
      closeDialog(){
        this.$store.commit("changeAlert",false)
        this.$emit('changeAlert', false)
      }
    }
  }
</script>

<style>

</style>