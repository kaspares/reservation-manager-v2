<script setup lang="ts">
const props = defineProps<{
    title: string,
    value: string | number,
    desc?: string,
}>()
</script>
<template>
    <div class="stats shadow">
    <div class="stat bg-base-300">
        <div class="stat-title text-xl">{{ props.title }}</div>
        <div class="stat-value">{{ props.value }}</div>
        <div class="stat-desc" v-if="desc">{{ props.desc }}</div>
    </div>
    </div>
</template>
