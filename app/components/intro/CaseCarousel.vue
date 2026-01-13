<script setup lang="ts">
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-vue-next'

interface CaseItem {
  id: number
  title: string
  category: string
  img: string
  desc: string
}

const emit = defineEmits<{
  (e: 'select-case', item: CaseItem): void
}>()

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const isMobile = ref(false)

const cases: CaseItem[] = [
  { id: 1, title: '', category: '가정용', img: '/images/example/01.jpg', desc: '' },
  { id: 2, title: '', category: '업소용', img: '/images/example/02.jpg', desc: '' },
  { id: 3, title: '', category: '업소용', img: '/images/example/03.jpg', desc: '' },
  { id: 4, title: '', category: '가정용', img: '/images/example/04.jpg', desc: '' },
  { id: 5, title: '', category: '업소용', img: '/images/example/05.jpg', desc: '' },
  { id: 6, title: '', category: '가정용', img: '/images/example/06.jpg', desc: '' },
  { id: 7, title: '', category: '업소용', img: '/images/example/07.jpg', desc: '' },
  { id: 8, title: '', category: '가정용', img: '/images/example/08.jpg', desc: '' },
]

const updateSize = () => {
  if (import.meta.client) isMobile.value = window.innerWidth < 768
}

const checkScroll = () => {
  const el = carouselRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 10
  const scrollEnd = el.scrollWidth - el.clientWidth
  const dummyWidth = isMobile.value ? (window.innerWidth * 0.22) : 200 
  canScrollRight.value = el.scrollLeft < (scrollEnd - dummyWidth - 10)
}

const scroll = (direction: 'left' | 'right') => {
  const el = carouselRef.value
  if (!el) return
  const offset = isMobile.value ? window.innerWidth * 0.82 : 508
  const move = direction === 'left' ? -offset : offset
  el.scrollBy({ left: move, behavior: 'smooth' })
  setTimeout(checkScroll, 500)
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const leftPadding = 'max(1.25rem, calc((100vw - 1236px) / 2 + 1.25rem))'
const desktopPadding = 'max(3rem, calc((100vw - 1236px) / 2 + 3rem))'
</script>

<template>
  <section class="pb-16 md:pb-24 bg-white overflow-visible">
    <div class="max-w-[1236px] mx-auto px-5 md:px-12 mb-10 flex items-end justify-between">
      <div class="space-y-3">
        <h2 class="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
          신뢰로 증명하는 <span class="text-[#155dfc]">시공 사례</span>
        </h2>
        <p class="text-slate-600 font-medium text-base md:text-lg tracking-tight">카드를 클릭하여 상세 이미지를 확인해보세요</p>
      </div>
      <div class="hidden md:flex gap-3">
        <button @click="scroll('left')" :disabled="!canScrollLeft" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm">
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button @click="scroll('right')" :disabled="!canScrollRight" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm">
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="relative overflow-visible -mt-10">
      <div ref="carouselRef" @scroll="checkScroll" 
        class="flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-10 pb-10 overflow-visible"
        :style="{ paddingLeft: isMobile ? leftPadding : desktopPadding, scrollPaddingLeft: isMobile ? leftPadding : desktopPadding }">
        <div v-for="item in cases" :key="item.id" @click="emit('select-case', item)"
          class="flex-shrink-0 w-[78vw] md:w-[480px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] relative overflow-hidden snap-start cursor-pointer bg-slate-100 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group">
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" :style="{ backgroundImage: `url(${item.img})` }"></div>
          <div class="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-8 left-8 right-8 z-10">
            <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-3">{{ item.category }}</span>
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-sm">{{ item.title }}</h3>
          </div>
          <div class="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
             <ArrowUpRight class="w-6 h-6" />
          </div>
        </div>
        <div class="flex-shrink-0" :style="{ width: isMobile ? `calc(100vw - 78vw - ${leftPadding})` : `calc(100vw - 480px - ${desktopPadding})` }"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>