<script setup lang="ts">
import type { User } from '@/model/User';


const props = defineProps<{
  user: User;
}>()

</script>

<template>
  <div class="user">
    <img :src="props.user.photo" />
    {{props.user.displayName}}
  </div>
</template>
