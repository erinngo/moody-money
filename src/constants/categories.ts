/**
 * next.js 에서 가장 안전한 방식
 * public/ 폴더 안에 두고 문자열 경로로 접근
 */

//카테고리 데이터 통합 관리
export const CATEGORY_ITEMS = [
  { label: "식비", icon: "/icons/food.png", color: "#f87171" },
  { label: "쇼핑", icon: "/icons/shopping.png", color: "#60A5FA" },
  { label: "카페/간식", icon: "/icons/cafe.png", color: "#34D399" },
  { label: "술/유흥", icon: "/icons/alchole.png", color: "#a78bfa" },
  { label: "자기관리", icon: "/icons/selfcare.png", color: "#fbbf24" },
  { label: "여행/나들이", icon: "/icons/travel.png", color: "#38bdf8" },
  { label: "선물/감정소비", icon: "/icons/gift.png", color: "#f472b6" },
  { label: "기타", icon: "/icons/etc.png", color: "#9ca3af" },
];

// color만 필요한 경우
/**
 * {
 * 식비: '#f87171,
 * 쇼핑: '#60A5FA',
 * ...
 * }
 */
export const CATEGORY_COLORS = CATEGORY_ITEMS.reduce((acc, item) => {
  acc[item.label] = item.color;
  return acc;
}, {} as Record<string, string>);
