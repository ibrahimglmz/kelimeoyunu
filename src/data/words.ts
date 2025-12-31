import { Word } from '../types/game';

// Sabit kelime turları - Her tur için harfler ve kelimeler
export interface WordRound {
  letters: string[];
  words: string[];
}

const WORD_ROUNDS: WordRound[] = [
  {
    letters: ["K", "İ", "E", "A", "E", "D", "M", "K", "L", "B", "T", "O", "Y"],
    words: ["METABOLİK", "MELODİKA", "MELODİK", "METALİK", "KATOLİK", "AMELİYE", "MELODİ", "TEKİLA", "KALİTE", "MELİKE", "ETİMOL", "EMLAK", "METİL", "TEKİL", "KAMET", "MOTEL", "LOKMA"]
  },
  {
    letters: ["İ", "L", "E", "M", "A", "C", "R", "N", "K", "E", "T", "Z"],
    words: ["KERETİN", "MERTEK", "MERKEZ", "METRİK", "MİKTAR", "TEKMİL", "KERTME", "NETİCE", "TERİM", "TEKER", "METRE", "METİN", "İTMEK", "KEREM"]
  },
  {
    letters: ["M", "E", "N", "İ", "R", "L", "D", "İ", "E", "C", "Z", "Ş", "N", "R", "İ"],
    words: ["DİZİNLERE", "DENİZERİ", "ZİNDERELİ", "DİZİLME", "ERİNDİR", "DERİNCİ", "DİRENİŞ", "EZDİRME", "DİZİNER", "EDİRNE", "DERİNİ", "DİZİNE", "ZİNDEN", "DİZİCİ", "DENİZ", "DİZİN", "DERİN", "DİREN", "ZİNDE", "ERDEN"]
  },
  {
    letters: ["A", "E", "A", "I", "K", "İ", "T", "N", "S", "L", "Ü", "Y", "R", "P", "N"],
    words: ["PLANETARY", "PANELİST", "PIRLANTA", "PANTERİ", "PLANTER", "ARPLİNE", "PANTER", "NEPTÜN", "REPLİK", "PLANET", "ERİTAN", "PELİN", "PARTİ", "PANEL", "ANTRE", "TALİP", "TERLİ", "LİNET"]
  },
  {
    letters: ["E", "L", "İ", "L", "K", "N", "N", "E", "E", "G", "Ç"],
    words: ["GELENEKÇİ", "ÇENGELİNE", "GENELÇE", "ÇENEKLİ", "ÇELENLİ", "GENÇLİ", "ÇENGEL", "KEÇELİ", "İNEKÇE", "GELEN", "ÇELİK", "ÇENEK", "ENGEL", "NİKEL", "EKLEN"]
  },
  {
    letters: ["İ", "N", "L", "A", "T", "İ", "S", "I", "I", "T", "A", "Y", "A", "K"],
    words: ["SALTIKANAT", "SANTALİK", "KASATLI", "İNATSAL", "SİNYALİ", "ASKINTI", "TAKSİN", "İSTİKA", "KALSİT", "SAKİN", "LİSAN", "NAKİT", "SANKİ", "İSKAN", "ANTİK", "TALİK", "KASTİ"]
  },
  {
    letters: ["D", "İ", "İ", "M", "N", "S", "R", "E", "E", "R", "Y", "E", "T", "L", "K", "F"],
    words: ["DEFTERİMİ", "DEFTERLER", "DEFTERİM", "DEFTERİ", "DEMETLİ", "ERİTMEK", "MEDETLİ", "FERDİYE", "DEFTER", "METRİS", "METRİK", "ERİTME", "TERFİ", "DEMET", "FERDİ", "METRE", "TERİM", "METİN", "LİDER", "DERME"]
  },
  {
    letters: ["L", "A", "I", "Y", "U", "D", "O", "R", "N", "L", "A", "K", "U", "İ", "R"],
    words: ["OKULLARDA", "OKURLAR", "DORUKLA", "ORDULUK", "KADROLU", "ODAKLAR", "KORUDAN", "KORDAL", "DUALIK", "DARLIK", "DORUK", "KADRO", "DOLAR", "KURAL", "KADİR", "ODALI", "RADYO", "DURAK"]
  },
  {
    letters: ["C", "M", "M", "E", "V", "L", "İ", "E", "İ", "N", "R", "R", "E", "D", "K"],
    words: ["MERDİVENLİ", "MERDİVENCİ", "VERİMLENME", "MERDİVEN", "DEVİRMEN", "ERDİRMEN", "DEVİRME", "ERDEMNİ", "EVİRMEK", "NEDİM", "MİNDERE", "MEDENİ", "MİNDER", "DERİME", "NEDİME", "VERİME", "MENDİL", "ERDEM", "DENİM", "DEVİR", "EVRİM", "VEREM", "DERİN", "ENDER"]
  },
  {
    letters: ["P", "A", "M", "Ç", "K", "O", "A", "I", "L", "C", "R", "T", "A"],
    words: ["TOPARLACIK", "TOPARLAMA", "TOPARLAKÇA", "TOPARLA", "APORTLA", "PAÇALAR", "TOPLAMA", "PAROLA", "TOPRAK", "PAÇALI", "TORLAK", "TOPAL", "APORT", "TOPLA", "POLAR", "PLATO", "ÇALAP", "TOPAÇ"]
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
    availableWords: [...round.words]
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
 * Check if a word can be formed from given letters
 */
export function canFormWord(word: string, letters: string[]): boolean {
  const letterCount = new Map<string, number>();

  // Count available letters
  for (const letter of letters) {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  }

  // Check if word can be formed
  for (const char of word) {
    const count = letterCount.get(char) || 0;
    if (count === 0) {
      return false;
    }
    letterCount.set(char, count - 1);
  }

  return true;
}

/**
 * Validate if the word exists in current round's word list
 */
export function isValidWord(word: string): boolean {
  const round = WORD_ROUNDS[currentRoundIndex];
  return round.words.includes(word.toUpperCase());
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
