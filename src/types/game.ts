export interface Word {
  word: string;
  hint: string;
}

export interface LetterState {
  letter: string; // Kullanıcının girdiği harf veya ipucuyla açığa çıkan harf
  correctLetter: string; // Kelimenin orijinal harfi
  revealed: boolean;
  isInvalid?: boolean;
  isCorrect?: boolean;
}
