
import { Word } from '../types/game';

// Sabit kelime turları - Her tur için harfler ve kelimeler
export interface WordRound {
  letters: string[];
  words: string[];
}

const WORD_ROUNDS: WordRound[] = [
  {
    letters: ["A", "K", "E", "L", "İ", "M", "O", "T", "?"],
    words: ["METABOLİK", "MELODİKA", "MELODİK", "METALİK", "KATOLİK", "AMELİYE", "MELODİ", "TEKİLA", "KALİTE", "MELİKE", "ETİMOL", "EMLAK", "METİL", "TEKİL", "KAMET", "MOTEL", "LOKMA"],
  },
  {
    letters: ["M", "R", "K", "İ", "E", "E", "T", "N", "?"],
    words: ["KERETİN", "MERTEK", "MERKEZ", "METRİK", "MİKTAR", "TEKMİL", "KERTME", "NETİCE", "TERİM", "TEKER", "METRE", "METİN", "İTMEK", "KEREM"],
  },
  {
    letters: ["A", "A", "L", "R", "T", "S", "M", "K", "?"],
    words: ["SARILMAK", "SARSILMA", "KARTALSI", "SARILMA", "KATILMA", "SARILIK", "REKLAMSI", "TASARIM", "SARMAK", "KARTAL", "REKLAM", "SARILI", "MASTAR", "TERMAL", "EMLAK", "RASAT", "ISLAK", "METAL", "TARIM", "KASIM", "KART", "ALMA", "SARI", "TERS", "MERT", "KISA"],
  },
  {
    letters: ["A", "E", "I", "N", "R", "P", "T", "Ş", "?"],
    words: ["ARAŞTIRI", "PIRLANTA", "YAPIŞAN", "TANIŞMA", "ARAŞTIR", "PANTER", "ŞARTLI", "PAŞİNA", "ARŞIN", "NASIR", "RATIP", "RANT", "ARŞI", "ATIŞ", "PARE", "ŞART"],
  },
  {
    letters: ["U", "O", "N", "K", "L", "T", "R", "S", "?"],
    words: ["KORSANLIK", "SOLUNMAK", "KONTUAR", "SOKRATİK", "KORUNAK", "SOKULMA", "KUTLAMA", "KORUNMA", "KORSAN", "KONTUR", "KUTSAL", "SOLAK", "KONUT", "SOLUK", "SORUN", "TORUN", "SOKRA", "SONLU", "KURS", "STOK", "ONLU", "KORU", "SORT", "ROTA"],
  },
  {
    letters: ["E", "İ", "A", "Ö", "S", "Ş", "Y", "L", "?"],
    words: ["SÖYLEŞME", "SÖYLEŞİ", "SÖYLEYİŞ", "SAYIŞMA", "SÖYLEŞ", "SÖYLEY", "SÖYLE", "SAYİŞ", "İŞLEY", "YAYIŞ", "SAYE", "YEİS", "ÖYLE", "EŞYA", "ŞASİ", "ŞİYE"],
  },
  {
    letters: ["D", "E", "M", "F", "T", "E", "R", "İ", "?"],
    words: ["DEFTERİMİ", "DEFTERLER", "DEFTERİM", "DEFTERİ", "DEMETLİ", "ERİTMEK", "FERDİYE", "DEFTER", "METRİS", "METRİK", "ERİTME", "TERFİ", "DEMET", "TERFİ", "FERDİ", "METRE", "TERİM", "METİN", "LİDER", "DERME"],
  },
  {
    letters: ["O", "K", "İ", "L", "U", "D", "A", "R", "?"],
    words: ["OKULLARDA", "OKURLAR", "DORUKLA", "ORDULUK", "KADROLU", "ODAKLAR", "KORUDAN", "KORDAL", "DUALIK", "DARLIK", "DORUK", "KADRO", "DOLAR", "KURAL", "KADİR", "ODALI", "RADYO", "DURAK"],
  },
  {
    letters: ["M", "E", "N", "R", "V", "E", "D", "İ", "?"],
    words: ["MERDİVENLİ", "MERDİVENLİ", "MERDİVENCİ", "VERİMLENME", "MERDİVEN", "DEVİRMEN", "DEVİRME", "ERDEMNİ", "EVİRMEK", "NEDİM", "MİNDERE", "ERDİRME", "MEDENİ", "MİNDER", "DERİME", "NEDİME", "VERİME", "MENDİL", "ERDEM", "DENİM", "DEVİR", "EVRİM", "VEREM", "DERİN", "ENDER"],
  },
  {
    letters: ["T", "O", "C", "L", "A", "R", "P", "A", "?"],
    words: ["TOPARLACIK", "TOPARLAMA", "TOPARLAKÇA", "TOPARLA", "APORTTA", "TOPLAMA", "PAROLA", "TOPRAK", "PAÇALI", "TORLAK", "TOPAL", "APORT", "TOPLA", "POLAR", "PLATO", "ÇALAP", "TOPAÇ"],
  },
];



let currentRoundIndex = 0;

export interface WordRoundData {
  roundNumber: number;
  letters: string[];
  availableWords: string[];
}

/**
 * Get the current word round
 */
export function getCurrentWordRound(): WordRoundData {
  const round = WORD_ROUNDS[currentRoundIndex];
  return {
    roundNumber: currentRoundIndex + 1,
    letters: [...round.letters],
    availableWords: [...round.words],
  };
}

/**
 * Move to next round
 */
export function nextWordRound(): WordRoundData {
  currentRoundIndex = (currentRoundIndex + 1) % WORD_ROUNDS.length;
  return getCurrentWordRound();
}

/**
 * Reset to first round
 */
export function resetWordRounds(): void {
  currentRoundIndex = 0;
}

/**
 * Get total number of rounds
 */
export function getTotalRounds(): number {
  return WORD_ROUNDS.length;
}

/**
 * Normalize Turkish characters to their base forms for flexible matching
 */
function normalizeChar(char: string): string {
  return char
    .replace(/İ/g, 'I')
    .replace(/ı/g, 'I')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ş/g, 'S')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C')
    .toLocaleUpperCase('tr-TR');
}

/**
 * Check if a word can be formed from given letters
 */
export function canFormWord(word: string, letters: string[]): boolean {
  const letterCount = new Map<string, number>();

  // Count available letters
  for (const letter of letters) {
    if (letter === '?') {
      // Joker handled by UI replacement or treated as wild in advanced logic?
      // The requirement is: "jokere basınca soru işareti olan kutuya istedigi harfi yazabılsın"
      // This implies the UI passes the *modified* letter list to this function.
      // However, just in case, we can treat '?' as wildcard here OR rely on caller.
      // Given the UI plan, the caller will replace '?' with the user's choice.
      // But let's support '?' as a wildcard just in case caller doesn't replace it yet (e.g. initial check).
      // Actually no, strict checking is better. If '?' is passed, it counts as '?'.
      // But wait, we need to match I to İ.
      const normalized = normalizeChar(letter);
      letterCount.set(normalized, (letterCount.get(normalized) || 0) + 1);
    } else {
      const normalized = normalizeChar(letter);
      letterCount.set(normalized, (letterCount.get(normalized) || 0) + 1);
    }
  }

  // Check if word can be formed
  const normalizedWord = normalizeChar(word.toLocaleUpperCase('tr-TR'));

  // Create a copy of counts to simulate consumption
  const currentCounts = new Map(letterCount);

  let jokerCount = currentCounts.get('?') || 0; // If '?' was literally passed

  for (const char of normalizedWord) {
    const count = currentCounts.get(char) || 0;
    if (count > 0) {
      currentCounts.set(char, count - 1);
    } else if (jokerCount > 0) {
      // Use a wildcard if we have one in the letters array
      jokerCount--;
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Validate if the word exists in current round's word list
 */
export function isValidWord(word: string): boolean {
  const round = WORD_ROUNDS[currentRoundIndex];
  // Strict match on the word list, but maybe case insensitive
  return round.words.some(w => w.toLocaleUpperCase('tr-TR') === word.toLocaleUpperCase('tr-TR'));
}

/**
 * Get word length for scoring
 */
export function getWordScore(word: string): number {
  const length = word.length;
  if (length >= 9) return 15;
  if (length === 8) return 12;
  if (length === 7) return 10;
  if (length === 6) return 8;
  if (length === 5) return 5;
  if (length === 4) return 3;
  return 1;
}

// Legacy support - re-exporting imported type
export type { Word };

export const WORDS: Word[] = [];

export const getRandomWord = (): Word => {
  return { word: '', hint: '' };
};
