
import { Word } from '../types/game';

// Sabit kelime turları - Her tur için harfler ve kelimeler
export interface WordRound {
  letters: string[];
  words: string[];
}

const WORD_ROUNDS: WordRound[] = [
  {
    letters: ["A", "K", "E", "L", "I", "M", "O", "T", "?"],
    words: ["METABOLİK", "MELODİKA", "MELODİK", "METALİK", "KATOLİK", "AMELİYE", "MELODİ", "TEKİLA", "KALİTE", "MELİKE", "ETİMOL", "EMLAK", "METİL", "TEKİL", "KAMET", "MOTEL", "LOKMA"]
  },
  {
    letters: ["M", "E", "R", "K", "E", "T", "I", "?"],
    words: ["KERETİN", "MERTEK", "MERKEZ", "METRİK", "MİKTAR", "TEKMİL", "KERTME", "NETİCE", "TERİM", "TEKER", "METRE", "METİN", "İTMEK", "KEREM"]
  },
  {
    letters: ["D", "E", "I", "Z", "I", "R", "N", "E", "?"],
    words: ["DİZİNLERE", "DENİZERİ", "ZİNDERELİ", "DİZİLME", "ERİNDİR", "DERİNCİ", "DİRENİŞ", "EZDİRME", "DİZİNER", "EDİRNE", "DERİNİ", "DİZİNE", "ZİNDEN", "DİZİCİ", "DENİZ", "DİZİN", "DERİN", "DİREN", "ZİNDE", "ERDEN"]
  },
  {
    letters: ["P", "N", "A", "L", "T", "R", "I", "E", "?"],
    words: ["PLANETARY", "PANELİST", "PIRLANTA", "PANTERİ", "PLANTER", "ARPLİNE", "PANTER", "NEPTÜN", "REPLİK", "PLANET", "ERİTAN", "PELİN", "PARTİ", "PANEL", "ANTRE", "TALİP", "TERLİ", "LİNET"]
  },
  {
    letters: ["G", "E", "N", "C", "K", "E", "L", "I", "?"],
    words: ["GELENEKÇİ", "ÇENGELİNE", "GENELÇE", "ÇENEKLİ", "ÇELENLİ", "GENÇLİ", "ÇENGEL", "KEÇELİ", "İNEKÇE", "GELEN", "ÇELİK", "ÇENEK", "ENGEL", "NİKEL", "EKLEN"]
  },
  {
    letters: ["S", "A", "K", "N", "A", "T", "I", "L", "?"],
    words: ["SALTIKANAT", "SANTALİK", "KASATLI", "İNATSAL", "SİNYALİ", "ASKINTI", "TAKSİN", "İSTİKA", "KALSİT", "SAKİN", "LİSAN", "NAKİT", "SANKİ", "İSKAN", "ANTİK", "TALİK", "KASTİ"]
  },
  {
    letters: ["D", "E", "F", "M", "T", "E", "R", "I", "?"],
    words: ["DEFTERİMİ", "DEFTERLER", "DEFTERİM", "DEFTERİ", "DEMETLİ", "ERİTMEK", "MEDETLİ", "FERDİYE", "DEFTER", "METRİS", "METRİK", "ERİTME", "TERFİ", "DEMET", "TERFİ", "FERDİ", "METRE", "TERİM", "METİN", "LİDER", "DERME"]
  },
  {
    letters: ["O", "K", "I", "U", "L", "D", "A", "R", "?"],
    words: ["OKULLARDA", "OKURLAR", "DORUKLA", "ORDULUK", "KADROLU", "ODAKLAR", "KORUDAN", "KORDAL", "DUALIK", "DARLIK", "DORUK", "KADRO", "DOLAR", "KURAL", "KADİR", "ODALI", "RADYO", "DURAK"]
  },
  {
    letters: ["M", "E", "R", "N", "D", "I", "V", "E", "?"],
    words: ["MERDİVENLİ", "MERDİVENCİ", "VERİMLENME", "MERDİVEN", "DEVİRMEN", "ERDİRMEN", "DEVİRME", "ERDEMNİ", "EVİRMEK", "NEDİM", "MİNDERE", "MEDENİ", "MİNDER", "DERİME", "NEDİME", "VERİME", "MENDİL", "ERDEM", "DENİM", "DEVİR", "EVRİM", "VEREM", "DERİN", "ENDER"]
  },
  {
    letters: ["T", "O", "R", "P", "A", "C", "L", "A", "?"],
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
    .toUpperCase();
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
  const normalizedWord = normalizeChar(word.toUpperCase());

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
  return round.words.some(w => w.toUpperCase() === word.toUpperCase());
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
