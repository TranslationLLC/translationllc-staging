import { randomNumber } from './randomNumber'
export function shuffleArray(translatorImagesArray, imagesArray) {
  let newArray = [],
      temporaryValue,
      randomIndex,
      urlToAdd,
      i = 0;
  while(i < 21) {
    if (i >= 17) {
      randomIndex = randomNumber(translatorImagesArray.length);
      urlToAdd = translatorImagesArray[randomIndex];
      translatorImagesArray.splice(randomIndex, 1);
    } else {
      randomIndex = randomNumber(imagesArray.length);
      urlToAdd = imagesArray[randomIndex];
      imagesArray.splice(randomIndex, 1);
    }
    newArray.push(urlToAdd);
    i++;
  }
  i = newArray.length;
  while (i !== 0) {
    randomIndex = randomNumber(newArray.length);
    i -= 1;
    temporaryValue = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }
  return newArray;
}
