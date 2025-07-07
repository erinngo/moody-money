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
│   └── EmotionHistory.tsx    // 기록 내역 , 차트분석
|
|__ utils
|    ├── pages
```

## 페이지 상세

### EmotionRecord.tsx

- addDoc (fireStore에 데이터 추가)

### EmotionHistory.tsx (시각화 핵심 페이지)

- getDocs (fireStore에서 데이터 가져오기)

```
EmotionHistory 페이지 와이어프레임

[ 감정 소비 분석 📊 ]

1. [ 감정 Pie Chart ]
   😊 기쁨 20% / 😡 스트레스 35% ...

2. [ 감정 × 카테고리 Bar Chart ]
   - 스트레스 → 쇼핑: 5건, 식비: 3건
   - 충동 → 쇼핑: 4건, 기타: 2건

3. [ 감정 지출 내역 리스트 ]
   - 7/1 스트레스 | ₩12,000 | 쇼핑 | "너무 힘들어서 쇼핑"
   - 6/28 기쁨 | ₩5,000 | 커피 | "혼카페 좋음"

```

## 컴포넌트 상세

### EmotionSelector.tsx

지출 입력 페이지에서 감정을 선택하고 UI를 표시하는 핵심 컴포넌트

### EmotionBarChart.tsx

(감정 x 카테고리) 매트릭스
감정별로 어떤 카테고리에 지출이 집중됐는가?

## 데이터

DB - FireStore
