# Prompting Recipe 🍳

AI 프롬프트 작성을 쉽고 재미있게 배울 수 있는 웹 애플리케이션입니다.

---

## 주요 기능

- 분야별 AI 프롬프트 추천 및 튜토리얼
- ChatGPT 등 다양한 AI 모델 학습 체험
- 프롬프트 엔지니어링 기법(예: Few-shot, 역할 지정, CoT 등) 단계별 실습
- 커뮤니티(정보 공유, 창작 공간)
- 회원가입/로그인 및 OAuth 지원
- 인터랙티브한 UI/UX (커스텀 포인터, 픽셀화 효과, 애니메이션 등)

---

## 기술 스택

- React 19
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- FontAwesome
- OAuth2 (구글 등)
- 자체 REST API 연동

---

## 프로젝트 구조

```
.
├── public/                  # 정적 파일(이미지, 폰트, 비디오 등)
│   ├── images/
│   ├── fonts/
│   └── videos/
├── src/
│   ├── assets/              # 에셋(이미지 등)
│   ├── components/          # 공통/레이아웃/모달/애니메이션 컴포넌트
│   ├── contexts/            # 전역 상태관리 (AuthContext 등)
│   ├── pages/               # 라우트별 페이지 컴포넌트
│   ├── routes/              # 라우터 설정
│   ├── services/            # API/AI 서비스 모듈
│   ├── styles/              # Tailwind 및 커스텀 CSS
│   ├── App.jsx              # 루트 컴포넌트
│   └── main.jsx             # 엔트리포인트
├── .env.example             # 환경변수 예시
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 폴더별 설명

- **public/**: 앱에서 사용하는 정적 리소스(이미지, 폰트, 비디오 등)
- **src/assets/**: 소스 내에서 import하는 이미지 등 에셋
- **src/components/**: UI 컴포넌트(공통, 모달, 애니메이션, 레이아웃 등)
- **src/contexts/**: 전역 상태관리(Context API)
- **src/pages/**: 각 라우트별 페이지(메인, 로그인, 튜토리얼, 커뮤니티 등)
- **src/routes/**: 라우터 설정([`AppRouter`](src/routes/AppRouter.jsx) 등)
- **src/services/**: API 통신, AI 서비스 모듈([`apiService`](src/services/apiService.js), [`chatGPTService`](src/services/chatGPTService.js) 등)
- **src/styles/**: Tailwind 및 커스텀 CSS

---

## 실행 방법

```bash
npm install
npm run dev
```

- 개발 서버: http://localhost:5173 (Vite 기본 포트)
- 환경변수는 `.env.example` 참고

---

## 커스텀/주요 컴포넌트

- [`CustomPointer`](src/components/common/CustomPointer.jsx): 커스텀 마우스 포인터
- [`PixelateBubble`](src/components/common/PixelateBubble.jsx): 픽셀화 오버레이 효과
- [`IngredientModal`](src/components/common/IngredientModal.jsx): 프롬프트 학습 모달
- [`LearningInfoModal`](src/components/common/LearningInfoModal.jsx): AI 정보 안내 모달
- [`BlurCrossfade`](src/components/common/BlurCrossfade.jsx): 블러 트랜지션
- [`CircleExpandTransition`](src/components/common/CircleExpandTransition.jsx): 원형 확장 트랜지션

---

## 참고

- 폰트, 이미지 등은 `public/fonts`, `public/images`에 위치
- 주요 스타일은 [`src/styles/tailwind.css`](src/styles/tailwind.css) 및 [`src/styles/App.css`](src/styles/App.css) 참고
- API 연동 및 AI 응답 로직은 [`src/services`](src/services/) 폴더 참고

---