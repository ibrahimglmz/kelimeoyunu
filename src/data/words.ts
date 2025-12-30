import { Word } from '../types/game';

// Sabit kelime turları - Her tur için harfler ve kelimeler
export interface WordRound {
  letters: string[];
  words: string[];
}

const WORD_ROUNDS: WordRound[] = [
  {
    letters: ['S', 'A', 'İ', 'T', 'E', 'R', 'O', 'K'],
    words: ['TEORİSİ', 'TEORİK', 'TAKSİR', 'TEORİ', 'ROKET', 'KASTİ', 'TERAS', 'AKORT']
  },
  {
    letters: ['M', 'A', 'N', 'O', 'S', 'T', 'E', 'K'],
    words: ['SEMANTİK', 'KASTAMONU', 'KESTANE', 'MASKOT', 'MANŞET', 'KONTES', 'MANTO', 'SONAT', 'METAN', 'SOKET', 'KASET', 'MASON']
  },
  {
    letters: ['B', 'E', 'L', 'İ', 'T', 'A', 'S', 'O'],
    words: ['STABİLİZE', 'BASKETBOL', 'STABİLE', 'ASALETİ', 'SABOTAJ', 'BELASIZ', 'TÖRESEL', 'STABİL', 'ASALET', 'İSABET', 'SİLOİT', 'BOYALI', 'OTOBÜS', 'TESBİH', 'TABLO', 'BALET', 'LİSTE']
  },
  {
    letters: ['A', 'K', 'E', 'L', 'İ', 'M', 'O', 'T'],
    words: ['METABOLİK', 'MELODİKA', 'MELODİK', 'METALİK', 'KATOLİK', 'AMELİYE', 'MELODİ', 'TEKİLA', 'KALİTE', 'MELİKE', 'ETİMOL', 'EMLAK', 'METİL', 'TEKİL', 'KAMET', 'MOTEL', 'LOKMA']
  },
  {
    letters: ['S', 'N', 'E', 'R', 'E', 'K', 'A', 'E'],
    words: ['SERENAT', 'SERENAY', 'SEKRETER', 'ESNEMEK', 'SERKEŞ', 'EKSERİ', 'NEREDE', 'EKSER', 'EKSEN', 'KENAR', 'KESER', 'SEREN']
  },
  {
    letters: ['T', 'A', 'O', 'R', 'B', 'L', 'İ', 'K'],
    words: ['AKROBATİK', 'ORBİTALİK', 'AKROBAT', 'BARİTOK', 'ROBOTİK', 'TABLOİD', 'BOYALI', 'KALORİ', 'BARKOT', 'KOBRA', 'TABLO', 'BAROK', 'FLORT', 'ORBİT', 'KORAL', 'TABİR']
  },
  {
    letters: ['M', 'E', 'R', 'K', 'E', 'T', 'İ', 'N'],
    words: ['KERETİN', 'MERTEK', 'MERKEZ', 'METRİK', 'MİKTAR', 'TEKMİL', 'KERTME', 'NETİCE', 'TERİM', 'TEKER', 'METRE', 'METİN', 'İTMEK', 'KEREM']
  },
  {
    letters: ['D', 'E', 'İ', 'Z', 'İ', 'R', 'N', 'E'],
    words: ['DİZİNLERE', 'DENİZERİ', 'ZİNDERELİ', 'DİZİLME', 'ERİNDİR', 'DERİNCİ', 'DİRENİŞ', 'EZDİRME', 'DİZİNER', 'EDİRNE', 'DERİNİ', 'DİZİNE', 'ZİNDEN', 'DİZİCİ', 'DENİZ', 'DİZİN', 'DERİN', 'DİREN', 'ZİNDE', 'ERDEN']
  },
  {
    letters: ['P', 'N', 'A', 'L', 'T', 'R', 'İ', 'E'],
    words: ['PLANETARY', 'PANELİST', 'PIRLANTA', 'PANTERİ', 'PLANTER', 'ARPLİNE', 'PANTER', 'NEPTÜN', 'REPLİK', 'PLANET', 'ERİTAN', 'PELİN', 'PARTİ', 'PANEL', 'ANTRE', 'TALİP', 'TERLİ', 'LİNET']
  },
  {
    letters: ['O', 'R', 'L', 'T', 'A', 'K', 'İ', 'E'],
    words: ['KALORİT', 'KORALİT', 'TEORİKA', 'TEORİK', 'KALORİ', 'REKTÖR', 'KORİST', 'KARTEL', 'TEORİ', 'ORTAK', 'ROKET', 'RAKET', 'KOTRA', 'KATİL']
  },
  {
    letters: ['G', 'E', 'N', 'C', 'K', 'E', 'L', 'İ'],
    words: ['GELENEKÇİ', 'ÇENGELİNE', 'GENELÇE', 'ÇENEKLİ', 'ÇELENLİ', 'GENÇLİ', 'ÇENGEL', 'KEÇELİ', 'İNEKÇE', 'GELEN', 'ÇELİK', 'ÇENEK', 'ENGEL', 'NİKEL', 'EKLEN']
  },
  {
    letters: ['B', 'A', 'N', 'S', 'A', 'K', 'İ', 'E'],
    words: ['KABİNES', 'İSKEBAN', 'KASABAN', 'KABİNE', 'BANİSE', 'AKSİNE', 'BİNAEN', 'BANKA', 'İSKAN', 'EKSİN', 'KABİN', 'SAKİN', 'NASİB', 'KASİS']
  },
  {
    letters: ['K', 'O', 'N', 'U', 'L', 'E', 'C', 'U'],
    words: ['KONUKÇU', 'KONUKLU', 'KONUÇLU', 'KONÇLU', 'OKULCU', 'ÇOKLUK', 'KONUK', 'KOLON', 'ÇOKLU', 'UÇKUN']
  },
  {
    letters: ['S', 'A', 'K', 'N', 'A', 'T', 'İ', 'L'],
    words: ['SALTIKANAT', 'SANTALİK', 'KASATLI', 'İNATSAL', 'SİNYALİ', 'ASKINTI', 'TAKSİN', 'İSTİKA', 'KALSİT', 'SAKİN', 'LİSAN', 'NAKİT', 'SANKİ', 'İSKAN', 'ANTİK', 'TALİK', 'KASTİ']
  },
  {
    letters: ['O', 'Y', 'U', 'L', 'N', 'C', 'A', 'K'],
    words: ['OYUNCAKLI', 'OYUNCAKÇI', 'OYUNCAK', 'YOLUNCA', 'KOLONYA', 'ÇOKLAR', 'OYULAN', 'OYLAMA', 'YOLÇUK', 'KOYUN', 'OYNAK', 'ÇOKLU', 'UÇKUN', 'KOYUL', 'KOLAN', 'ÇANAK']
  },
  {
    letters: ['A', 'R', 'K', 'L', 'A', 'D', 'A', 'S'],
    words: ['ARKADAŞÇA', 'ARKADAŞLI', 'ARKADAŞ', 'ADALARDA', 'DARALMAK', 'ADAKLAR', 'AKSALAR', 'DARALSA', 'ADAKLI', 'ARAKAS', 'ADALAR', 'KARKAS', 'ARDAK', 'SALAK', 'SKALA', 'ARADA', 'SARAK', 'ALAKA', 'ADALE']
  },
  {
    letters: ['D', 'E', 'F', 'M', 'T', 'E', 'R', 'İ'],
    words: ['DEFTERİMİ', 'DEFTERLER', 'DEFTERİM', 'DEFTERİ', 'DEMETLİ', 'ERİTMEK', 'MEDETLİ', 'FERDİYE', 'DEFTER', 'METRİS', 'METRİK', 'ERİTME', 'TERFİ', 'DEMET', 'FERDİ', 'METRE', 'TERİM', 'METİN', 'LİDER', 'DERME']
  },
  {
    letters: ['O', 'K', 'İ', 'U', 'L', 'D', 'A', 'R'],
    words: ['OKULLARDA', 'OKURLAR', 'DORUKLA', 'ORDULUK', 'KADROLU', 'ODAKLAR', 'KORUDAN', 'KORDAL', 'DUALIK', 'DARLIK', 'DORUK', 'KADRO', 'DOLAR', 'KURAL', 'KADİR', 'ODALI', 'RADYO', 'DURAK']
  },
  {
    letters: ['M', 'E', 'R', 'N', 'D', 'İ', 'V', 'E'],
    words: ['MERDİVENLİ', 'MERDİVENCİ', 'VERİMLENME', 'MERDİVEN', 'DEVİRMEN', 'ERDİRMEN', 'DEVİRME', 'ERDEMNİ', 'EVİRMEK', 'MİNDERE', 'MEDENİ', 'MİNDER', 'DERİME', 'NEDİME', 'VERİME', 'MENDİL', 'ERDEM', 'DENİM', 'DEVİR', 'EVRİM', 'NEDİM', 'VEREM', 'DERİN', 'ENDER']
  },
  {
    letters: ['T', 'O', 'R', 'P', 'A', 'C', 'L', 'A'],
    words: ['TOPARLACIK', 'TOPARLAMA', 'TOPARLAKÇA', 'TOPARLA', 'APORTLA', 'PAÇALAR', 'TOPLAMA', 'PAROLA', 'TOPRAK', 'PAÇALI', 'TORLAK', 'TOPAL', 'APORT', 'TOPLA', 'POLAR', 'PLATO', 'ÇALAP', 'TOPAÇ']
  }
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
