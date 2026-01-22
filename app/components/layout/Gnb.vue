<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { 
  Phone, Info, LayoutGrid, Coins, MessageCircle 
} from 'lucide-vue-next'

const route = useRoute()

const currentMenu = computed(() => {
  return (route.params.menu as string) || 'intro'
})

const navItems = [
  { id: 'intro', label: '소개', icon: Info, path: '/' },
  { id: 'types', label: '설치 유형', icon: LayoutGrid, path: '/types' },
  { id: 'price', label: '시공 가격', icon: Coins, path: '/price' },
]

const isNavVisible = ref(true)
const lastScrollY = ref(0)

const handleScroll = () => {
  if (typeof window === 'undefined') return
  const currentScrollY = window.scrollY
  
  if (currentScrollY <= 0) {
    isNavVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }

  if (Math.abs(currentScrollY - lastScrollY.value) > 10) {
      isNavVisible.value = currentScrollY < lastScrollY.value
      lastScrollY.value = currentScrollY
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md antialiased tracking-tight transition-transform duration-300 ease-in-out"
    :class="isNavVisible ? 'translate-y-0' : '-translate-y-full'"
    aria-label="상단 글로벌 내비게이션 바"
  >
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 flex h-[64px] md:h-[80px] items-center justify-between">
      <div class="flex items-center gap-10 md:gap-16 h-full">
        <NuxtLink to="/" class="flex items-center gap-1.5 flex-shrink-0 transition-opacity hover:opacity-80">
          <img
            src="/logo.svg"
            alt="조양냉난방시스템"
            width="150" height="40"
            class="h-9 w-auto md:h-11"
          />
          <span class="font-black text-lg md:text-2xl tracking-tighter text-slate-900 hidden sm:block">
            냉난방시스템
          </span>
        </NuxtLink>

        <div class="hidden lg:flex items-center gap-10 h-full">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.path"
            class="relative flex items-center h-full text-[16px] font-bold transition-all duration-200 group"
            :class="currentMenu === item.id ? 'text-[#155dfc]' : 'text-slate-600 hover:text-slate-900'"
          >
            {{ item.label }}
            <span 
              class="absolute bottom-0 left-0 w-full h-[3px] bg-[#155dfc] transition-transform duration-300"
              :class="currentMenu === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            ></span>
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Button 
          as-child
          class="hidden md:flex items-center justify-center bg-[#FEE500] hover:bg-[#f2da00] text-[#3C1E1E] border-none font-bold rounded-full shadow-sm transition-all
                 md:px-5 md:h-10 md:text-sm
                 lg:px-6 lg:h-11 lg:text-base"
        >
          <a href="https://pf.kakao.com/_xxxx" target="_blank" rel="noopener noreferrer" class="flex items-center leading-none">
            <MessageCircle class="translate-y-[0.5px] w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
            <span class="pt-[1px] ml-2 text-nowrap">카카오로 실시간 문의하기</span>
          </a>
        </Button>

        <Button 
          as-child 
          variant="outline"
          class="md:hidden border-[#155dfc] text-[#155dfc] hover:bg-[#155dfc] hover:text-white font-bold rounded-full h-10 px-4 active:scale-95 transition-all bg-transparent shadow-none border-2"
        >
          <a href="tel:010-3294-3286" class="flex items-center gap-2 leading-none">
            <Phone class="h-4 w-4 fill-current translate-y-[0.5px]" aria-hidden="true" />
            <span class="pt-[1px]">빠른 전화 상담</span>
          </a>
        </Button>
      </div>
    </div>
  </nav>

  <nav
    class="fixed bottom-0 left-0 z-50 w-full border-t bg-white/95 backdrop-blur-lg lg:hidden transition-transform duration-300 ease-in-out"
    :class="isNavVisible ? 'translate-y-0' : 'translate-y-full'"
    aria-label="모바일 하단 메뉴"
  >
    <div class="grid h-16 grid-flow-col auto-cols-fr pb-safe w-full">
      <NuxtLink 
        v-for="item in navItems"
        :key="item.id"
        :to="item.path"
        class="relative flex flex-col items-center justify-center gap-1 transition-colors hover:bg-muted/50"
        :class="currentMenu === item.id ? 'text-[#155dfc]' : 'text-slate-600'" 
      >
        <component 
          :is="item.icon" 
          class="h-5 w-5 transition-transform" 
          :class="{ 'scale-110': currentMenu === item.id }"
          :stroke-width="currentMenu === item.id ? 2.5 : 2" 
          aria-hidden="true" 
        />
        <span class="text-[11px] font-medium">{{ item.label }}</span>
        
        <div 
          v-if="currentMenu === item.id" 
          class="absolute bottom-1 h-0.5 w-6 rounded-full bg-[#155dfc]" 
        />
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>