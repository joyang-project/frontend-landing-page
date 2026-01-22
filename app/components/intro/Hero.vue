<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const router = useRouter()
const heroRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)

const { stop } = useIntersectionObserver(
  heroRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      heroVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 }
)

const goToTypes = () => {
  router.push('/types')
}
</script>

<template>
  <section ref="heroRef" class="relative min-h-[65vh] md:min-h-[680px] lg:min-h-[770px] flex items-center overflow-hidden w-full md:-mt-16 lg:-mt-20">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <NuxtImg 
        src="/images/hero-bg.webp" 
        format="webp"
        quality="80"
        sizes="sm:100vw md:100vw lg:1400px"
        width="1920"
        height="990"
        fetchpriority="high"
        preload
        alt="조양냉난방시스템 메인 배경"
        class="w-full h-full object-cover opacity-100" 
      />
      <div class="absolute inset-0 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/40 md:to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-[1236px] mx-auto px-5 md:px-12 w-full pt-12 md:pt-20">
      <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-10 max-w-4xl transition-all duration-1000 w-full" 
           :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
        
        <div class="space-y-4 md:space-y-6">
          <h2 class="text-[2.6rem] md:text-6xl lg:text-7xl font-black leading-[1.15] md:leading-[1.1] tracking-tighter text-white drop-shadow-2xl">
            공간의 가치를 바꾸는<br />
            <span class="text-[#4b89ff]">조양냉난방시스템</span>
          </h2>
          <p class="text-base md:text-xl text-slate-100 leading-relaxed font-semibold max-w-xl mx-auto md:mx-0 drop-shadow-lg">
            합리적인 가격으로 최고의 전문가들과 함께<br />
            더 쾌적한 환경을 직접 경험해 보세요.
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-3 md:gap-4 pt-2 w-full md:w-auto">
          <a href="tel:010-3294-3286" 
             class="flex items-center justify-center px-8 py-4.5 bg-white text-[#1d1d1f] rounded-2xl font-bold text-lg hover:bg-[#155dfc] hover:text-white transition-all shadow-2xl active:scale-95 w-full md:w-auto">
            바로 무료 상담하기
          </a>
          
          <button 
            @click="goToTypes" 
            class="flex items-center justify-center gap-2 px-8 py-4.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all group w-full md:w-auto cursor-pointer"
          >
            설치 유형 보기 
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
      <ChevronDown class="w-8 h-8 text-white/50" />
    </div>
  </section>
</template>

<style scoped>
.drop-shadow-2xl {
  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5));
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}
</style>