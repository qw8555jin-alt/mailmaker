export function getEulReul(word: string): string {
  if (!word) return '를';
  const lastChar = word.charCodeAt(word.length - 1);
  
  // 한글이 아닌 경우 기본적으로 '를' 반환
  if (lastChar < 0xAC00 || lastChar > 0xD7A3) {
    return '를';
  }
  
  // 종성(받침) 유무 확인
  const hasJongseong = (lastChar - 0xAC00) % 28 > 0;
  return hasJongseong ? '을' : '를';
}
