<script setup lang="ts">
import { CheckCircle2, Info, Calculator, PhoneCall } from 'lucide-vue-next'

interface PriceItem {
  spec: string;
  price: string;
  addPrice: string;
  tag: string;
  info: string;
  notice?: string;
}

interface PriceGroup {
  category: string;
  items: PriceItem[];
  accent: string;
}

const priceData: PriceGroup[] = [
  {
    category: '벽걸이 에어컨',
    items: [
      { spec: '9평 이하', price: '130,000', addPrice: '15,000', tag: '기본 5M', info: '진공작업 포함' },
      { spec: '11~16평', price: '150,000', addPrice: '20,000', tag: '기본 5M', info: '진공작업 포함' }
    ],
    accent: '#155dfc'
  },
  {
    category: '스탠드 에어컨',
    items: [
      { spec: '18평 이하', price: '170,000', addPrice: '20,000', tag: '기본 5M', info: '진공작업 포함', notice: '전기작업 별도' },
      { spec: '40평 이하', price: '230,000', addPrice: '23,000', tag: '기본 5M', info: '진공작업 포함', notice: '전기작업 별도' }
    ],
    accent: '#4f46e5'
  }
];

const ceilingSystem = {
  category: '천정형 시스템 냉난방기',
  price: '450,000',
  info: '기본배관 미포함 / 드레인 및 전기작업 별도',
};
</script>

<template>
  <section class="max-w-[1236px] mx-auto px-5 py-8 md:py-16 bg-white">
    <header class="mb-12 md:mb-20 text-center md:text-left">
      <div class="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-[#155dfc] text-xs md:text-sm font-bold tracking-wider uppercase">
        시공 가격
      </div>
      <h2 class="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
        투명하고 <span class="text-[#155dfc]">합리적인 비용</span>
      </h2>
      <p class="text-slate-500 text-lg md:text-xl font-medium tracking-tight">정찰제 기반의 정직한 시공 단가를 약속드립니다.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="lg:col-span-8 space-y-16">
        <div v-for="(group, idx) in priceData" :key="idx" class="group">
          <div class="flex items-end justify-between mb-5 px-1">
            <h3 class="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
              <span class="w-1.5 h-8 rounded-full" :style="{ backgroundColor: group.accent }"></span>
              {{ group.category }}
            </h3>
            <span class="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase px-2 py-1 border border-slate-100 rounded">VAT 포함</span>
          </div>

          <div class="bg-white border-y-2 border-slate-900 overflow-hidden">
            <div class="hidden md:grid grid-cols-12 bg-slate-50/80 px-8 py-5 border-b border-slate-200">
              <div class="col-span-6 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] text-left">모델 및 시공규격</div>
              <div class="col-span-3 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] text-left">기본 설치비</div>
              <div class="col-span-3 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] text-left pl-4">배관 추가 (1M당)</div>
            </div>

            <div class="divide-y divide-slate-100">
              <div v-for="(item, i) in group.items" :key="i" 
                class="grid grid-cols-12 items-center px-6 md:px-8 py-8 md:py-10 transition-colors hover:bg-slate-50/50 group/row">
                
                <div class="col-span-12 md:col-span-6 mb-8 md:mb-0">
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover/row:text-[#155dfc] transition-colors">{{ item.spec }}</span>
                    <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">{{ item.tag }}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-y-2 text-slate-400 text-xs font-semibold">
                    <div class="flex items-center gap-1.5 uppercase">
                      <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
                      {{ item.info }}
                    </div>
                    <div v-if="item.notice" class="flex items-center">
                      <span class="inline-block w-1 h-1 rounded-full bg-slate-300 mx-4"></span>
                      <span class="font-medium text-slate-400">{{ item.notice }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-span-6 md:col-span-3 text-left border-r md:border-none border-slate-100 pr-4">
                  <span class="block md:hidden text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">기본 설치비</span>
                  <div class="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                    {{ item.price }}<span class="text-xs font-bold ml-1 text-slate-400">원</span>
                  </div>
                </div>

                <div class="col-span-6 md:col-span-3 text-left pl-6 md:pl-4">
                  <span class="block md:hidden text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">배관 추가(1m)</span>
                  <div class="text-xl md:text-2xl font-black tracking-tight" :style="{ color: group.accent }">
                    <span class="mr-0.5 text-lg font-bold">+</span>{{ item.addPrice }}<span class="text-xs font-bold ml-0.5">원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative rounded-[2rem] bg-slate-900 p-8 md:p-10 lg:p-12 text-white overflow-hidden shadow-2xl group">
          <div class="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 lg:gap-8">
            <div class="space-y-3 lg:space-y-4">
              <h3 class="text-xl md:text-2xl lg:text-3xl font-black tracking-tight break-keep leading-tight">
                {{ ceilingSystem.category }}
              </h3>
              <p class="text-slate-400 text-xs md:text-sm lg:text-base font-medium leading-relaxed max-w-xl opacity-90">
                {{ ceilingSystem.info }}
              </p>
            </div>
            
            <div class="xl:text-right border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-1 xl:pl-10 shrink-0">
              <div class="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white whitespace-nowrap">
                {{ ceilingSystem.price }}<span class="text-sm md:text-base not-italic ml-1.5 text-white font-bold uppercase">원~</span>
              </div>
            </div>
          </div>
          <Calculator class="absolute -right-12 -bottom-12 w-64 h-64 text-white/[0.02] -rotate-12 transition-transform duration-1000 group-hover:rotate-0 pointer-events-none" />
        </div>
      </div>

      <aside class="lg:col-span-4">
        <div class="sticky top-24 space-y-6">
          <div class="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm">
            <h4 class="text-xl font-black text-slate-900 mb-8 md:mb-10 flex items-center gap-2">
              <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 text-[#155dfc]">
                <Info class="w-5 h-5" />
              </span>
              시공 필독사항
            </h4>
            
            <div class="space-y-5 md:space-y-8">
              <div v-for="(note, i) in [
                '정확한 견적은 현장 방문 상담 후 확정됩니다.',
                '기본 배관(5M) 초과 시 규격별 추가금 발생',
                '전기공사, 타공, 크레인 등은 별도 견적입니다.',
                '진공작업 및 누설 검사는 정석 시공 포함입니다.'
              ]" :key="i" class="flex gap-3 items-start">
                <div class="w-5 h-5 rounded-full bg-white text-[#155dfc] border border-slate-200 shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                  <span class="text-[10px] font-black">{{ i + 1 }}</span>
                </div>
                <p class="text-[13px] sm:text-sm md:text-base text-slate-600 leading-tight md:leading-snug font-semibold tracking-tighter break-keep">
                  {{ note }}
                </p>
              </div>
            </div>

            <div class="mt-10 pt-8 border-t border-slate-200 text-center">
              <a href="tel:010-3294-3286" class="flex items-center justify-center gap-3 w-full py-5 bg-[#155dfc] text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98] group">
                <PhoneCall class="w-5 h-5 group-hover:animate-bounce" />
                지금 바로 문의하기
              </a>
              <p class="text-[11px] text-slate-400 mt-5 font-bold tracking-widest uppercase">친절한 상담을 약속드립니다 :)</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight { letter-spacing: -0.02em; }
@media (min-width: 1024px) {
  .tracking-tighter { letter-spacing: -0.06em; }
}
</style>