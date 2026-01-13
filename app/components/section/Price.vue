<script setup lang="ts">
import { CheckCircle2, Info, Calculator, Zap, ThermometerSnowflake } from 'lucide-vue-next'

const priceData = [
  {
    category: '벽걸이 에어컨',
    items: [
      { spec: '9평 이하', price: '130,000', addPrice: '15,000', tag: '기본배관 5M', info: '진공작업 포함' },
      { spec: '11~16평', price: '150,000', addPrice: '20,000', tag: '기본배관 5M', info: '진공작업 포함' }
    ],
    theme: 'text-[#155dfc]',
    bg: 'bg-blue-50/50'
  },
  {
    category: '스탠드 에어컨',
    items: [
      { spec: '18평 이하', price: '170,000', addPrice: '20,000', tag: '기본배관 5M', info: '진공포함 / 전기작업 별도' },
      { spec: '40평 이하', price: '230,000', addPrice: '23,000', tag: '기본배관 5M', info: '진공포함 / 전기작업 별도' }
    ],
    theme: 'text-indigo-600',
    bg: 'bg-indigo-50/50'
  }
];

const ceilingSystem = {
  category: '천정형 시스템 냉난방기',
  price: '450,000',
  info: '기본배관 없음 / 드레인 및 전기작업 별도',
  notice: '모든 냉난방기 제품은 현장 상황에 따라 추가 금액 상담이 필요합니다.'
};
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-6 md:py-12 bg-white">
    <header class="text-left mb-6 md:mb-12">
      <h2 class="text-3xl md:text-6xl font-black tracking-tighter mb-4">
        투명하고 <span class="text-[#155dfc]">합리적인 비용</span>
      </h2>
      <p class="text-slate-500 text-sm md:text-xl font-medium tracking-tight">정찰제 기반의 정직한 시공 단가를 약속드립니다.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
      <div class="lg:col-span-8 space-y-6">
        <div v-for="(group, idx) in priceData" :key="idx" 
          class="rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="px-6 py-4 border-b border-slate-50 flex items-center justify-between" :class="group.bg">
            <h3 class="font-black text-lg md:text-xl flex items-center gap-2" :class="group.theme">
              <ThermometerSnowflake class="w-5 h-5" />
              {{ group.category }}
            </h3>
            <span class="text-[11px] font-bold text-slate-400">VAT 포함</span>
          </div>
          
          <div class="divide-y divide-slate-50">
            <div v-for="item in group.items" :key="item.spec" class="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-xl md:text-2xl font-black text-slate-900">{{ item.spec }}</span>
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">{{ item.tag }}</span>
                </div>
                <p class="text-sm text-slate-400 flex items-center gap-1">
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
                  {{ item.info }}
                </p>
              </div>
              
              <div class="flex items-end justify-between md:flex-col md:items-end md:justify-center">
                <div class="text-2xl md:text-3xl font-black text-[#1d1d1f]">
                  {{ item.price }}<span class="text-sm md:text-base font-bold ml-1 text-slate-500">원</span>
                </div>
                <div class="text-xs md:text-sm font-bold text-blue-600 mt-1">
                  배관 추가 1M당 {{ item.addPrice }}원
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 p-6 md:p-10 text-white relative overflow-hidden group">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <h3 class="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <Zap class="w-6 h-6 text-yellow-400 fill-yellow-400" />
                {{ ceilingSystem.category }}
              </h3>
              <p class="text-slate-400 text-sm md:text-base leading-relaxed">
                {{ ceilingSystem.info }}
              </p>
            </div>
            <div class="text-left md:text-right">
              <div class="text-3xl md:text-4xl font-black text-white italic">
                {{ ceilingSystem.price }}<span class="text-lg not-italic ml-1">원~</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 italic">현장별 맞춤 설계 견적</p>
            </div>
          </div>
          <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Calculator class="w-32 h-32 text-white" />
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div class="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 h-full">
          <h4 class="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Info class="w-5 h-5 text-[#155dfc]" />
            시공 안내사항
          </h4>
          <ul class="space-y-5">
            <li v-for="(note, i) in [
              '모든 냉난방기는 제품 특성상 사전 상담이 필수입니다.',
              '기본 배관 거리(5M) 초과 시 추가 단가가 발생합니다.',
              '전기공사, 타공, 앵글 설치 등 특수 환경은 별도 문의 바랍니다.',
              '진공작업은 기본 설치비에 포함되어 정석 시공합니다.'
            ]" :key="i" class="flex gap-3 items-start">
              <div class="w-1.5 h-1.5 rounded-full bg-[#155dfc] mt-2 shrink-0"></div>
              <p class="text-sm md:text-base text-slate-600 leading-snug font-medium">{{ note }}</p>
            </li>
          </ul>
          
          <div class="mt-10">
            <a href="tel:010-3294-3286" class="flex items-center justify-center w-full py-4 bg-[#155dfc] text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95">
              지금 바로 견적문의
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-tighter { letter-spacing: -0.05em; }
</style>