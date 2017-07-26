import { randomNumber } from './randomNumber'
export function shuffleArray(imagesArray) {
  let temporaryValue,
      randomIndex,
      i = imagesArray.length;
  while (i !== 0) {
    randomIndex = randomNumber(imagesArray.length);
    i -= 1;
    temporaryValue = imagesArray[i];
    imagesArray[i] = imagesArray[randomIndex];
    imagesArray[randomIndex] = temporaryValue;
  }
  return imagesArray.slice(0, 20);
}
