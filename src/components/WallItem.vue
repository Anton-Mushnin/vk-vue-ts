<script setup lang="ts">
const props = defineProps<{
  item: any;
}>()
</script>

<template>
  <div v-if="props.item.text" class="item">{{props.item.text}}</div>

</template>

<style scoped>
  .item {
    border-bottom: 1px solid rgb(148, 36, 148);
    padding: 10px;
  }
</style>
