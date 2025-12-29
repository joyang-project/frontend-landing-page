<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ShieldCheck, Zap, PenTool } from 'lucide-vue-next'

const scrollProgress = ref(0)
const handleScroll = () => {
  const scrollTop = window.scrollY
  scrollProgress.value = Math.min(scrollTop / 400, 1)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const strengths = [
  { title: '신뢰할 수 있는 시공', desc: '수년간의 현장 경험과 자격증을 보유한 전문 팀이 규격에 맞는 안전한 설비를 약속드립니다.', icon: ShieldCheck },
  { title: '세심한 서비스', desc: '상담부터 설치까지 전문 팀이 가장 신속하게 대응하여 불편을 최소화합니다.', icon: Zap },
  { title: '맞춤형 설계 컨설팅', desc: '공간의 특성과 용도를 고려하여 가장 효율적인 냉난방 시스템을 제안합니다.', icon: PenTool }
]

const heroRef = ref<HTMLElement | null>(null)
const strengthsRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)
const strengthsVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === heroRef.value && entry.isIntersecting) heroVisible.value = true
      if (entry.target === strengthsRef.value && entry.isIntersecting) strengthsVisible.value = true
    })
  }, { threshold: 0.1 })

  if (heroRef.value) observer.observe(heroRef.value)
  if (strengthsRef.value) observer.observe(strengthsRef.value)
})
</script>

<template>
  <div class="space-y-6 py-0 md:space-y-24 md:py-8 overflow-hidden">
    <section 
      ref="heroRef"
      class="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 min-h-[450px] md:min-h-[500px] gap-8 md:gap-0"
    >
      <div 
        class="space-y-4 md:space-y-6 max-w-2xl transition-all duration-1000 w-full"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <h2 class="text-4xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-foreground">
          공간의 가치를 바꾸는<br />
          <span class="text-[#155dfc]">시원한 솔루션</span>
        </h2>
        <p class="text-sm md:text-xl text-muted-foreground leading-relaxed">
          합리적인 가격으로 최고의 전문가들과 함께<br class="hidden md:block" />
          더 쾌적한 환경을 직접 경험해 보세요.
        </p>
      </div>

      <div class="flex justify-center w-full md:w-auto overflow-visible">
        <AirConditioner :active="heroVisible" :progress="scrollProgress" />
      </div>
    </section>

    <section 
      ref="strengthsRef" 
      class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-12"
    >
      <div 
        v-for="(item, idx) in strengths" :key="idx" 
        class="group p-6 md:p-8 rounded-3xl border bg-card hover:border-[#155dfc] transition-all duration-700 shadow-sm transform"
        :style="{ 
          transitionDelay: `${idx * 150}ms`,
          transform: strengthsVisible ? 'translateY(0)' : 'translateY(30px)',
          opacity: strengthsVisible ? 1 : 0
        }"
      >
        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#155dfc] flex items-center justify-center mb-6 group-hover:bg-[#155dfc] group-hover:text-white transition-all duration-500">
          <component :is="item.icon" class="w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold mb-3 tracking-tight">{{ item.title }}</h3>
        <p class="text-muted-foreground leading-relaxed text-sm md:text-lg">{{ item.desc }}</p>
      </div>
    </section>
  </div>
</template>