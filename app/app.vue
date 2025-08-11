<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- 동적 배경 효과 -->
    <div class="absolute inset-0">
      <div class="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    
    <!-- 메인 컨테이너 -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- 헤더 -->
      <header class="text-center pt-16 pb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20">
          <span class="text-4xl">🎰</span>
        </div>
        <h1 class="text-6xl font-bold text-white mb-4 tracking-tight">
          <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Lucky Lotto
          </span>
        </h1>
        <p class="text-xl text-slate-300 font-light max-w-md mx-auto">
          AI가 분석하는 당신만의 특별한 로또 번호
        </p>
      </header>
      
      <!-- 메인 콘텐츠 -->
      <main class="flex-1 flex items-center justify-center px-4">
        <div class="w-full max-w-4xl">
          <MainPage />
        </div>
      </main>
      
      <!-- 푸터 -->
      <footer class="text-center py-8">
        <p class="text-slate-400 text-sm">
          운은 준비된 자에게 찾아옵니다 ✨
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import MainPage from '../components/MainPage.vue'

// 메타 태그 설정
useHead({
  title: 'Lucky Lotto - AI 로또 번호 추천',
  meta: [
    { name: 'description', content: 'AI가 분석하는 당신만의 특별한 로또 번호' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
/* 전역 스타일 리셋 */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background: transparent;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 텍스트 선택 스타일 */
::selection {
  background: rgba(168, 85, 247, 0.3);
  color: white;
}

/* 애니메이션 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 글래스모피즘 효과 */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
