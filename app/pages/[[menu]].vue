<script setup lang="ts">
const route = useRoute()

const currentMenu = computed(() => {

  return (route.params.menu as string) || 'intro'
})

const seoData: Record<string, { title: string, description: string, keywords: string }> = {
  intro: {
    title: '소개',
    description: '대구 시스템 에어컨 전문 조양냉난방시스템입니다. 정직한 시공과 철저한 사후관리를 약속드립니다.',
    keywords: '대구 에어컨 설치, 조양냉난방시스템, 대구 에어컨 시공'
  },
  types: {
    title: '설치 유형',
    description: '가정용 시스템 에어컨부터 상업용 냉난방기까지, 현장에 최적화된 제품군을 확인하세요.',
    keywords: '대구 시스템 에어컨, 대구 냉난방기 종류, 업소용 에어컨'
  },
  price: {
    title: '시공 가격',
    description: '합리적인 설치 비용과 이전 설치 견적 안내. 대구 전지역 무료 방문 상담 가능합니다.',
    keywords: '대구 에어컨 설치비용, 대구 에어컨 이전설치, 에어컨 견적'
  }
}

// SEO 메타 데이터 설정 (SSR 대응)
useSeoMeta({
  title: () => seoData[currentMenu.value]?.title,
  ogTitle: () => seoData[currentMenu.value]?.title,
  description: () => seoData[currentMenu.value]?.description,
  ogDescription: () => seoData[currentMenu.value]?.description,
  keywords: () => seoData[currentMenu.value]?.keywords
})

// 3. 감시 대상을 route.params.menu로 변경하여 스크롤 제어
watch(
  () => route.params.menu, 
  () => {
    if (import.meta.client) {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  }
)
</script>

<template>
  <main class="w-full py-0 md:pb-10 pb-4 md:pb-10 min-h-[80vh] overflow-x-hidden">
    <Transition name="fade" mode="out-in">
      <div :key="currentMenu" class="content-wrapper">
        <section v-if="currentMenu === 'intro'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionIntro />
        </section>

        <section v-else-if="currentMenu === 'types'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionTypes />
        </section>

        <section v-else-if="currentMenu === 'price'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionPrice />
        </section>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.content-wrapper {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-in {
  animation-fill-mode: both;
}
</style>