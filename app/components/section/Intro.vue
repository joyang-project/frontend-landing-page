<script setup lang="ts">
interface CaseItem {
  id: number
  title: string
  category: string
  img: string
  desc: string
}

const selectedCase = ref<CaseItem | null>(null)
</script>

<template>
  <div class="bg-white overflow-x-hidden pt-0 mt-0">
    <IntroHero />
    <IntroStrengths />
    <IntroCaseCarousel @select-case="(item: CaseItem) => selectedCase = item" />
    <IntroCaseModal :selected-case="selectedCase" @close="selectedCase = null" />
  </div>
</template>