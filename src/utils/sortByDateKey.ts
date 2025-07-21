/**
 * "M월 D일" 형태의 문자열 키를 실제 날짜로 변환 후 정렬
 * @param keys string[]  ["7월 15일", "6월 25일"]
 * @param year number    연도 (기본: 현재 연도)
 * @returns string[]     정렬된 배열
 */
export const sortByDateKey = (
  keys: string[],
  year: number = new Date().getFullYear()
) => {
  return keys.sort((a, b) => {
    const parseDate = (key: string) => {
      const [month, day] = key.replace(/월|일/g, "").trim().split(" ");
      return new Date(year, parseInt(month) - 1, parseInt(day)).getTime();
    };

    return parseDate(b) - parseDate(a); // 내림차순
  });
};
