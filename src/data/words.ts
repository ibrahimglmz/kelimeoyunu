import { Word } from '../types/game';

// Sabit kelime turları - Her tur için harfler ve kelimeler
export interface WordRound {
  letters: string[];
  words: string[];
}

const WORD_ROUNDS: WordRound[] = [
  {
    letters: ["S", "A", "I", "T", "E", "R", "O", "K"],
    words: ["EKSTRA", "ESKORT", "ISKOTA", "KASTOR", "KOSTER", "RASTIK", "REOSTA", "SARKIT", "AKORT", "ARKIT", "ARTIK", "ASKER", "ISKAT", "ISTAR", "KARST", "KASET", "KASIR", "KASIT", "KATIR", "KATRE", "KESAT", "KIRAT", "KORSE", "KORTE", "KOTRA", "ORASI", "ORTAK", "RAKET", "RASIT", "ROKET", "SAKIT", "SARIK", "SATIR", "SERAK", "SIRAT", "SOKET", "SOKRA", "TARIK", "TERAS", "TIRAK", "TORAK", "TRAKE", "AKOR", "AKSE", "AORT", "ARIK", "ARTI", "ASIK", "ASIR", "ASKI", "ATIK", "ATKI", "ERAT", "EROS", "IRAK", "ISKA", "KAOS", "KARE", "KARI", "KARO", "KARS", "KART", "KAST", "KATI", "KISA", "KITA", "KORA", "KORE", "KORT", "KOSA", "KOTA", "KROS", "OKAR", "ORAK", "ORSA", "ORTA", "RAKI", "RAKS", "RAST", "RATE", "REST", "ROKA", "ROTA", "SAKE", "SAKO", "SARI", "SATI", "SERA", "SERT", "SIRA", "SIRT", "SKOR", "SOTE", "STAR", "STER", "STOK", "STOR", "TAKI", "TERK", "TERS", "TOKA", "TRAS", "TROK", "AKI", "AKS", "ARI", "ARK", "ART", "ASI", "ASK", "AST", "ATE", "EKO", "ERK", "IRA", "IRK", "KAR", "KAS", "KAT", "KER", "KES", "KET", "KIR", "KIT", "KOR", "KOT", "ORA", "RET", "ROT", "SAK", "SEK", "SER", "SET", "SIK", "SIR", "TAK", "TAR", "TAS", "TEK", "TER", "TIK", "TIR", "TIS", "TOK", "TOR", "TOS"]
  },
  {
    letters: ["M", "A", "N", "O", "S", "T", "E", "K"],
    words: ["MAKOSEN", "ASETON", "KASTEN", "KONTES", "MASKOT", "SEKANT", "SENATO", "SOKMAN", "TEKMAN", "AKONT", "AKSON", "ANKET", "KAMET", "KANTO", "KASEM", "KASET", "KEMAN", "KESAT", "KETON", "KONMA", "KONSA", "KOTAN", "MAKET", "MANTO", "MASKE", "MASON", "METAN", "MONAT", "MONTE", "NOKTA", "NOTAM", "OKTAN", "ONMAK", "SANEM", "SATEN", "SEMAN", "SOKET", "SOKMA", "SOMAK", "SONAT", "STENO", "TEMAS", "TOMAK", "AKNE", "AKSE", "ANOT", "ATOM", "EMAN", "ENAM", "ESMA", "ESNA", "KAME", "KANO", "KANT", "KAOS", "KAST", "KENT", "KOMA", "KONT", "KOSA", "KOTA", "MANO", "MASK", "MEST", "META", "MOKA", "MONT", "NAME", "NATO", "NEMA", "NOTA", "ONAT", "ONMA", "SAKE", "SAKO", "SEMA", "SEMT", "SENA", "SENT", "SOMA", "SONE", "SOTE", "STEN", "STOK", "TANE", "TANK", "TEMA", "TOKA", "AKS", "ANT", "ASK", "AST", "ATE", "EKO", "KAM", "KAN", "KAS", "KAT", "KEM", "KES", "KET", "KOM", "KOT", "MAS", "MAT", "MEN", "MET", "NAM", "NAS", "NEM", "NET", "NOM", "NOT", "OMA", "ONA", "ONS", "SAK", "SAM", "SAN", "SEK", "SEM", "SEN", "SET", "SOM", "SON", "TAK", "TAM", "TAN", "TAS", "TEK", "TEM", "TEN", "TOK", "TON", "TOS"]
  },
  {
    letters: ["B", "E", "L", "I", "T", "A", "S", "O"],
    words: ["SEBATLI", "SABOTE", "ALTES", "BALET", "BASTI", "BATIL", "OLASI", "SALTO", "SEBAT", "TABLO", "ABES", "ALET", "ALTI", "ALTO", "ASIL", "ATIL", "ATLI", "ATOL", "BALE", "BALO", "BASI", "BATI", "BELA", "BETA", "EBAT", "ETOL", "LASO", "LOTA", "OLTA", "OTEL", "SABO", "SALI", "SALT", "SATI", "SILA", "SOBA", "SOBE", "SOTE", "TABL", "TELA", "ALO", "ALT", "ASI", "AST", "ATE", "BAL", "BAS", "BAT", "BEL", "BET", "BOA", "BOL", "BOT", "ELA", "LEB", "LOT", "OBA", "OLE", "SAL", "SEL", "SET", "SOL", "TAB", "TAL", "TAS", "TEL", "TIS", "TOL", "TOS"]
  },
  {
    letters: ["A", "K", "E", "L", "I", "M", "O", "T"],
    words: ["MAKTEL", "MATLIK", "TALKIM", "TAMLIK", "TOKALI", "ALKIM", "ALTIK", "ATMIK", "EMLAK", "ITLAK", "KALEM", "KALIM", "KALIT", "KAMET", "KATIM", "KATLI", "KELAM", "KEMAL", "KETAL", "KILMA", "KITAL", "LOKMA", "MAKET", "METAL", "MOTEL", "OLMAK", "OMLET", "OTLAK", "TAKIM", "TIKMA", "TOMAK", "AKIL", "AKIM", "AKLI", "ALEM", "ALET", "ALIK", "ALIM", "ALTI", "ALTO", "AMEL", "ATIK", "ATIL", "ATIM", "ATKI", "ATLI", "ATOL", "ATOM", "EKOL", "ELMA", "ETOL", "KALE", "KAME", "KATI", "KITA", "KOLA", "KOMA", "KOTA", "LAKE", "LAME", "LOTA", "MALT", "MEAL", "META", "MOKA", "MOLA", "OLMA", "OLTA", "OTEL", "TAKI", "TALK", "TELA", "TEMA", "TOKA", "AKI", "ALO", "ALT", "ATE", "EKO", "ELA", "KAL", "KAM", "KAT", "KEL", "KEM", "KET", "KIL", "KIT", "KOL", "KOM", "KOT", "LAK", "LAM", "LOK", "LOT", "MAL", "MAT", "MET", "OLE", "OMA", "TAK", "TAL", "TAM", "TEK", "TEL", "TEM", "TIK", "TOK", "TOL"]
  },
  {
    letters: ["S", "N", "E", "R", "E", "K", "A", "E"],
    words: ["ARKEEN", "KANSER", "KESENE", "SEKENE", "ASKER", "EKRAN", "EKSEN", "EKSER", "ENSAR", "ENSER", "ERKEN", "ESNEK", "KARNE", "KENAR", "KERES", "KESEN", "KESER", "KESRE", "NEKES", "NEKRE", "RESEN", "SENEK", "SERAK", "SEREN", "AKNE", "AKSE", "ENEK", "ENSE", "EREK", "EREN", "ERKE", "ESEN", "ESER", "ESNA", "ESRE", "KARE", "KARS", "KENE", "KERE", "KESE", "NERE", "RAKS", "RENK", "SAKE", "SENA", "SENE", "SERA", "SERE", "AKS", "ARK", "ASK", "EKE", "ERK", "KAN", "KAR", "KAS", "KER", "KES", "NAR", "NAS", "SAK", "SAN", "SEK", "SEN", "SER"]
  },
  {
    letters: ["T", "A", "O", "R", "B", "L", "I", "K"],
    words: ["ORTALIK", "TORBALI", "BALKIR", "BALTIK", "BORALI", "KARTLI", "KOBALT", "ORTALI", "ROBALI", "TOKALI", "TORLAK", "AKORT", "ALTIK", "ARKIT", "ARTIK", "BAKIR", "BALIK", "BALKI", "BAROK", "BATIK", "BATIL", "BATKI", "BORAK", "BORAT", "ILTAR", "ITLAK", "KABLO", "KALIT", "KARLI", "KATIR", "KATLI", "KIRAT", "KIRBA", "KITAL", "KOBRA", "KORAL", "KOTRA", "LORTA", "ORALI", "ORTAK", "OTLAK", "RABIT", "TABLO", "TARIK", "TIRAK", "TORAK", "TORBA", "AKIL", "AKLI", "AKOR", "ALIK", "ALTI", "ALTO", "AORT", "ARIK", "ARLI", "ARTI", "ATIK", "ATIL", "ATKI", "ATLI", "ATOL", "BAKI", "BALO", "BARI", "BARK", "BARO", "BATI", "BLOK", "BORA", "IRAK", "KARI", "KARO", "KART", "KATI", "KITA", "KLOR", "KOLA", "KORA", "KORT", "KOTA", "KRAL", "LORT", "LOTA", "OKAR", "OLTA", "ORAK", "ORAL", "ORTA", "RAKI", "ROBA", "ROKA", "ROTA", "TABL", "TAKI", "TALK", "TOKA", "TROK", "TROL", "AKI", "ALO", "ALT", "ARI", "ARK", "ART", "BAL", "BAR", "BAT", "BOA", "BOK", "BOL", "BOR", "BOT", "IRA", "IRK", "KAL", "KAR", "KAT", "KIL", "KIR", "KIT", "KOL", "KOR", "KOT", "LAK", "LOK", "LOR", "LOT", "OBA", "ORA", "RAB", "ROL", "ROT", "TAB", "TAK", "TAL", "TAR", "TIK", "TIR", "TOK", "TOL", "TOR"]
  },
  {
    letters: ["M", "E", "R", "K", "E", "T", "I", "N"],
    words: ["KEMENT", "KENTER", "KERMEN", "KERTME", "KRETEN", "MERTEK", "TEMREN", "ERKEN", "ERMEK", "ETKEN", "ETMEK", "ETMEN", "KEMER", "KEMRE", "KENET", "KEREM", "KERTE", "KETEN", "MEREK", "MERET", "METRE", "NEKRE", "TEKER", "TEKME", "TEKNE", "TEMEK", "TEREK", "TERME", "EKME", "EMEK", "EMEN", "EMET", "ENEK", "EREK", "EREN", "ERKE", "ERME", "ERTE", "ETEK", "ETEN", "ETER", "ETME", "KEME", "KENE", "KENT", "KERE", "KETE", "KREM", "MERT", "NERE", "RENK", "TEKE", "TERE", "TERK", "TREN", "EKE", "ERK", "IRK", "KEM", "KER", "KET", "KIN", "KIR", "KIT", "MEN", "MET", "NEM", "NET", "RET", "TEK", "TEM", "TEN", "TER", "TIK", "TIN", "TIR"]
  },
  {
    letters: ["D", "E", "I", "Z", "I", "R", "N", "E"],
    words: ["ENDER", "ERDEN", "RENDE", "ZERDE", "DERE", "DERZ", "DREN", "EDER", "ENEZ", "EREN", "NERE", "REZE", "EDE", "IRZ", "ZEN", "ZER"]
  },
  {
    letters: ["P", "N", "A", "L", "T", "R", "I", "E"],
    words: ["PENALTI", "PANTER", "PIRNAL", "PLANET", "RAPTEN", "TIRPAN", "ALTIN", "ANTLI", "ANTRE", "ARTIN", "ILTAR", "LANET", "LEPRA", "NATIR", "PALET", "PANEL", "PATEN", "PINAR", "RATIP", "TALEP", "TANRI", "ALET", "ALIN", "ALTI", "ANIT", "APEL", "APRE", "ARLI", "ARTI", "ATIL", "ATLI", "ELAN", "ERAT", "ETAP", "LARP", "NALE", "PARE", "PENA", "PERT", "PLAN", "RANT", "RATE", "TANE", "TANI", "TAPI", "TELA", "TIPA", "TRAP", "TREN", "ALP", "ALT", "ANI", "ANT", "ARI", "ARP", "ART", "ATE", "ELA", "IRA", "LAN", "LAP", "LEP", "NAL", "NAR", "NET", "PAL", "PAT", "PIR", "PIT", "RAP", "RET", "TAL", "TAN", "TAR", "TEL", "TEN", "TER", "TIN", "TIP", "TIR"]
  },
  {
    letters: ["O", "R", "L", "T", "A", "K", "I", "E"],
    words: ["ORTALIK", "KARTEL", "KARTLI", "KOLERA", "ORTALI", "TOKALI", "TORLAK", "AKORT", "ALTIK", "ARKIT", "ARTIK", "ILTAR", "ITLAK", "KALIT", "KARLI", "KATIR", "KATLI", "KATRE", "KETAL", "KIRAT", "KITAL", "KORAL", "KORTE", "KOTRA", "LORTA", "ORALI", "ORTAK", "OTLAK", "RAKET", "ROKET", "TARIK", "TIRAK", "TORAK", "TRAKE", "AKIL", "AKLI", "AKOR", "ALET", "ALIK", "ALTI", "ALTO", "AORT", "ARIK", "ARLI", "ARTI", "ATIK", "ATIL", "ATKI", "ATLI", "ATOL", "EKOL", "ERAT", "ETOL", "IRAK", "KALE", "KARE", "KARI", "KARO", "KART", "KATI", "KITA", "KLOR", "KOLA", "KORA", "KORE", "KORT", "KOTA", "KRAL", "LAKE", "LORT", "LOTA", "OKAR", "OLTA", "ORAK", "ORAL", "ORTA", "OTEL", "RAKI", "RATE", "ROKA", "ROTA", "TAKI", "TALK", "TELA", "TERK", "TOKA", "TROK", "TROL", "AKI", "ALO", "ALT", "ARI", "ARK", "ART", "ATE", "EKO", "ELA", "ERK", "IRA", "IRK", "KAL", "KAR", "KAT", "KEL", "KER", "KET", "KIL", "KIR", "KIT", "KOL", "KOR", "KOT", "LAK", "LOK", "LOR", "LOT", "OLE", "ORA", "RET", "ROL", "ROT", "TAK", "TAL", "TAR", "TEK", "TEL", "TER", "TIK", "TIR", "TOK", "TOL", "TOR"]
  },
  {
    letters: ["G", "E", "N", "Ç", "K", "E", "L", "İ"],
    words: ["ÇENEKLİ", "GENÇLİK", "ÇELENK", "ÇENELİ", "ÇENGEL", "ELEKÇİ", "GEÇELİ", "GEÇKİN", "GELENİ", "GENLİK", "KEÇELİ", "KENGEL", "ÇEKEL", "ÇELEK", "ÇELEN", "ÇELGİ", "ÇELİK", "ÇENEK", "ÇENGİ", "ÇİLEK", "ELÇEK", "ELGİN", "ENGEL", "GEÇEK", "GEÇEN", "GELEN", "GELİN", "GENEL", "İLENÇ", "İLGEÇ", "LEÇEK", "LİKEN", "NİKEL", "ÇEKİ", "ÇENE", "ÇENK", "ÇİLE", "ÇİNE", "EKİN", "EKLİ", "ELÇİ", "ELEK", "ELİK", "ENEK", "ENİK", "ENLİ", "GEÇE", "GELE", "GENÇ", "GENE", "GİNE", "İÇEL", "İKEN", "İLÇE", "İLKE", "İNEÇ", "İNEK", "KEÇE", "KEÇİ", "KELE", "KENE", "KİLE", "LEÇE", "LEKE", "LİNÇ", "LİNK", "ÇEK", "ÇİL", "ÇİN", "EGE", "EKE", "GEÇ", "GEN", "İLE", "İLK", "İNÇ", "KEL", "KİL", "KİN", "LİG"]
  },
  {
    letters: ["B", "A", "N", "S", "A", "K", "İ", "E"],
    words: ["İKEBANA", "AKSİNE", "KABİNE", "NAKİSA", "NEKAİS", "SEKBAN", "ABANİ", "AKABE", "AKSAN", "ASABİ", "BAKAN", "BANAK", "BANKA", "BASAK", "BASEN", "BEKAS", "BESİN", "BESNİ", "BİKES", "BİNEK", "EKSİN", "ESBAK", "KABAN", "KABİN", "KEBAN", "KESİN", "SABAN", "SAİKA", "SAKİN", "SANKİ", "SİNEK", "ABES", "ABİS", "AKİS", "AKNE", "AKSE", "AKSİ", "ANKA", "BAKİ", "BANA", "BANİ", "BANK", "BASK", "BEİS", "BEKA", "BESİ", "BİNA", "EKİN", "EKSİ", "ENİK", "ESİK", "ESİN", "ESKİ", "ESNA", "İANE", "İBNE", "İKEN", "İKNA", "İNAK", "İNEK", "KABA", "KANA", "KANİ", "KASA", "NEBİ", "NESİ", "NİSA", "SABA", "SABİ", "SAİK", "SAKA", "SAKE", "SAKİ", "SANA", "SEKİ", "SENA", "SİNE", "ABA", "AKA", "AKS", "ANA", "ANİ", "ASA", "ASİ", "ASK", "BAN", "BAS", "BEK", "BEN", "BİN", "İKA", "İSA", "KAN", "KAS", "KES", "KİN", "NAS", "SAK", "SAN", "SEK", "SEN", "SİK", "SİN", "SKİ"]
  },
  {
    letters: ["K", "O", "N", "U", "L", "E", "C", "U"],
    words: ["KONULU", "KOLCU", "KULUN", "ONLUK", "UNLUK", "CENK", "EKOL", "KLON", "KONU", "KULE", "KULU", "NOEL", "OKUL", "OLUK", "ONLU", "UNCU", "CUK", "EKO", "KEL", "KOL", "KUL", "LOK", "OLE", "ULU"]
  },
  {
    letters: ["S", "A", "K", "N", "A", "T", "İ", "L"],
    words: ["ANALİST", "İNAKSAL", "SAATLİK", "ANTİKA", "KALSİT", "LASTİK", "NAKİSA", "SAATLİ", "TALİKA", "TASLAK", "AKAİT", "AKLAN", "AKSAN", "ALKAN", "ANLAK", "ANTİK", "ASKAT", "ASLAN", "ASTİK", "ATLAS", "İNTAK", "İSNAT", "KALAN", "KALAS", "KANAL", "KANAT", "KASTİ", "KATİL", "LAKİN", "LASKİ", "LASTA", "LATİN", "LİSAN", "NAKİL", "NAKİT", "SAİKA", "SAKAL", "SAKAT", "SAKİL", "SAKİN", "SAKİT", "SALAK", "SALAT", "SALİK", "SALTA", "SANAL", "SANAT", "SANKİ", "SKALA", "TAKAS", "TAKLA", "TAKSA", "TAKSİ", "TALAK", "TALAN", "TALAS", "TALİK", "TASNİ", "AKİL", "AKİS", "AKİT", "AKLİ", "AKSİ", "ALAN", "ANAL", "ANKA", "ASAL", "ASİL", "ASİT", "ASLA", "ASLİ", "ATAK", "ATİK", "İKNA", "İLAN", "İNAK", "İNAL", "İNAT", "İSAL", "KAİL", "KALA", "KANA", "KANİ", "KANT", "KASA", "KAST", "KATİ", "KİLS", "KİST", "KLAN", "KLAS", "LAİK", "LAİN", "LAKA", "LATA", "LİKA", "LİNK", "NAAT", "NAİL", "NİSA", "SAAT", "SAİK", "SAKA", "SAKİ", "SALA", "SALT", "SANA", "STİL", "TAKA", "TALİ", "TALK", "TANK", "TASA", "AİT", "AKA", "AKS", "ALA", "ALİ", "ALT", "ANA", "ANİ", "ANT", "ASA", "ASİ", "ASK", "AST", "ATA", "ATİ", "İKA", "İLA", "İLK", "İSA", "İTA", "KAL", "KAN", "KAS", "KAT", "KİL", "KİN", "KİT", "LAK", "LAN", "NAL", "NAS", "SAK", "SAL", "SAN", "SİK", "SİN", "SİT", "SKİ", "TAK", "TAL", "TAN", "TAS", "TİK", "TİN"]
  },
  {
    letters: ["O", "Y", "U", "L", "N", "C", "A", "K"],
    words: ["KALYONCU", "OYUNCAK", "KALYON", "ALYON", "KOLAN", "KOLAY", "KOLCU", "KONYA", "KOYUN", "LONCA", "ONLUK", "OYNAK", "YOLAK", "YOLCU", "YOLUK", "YONCA", "YUNAK", "ACUL", "ACUN", "ACYO", "AYOL", "KANO", "KLAN", "KLON", "KOCA", "KOLA", "KONU", "KOYU", "KULA", "LOCA", "OCAK", "OKUL", "OLAY", "OLUK", "ONAY", "ONCA", "ONLU", "OYUK", "OYUN", "ULAK", "ULAN", "UYAK", "YUNA", "ALO", "AYN", "CAN", "CUK", "KAL", "KAN", "KAY", "KOL", "KOY", "KUL", "LAK", "LAN", "LOK", "NAL", "ONA", "OYA", "UCA", "ULA", "YAK", "YAL", "YAN", "YOK", "YOL"]
  },
  {
    letters: ["A", "R", "K", "L", "A", "D", "A", "Ş"],
    words: ["ARKADAŞ", "ADALAR", "AKALA", "ALAKA", "ARAKA", "ARDAK", "DALAK", "DALAŞ", "DARAŞ", "KADAR", "KAŞAR", "ŞALAK", "ADAK", "ADAŞ", "AKAR", "ARAK", "ARAL", "ARDA", "ARKA", "AŞAR", "DARA", "KALA", "KARA", "KRAL", "LAKA", "ŞAKA", "ŞARK", "ADA", "AKA", "ALA", "ARA", "ARK", "ARŞ", "AŞK", "DAL", "DAR", "KAL", "KAR", "KAŞ", "LAK", "ŞAD", "ŞAK", "ŞAL"]
  },
  {
    letters: ["D", "E", "F", "M", "T", "E", "R", "İ"],
    words: ["DİRETME", "EDREMİT", "DEFTER", "DİREME", "ERİTME", "MEFRET", "DEMET", "DEMİR", "DERME", "DİTME", "ERDEM", "ERİME", "FERDE", "FİTRE", "MEDET", "MERET", "METRE", "REDİF", "TERFİ", "TERİM", "TERME", "DEFİ", "DEME", "DERE", "DERİ", "DERT", "EDER", "EDİM", "EMET", "EMİR", "ERİM", "ERME", "ERTE", "ETER", "ETME", "FERT", "FİDE", "FİRE", "İTME", "MERİ", "MERT", "MİDE", "REMİ", "TEFE", "TERE", "TİRE", "DEF", "DEM", "EDE", "EDİ", "EFE", "ETİ", "FER", "FİT", "MET", "MİR", "MİT", "RET", "TEF", "TEM", "TER", "TİM"]
  },
  {
    letters: ["O", "K", "İ", "U", "L", "D", "A", "R"],
    words: ["KADROLU", "KADRİL", "KALORİ", "KORİDA", "DOLAK", "DOLAR", "DORUK", "DURAK", "DURAL", "İDRAK", "KADİR", "KADRO", "KORAL", "KURAL", "ADİL", "ADLİ", "AKİL", "AKLİ", "AKOR", "AKUR", "DAİR", "DARU", "DOKU", "DOLU", "DORU", "DUKA", "İDOL", "KAİL", "KARİ", "KARO", "KİLO", "KİRA", "KLOR", "KOLA", "KOLİ", "KORA", "KORU", "KRAL", "KULA", "KURA", "LAİK", "LİKA", "LİRA", "LODA", "ODAK", "OKAR", "OKUL", "OKUR", "OLDU", "OLUK", "OLUR", "ORAK", "ORAL", "ORDU", "RİKA", "RODA", "ROKA", "RULO", "ULAK", "URLA", "ADİ", "ALİ", "ALO", "ARİ", "ARK", "DAL", "DAR", "DİK", "DİL", "DOK", "DUA", "DUL", "İKA", "İLA", "İLK", "KAL", "KAR", "KİL", "KİR", "KOD", "KOL", "KOR", "KUL", "KUR", "LAK", "LİR", "LOK", "LOR", "ODA", "ORA", "ROL", "UDİ", "ULA"]
  },
  {
    letters: ["M", "E", "R", "N", "D", "İ", "V", "E"],
    words: ["MERDİVEN", "DEVİNME", "DEVİRME", "DİRENME", "DEMEVİ", "DEVREN", "DEVRİM", "DİREME", "EDİNME", "EDİRNE", "ERİNME", "ERMENİ", "EVİRME", "MEDENİ", "MİNDER", "NEDİME", "DEMİN", "DEMİR", "DENİM", "DENME", "DERİN", "DERME", "DEVİM", "DEVİR", "DEVRE", "DİNME", "DİREN", "ENDER", "ERDEM", "ERDEN", "ERİME", "ERMİN", "EVREN", "EVRİM", "İMREN", "NEDİM", "NEVİR", "RENDE", "VERDİ", "VEREM", "VERİM", "VERME", "DEME", "DENİ", "DERE", "DERİ", "DEVE", "DİNE", "DREN", "EDER", "EDİM", "EMEN", "EMİN", "EMİR", "ENİR", "EREN", "ERİM", "ERİN", "ERME", "EVİN", "EVRE", "İNME", "İVME", "MENİ", "MERİ", "MİDE", "MİNE", "NERE", "REMİ", "VERE", "VERİ", "DEM", "DEV", "DİN", "EDE", "EDİ", "MEN", "MİR", "NEM", "NEV", "NİM"]
  },
  {
    letters: ["T", "O", "R", "P", "A", "C", "L", "A"],
    words: ["ORTACA", "PAROLA", "PARTAL", "PORTAL", "APORT", "APOTR", "APTAL", "CARTA", "LORTA", "PALTO", "PLATO", "POLAR", "POLAT", "TARLA", "TOPAL", "TOPLA", "ACAR", "ALTO", "AORT", "ARAL", "ARAP", "ARPA", "ATOL", "CART", "LAPA", "LARP", "LATA", "LOCA", "LORT", "LOTA", "OLTA", "OPAL", "ORAL", "ORTA", "PALA", "PARA", "PATA", "POTA", "RACA", "ROTA", "TAPA", "TRAP", "TROL", "ALA", "ALO", "ALP", "ALT", "ARA", "ARP", "ART", "ATA", "CAR", "COP", "LAP", "LOP", "LOR", "LOT", "ORA", "PAL", "PAT", "POT", "RAP", "ROL", "ROP", "ROT", "TAL", "TAR", "TOL", "TOP", "TOR"]
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
