import { Word } from '../types/game';

export const WORDS: Word[] = [
  {
    word: 'BILGISAYAR',
    hint: 'Elektronik bir cihaz, program çalıştırır.'
  },
  {
    word: 'ISTANBUL',
    hint: 'Türkiye\'nin en kalabalık şehri.'
  },
  {
    word: 'KALEM',
    hint: 'Yazı yazmak için kullanılan araç.'
  },
  {
    word: 'PIZZA',
    hint: 'İtalya kökenli ünlü bir yemek.'
  },
  {
    word: 'ASLAN',
    hint: 'Ormanların kralı olarak bilinen hayvan.'
  }
];

export const getRandomWord = (): Word => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};
