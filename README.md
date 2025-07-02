# 감정 기반 가계부

React + Typescript + Vite

## 📌 프로젝트 기획 배경

“moody-money" 는 단순 지출 입력이 아니라 ‘왜 지출이 발생했는가’ 에 대해 되돌아보는데 도움을 주는 자기 관리 앱입니다.

감정상태와 소비를 함께 기록함으로써 자신만의 감정-소비 패턴을 시각적으로 인식하는데 도움을 줄 수 있습니다.

## 📌 MVP

[지출기록 + 감정태깅 → 시각화분석]

## 프젝젝트 구조

```
/src
├── components
│   ├── EmotionSelector.tsx
│   ├── EmotionList.tsx
│   └── EmotionChart.tsx
│
├── pages
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── Dashboard.tsx
│   ├── EmotionRecord.tsx     // 감정, 지출 기록
│   └── EmotionHistory.tsx    // 기록 내역
```

## 컴포넌트 상세

### EmotionSelector.tsx

지출 입력 페이지에서 감정을 선택하고 UI를 표시하는 핵심 컴포넌트

## 데이터

DB - FireStore
