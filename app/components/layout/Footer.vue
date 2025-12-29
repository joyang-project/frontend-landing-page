<template>
  <footer class="bg-muted/30 border-t antialiased">
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 order-1 md:order-2">
          <div class="space-y-4">
            <h4 class="font-bold text-sm uppercase tracking-wider text-foreground">고객센터</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>전화: 053-267-0914</li>
              <li>휴대전화: 010-3294-3286</li>
              <li>이메일: hash3286@naver.com</li>
              <li>카카오톡 ID: hash3286</li>
            </ul>
          </div>
        </div>

        <div class="space-y-2 order-2 md:order-1">
          <NuxtImg
            src="/logo.svg"
            alt="조양냉난방시스템"
            fetchpriority="high"
            loading="eager"
            :modifiers="{ format: 'original' }"
            class="h-10 w-auto grayscale opacity-70 transition-opacity hover:opacity-100"
          />
          <div class="pt-2">
            <h4 class="font-bold text-sm uppercase tracking-wider text-foreground">조양냉난방시스템</h4>
          </div>
          <ul class="text-xs text-muted-foreground font-light">
            <li>사업자 등록번호: 248-24-00710</li>
            <li>대표자: 하세훈</li>
            <li>41727 대구 서구 옥산로 24</li>
          </ul>
          <div class="flex gap-4 text-muted-foreground">
          </div>
        </div>

      </div>

      <div class="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between gap-4">
        <p class="text-xs text-muted-foreground">
          © 2025 조양냉난방시스템. All rights reserved.
        </p>
      </div>
    </div>
    
    <div class="h-16 md:hidden"></div>
  </footer>
</template>