# 🔮 사주로또

당신의 사주를 바탕으로 주간 운세와 로또 번호를 제공하는 웹 서비스입니다.

## ✨ 주요 기능

- **사용자 정보 입력**: 생년월일, 성별, 태어난 시간 입력
- **주간 운세**: 요일별 상세한 운세 제공
- **로또 번호 추천**: 사주 기반 로또 번호 5세트 추천
- **결과 공유**: 운세 결과 복사 기능
- **아름다운 UI**: 모던하고 직관적인 사용자 인터페이스
- **AI/샘플 데이터 구분**: 실제 AI 생성 데이터와 샘플 데이터를 명확히 구분

## 🛠 기술 스택

- **Frontend**: Nuxt 3 (Vue 3 + Composition API)
- **Styling**: TailwindCSS
- **AI**: OpenAI GPT-4o
- **Icons**: Heroicons

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 OpenAI API 키를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**⚠️ 중요**: API 키가 설정되지 않으면 샘플 데이터가 반환됩니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드 및 배포
```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
luckylotto/
├── app/
│   └── app.vue                 # 메인 앱 컴포넌트
├── components/
│   ├── MainPage.vue           # 메인 페이지 컴포넌트
│   ├── InputForm.vue          # 사용자 입력 폼
│   ├── LoadingSpinner.vue     # 로딩 스피너
│   └── ResultView.vue         # 결과 표시 컴포넌트
├── server/
│   └── api/
│       └── fortune.ts         # OpenAI API 엔드포인트
├── nuxt.config.ts             # Nuxt 설정
└── package.json
```

## 🎯 사용 방법

1. **정보 입력**: 생년월일, 성별, 태어난 시간을 입력합니다
2. **운세 생성**: "운세 보기" 버튼을 클릭하여 AI가 분석합니다
3. **결과 확인**: 요일별 운세와 로또 번호를 확인합니다
4. **결과 공유**: "결과 복사" 버튼으로 결과를 클립보드에 복사합니다
5. **다시하기**: "다시하기" 버튼으로 처음부터 다시 시작합니다

## 🤖 AI 데이터 vs 샘플 데이터

### AI 생성 데이터 (🤖)
- OpenAI API 키가 올바르게 설정된 경우
- 사용자의 개인 정보를 바탕으로 맞춤형 분석
- 실제 AI가 생성한 로또 번호와 운세
- 결과 화면에 "AI 생성 데이터" 배지 표시

### 샘플 데이터 (🔧)
- OpenAI API 키가 설정되지 않은 경우
- 서버 오류나 네트워크 문제 발생 시
- AI 응답 파싱 실패 시
- 결과 화면에 "샘플 데이터" 배지 표시

## 🔐 보안

- OpenAI API 키는 서버 사이드에서만 사용됩니다
- 클라이언트에 API 키가 노출되지 않습니다
- 환경 변수를 통해 안전하게 관리됩니다

## 📱 호환성

- Chrome, Firefox, Safari, Edge 지원
- 모바일 브라우저 지원
- 반응형 디자인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## ⚠️ 주의사항

- 이 서비스는 재미를 위한 것이며, 실제 로또 당첨을 보장하지 않습니다
- 운세는 참고용이며, 중요한 결정은 신중하게 내려주세요
- OpenAI API 사용량에 따른 비용이 발생할 수 있습니다
- API 키가 없어도 샘플 데이터로 서비스를 체험할 수 있습니다
