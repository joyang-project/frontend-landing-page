<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  ShieldCheck, Zap, PenTool, ArrowRight, 
  ChevronLeft, ChevronRight, ArrowUpRight 
} from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu')

const isMobile = ref(false)
const updateSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const heroRef = ref<HTMLElement | null>(null)
const strengthsRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)
const strengthsVisible = ref(false)

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === heroRef.value && entry.isIntersecting) heroVisible.value = true
      if (entry.target === strengthsRef.value && entry.isIntersecting) strengthsVisible.value = true
    })
  }, { threshold: 0.1 })

  if (heroRef.value) observer.observe(heroRef.value)
  if (strengthsRef.value) observer.observe(strengthsRef.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const strengths = [
  { title: '신뢰할 수 있는 시공', desc: '수년간의 현장 경험과 자격증을 보유한 전문 팀이 규격에 맞는 안전한 설비를 약속드립니다.', icon: ShieldCheck },
  { title: '세심한 서비스', desc: '상담부터 설치까지 전문 팀이 가장 신속하게 대응하여 불편을 최소화합니다.', icon: Zap },
  { title: '맞춤형 설계 컨설팅', desc: '공간의 특성과 용도를 고려하여 가장 효율적인 냉난방 시스템을 제안합니다.', icon: PenTool }
]

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const cases = [
  { id: 1, title: '강남 프리미엄 아파트', category: '가정용', img: '/images/example/01.jpg' },
  { id: 2, title: '성수동 카페거리 상가', category: '업소용', img: '/images/example/02.jpg' },
  { id: 3, title: '판교 IT 기업 사옥', category: '업소용', img: '/images/example/03.jpg' },
  { id: 4, title: '한남동 단독주택', category: '가정용', img: '/images/example/04.jpg' },
  { id: 5, title: '홍대 복합문화공간', category: '업소용', img: '/images/example/05.jpg' },
  { id: 6, title: '송도 펜트하우스', category: '가정용', img: '/images/example/06.jpg' },
  { id: 7, title: '가로수길 플래그십 스토어', category: '업소용', img: '/images/example/07.jpg' },
  { id: 8, title: '제주도 리조트 단지', category: '가정용', img: '/images/example/08.jpg' },
]

const checkScroll = () => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  
  canScrollLeft.value = el.scrollLeft > 10

  const scrollEnd = el.scrollWidth - el.clientWidth
  const dummyWidth = isMobile.value ? (window.innerWidth * 0.22) : 200 
  canScrollRight.value = el.scrollLeft < (scrollEnd - dummyWidth - 10)
}

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  const offset = isMobile.value ? window.innerWidth * 0.82 : 508
  const move = direction === 'left' ? -offset : offset
  el.scrollBy({ left: move, behavior: 'smooth' })
  
  setTimeout(checkScroll, 500)
}

const leftPadding = 'max(1.25rem, calc((100vw - 1236px) / 2 + 1.25rem))'
const desktopPadding = 'max(3rem, calc((100vw - 1236px) / 2 + 3rem))'
</script>

<template>
  <div class="bg-white overflow-x-hidden">
    <div class="max-w-[1236px] mx-auto px-5 md:px-12">
      <section ref="heroRef" class="relative flex flex-col justify-center min-h-[calc(75vh-64px)] md:min-h-[650px] pt-8 md:pt-0 pb-[64px] md:pb-0">
        <div class="space-y-6 md:space-y-8 max-w-3xl transition-all duration-1000 w-full" :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <div class="space-y-4 md:space-y-6">
            <h2 class="text-[2.25rem] md:text-5xl lg:text-7xl font-black leading-[1.15] tracking-tighter text-slate-900">
              공간의 가치를 바꾸는<br />
              <span class="text-[#155dfc]">조양냉난방시스템</span>
            </h2>
            <p class="text-base md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl">
              합리적인 가격으로 최고의 전문가들과 함께<br class="hidden md:block" />
              더 쾌적한 환경을 직접 경험해 보세요.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button class="px-7 py-4 bg-[#155dfc] text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95">
              지금 바로 무료 상담하기
            </button>
            <button @click="currentMenu = 'types'" class="flex items-center justify-center gap-2 px-7 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all group">
              설치 유형 보기 
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>

    <div class="max-w-[1236px] mx-auto px-5 md:px-12 pb-12 md:pb-24">
      <section ref="strengthsRef" class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div v-for="(item, idx) in strengths" :key="idx" 
          class="group p-6 md:p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#155dfc] transition-all duration-700 shadow-sm"
          :style="{ transitionDelay: `${idx * 150}ms`, transform: strengthsVisible ? 'translateY(0)' : 'translateY(40px)', opacity: strengthsVisible ? 1 : 0 }">
          
          <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
            <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-white text-[#155dfc] flex items-center justify-center shadow-sm group-hover:bg-[#155dfc] group-hover:text-white transition-all duration-500">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold tracking-tight text-slate-900 md:mt-6">{{ item.title }}</h3>
          </div>

          <p class="text-slate-500 leading-relaxed text-sm md:text-base font-medium">{{ item.desc }}</p>
        </div>
      </section>
    </div>

    <section class="pt-12 md:pt-24 bg-white overflow-visible">
      <div class="max-w-[1236px] mx-auto px-5 md:px-12 mb-10 flex items-end justify-between">
        <div class="space-y-3">
          <h2 class="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
            신뢰로 증명하는 <span class="text-[#155dfc]">시공 사례</span>
          </h2>
          <p class="text-slate-500 font-medium text-base md:text-lg tracking-tight">실제 시공 현장을 확인해보세요</p>
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

      <div class="relative group/main overflow-visible -mt-10">
        <div class="md:hidden absolute inset-y-0 left-0 z-20 flex items-center pl-2 pointer-events-none">
          <button v-if="canScrollLeft" @click="scroll('left')" class="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto border border-white active:scale-90 transition-all">
            <ChevronLeft class="w-5 h-5 text-slate-900" />
          </button>
        </div>
        <div class="md:hidden absolute inset-y-0 right-0 z-20 flex items-center pr-2 pointer-events-none">
          <button v-if="canScrollRight" @click="scroll('right')" class="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto border border-white active:scale-90 transition-all">
            <ChevronRight class="w-5 h-5 text-slate-900" />
          </button>
        </div>

        <div ref="carouselRef" @scroll="checkScroll" 
          class="flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-10 pb-16 overflow-visible"
          :style="{ 
            paddingLeft: isMobile ? leftPadding : desktopPadding,
            scrollPaddingLeft: isMobile ? leftPadding : desktopPadding
          }">
          <div v-for="item in cases" :key="item.id"
            class="flex-shrink-0 w-[78vw] md:w-[480px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] relative overflow-hidden snap-start cursor-pointer bg-slate-100 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group"
          >
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" :style="{ backgroundImage: `url(${item.img})` }"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div class="absolute top-8 left-8 right-8 z-10">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-3">{{ item.category }}</span>
              <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-sm">{{ item.title }}</h3>
            </div>
            <div class="absolute bottom-8 right-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <!-- 보류 -->
              <!-- <div class="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                <ArrowUpRight class="w-6 h-6 text-[#155dfc]" />
              </div> -->
            </div>
          </div>
          <div class="flex-shrink-0" :style="{ width: isMobile ? `calc(100vw - 78vw - ${leftPadding})` : `calc(100vw - 480px - ${desktopPadding})` }"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.tracking-tighter { letter-spacing: -0.05em; }
</style>