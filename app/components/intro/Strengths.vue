<script setup lang="ts">
import { ShieldCheck, Zap, PenTool } from 'lucide-vue-next'

const strengthsRef = ref<HTMLElement | null>(null)
const strengthsVisible = ref(false)

interface Strength {
  title: string
  desc: string
  icon: any
  highlight?: boolean
}

const strengths: Strength[] = [
  { 
    title: '신뢰할 수 있는 시공', 
    desc: '수년간의 현장 경험과 자격증을 보유한 전문 팀이 규격에 맞는 안전한 설비를 약속드립니다.', 
    icon: ShieldCheck,
    highlight: true
  },
  { title: '세심한 서비스', desc: '상담부터 설치까지 전문 팀이 가장 신속하게 대응하여 불편을 최소화합니다.', icon: Zap },
  { title: '맞춤형 설계 컨설팅', desc: '공간의 특성과 용도를 고려하여 가장 효율적인 냉난방 시스템을 제안합니다.', icon: PenTool },
  { title: '안심할 수 있는 A/S', desc: '설치가 끝이 아닌 유지관리를 통해 안정적인 서비스를 제공합니다.', icon: PenTool }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      strengthsVisible.value = true
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.1 })
  if (strengthsRef.value) observer.observe(strengthsRef.value)
})
</script>

<template>
  <div class="max-w-[1236px] mx-auto px-5 md:px-12 py-12 md:py-20">
    <section ref="strengthsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div v-for="(item, idx) in strengths" :key="idx" 
        class="group p-6 md:p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#155dfc] transition-all duration-700 shadow-sm"
        :style="{ transitionDelay: `${idx * 150}ms`, transform: strengthsVisible ? 'translateY(0)' : 'translateY(40px)', opacity: strengthsVisible ? 1 : 0 }">
        
        <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
          <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-white text-[#155dfc] flex items-center justify-center shadow-sm group-hover:bg-[#155dfc] group-hover:text-white transition-all duration-500">
            <component :is="item.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold tracking-tight md:mt-6 transition-colors duration-500"
              :class="item.highlight ? 'text-[#155dfc]' : 'text-slate-900'">
            {{ item.title }}
          </h3>
        </div>
        <p class="text-slate-600 leading-relaxed text-lg md:text-xl font-semibold tracking-tight">
          {{ item.desc }}
        </p>
      </div>
    </section>
  </div>
</template>