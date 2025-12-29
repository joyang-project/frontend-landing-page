<script setup>
useHead({
  meta: [
    {
      name: 'description',
      content: '합리적인 가격, 신뢰할 수 있는 전문가',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <LayoutGnb />

    <div class="flex-1">
      <NuxtPage />
    </div>

    <LayoutFooter />
  </div>
</template>