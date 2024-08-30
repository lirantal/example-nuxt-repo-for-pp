<template>
    All my memos
</template>

<script setup>
const { data } = await useFetch('/api/memos');
</script>
