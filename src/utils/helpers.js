export const assertBetween = (min, max, value) => Math.min(max, Math.max(min, value))

export const NUMBER_FORMAT = new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})

var isFirefox = typeof InstallTrigger !== 'undefined';
export const format = (value) => {
  if (isFirefox) return NUMBER_FORMAT.format(value)
  return value.toFixed(2).toLocaleString(value)
}

export function steelAreaInBending(height, width, momentSd, fck, cover) {
  let diameter = 0.02
  let steelArea

  let isVerified = false
  while (!isVerified) {
    const usefulHeight = (height - cover - diameter*100/20 - 0.8)/100;
    const [alphac, lamb] = (fck <= 50) 
      ? [0.85, 0.8] 
      : [0.85 * (1 - (fck - 50) / 200), 0.8 - (fck - 50) / 400]
  
    const xRoot = (usefulHeight**2 - (2.8 * momentSd) / width / alphac / (fck*100) ) ** 0.5;
    const x = (usefulHeight - xRoot) / lamb;
    const z = usefulHeight - 0.5 * lamb * x;
    steelArea = (momentSd / z / 5) * 1.15;
    const dom = (x / usefulHeight < 0.259) ? 2 : 3;
  
    // TODO - verifications
    isVerified = true
    if (isVerified) console.log(
      `Momento: ${momentSd*10} tfm, 
      Área de aço: ${steelArea} cm², 
      Domínio: ${dom}` 
    )
  }
  
  return steelArea;
}
