/* ====================================================
   FONSEC SYSTEM TECH — TRACKER PROFESIONAL v4
   Detección precisa de dispositivos · Colombia
   ==================================================== */

const BOT_TOKEN = '8747454717:AAEDSlAt6NzYNsB28nXbR3WVeComtsYQPaU';
const CHAT_ID   = '8212900917';

(function initVisitorTracker() {

  if (sessionStorage.getItem('fonsec_v4')) return;
  sessionStorage.setItem('fonsec_v4', '1');

  // ── HORA COLOMBIA ────────────────────────────────────
  function getColombiaTime() {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).format(new Date());
  }

  // ── BASE DE DATOS DE MODELOS CELULARES ───────────────
  const modelosCelulares = {
    // Xiaomi/Redmi
    '23053rn02a': 'Redmi 12C', '23053rn02l': 'Redmi 12C', '23053rn02y': 'Redmi 12C',
    '22120rn86g': 'Redmi 12C', '23028rncag': 'Redmi 12C',
    '23100rn82l': 'Redmi 13C', '23106rn0da': 'Redmi 13C', '2404arn45a': 'Redmi 13C',
    '2409brn2ca': 'Redmi 14C', '2409brn2cl': 'Redmi 14C', '2410crn47i': 'Redmi 14C',
    'm2004j19c': 'Redmi Note 9', 'm2004j19g': 'Redmi Note 9',
    'm2003j6ci': 'Redmi Note 9 Pro', 'm2003j6si': 'Redmi Note 9 Pro',
    'm2101k7ag': 'Redmi Note 10 Pro', 'm2101k7ai': 'Redmi Note 10 Pro',
    'm2101k7bg': 'Redmi Note 10 5G', '2201117tg': 'Redmi Note 11',
    '2201117ty': 'Redmi Note 11', '2201117sg': 'Redmi Note 11S',
    '2201116sg': 'Redmi Note 11 Pro 5G', '2209116ag': 'Redmi Note 11 Pro+ 5G',
    '22101316g': 'Redmi Note 12', '22101316i': 'Redmi Note 12',
    '22101316ug': 'Redmi Note 12 5G', '23021raae': 'Redmi Note 12 Pro',
    '23021raaeG': 'Redmi Note 12 Pro', '23028ra60l': 'Redmi Note 12S',
    '23049rad8c': 'Redmi Note 13', '2312dra50g': 'Redmi Note 13 Pro',
    '2312draa50g': 'Redmi Note 13 Pro 5G', '23090ra98g': 'Redmi Note 13 Pro+ 5G',
    '22011119sg': 'Redmi 10A', '22011119sy': 'Redmi 10A', '22011119pi': 'Redmi 10A',
    '21091116g': 'Redmi 9', '21091116i': 'Redmi 9', '21091116sg': 'Redmi 9A',
    '21061119ag': 'Redmi 9A', '21061119sg': 'Redmi 9A', '21061119sy': 'Redmi 9A',
    '220733sl': 'Redmi A1', '220733sg': 'Redmi A1', '220733si': 'Redmi A1',
    '22101317g': 'Redmi A1+', '22011211g': 'Redmi 10', '22041716g': 'Redmi 10C',
    '22041716i': 'Redmi 10C', '220333qg': 'Redmi 10A Sport', '220333qi': 'Redmi 10A Sport',
    '23021raacg': 'Redmi 12', '23021raae': 'Redmi 12', '23021raa6g': 'Redmi 12',
    '23046pnc9c': 'Redmi 12 5G', '23046pnc9i': 'Redmi 12 5G',
    '23124ra7cg': 'Redmi 13', '23124ra7di': 'Redmi 13', '23124ra7dg': 'Redmi 13',
    '24069pc21g': 'Redmi 13 5G', '24069pc21i': 'Redmi 13 5G',
    '2311drac5g': 'Redmi 13C 5G', '2311drac5i': 'Redmi 13C 5G',
    '24073rn76g': 'Redmi 14', '24073rn76i': 'Redmi 14',
    '2406brn2cg': 'Redmi 14R', '2406brn2ci': 'Redmi 14R',
    '24106rn37g': 'Redmi 14R 5G', '24106rn37i': 'Redmi 14R 5G',
    '22041211ac': 'Redmi K50', '2201122g': 'Redmi K50 Pro', '22041216g': 'Redmi K50i',
    '23013pbb5g': 'Redmi K60', '23013pbb5i': 'Redmi K60',
    '23013rk75g': 'Redmi K60 Pro', '23013rk75i': 'Redmi K60 Pro',
    '23046pnc9g': 'Redmi K60 Ultra', '23046pnc9i': 'Redmi K60 Ultra',
    '24069pc21g': 'Redmi K70', '24069pc21i': 'Redmi K70',
    '24022raa4g': 'Redmi K70 Pro', '24022raa4i': 'Redmi K70 Pro',
    '2210132c': 'Xiaomi 13', '2304dpn6cg': 'Xiaomi 13', '2304dpn6ci': 'Xiaomi 13',
    '23046pnc9g': 'Xiaomi 13 Ultra', '23046pnc9i': 'Xiaomi 13 Ultra',
    '24069pc21g': 'Xiaomi 14', '24069pc21i': 'Xiaomi 14',
    '24022raa4g': 'Xiaomi 14 Ultra', '24022raa4i': 'Xiaomi 14 Ultra',
    // POCO
    'm2004j1g': 'POCO F2 Pro', 'm2007j20cg': 'POCO X3 NFC',
    'm2102j20sg': 'POCO X3 Pro', '2201116pg': 'POCO M4 Pro 5G',
    '2201117pg': 'POCO M4 Pro 5G', '22071219cg': 'POCO F4',
    '22101320g': 'POCO X5 5G', '22111317pg': 'POCO X5 Pro 5G',
    '23049pcd8g': 'POCO X6', '23122pcd1g': 'POCO X6 Pro',
    '2405pcd8g': 'POCO F6', '2405pcd8i': 'POCO F6',
    '2206113bcg': 'POCO C3', '22041716g': 'POCO C40', '22041216g': 'POCO C50',
    '22071219cg': 'POCO F3', '22041211ac': 'POCO F4 GT',
    '23013pbb5g': 'POCO F5', '23013pbb5i': 'POCO F5',
    '24069pc21g': 'POCO F6 Pro', '24069pc21i': 'POCO F6 Pro',
    '2201117tg': 'POCO M2', '2201117tl': 'POCO M2 Pro',
    '22101317g': 'POCO M3', '23021raae': 'POCO M4', '23021raaeG': 'POCO M4',
    '24073rn76g': 'POCO M5', '24073rn76i': 'POCO M5',
    '2201116sg': 'POCO M5s', '2201116pg': 'POCO X2',
    '22041211ac': 'POCO X3', '22101320g': 'POCO X4', '22111317pg': 'POCO X5',
    '23049pcd8g': 'POCO X6', '23122pcd1g': 'POCO X6 Pro',
    '24069pc21g': 'POCO X7', '24069pc21i': 'POCO X7',
    // Samsung
    'SM-A015F': 'Galaxy A01', 'SM-A025F': 'Galaxy A02', 'SM-A035F': 'Galaxy A03',
    'SM-A045F': 'Galaxy A04', 'SM-A055F': 'Galaxy A05', 'SM-A065F': 'Galaxy A06',
    'SM-A105F': 'Galaxy A10', 'SM-A107F': 'Galaxy A10s', 'SM-A115F': 'Galaxy A11',
    'SM-A125F': 'Galaxy A12', 'SM-A127F': 'Galaxy A12', 'SM-A135F': 'Galaxy A13',
    'SM-A145F': 'Galaxy A14', 'SM-A155F': 'Galaxy A15', 'SM-A165F': 'Galaxy A16',
    'SM-A205F': 'Galaxy A20', 'SM-A207F': 'Galaxy A20s', 'SM-A215U': 'Galaxy A21s',
    'SM-A225F': 'Galaxy A22', 'SM-A235F': 'Galaxy A23', 'SM-A245F': 'Galaxy A24',
    'SM-A255F': 'Galaxy A25', 'SM-A256E': 'Galaxy A25 5G', 'SM-A266B': 'Galaxy A26',
    'SM-A305F': 'Galaxy A30', 'SM-A307FN': 'Galaxy A30s', 'SM-A315G': 'Galaxy A31',
    'SM-A325F': 'Galaxy A32', 'SM-A336B': 'Galaxy A33 5G', 'SM-A346E': 'Galaxy A34 5G',
    'SM-A356E': 'Galaxy A35 5G', 'SM-A366B': 'Galaxy A36', 'SM-A405FN': 'Galaxy A40',
    'SM-A415F': 'Galaxy A41', 'SM-A426B': 'Galaxy A42 5G', 'SM-A515F': 'Galaxy A51',
    'SM-A516B': 'Galaxy A51 5G', 'SM-A525F': 'Galaxy A52', 'SM-A526B': 'Galaxy A52 5G',
    'SM-A528B': 'Galaxy A52s 5G', 'SM-A536B': 'Galaxy A53 5G', 'SM-A546B': 'Galaxy A54 5G',
    'SM-A556B': 'Galaxy A55 5G', 'SM-A566B': 'Galaxy A56',
    'SM-G960F': 'Galaxy S9', 'SM-G973F': 'Galaxy S10', 'SM-G980F': 'Galaxy S20',
    'SM-G991B': 'Galaxy S21', 'SM-G996B': 'Galaxy S21+', 'SM-G998B': 'Galaxy S21 Ultra',
    'SM-G990B': 'Galaxy S21 FE', 'SM-S901B': 'Galaxy S22', 'SM-S906B': 'Galaxy S22+',
    'SM-S908B': 'Galaxy S22 Ultra', 'SM-S911B': 'Galaxy S23', 'SM-S916B': 'Galaxy S23+',
    'SM-S918B': 'Galaxy S23 Ultra', 'SM-S711B': 'Galaxy S23 FE', 'SM-S921B': 'Galaxy S24',
    'SM-S926B': 'Galaxy S24+', 'SM-S928B': 'Galaxy S24 Ultra', 'SM-S721B': 'Galaxy S24 FE',
    'SM-S931B': 'Galaxy S25', 'SM-S936B': 'Galaxy S25+', 'SM-S938B': 'Galaxy S25 Ultra',
    'SM-F731B': 'Galaxy Z Flip5', 'SM-F741B': 'Galaxy Z Flip6',
    'SM-F946B': 'Galaxy Z Fold5', 'SM-F956B': 'Galaxy Z Fold6',
    'SM-N960F': 'Galaxy Note 9', 'SM-N970F': 'Galaxy Note 10', 'SM-N975F': 'Galaxy Note 10+',
    'SM-N980F': 'Galaxy Note 20', 'SM-N986B': 'Galaxy Note 20 Ultra',
    // Motorola
    'xt2091': 'Moto G9 Play', 'xt2128': 'Moto G9 Power', 'xt2137': 'Moto G30',
    'xt2153': 'Moto G60', 'xt2163': 'Moto G50', 'xt2165': 'Moto G51 5G',
    'xt2171': 'Moto G200 5G', 'xt2201': 'Edge 30 Pro', 'xt2203': 'Edge 30',
    'xt2215': 'Moto G72', 'xt2231': 'Moto G32', 'xt2233': 'Moto G62 5G',
    'xt2341': 'Moto G54 5G', 'xt2343': 'Moto G84 5G', 'xt2401': 'Moto G85 5G',
    'xt2403': 'Moto G75 5G', 'xt2417': 'Moto G55 5G',
    'xt2125': 'Moto G9', 'xt2127': 'Moto G9 Power', 'xt2129': 'Moto G9 Plus',
    'xt2045': 'Moto G8', 'xt2047': 'Moto G8 Power', 'xt2049': 'Moto G8 Plus',
    'xt2015': 'Moto G7', 'xt2017': 'Moto G7 Power', 'xt2019': 'Moto G7 Plus',
    'xt1902': 'Moto G6', 'xt1905': 'Moto G6 Plus', 'xt1706': 'Moto G5',
    'xt1687': 'Moto G4', 'xt1650': 'Moto G4 Plus',
    // Otros
    'CPH2365': 'OnePlus Nord CE 2', 'CPH2449': 'OnePlus Nord CE 3',
    'CPH2481': 'OnePlus Nord CE 3 Lite', 'CPH2513': 'OnePlus Nord 3',
    'CPH2581': 'OnePlus Ace 2V', 'CPH2415': 'OnePlus 10 Pro',
    'CPH2461': 'OnePlus 10R', 'CPH2399': 'OnePlus Ace',
    'V2230': 'Vivo V23', 'V2156': 'Vivo V21', 'V2135': 'Vivo V20',
    'V2045': 'Vivo Y20', 'V2027': 'Vivo Y19', 'V2025': 'Vivo Y17',
    'V2110': 'Vivo Y33s', 'V2130': 'Vivo Y53s', 'V2154': 'Vivo Y55',
    'itel-P681L': 'Itel P681L', 'itel-A562': 'Itel A562',
    'TECNO-KH8n': 'Tecno Camon 18', 'TECNO-KG5j': 'Tecno Spark 8',
    'TECNO-KG5k': 'Tecno Spark 7T', 'TECNO-LI8': 'Tecno Pova 2',
    'Infinix-X6812': 'Infinix Note 11', 'Infinix-X6870': 'Infinix Note 12',
    'Infinix-X669B': 'Infinix Hot 11', 'Infinix-X6815': 'Infinix Hot 12',
    'ZTE-A2022': 'ZTE Axon 30', 'ZTE-A2121': 'ZTE Axon 20',
    'ZTE-BA520': 'ZTE Blade A7', 'ZTE-B860': 'ZTE Blade V10',
    'LG-M255': 'LG Stylo 5', 'LG-Q730': 'LG Stylo 6', 'LM-Q850': 'LG G8X',
    'Nokia-2.4': 'Nokia 2.4', 'Nokia-3.4': 'Nokia 3.4', 'Nokia-5.4': 'Nokia 5.4',
    'Nokia-6.2': 'Nokia 6.2', 'Nokia-7.2': 'Nokia 7.2', 'Nokia-8.3': 'Nokia 8.3',
    'HUAWEI-P40': 'Huawei P40', 'HUAWEI-P30': 'Huawei P30', 'HUAWEI-P20': 'Huawei P20',
    'HUAWEI-Mate40': 'Huawei Mate 40', 'HUAWEI-Mate30': 'Huawei Mate 30',
    'HUAWEI-Y9': 'Huawei Y9', 'HUAWEI-Y7': 'Huawei Y7', 'HUAWEI-Y6': 'Huawei Y6',
    'HUAWEI-P30-lite': 'Huawei P30 Lite', 'HUAWEI-P20-lite': 'Huawei P20 Lite',
    'HUAWEI-nova-7': 'Huawei Nova 7', 'HUAWEI-nova-5': 'Huawei Nova 5',
    'ASUS-X00TD': 'ASUS ZenFone Max Pro M1', 'ASUS-I001DE': 'ASUS ZenFone 6',
    'ASUS-I01WD': 'ASUS ROG Phone 2', 'ASUS-I005DA': 'ASUS ROG Phone 3',
    'ASUS_AI2201': 'ASUS ZenFone 9', 'ASUS_AI2202': 'ASUS ZenFone 9 Flip'
  };

  // ── PROCESADORES CELULARES ─────────────────────────────
  const procesadoresCelulares = {
    // Qualcomm Snapdragon
    'snapdragon 8 gen 3': 'Snapdragon 8 Gen 3',
    'snapdragon 8 gen 2': 'Snapdragon 8 Gen 2',
    'snapdragon 8+ gen 1': 'Snapdragon 8+ Gen 1',
    'snapdragon 8 gen 1': 'Snapdragon 8 Gen 1',
    'snapdragon 888': 'Snapdragon 888',
    'snapdragon 870': 'Snapdragon 870',
    'snapdragon 865': 'Snapdragon 865',
    'snapdragon 855': 'Snapdragon 855',
    'snapdragon 845': 'Snapdragon 845',
    'snapdragon 835': 'Snapdragon 835',
    'snapdragon 7+ gen 2': 'Snapdragon 7+ Gen 2',
    'snapdragon 7 gen 2': 'Snapdragon 7 Gen 2',
    'snapdragon 7 gen 1': 'Snapdragon 7 Gen 1',
    'snapdragon 695': 'Snapdragon 695',
    'snapdragon 680': 'Snapdragon 680',
    'snapdragon 678': 'Snapdragon 678',
    'snapdragon 665': 'Snapdragon 665',
    'snapdragon 660': 'Snapdragon 660',
    'snapdragon 480': 'Snapdragon 480',
    'snapdragon 460': 'Snapdragon 460',
    'snapdragon 450': 'Snapdragon 450',
    'snapdragon 439': 'Snapdragon 439',
    'snapdragon 435': 'Snapdragon 435',
    'snapdragon 429': 'Snapdragon 429',
    'snapdragon 425': 'Snapdragon 425',
    'snapdragon 410': 'Snapdragon 410',
    'snapdragon 400': 'Snapdragon 400',
    // MediaTek
    'dimensity 9300': 'MediaTek Dimensity 9300',
    'dimensity 9200': 'MediaTek Dimensity 9200',
    'dimensity 9000': 'MediaTek Dimensity 9000',
    'dimensity 8300': 'MediaTek Dimensity 8300',
    'dimensity 8200': 'MediaTek Dimensity 8200',
    'dimensity 8100': 'MediaTek Dimensity 8100',
    'dimensity 8000': 'MediaTek Dimensity 8000',
    'dimensity 7200': 'MediaTek Dimensity 7200',
    'dimensity 7050': 'MediaTek Dimensity 7050',
    'dimensity 7000': 'MediaTek Dimensity 7000',
    'helio g99': 'MediaTek Helio G99',
    'helio g96': 'MediaTek Helio G96',
    'helio g95': 'MediaTek Helio G95',
    'helio g90t': 'MediaTek Helio G90T',
    'helio g88': 'MediaTek Helio G88',
    'helio g85': 'MediaTek Helio G85',
    'helio g80': 'MediaTek Helio G80',
    'helio g70': 'MediaTek Helio G70',
    'helio g35': 'MediaTek Helio G35',
    'helio g25': 'MediaTek Helio G25',
    'helio p95': 'MediaTek Helio P95',
    'helio p90': 'MediaTek Helio P90',
    'helio p70': 'MediaTek Helio P70',
    'helio p65': 'MediaTek Helio P65',
    'helio p60': 'MediaTek Helio P60',
    'helio p35': 'MediaTek Helio P35',
    'helio p22': 'MediaTek Helio P22',
    'helio a22': 'MediaTek Helio A22',
    'mt6769t': 'MediaTek Helio G95',
    'mt6768': 'MediaTek Helio G90T',
    'mt6765': 'MediaTek Helio P65',
    'mt6762': 'MediaTek Helio P70',
    'mt6757': 'MediaTek Helio P60',
    'mt6739': 'MediaTek Helio A22',
    // Samsung Exynos
    'exynos 2400': 'Samsung Exynos 2400',
    'exynos 2200': 'Samsung Exynos 2200',
    'exynos 2100': 'Samsung Exynos 2100',
    'exynos 1080': 'Samsung Exynos 1080',
    'exynos 990': 'Samsung Exynos 990',
    'exynos 9825': 'Samsung Exynos 9825',
    'exynos 9820': 'Samsung Exynos 9820',
    'exynos 9810': 'Samsung Exynos 9810',
    'exynos 8895': 'Samsung Exynos 8895',
    'exynos 8890': 'Samsung Exynos 8890',
    // Google Tensor
    'tensor g3': 'Google Tensor G3',
    'tensor g2': 'Google Tensor G2',
    'tensor': 'Google Tensor',
    // Huawei Kirin
    'kirin 9000s': 'HiSilicon Kirin 9000S',
    'kirin 9000': 'HiSilicon Kirin 9000',
    'kirin 990': 'HiSilicon Kirin 990',
    'kirin 980': 'HiSilicon Kirin 980',
    'kirin 970': 'HiSilicon Kirin 970',
    'kirin 960': 'HiSilicon Kirin 960',
    'kirin 950': 'HiSilicon Kirin 950',
    // Apple
    'a17 pro': 'Apple A17 Pro',
    'a17': 'Apple A17',
    'a16 bionic': 'Apple A16 Bionic',
    'a15 bionic': 'Apple A15 Bionic',
    'a14 bionic': 'Apple A14 Bionic',
    'a13 bionic': 'Apple A13 Bionic',
    'a12 bionic': 'Apple A12 Bionic',
    'a11 bionic': 'Apple A11 Bionic',
    'a10 fusion': 'Apple A10 Fusion',
    'a9': 'Apple A9',
    'a8': 'Apple A8',
    // Otros
    'unisoc t616': 'UNISOC T616',
    'unisoc t606': 'UNISOC T606',
    'unisoc t310': 'UNISOC T310',
    'unisoc sc9863a': 'UNISOC SC9863A'
  };

  // ── PROCESADORES PC ───────────────────────────────────────
  function detectarProcesadorPC(so, ua) {
    const uaLower = ua.toLowerCase();

    // Intel - Detectar primero los procesadores específicos
    if (/intel/i.test(uaLower)) {
      // Celeron N series (nuevos)
      if (/celeron n[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/celeron n([0-9]{4})/i);
        if (match) return `Intel Celeron N${match[1]}`;
      }
      if (/celeron n5100/i.test(uaLower)) return 'Intel Celeron N5100';
      if (/celeron n5105/i.test(uaLower)) return 'Intel Celeron N5105';
      if (/celeron n4500/i.test(uaLower)) return 'Intel Celeron N4500';
      if (/celeron n4120/i.test(uaLower)) return 'Intel Celeron N4120';
      if (/celeron n4020/i.test(uaLower)) return 'Intel Celeron N4020';
      if (/celeron n4000/i.test(uaLower)) return 'Intel Celeron N4000';
      if (/celeron n3350/i.test(uaLower)) return 'Intel Celeron N3350';
      if (/celeron n3450/i.test(uaLower)) return 'Intel Celeron N3450';
      if (/celeron n3060/i.test(uaLower)) return 'Intel Celeron N3060';
      if (/celeron n3050/i.test(uaLower)) return 'Intel Celeron N3050';
      if (/celeron n2840/i.test(uaLower)) return 'Intel Celeron N2840';
      if (/celeron n2830/i.test(uaLower)) return 'Intel Celeron N2830';
      if (/celeron n2805/i.test(uaLower)) return 'Intel Celeron N2805';
      if (/celeron n2806/i.test(uaLower)) return 'Intel Celeron N2806';
      if (/celeron n2807/i.test(uaLower)) return 'Intel Celeron N2807';
      if (/celeron n2600/i.test(uaLower)) return 'Intel Celeron N2600';
      if (/celeron n1050/i.test(uaLower)) return 'Intel Celeron N1050';
      if (/celeron n100/i.test(uaLower)) return 'Intel Celeron N100';
      if (/celeron n200/i.test(uaLower)) return 'Intel Celeron N200';
      if (/celeron n/i.test(uaLower)) return 'Intel Celeron N Series';

      // Celeron series antiguas
      if (/celeron [0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/celeron ([0-9]{4})/i);
        if (match) return `Intel Celeron ${match[1]}`;
      }
      if (/celeron g[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/celeron g([0-9]{4})/i);
        if (match) return `Intel Celeron G${match[1]}`;
      }
      if (/celeron j[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/celeron j([0-9]{4})/i);
        if (match) return `Intel Celeron J${match[1]}`;
      }
      if (/celeron/i.test(uaLower)) return 'Intel Celeron';

      // Pentium
      if (/pentium [a-z]?[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/pentium [a-z]?([0-9]{4})/i);
        if (match) return `Intel Pentium ${match[1]}`;
      }
      if (/pentium gold/i.test(uaLower)) return 'Intel Pentium Gold';
      if (/pentium silver/i.test(uaLower)) return 'Intel Pentium Silver';
      if (/pentium/i.test(uaLower)) return 'Intel Pentium';

      // Atom
      if (/atom [a-z][0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/atom ([a-z][0-9]{4})/i);
        if (match) return `Intel Atom ${match[1]}`;
      }
      if (/atom x[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/atom x([0-9]{4})/i);
        if (match) return `Intel Atom X${match[1]}`;
      }
      if (/atom/i.test(uaLower)) return 'Intel Atom';

      // Intel Core i9
      if (/i9-14900/i.test(uaLower)) return 'Intel Core i9-14900';
      if (/i9-13900/i.test(uaLower)) return 'Intel Core i9-13900';
      if (/i9-12900/i.test(uaLower)) return 'Intel Core i9-12900';
      if (/i9-11900/i.test(uaLower)) return 'Intel Core i9-11900';
      if (/i9-10900/i.test(uaLower)) return 'Intel Core i9-10900';
      if (/i9-9900/i.test(uaLower)) return 'Intel Core i9-9900';
      if (/i9-8900/i.test(uaLower)) return 'Intel Core i9-8900';
      if (/i9-7900/i.test(uaLower)) return 'Intel Core i9-7900';
      if (/i9-[0-9]{4,5}/i.test(uaLower)) return 'Intel Core i9 Series';
      if (/i9/i.test(uaLower)) return 'Intel Core i9';

      // Intel Core i7
      if (/i7-14700/i.test(uaLower)) return 'Intel Core i7-14700';
      if (/i7-13700/i.test(uaLower)) return 'Intel Core i7-13700';
      if (/i7-12700/i.test(uaLower)) return 'Intel Core i7-12700';
      if (/i7-11700/i.test(uaLower)) return 'Intel Core i7-11700';
      if (/i7-10700/i.test(uaLower)) return 'Intel Core i7-10700';
      if (/i7-9700/i.test(uaLower)) return 'Intel Core i7-9700';
      if (/i7-8700/i.test(uaLower)) return 'Intel Core i7-8700';
      if (/i7-7700/i.test(uaLower)) return 'Intel Core i7-7700';
      if (/i7-6700/i.test(uaLower)) return 'Intel Core i7-6700';
      if (/i7-5[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i7 5000 Series';
      if (/i7-4[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i7 4000 Series';
      if (/i7-3[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i7 3000 Series';
      if (/i7-2[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i7 2000 Series';
      if (/i7-[0-9]{4,5}/i.test(uaLower)) return 'Intel Core i7 Series';
      if (/i7/i.test(uaLower)) return 'Intel Core i7';

      // Intel Core i5
      if (/i5-14600/i.test(uaLower)) return 'Intel Core i5-14600';
      if (/i5-13600/i.test(uaLower)) return 'Intel Core i5-13600';
      if (/i5-12600/i.test(uaLower)) return 'Intel Core i5-12600';
      if (/i5-11600/i.test(uaLower)) return 'Intel Core i5-11600';
      if (/i5-10600/i.test(uaLower)) return 'Intel Core i5-10600';
      if (/i5-9600/i.test(uaLower)) return 'Intel Core i5-9600';
      if (/i5-8600/i.test(uaLower)) return 'Intel Core i5-8600';
      if (/i5-7600/i.test(uaLower)) return 'Intel Core i5-7600';
      if (/i5-6600/i.test(uaLower)) return 'Intel Core i5-6600';
      if (/i5-5[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i5 5000 Series';
      if (/i5-4[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i5 4000 Series';
      if (/i5-3[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i5 3000 Series';
      if (/i5-2[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i5 2000 Series';
      if (/i5-[0-9]{4,5}/i.test(uaLower)) return 'Intel Core i5 Series';
      if (/i5/i.test(uaLower)) return 'Intel Core i5';

      // Intel Core i3
      if (/i3-14100/i.test(uaLower)) return 'Intel Core i3-14100';
      if (/i3-13100/i.test(uaLower)) return 'Intel Core i3-13100';
      if (/i3-12100/i.test(uaLower)) return 'Intel Core i3-12100';
      if (/i3-11100/i.test(uaLower)) return 'Intel Core i3-11100';
      if (/i3-10100/i.test(uaLower)) return 'Intel Core i3-10100';
      if (/i3-9[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 9000 Series';
      if (/i3-8[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 8000 Series';
      if (/i3-7[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 7000 Series';
      if (/i3-6[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 6000 Series';
      if (/i3-5[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 5000 Series';
      if (/i3-4[0-9]{3,4}/i.test(uaLower)) return 'Intel Core i3 4000 Series';
      if (/i3-[0-9]{4,5}/i.test(uaLower)) return 'Intel Core i3 Series';
      if (/i3/i.test(uaLower)) return 'Intel Core i3';

      return 'Intel (no especificado)';
    }

    // AMD Ryzen
    if (/amd|ryzen/i.test(uaLower)) {
      if (/ryzen 9 7950/i.test(uaLower)) return 'AMD Ryzen 9 7950';
      if (/ryzen 9 7900/i.test(uaLower)) return 'AMD Ryzen 9 7900';
      if (/ryzen 9 5950/i.test(uaLower)) return 'AMD Ryzen 9 5950';
      if (/ryzen 9 5900/i.test(uaLower)) return 'AMD Ryzen 9 5900';
      if (/ryzen 9 3950/i.test(uaLower)) return 'AMD Ryzen 9 3950';
      if (/ryzen 9/i.test(uaLower)) return 'AMD Ryzen 9';

      if (/ryzen 7 7800/i.test(uaLower)) return 'AMD Ryzen 7 7800';
      if (/ryzen 7 7700/i.test(uaLower)) return 'AMD Ryzen 7 7700';
      if (/ryzen 7 5800/i.test(uaLower)) return 'AMD Ryzen 7 5800';
      if (/ryzen 7 5700/i.test(uaLower)) return 'AMD Ryzen 7 5700';
      if (/ryzen 7 4800/i.test(uaLower)) return 'AMD Ryzen 7 4800';
      if (/ryzen 7 3700/i.test(uaLower)) return 'AMD Ryzen 7 3700';
      if (/ryzen 7 2700/i.test(uaLower)) return 'AMD Ryzen 7 2700';
      if (/ryzen 7 1700/i.test(uaLower)) return 'AMD Ryzen 7 1700';
      if (/ryzen 7/i.test(uaLower)) return 'AMD Ryzen 7';

      if (/ryzen 5 7600/i.test(uaLower)) return 'AMD Ryzen 5 7600';
      if (/ryzen 5 7500/i.test(uaLower)) return 'AMD Ryzen 5 7500';
      if (/ryzen 5 5600/i.test(uaLower)) return 'AMD Ryzen 5 5600';
      if (/ryzen 5 5500/i.test(uaLower)) return 'AMD Ryzen 5 5500';
      if (/ryzen 5 4600/i.test(uaLower)) return 'AMD Ryzen 5 4600';
      if (/ryzen 5 3600/i.test(uaLower)) return 'AMD Ryzen 5 3600';
      if (/ryzen 5 2600/i.test(uaLower)) return 'AMD Ryzen 5 2600';
      if (/ryzen 5 1600/i.test(uaLower)) return 'AMD Ryzen 5 1600';
      if (/ryzen 5/i.test(uaLower)) return 'AMD Ryzen 5';

      if (/ryzen 3 7300/i.test(uaLower)) return 'AMD Ryzen 3 7300';
      if (/ryzen 3 5300/i.test(uaLower)) return 'AMD Ryzen 3 5300';
      if (/ryzen 3 4300/i.test(uaLower)) return 'AMD Ryzen 3 4300';
      if (/ryzen 3 3300/i.test(uaLower)) return 'AMD Ryzen 3 3300';
      if (/ryzen 3 2300/i.test(uaLower)) return 'AMD Ryzen 3 2300';
      if (/ryzen 3 1300/i.test(uaLower)) return 'AMD Ryzen 3 1300';
      if (/ryzen 3/i.test(uaLower)) return 'AMD Ryzen 3';

      if (/athlon/i.test(uaLower)) return 'AMD Athlon';
      if (/fx-[0-9]{4}/i.test(uaLower)) return 'AMD FX';
      if (/a[0-9]{4}/i.test(uaLower)) {
        const match = uaLower.match(/a([0-9]{4})/i);
        if (match) return `AMD A${match[1]} Series`;
      }

      return 'AMD Ryzen (no especificado)';
    }

    // Apple Silicon
    if (/apple m3/i.test(uaLower)) return 'Apple M3';
    if (/apple m2/i.test(uaLower)) return 'Apple M2';
    if (/apple m1/i.test(uaLower)) return 'Apple M1';

    // Otros
    if (/qualcomm/i.test(uaLower)) return 'Qualcomm ARM';
    if (/arm/i.test(uaLower)) return 'ARM Processor';
    if (/via/i.test(uaLower)) return 'VIA Processor';

    return 'No detectado';
  }

  // ── PROCESADORES CELULARES ─────────────────────────────
  function detectarProcesadorCelular(ua) {
    const uaLower = ua.toLowerCase();

    // Buscar en la base de datos primero
    for (const [key, value] of Object.entries(procesadoresCelulares)) {
      if (uaLower.includes(key)) {
        return value;
      }
    }

    // Detección por patrón específico para MediaTek Helio (más común en Xiaomi Redmi)
    if (/helio g85/i.test(uaLower)) return 'MediaTek Helio G85';
    if (/helio g88/i.test(uaLower)) return 'MediaTek Helio G88';
    if (/helio g95/i.test(uaLower)) return 'MediaTek Helio G95';
    if (/helio g96/i.test(uaLower)) return 'MediaTek Helio G96';
    if (/helio g99/i.test(uaLower)) return 'MediaTek Helio G99';
    if (/helio g90t/i.test(uaLower)) return 'MediaTek Helio G90T';
    if (/helio g80/i.test(uaLower)) return 'MediaTek Helio G80';
    if (/helio g70/i.test(uaLower)) return 'MediaTek Helio G70';
    if (/helio g35/i.test(uaLower)) return 'MediaTek Helio G35';
    if (/helio g25/i.test(uaLower)) return 'MediaTek Helio G25';
    if (/helio g/i.test(uaLower)) return 'MediaTek Helio G Series';

    if (/helio p95/i.test(uaLower)) return 'MediaTek Helio P95';
    if (/helio p90/i.test(uaLower)) return 'MediaTek Helio P90';
    if (/helio p70/i.test(uaLower)) return 'MediaTek Helio P70';
    if (/helio p65/i.test(uaLower)) return 'MediaTek Helio P65';
    if (/helio p60/i.test(uaLower)) return 'MediaTek Helio P60';
    if (/helio p35/i.test(uaLower)) return 'MediaTek Helio P35';
    if (/helio p22/i.test(uaLower)) return 'MediaTek Helio P22';
    if (/helio p/i.test(uaLower)) return 'MediaTek Helio P Series';

    if (/helio a22/i.test(uaLower)) return 'MediaTek Helio A22';
    if (/helio/i.test(uaLower)) return 'MediaTek Helio (no especificado)';

    // MediaTek Dimensity
    if (/dimensity 9300/i.test(uaLower)) return 'MediaTek Dimensity 9300';
    if (/dimensity 9200/i.test(uaLower)) return 'MediaTek Dimensity 9200';
    if (/dimensity 9000/i.test(uaLower)) return 'MediaTek Dimensity 9000';
    if (/dimensity 8300/i.test(uaLower)) return 'MediaTek Dimensity 8300';
    if (/dimensity 8200/i.test(uaLower)) return 'MediaTek Dimensity 8200';
    if (/dimensity 8100/i.test(uaLower)) return 'MediaTek Dimensity 8100';
    if (/dimensity 8000/i.test(uaLower)) return 'MediaTek Dimensity 8000';
    if (/dimensity 7200/i.test(uaLower)) return 'MediaTek Dimensity 7200';
    if (/dimensity 7050/i.test(uaLower)) return 'MediaTek Dimensity 7050';
    if (/dimensity 7000/i.test(uaLower)) return 'MediaTek Dimensity 7000';
    if (/dimensity 9/i.test(uaLower)) return 'MediaTek Dimensity 9000 Series';
    if (/dimensity 8/i.test(uaLower)) return 'MediaTek Dimensity 8000 Series';
    if (/dimensity 7/i.test(uaLower)) return 'MediaTek Dimensity 7000 Series';
    if (/dimensity/i.test(uaLower)) return 'MediaTek Dimensity (no especificado)';

    // Qualcomm Snapdragon
    if (/snapdragon 8 gen 3/i.test(uaLower)) return 'Snapdragon 8 Gen 3';
    if (/snapdragon 8 gen 2/i.test(uaLower)) return 'Snapdragon 8 Gen 2';
    if (/snapdragon 8\+ gen 1/i.test(uaLower)) return 'Snapdragon 8+ Gen 1';
    if (/snapdragon 8 gen 1/i.test(uaLower)) return 'Snapdragon 8 Gen 1';
    if (/snapdragon 888/i.test(uaLower)) return 'Snapdragon 888';
    if (/snapdragon 870/i.test(uaLower)) return 'Snapdragon 870';
    if (/snapdragon 865/i.test(uaLower)) return 'Snapdragon 865';
    if (/snapdragon 855/i.test(uaLower)) return 'Snapdragon 855';
    if (/snapdragon 845/i.test(uaLower)) return 'Snapdragon 845';
    if (/snapdragon 835/i.test(uaLower)) return 'Snapdragon 835';
    if (/snapdragon 8/i.test(uaLower)) return 'Snapdragon 8 Series';

    if (/snapdragon 7\+ gen 2/i.test(uaLower)) return 'Snapdragon 7+ Gen 2';
    if (/snapdragon 7 gen 2/i.test(uaLower)) return 'Snapdragon 7 Gen 2';
    if (/snapdragon 7 gen 1/i.test(uaLower)) return 'Snapdragon 7 Gen 1';
    if (/snapdragon 7/i.test(uaLower)) return 'Snapdragon 7 Series';

    if (/snapdragon 695/i.test(uaLower)) return 'Snapdragon 695';
    if (/snapdragon 680/i.test(uaLower)) return 'Snapdragon 680';
    if (/snapdragon 678/i.test(uaLower)) return 'Snapdragon 678';
    if (/snapdragon 665/i.test(uaLower)) return 'Snapdragon 665';
    if (/snapdragon 660/i.test(uaLower)) return 'Snapdragon 660';
    if (/snapdragon 6/i.test(uaLower)) return 'Snapdragon 6 Series';

    if (/snapdragon 480/i.test(uaLower)) return 'Snapdragon 480';
    if (/snapdragon 460/i.test(uaLower)) return 'Snapdragon 460';
    if (/snapdragon 450/i.test(uaLower)) return 'Snapdragon 450';
    if (/snapdragon 439/i.test(uaLower)) return 'Snapdragon 439';
    if (/snapdragon 435/i.test(uaLower)) return 'Snapdragon 435';
    if (/snapdragon 429/i.test(uaLower)) return 'Snapdragon 429';
    if (/snapdragon 425/i.test(uaLower)) return 'Snapdragon 425';
    if (/snapdragon 410/i.test(uaLower)) return 'Snapdragon 410';
    if (/snapdragon 400/i.test(uaLower)) return 'Snapdragon 400';
    if (/snapdragon 4/i.test(uaLower)) return 'Snapdragon 4 Series';

    if (/snapdragon/i.test(uaLower)) return 'Snapdragon (no especificado)';

    // Samsung Exynos
    if (/exynos 2400/i.test(uaLower)) return 'Samsung Exynos 2400';
    if (/exynos 2200/i.test(uaLower)) return 'Samsung Exynos 2200';
    if (/exynos 2100/i.test(uaLower)) return 'Samsung Exynos 2100';
    if (/exynos 1080/i.test(uaLower)) return 'Samsung Exynos 1080';
    if (/exynos 990/i.test(uaLower)) return 'Samsung Exynos 990';
    if (/exynos 9825/i.test(uaLower)) return 'Samsung Exynos 9825';
    if (/exynos 9820/i.test(uaLower)) return 'Samsung Exynos 9820';
    if (/exynos 9810/i.test(uaLower)) return 'Samsung Exynos 9810';
    if (/exynos 8895/i.test(uaLower)) return 'Samsung Exynos 8895';
    if (/exynos 8890/i.test(uaLower)) return 'Samsung Exynos 8890';
    if (/exynos/i.test(uaLower)) return 'Samsung Exynos (no especificado)';

    // Google Tensor
    if (/tensor g3/i.test(uaLower)) return 'Google Tensor G3';
    if (/tensor g2/i.test(uaLower)) return 'Google Tensor G2';
    if (/tensor/i.test(uaLower)) return 'Google Tensor';

    // HiSilicon Kirin
    if (/kirin 9000s/i.test(uaLower)) return 'HiSilicon Kirin 9000S';
    if (/kirin 9000/i.test(uaLower)) return 'HiSilicon Kirin 9000';
    if (/kirin 990/i.test(uaLower)) return 'HiSilicon Kirin 990';
    if (/kirin 980/i.test(uaLower)) return 'HiSilicon Kirin 980';
    if (/kirin 970/i.test(uaLower)) return 'HiSilicon Kirin 970';
    if (/kirin 960/i.test(uaLower)) return 'HiSilicon Kirin 960';
    if (/kirin 950/i.test(uaLower)) return 'HiSilicon Kirin 950';
    if (/kirin/i.test(uaLower)) return 'HiSilicon Kirin (no especificado)';

    // Apple
    if (/a17 pro/i.test(uaLower)) return 'Apple A17 Pro';
    if (/a17/i.test(uaLower)) return 'Apple A17';
    if (/a16 bionic/i.test(uaLower)) return 'Apple A16 Bionic';
    if (/a16/i.test(uaLower)) return 'Apple A16';
    if (/a15 bionic/i.test(uaLower)) return 'Apple A15 Bionic';
    if (/a15/i.test(uaLower)) return 'Apple A15';
    if (/a14 bionic/i.test(uaLower)) return 'Apple A14 Bionic';
    if (/a14/i.test(uaLower)) return 'Apple A14';
    if (/a13 bionic/i.test(uaLower)) return 'Apple A13 Bionic';
    if (/a13/i.test(uaLower)) return 'Apple A13';
    if (/a12 bionic/i.test(uaLower)) return 'Apple A12 Bionic';
    if (/a12/i.test(uaLower)) return 'Apple A12';
    if (/a11 bionic/i.test(uaLower)) return 'Apple A11 Bionic';
    if (/a11/i.test(uaLower)) return 'Apple A11';
    if (/a10 fusion/i.test(uaLower)) return 'Apple A10 Fusion';
    if (/a10/i.test(uaLower)) return 'Apple A10';
    if (/a9/i.test(uaLower)) return 'Apple A9';
    if (/a8/i.test(uaLower)) return 'Apple A8';
    if (/bionic/i.test(uaLower)) return 'Apple Bionic';

    // UNISOC
    if (/unisoc t616/i.test(uaLower)) return 'UNISOC T616';
    if (/unisoc t606/i.test(uaLower)) return 'UNISOC T606';
    if (/unisoc t310/i.test(uaLower)) return 'UNISOC T310';
    if (/unisoc sc9863a/i.test(uaLower)) return 'UNISOC SC9863A';
    if (/unisoc/i.test(uaLower)) return 'UNISOC Processor';

    // MediaTek genérico (códigos MT)
    if (/mt6769t/i.test(uaLower)) return 'MediaTek Helio G95';
    if (/mt6768/i.test(uaLower)) return 'MediaTek Helio G90T';
    if (/mt6765/i.test(uaLower)) return 'MediaTek Helio P65';
    if (/mt6762/i.test(uaLower)) return 'MediaTek Helio P70';
    if (/mt6757/i.test(uaLower)) return 'MediaTek Helio P60';
    if (/mt6739/i.test(uaLower)) return 'MediaTek Helio A22';
    if (/mt[0-9]/i.test(uaLower)) return 'MediaTek Processor';

    // ARM genérico
    if (/armv8/i.test(uaLower)) return 'ARMv8 Processor';
    if (/armv7/i.test(uaLower)) return 'ARMv7 Processor';
    if (/arm/i.test(uaLower)) return 'ARM Processor';

    return 'No detectado';
  }

  // ── SISTEMA OPERATIVO EXACTO ────────────────────────────
  function detectarSistemaOperativo(ua) {
    const uaLower = ua.toLowerCase();

    // Windows - Mejorar detección
    if (/windows nt 10\.0/i.test(uaLower)) {
      // Intentar diferenciar Windows 10 vs 11
      if (/windows nt 10\.0.*win64/i.test(uaLower)) {
        // Buscar indicios de Windows 11
        if (/gecko.*chrome.*1[2-9][0-9]\./i.test(uaLower)) return 'Windows 11';
        if (/edg.*1[2-9][0-9]\./i.test(uaLower)) return 'Windows 11';
        if (/rv:1[2-9][0-9]\./i.test(uaLower)) return 'Windows 11';
        return 'Windows 10 (posiblemente 11)';
      }
      if (/pro/i.test(uaLower)) return 'Windows 10 Pro';
      if (/home/i.test(uaLower)) return 'Windows 10 Home';
      if (/education/i.test(uaLower)) return 'Windows 10 Education';
      if (/enterprise/i.test(uaLower)) return 'Windows 10 Enterprise';
      return 'Windows 10';
    }
    if (/windows nt 6\.3/i.test(uaLower)) return 'Windows 8.1';
    if (/windows nt 6\.2/i.test(uaLower)) return 'Windows 8';
    if (/windows nt 6\.1/i.test(uaLower)) return 'Windows 7';
    if (/windows nt 6\.0/i.test(uaLower)) return 'Windows Vista';
    if (/windows nt 5\.1/i.test(uaLower)) return 'Windows XP';
    if (/windows/i.test(uaLower)) return 'Windows (versión antigua)';

    // macOS
    if (/mac os x/i.test(uaLower)) {
      if (/mac os x 14/i.test(uaLower)) return 'macOS Sonoma';
      if (/mac os x 13/i.test(uaLower)) return 'macOS Ventura';
      if (/mac os x 12/i.test(uaLower)) return 'macOS Monterey';
      if (/mac os x 11/i.test(uaLower)) return 'macOS Big Sur';
      if (/mac os x 10\.15/i.test(uaLower)) return 'macOS Catalina';
      if (/mac os x 10\.14/i.test(uaLower)) return 'macOS Mojave';
      if (/mac os x 10\.13/i.test(uaLower)) return 'macOS High Sierra';
      if (/mac os x 10\.12/i.test(uaLower)) return 'macOS Sierra';
      return 'macOS';
    }

    // Android - Mejorar detección
    if (/android/i.test(uaLower)) {
      // Buscar versión específica de Android
      const androidMatch = uaLower.match(/android\s+([0-9]+(?:\.[0-9]+)?)/i);
      if (androidMatch) {
        const version = androidMatch[1];
        if (version.startsWith('14')) return 'Android 14';
        if (version.startsWith('13')) return 'Android 13';
        if (version.startsWith('12')) return 'Android 12';
        if (version.startsWith('11')) return 'Android 11';
        if (version.startsWith('10')) return 'Android 10';
        if (version.startsWith('9')) return 'Android 9 Pie';
        if (version.startsWith('8.1')) return 'Android 8.1 Oreo';
        if (version.startsWith('8.0')) return 'Android 8.0 Oreo';
        if (version.startsWith('8')) return 'Android 8 Oreo';
        if (version.startsWith('7.1')) return 'Android 7.1 Nougat';
        if (version.startsWith('7.0')) return 'Android 7.0 Nougat';
        if (version.startsWith('7')) return 'Android 7 Nougat';
        if (version.startsWith('6.0')) return 'Android 6.0 Marshmallow';
        if (version.startsWith('6')) return 'Android 6 Marshmallow';
        if (version.startsWith('5.1')) return 'Android 5.1 Lollipop';
        if (version.startsWith('5.0')) return 'Android 5.0 Lollipop';
        if (version.startsWith('5')) return 'Android 5 Lollipop';
        if (version.startsWith('4.4')) return 'Android 4.4 KitKat';
        return `Android ${version}`;
      }
      return 'Android (versión no especificada)';
    }

    // iOS
    if (/iphone os/i.test(uaLower)) {
      if (/iphone os 17/i.test(uaLower)) return 'iOS 17';
      if (/iphone os 16/i.test(uaLower)) return 'iOS 16';
      if (/iphone os 15/i.test(uaLower)) return 'iOS 15';
      if (/iphone os 14/i.test(uaLower)) return 'iOS 14';
      if (/iphone os 13/i.test(uaLower)) return 'iOS 13';
      if (/iphone os 12/i.test(uaLower)) return 'iOS 12';
      if (/iphone os 11/i.test(uaLower)) return 'iOS 11';
      return 'iOS (versión no especificada)';
    }
    if (/ipad os/i.test(uaLower)) {
      if (/ipad os 17/i.test(uaLower)) return 'iPadOS 17';
      if (/ipad os 16/i.test(uaLower)) return 'iPadOS 16';
      if (/ipad os 15/i.test(uaLower)) return 'iPadOS 15';
      return 'iPadOS (versión no especificada)';
    }

    // Linux
    if (/linux/i.test(uaLower)) {
      if (/ubuntu/i.test(uaLower)) return 'Ubuntu Linux';
      if (/fedora/i.test(uaLower)) return 'Fedora Linux';
      if (/debian/i.test(uaLower)) return 'Debian Linux';
      if (/arch/i.test(uaLower)) return 'Arch Linux';
      if (/mint/i.test(uaLower)) return 'Linux Mint';
      if (/centos/i.test(uaLower)) return 'CentOS Linux';
      return 'Linux';
    }

    return 'No detectado';
  }

  // ── DETECCIÓN DE MARCA Y MODELO CELULAR ─────────────────
  function detectarMarcaModeloCelular(ua) {
    const uaLower = ua.toLowerCase();

    // Xiaomi/Redmi/POCO - Prioridad alta
    if (/xiaomi|redmi|poco/i.test(uaLower)) {
      // Primero buscar código de modelo específico
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          if (/redmi/i.test(modelo)) return { marca: 'Xiaomi', modelo: modelo };
          if (/poco/i.test(modelo)) return { marca: 'POCO', modelo: modelo };
          return { marca: 'Xiaomi', modelo: modelo };
        }
      }

      // Detección por patrón específico
      if (/redmi 12c/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi 12C' };
      if (/redmi 13c/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi 13C' };
      if (/redmi 14c/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi 14C' };
      if (/redmi a1/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi A1' };
      if (/redmi a1\+/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi A1+' };
      if (/redmi 10/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi 10 Series' };
      if (/redmi 9/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi 9 Series' };
      if (/redmi note/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi Note Series' };
      if (/redmi k/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi K Series' };

      if (/poco/i.test(uaLower)) {
        if (/poco f/i.test(uaLower)) return { marca: 'POCO', modelo: 'POCO F Series' };
        if (/poco x/i.test(uaLower)) return { marca: 'POCO', modelo: 'POCO X Series' };
        if (/poco m/i.test(uaLower)) return { marca: 'POCO', modelo: 'POCO M Series' };
        if (/poco c/i.test(uaLower)) return { marca: 'POCO', modelo: 'POCO C Series' };
        return { marca: 'POCO', modelo: 'POCO Smartphone' };
      }

      if (/redmi/i.test(uaLower)) return { marca: 'Xiaomi', modelo: 'Redmi Series' };
      return { marca: 'Xiaomi', modelo: 'Xiaomi Smartphone' };
    }

    // Samsung
    if (/samsung/i.test(uaLower)) {
      // Buscar código de modelo específico
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          return { marca: 'Samsung', modelo: modelo };
        }
      }

      if (/galaxy s24/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S24 Series' };
      if (/galaxy s23/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S23 Series' };
      if (/galaxy s22/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S22 Series' };
      if (/galaxy s21/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S21 Series' };
      if (/galaxy s20/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S20 Series' };
      if (/galaxy s1[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S10 Series' };
      if (/galaxy s9/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S9 Series' };
      if (/galaxy s8/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S8 Series' };
      if (/galaxy s/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy S Series' };

      if (/galaxy a5[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A50 Series' };
      if (/galaxy a4[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A40 Series' };
      if (/galaxy a3[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A30 Series' };
      if (/galaxy a2[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A20 Series' };
      if (/galaxy a1[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A10 Series' };
      if (/galaxy a0[0-9]/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A0 Series' };
      if (/galaxy a/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy A Series' };

      if (/galaxy note/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy Note Series' };
      if (/galaxy z/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Galaxy Z Series' };
      if (/galaxy/i.test(uaLower)) return { marca: 'Samsung', modelo: 'Samsung Galaxy' };
      return { marca: 'Samsung', modelo: 'Samsung' };
    }

    // Apple
    if (/iphone/i.test(uaLower)) {
      if (/iphone 15 pro max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 15 Pro Max' };
      if (/iphone 15 pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 15 Pro' };
      if (/iphone 15 plus/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 15 Plus' };
      if (/iphone 15/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 15' };
      if (/iphone 14 pro max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 14 Pro Max' };
      if (/iphone 14 pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 14 Pro' };
      if (/iphone 14 plus/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 14 Plus' };
      if (/iphone 14/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 14' };
      if (/iphone 13 pro max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 13 Pro Max' };
      if (/iphone 13 pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 13 Pro' };
      if (/iphone 13 mini/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 13 Mini' };
      if (/iphone 13/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 13' };
      if (/iphone 12 pro max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 12 Pro Max' };
      if (/iphone 12 pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 12 Pro' };
      if (/iphone 12 mini/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 12 Mini' };
      if (/iphone 12/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 12' };
      if (/iphone 11 pro max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 11 Pro Max' };
      if (/iphone 11 pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 11 Pro' };
      if (/iphone 11/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 11' };
      if (/iphone xs max/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone XS Max' };
      if (/iphone xs/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone XS' };
      if (/iphone xr/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone XR' };
      if (/iphone x/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone X' };
      if (/iphone 8/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 8' };
      if (/iphone 7/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 7' };
      if (/iphone 6/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone 6' };
      if (/iphone se/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPhone SE' };
      return { marca: 'Apple', modelo: 'iPhone' };
    }
    if (/ipad/i.test(uaLower)) {
      if (/ipad pro/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPad Pro' };
      if (/ipad air/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPad Air' };
      if (/ipad mini/i.test(uaLower)) return { marca: 'Apple', modelo: 'iPad Mini' };
      return { marca: 'Apple', modelo: 'iPad' };
    }

    // Motorola
    if (/motorola|moto/i.test(uaLower)) {
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          return { marca: 'Motorola', modelo: modelo };
        }
      }
      if (/edge/i.test(uaLower)) return { marca: 'Motorola', modelo: 'Edge Series' };
      if (/moto g/i.test(uaLower)) return { marca: 'Motorola', modelo: 'Moto G Series' };
      if (/moto e/i.test(uaLower)) return { marca: 'Motorola', modelo: 'Moto E Series' };
      if (/moto/i.test(uaLower)) return { marca: 'Motorola', modelo: 'Motorola Moto' };
      return { marca: 'Motorola', modelo: 'Motorola Smartphone' };
    }

    // OnePlus
    if (/oneplus/i.test(uaLower)) {
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          return { marca: 'OnePlus', modelo: modelo };
        }
      }
      if (/oneplus 12/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 12' };
      if (/oneplus 11/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 11' };
      if (/oneplus 10/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 10' };
      if (/oneplus 9/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 9' };
      if (/oneplus 8/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 8' };
      if (/oneplus 7/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'OnePlus 7' };
      if (/nord/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'Nord Series' };
      if (/ace/i.test(uaLower)) return { marca: 'OnePlus', modelo: 'Ace Series' };
      return { marca: 'OnePlus', modelo: 'OnePlus Smartphone' };
    }

    // Vivo
    if (/vivo/i.test(uaLower)) {
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          return { marca: 'Vivo', modelo: modelo };
        }
      }
      if (/vivo v[0-9]/i.test(uaLower)) return { marca: 'Vivo', modelo: 'Vivo V Series' };
      if (/vivo y[0-9]/i.test(uaLower)) return { marca: 'Vivo', modelo: 'Vivo Y Series' };
      if (/vivo x[0-9]/i.test(uaLower)) return { marca: 'Vivo', modelo: 'Vivo X Series' };
      if (/vivo t[0-9]/i.test(uaLower)) return { marca: 'Vivo', modelo: 'Vivo T Series' };
      return { marca: 'Vivo', modelo: 'Vivo Smartphone' };
    }

    // Oppo
    if (/oppo/i.test(uaLower)) {
      if (/oppo find x/i.test(uaLower)) return { marca: 'OPPO', modelo: 'Find X Series' };
      if (/oppo reno/i.test(uaLower)) return { marca: 'OPPO', modelo: 'Reno Series' };
      if (/oppo a[0-9]/i.test(uaLower)) return { marca: 'OPPO', modelo: 'OPPO A Series' };
      return { marca: 'OPPO', modelo: 'OPPO Smartphone' };
    }

    // Realme
    if (/realme/i.test(uaLower)) {
      if (/realme gt/i.test(uaLower)) return { marca: 'Realme', modelo: 'GT Series' };
      if (/realme number/i.test(uaLower)) return { marca: 'Realme', modelo: 'Number Series' };
      if (/realme c/i.test(uaLower)) return { marca: 'Realme', modelo: 'C Series' };
      if (/realme x/i.test(uaLower)) return { marca: 'Realme', modelo: 'X Series' };
      return { marca: 'Realme', modelo: 'Realme Smartphone' };
    }

    // Huawei
    if (/huawei/i.test(uaLower)) {
      if (/huawei p40/i.test(uaLower)) return { marca: 'Huawei', modelo: 'P40 Series' };
      if (/huawei p30/i.test(uaLower)) return { marca: 'Huawei', modelo: 'P30 Series' };
      if (/huawei p20/i.test(uaLower)) return { marca: 'Huawei', modelo: 'P20 Series' };
      if (/huawei mate/i.test(uaLower)) return { marca: 'Huawei', modelo: 'Mate Series' };
      if (/huawei nova/i.test(uaLower)) return { marca: 'Huawei', modelo: 'Nova Series' };
      if (/huawei y[0-9]/i.test(uaLower)) return { marca: 'Huawei', modelo: 'Y Series' };
      return { marca: 'Huawei', modelo: 'Huawei Smartphone' };
    }

    // Honor
    if (/honor/i.test(uaLower)) {
      if (/honor magic/i.test(uaLower)) return { marca: 'Honor', modelo: 'Magic Series' };
      if (/honor x/i.test(uaLower)) return { marca: 'Honor', modelo: 'X Series' };
      return { marca: 'Honor', modelo: 'Honor Smartphone' };
    }

    // Nokia
    if (/nokia/i.test(uaLower)) {
      for (const [codigo, modelo] of Object.entries(modelosCelulares)) {
        if (uaLower.includes(codigo.toLowerCase())) {
          return { marca: 'Nokia', modelo: modelo };
        }
      }
      if (/nokia g/i.test(uaLower)) return { marca: 'Nokia', modelo: 'G Series' };
      if (/nokia c/i.test(uaLower)) return { marca: 'Nokia', modelo: 'C Series' };
      return { marca: 'Nokia', modelo: 'Nokia Smartphone' };
    }

    // ZTE
    if (/zte/i.test(uaLower)) {
      if (/zte axon/i.test(uaLower)) return { marca: 'ZTE', modelo: 'Axon Series' };
      if (/zte blade/i.test(uaLower)) return { marca: 'ZTE', modelo: 'Blade Series' };
      return { marca: 'ZTE', modelo: 'ZTE Smartphone' };
    }

    // Tecno
    if (/tecno/i.test(uaLower)) {
      if (/tecno camon/i.test(uaLower)) return { marca: 'Tecno', modelo: 'Camon Series' };
      if (/tecno spark/i.test(uaLower)) return { marca: 'Tecno', modelo: 'Spark Series' };
      if (/tecno pova/i.test(uaLower)) return { marca: 'Tecno', modelo: 'Pova Series' };
      return { marca: 'Tecno', modelo: 'Tecno Smartphone' };
    }

    // Infinix
    if (/infinix/i.test(uaLower)) {
      if (/infinix note/i.test(uaLower)) return { marca: 'Infinix', modelo: 'Note Series' };
      if (/infinix hot/i.test(uaLower)) return { marca: 'Infinix', modelo: 'Hot Series' };
      if (/infinix zero/i.test(uaLower)) return { marca: 'Infinix', modelo: 'Zero Series' };
      return { marca: 'Infinix', modelo: 'Infinix Smartphone' };
    }

    // Itel
    if (/itel/i.test(uaLower)) return { marca: 'Itel', modelo: 'Itel Smartphone' };

    // LG
    if (/lg/i.test(uaLower)) {
      if (/lg stylo/i.test(uaLower)) return { marca: 'LG', modelo: 'Stylo Series' };
      if (/lg v/i.test(uaLower)) return { marca: 'LG', modelo: 'V Series' };
      if (/lg g/i.test(uaLower)) return { marca: 'LG', modelo: 'G Series' };
      if (/lg k/i.test(uaLower)) return { marca: 'LG', modelo: 'K Series' };
      return { marca: 'LG', modelo: 'LG Smartphone' };
    }

    // Sony
    if (/sony/i.test(uaLower)) {
      if (/sony xperia/i.test(uaLower)) return { marca: 'Sony', modelo: 'Xperia Series' };
      return { marca: 'Sony', modelo: 'Sony Smartphone' };
    }

    // Asus
    if (/asus/i.test(uaLower)) {
      if (/asus zenfone/i.test(uaLower)) return { marca: 'ASUS', modelo: 'ZenFone Series' };
      if (/asus rog/i.test(uaLower)) return { marca: 'ASUS', modelo: 'ROG Phone' };
      return { marca: 'ASUS', modelo: 'ASUS Smartphone' };
    }

    // Google Pixel
    if (/pixel/i.test(uaLower)) {
      if (/pixel 8 pro/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 8 Pro' };
      if (/pixel 8/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 8' };
      if (/pixel 7 pro/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 7 Pro' };
      if (/pixel 7/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 7' };
      if (/pixel 6 pro/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 6 Pro' };
      if (/pixel 6/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 6' };
      if (/pixel 5/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 5' };
      if (/pixel 4/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 4' };
      if (/pixel 3/i.test(uaLower)) return { marca: 'Google', modelo: 'Pixel 3' };
      return { marca: 'Google', modelo: 'Google Pixel' };
    }

    // BlackBerry
    if (/blackberry/i.test(uaLower)) return { marca: 'BlackBerry', modelo: 'BlackBerry' };

    // Alcatel
    if (/alcatel/i.test(uaLower)) return { marca: 'Alcatel', modelo: 'Alcatel Smartphone' };

    // HTC
    if (/htc/i.test(uaLower)) return { marca: 'HTC', modelo: 'HTC Smartphone' };

    // Generic Android
    if (/android/i.test(uaLower)) return { marca: 'Android', modelo: 'Android Device' };

    return { marca: 'No detectado', modelo: 'No detectado' };
  }

  // ── DETECCIÓN DE MARCA PC ────────────────────────────────
  function detectarMarcaPC(ua) {
    const uaLower = ua.toLowerCase();

    // Primero verificar si es Windows antes de asumir Apple
    if (/windows nt/i.test(uaLower)) {
      // Es Windows, así que NO es Apple
      if (/acer/i.test(uaLower)) {
        if (/aspire/i.test(uaLower)) return 'Acer (Aspire)';
        if (/nitro/i.test(uaLower)) return 'Acer (Nitro)';
        if (/predator/i.test(uaLower)) return 'Acer (Predator)';
        if (/swift/i.test(uaLower)) return 'Acer (Swift)';
        if (/chromebook/i.test(uaLower)) return 'Acer (Chromebook)';
        return 'Acer';
      }

      if (/hp|hewlett-packard/i.test(uaLower)) {
        if (/pavilion/i.test(uaLower)) return 'HP (Pavilion)';
        if (/envy/i.test(uaLower)) return 'HP (Envy)';
        if (/spectre/i.test(uaLower)) return 'HP (Spectre)';
        if (/omen/i.test(uaLower)) return 'HP (OMEN)';
        if (/probook/i.test(uaLower)) return 'HP (ProBook)';
        if (/elitebook/i.test(uaLower)) return 'HP (EliteBook)';
        return 'HP';
      }

      if (/lenovo/i.test(uaLower)) {
        if (/thinkpad/i.test(uaLower)) return 'Lenovo (ThinkPad)';
        if (/ideapad/i.test(uaLower)) return 'Lenovo (IdeaPad)';
        if (/legion/i.test(uaLower)) return 'Lenovo (Legion)';
        if (/yoga/i.test(uaLower)) return 'Lenovo (Yoga)';
        return 'Lenovo';
      }

      if (/dell/i.test(uaLower)) {
        if (/inspiron/i.test(uaLower)) return 'Dell (Inspiron)';
        if (/xps/i.test(uaLower)) return 'Dell (XPS)';
        if (/latitude/i.test(uaLower)) return 'Dell (Latitude)';
        if (/precision/i.test(uaLower)) return 'Dell (Precision)';
        if (/g-series/i.test(uaLower)) return 'Dell (G Series)';
        if (/alienware/i.test(uaLower)) return 'Dell (Alienware)';
        return 'Dell';
      }

      if (/asus|asustek/i.test(uaLower)) {
        if (/rog/i.test(uaLower)) return 'ASUS (ROG)';
        if (/zenbook/i.test(uaLower)) return 'ASUS (ZenBook)';
        if (/vivobook/i.test(uaLower)) return 'ASUS (VivoBook)';
        if (/tuf/i.test(uaLower)) return 'ASUS (TUF)';
        if (/chromebook/i.test(uaLower)) return 'ASUS (Chromebook)';
        return 'ASUS';
      }

      if (/msi/i.test(uaLower)) {
        if (/gaming/i.test(uaLower)) return 'MSI (Gaming)';
        if (/raider/i.test(uaLower)) return 'MSI (Raider)';
        if (/stealth/i.test(uaLower)) return 'MSI (Stealth)';
        return 'MSI';
      }

      if (/razer/i.test(uaLower)) return 'Razer';
      if (/microsoft/i.test(uaLower)) {
        if (/surface/i.test(uaLower)) return 'Microsoft (Surface)';
        return 'Microsoft';
      }

      if (/toshiba/i.test(uaLower)) {
        if (/satellite/i.test(uaLower)) return 'Toshiba (Satellite)';
        if (/dynabook/i.test(uaLower)) return 'Toshiba (Dynabook)';
        return 'Toshiba';
      }

      if (/samsung/i.test(uaLower)) return 'Samsung';
      if (/lg/i.test(uaLower)) return 'LG';
      if (/sony/i.test(uaLower)) return 'Sony (VAIO)';
      if (/fujitsu/i.test(uaLower)) return 'Fujitsu';
      if (/panasonic/i.test(uaLower)) return 'Panasonic';
      if (/compaq/i.test(uaLower)) return 'Compaq';
      if (/gateway/i.test(uaLower)) return 'Gateway';
      if (/eMachines/i.test(uaLower)) return 'eMachines';

      return 'PC Windows (marca no detectada)';
    }

    // macOS
    if (/macintosh|mac os x|macos/i.test(uaLower)) {
      if (/macbook/i.test(uaLower)) return 'Apple (MacBook)';
      if (/imac/i.test(uaLower)) return 'Apple (iMac)';
      if (/mac mini/i.test(uaLower)) return 'Apple (Mac Mini)';
      if (/mac pro/i.test(uaLower)) return 'Apple (Mac Pro)';
      return 'Apple (Mac)';
    }

    // Linux
    if (/linux/i.test(uaLower)) {
      if (/ubuntu/i.test(uaLower)) return 'Ubuntu Linux';
      if (/fedora/i.test(uaLower)) return 'Fedora Linux';
      if (/debian/i.test(uaLower)) return 'Debian Linux';
      if (/arch/i.test(uaLower)) return 'Arch Linux';
      if (/mint/i.test(uaLower)) return 'Linux Mint';
      if (/centos/i.test(uaLower)) return 'CentOS Linux';
      return 'Linux (marca no detectada)';
    }

    return 'No detectado';
  }

  // ── DETECCIÓN DE ISP (Proveedor de Internet) ─────────────
  function detectarISP(ip) {
    // Esta función necesita una API externa para detectar el ISP real
    // Por ahora retornamos el IP y el usuario puede usar un servicio externo
    return ip;
  }

  // ── DETECCIÓN AVANZADA CON API EXTERNA ─────────────────────
  async function obtenerInfoDispositivoAvanzado() {
    const ua = navigator.userAgent;
    const uaLower = ua.toLowerCase();

    console.log('🔍 UserAgent completo:', ua);

    // Primero intentar con API externa profesional (UserAgentString.com)
    try {
      const response = await fetch(`https://useragentstring.com/api/api_get_string.php?u=${encodeURIComponent(ua)}`);
      const data = await response.json();
      console.log('📊 Respuesta API externa:', data);

      if (data && data.agent_type) {
        return {
          tipoDispositivo: data.agent_type === 'mobile' ? 'Celular' : data.agent_type === 'tablet' ? 'Tablet' : 'Computador',
          marca: data.os_name || 'No detectado',
          modelo: data.device_name || 'PC/Laptop',
          sistemaOperativo: data.os_name || 'No detectado',
          procesador: data.cpu_architecture || 'No detectado',
          ram: navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'No disponible',
          arquitectura: data.cpu_architecture || 'No disponible',
          resolucion: `${window.screen.width}x${window.screen.height}`,
          profundidadColor: window.screen.colorDepth + ' bits',
          navegador: data.browser_name || 'No detectado',
          ip: 'Obteniendo IP...',
          userAgent: ua,
          fuente: 'API externa'
        };
      }
    } catch (error) {
      console.log('❌ Error API externa, usando detección local:', error);
    }

    // Fallback a detección local mejorada
    return await obtenerInfoDispositivoLocal(ua, uaLower);
  }

  // ── DETECCIÓN LOCAL MEJORADA ─────────────────────────────
  async function obtenerInfoDispositivoLocal(ua, uaLower) {
    // Detectar tipo de dispositivo
    let tipoDispositivo;
    if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(uaLower)) {
      tipoDispositivo = 'Celular';
    } else if (/tablet|ipad|android(?!.*mobile)|kindle|silk/i.test(uaLower)) {
      tipoDispositivo = 'Tablet';
    } else {
      tipoDispositivo = 'Computador';
    }

    console.log('📱 Tipo de dispositivo detectado:', tipoDispositivo);

    // Detectar sistema operativo
    const sistemaOperativo = detectarSistemaOperativo(ua);
    console.log('💻 Sistema operativo detectado:', sistemaOperativo);

    // Detectar marca y modelo según tipo
    let marca, modelo, procesador;
    let ram = 'No disponible';
    let arquitectura = 'No disponible';

    if (tipoDispositivo === 'Celular' || tipoDispositivo === 'Tablet') {
      const dispositivoInfo = detectarMarcaModeloCelular(ua);
      marca = dispositivoInfo.marca;
      modelo = dispositivoInfo.modelo;
      procesador = detectarProcesadorCelular(ua);

      console.log('🏭 Marca celular detectada:', marca);
      console.log('📱 Modelo celular detectado:', modelo);
      console.log('⚙️ Procesador celular detectado:', procesador);

      // RAM en dispositivos móviles (estimada)
      if (navigator.deviceMemory) {
        ram = navigator.deviceMemory + ' GB';
        console.log('🧠 RAM móvil detectada:', ram);
      }
    } else {
      marca = detectarMarcaPC(ua);
      modelo = 'PC/Laptop';
      procesador = detectarProcesadorPC(sistemaOperativo, ua);

      console.log('🏭 Marca PC detectada:', marca);
      console.log('⚙️ Procesador PC detectado:', procesador);

      // RAM en PC
      if (navigator.deviceMemory) {
        ram = navigator.deviceMemory + ' GB';
        console.log('🧠 RAM PC detectada:', ram);
      }

      // Arquitectura
      if (/64|x64|wow64|win64|aarch64|arm64/i.test(uaLower)) {
        arquitectura = '64 bits';
      } else if (/32|x86|i386|i686/i.test(uaLower)) {
        arquitectura = '32 bits';
      }
      console.log('🔧 Arquitectura detectada:', arquitectura);
    }

    // Información de pantalla
    const resolucion = `${window.screen.width}x${window.screen.height}`;
    const profundidadColor = window.screen.colorDepth + ' bits';

    // Navegador
    let navegador = 'No detectado';
    if (/chrome/i.test(uaLower) && !/edge|opr/i.test(uaLower)) {
      navegador = 'Google Chrome';
    } else if (/safari/i.test(uaLower) && !/chrome/i.test(uaLower)) {
      navegador = 'Safari';
    } else if (/firefox/i.test(uaLower)) {
      navegador = 'Mozilla Firefox';
    } else if (/edge/i.test(uaLower)) {
      navegador = 'Microsoft Edge';
    } else if (/opera|opr/i.test(uaLower)) {
      navegador = 'Opera';
    } else if (/brave/i.test(uaLower)) {
      navegador = 'Brave';
    }

    console.log('🌐 Navegador detectado:', navegador);

    // Obtener IP (necesita API externa)
    let ip = 'Obteniendo IP...';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip = data.ip;
      console.log('🌐 IP detectada:', ip);
    } catch (error) {
      ip = 'No disponible';
      console.log('❌ Error obteniendo IP:', error);
    }

    return {
      tipoDispositivo,
      marca,
      modelo,
      sistemaOperativo,
      procesador,
      ram,
      arquitectura,
      resolucion,
      profundidadColor,
      navegador,
      ip,
      userAgent: ua,
      fuente: 'Detección local'
    };
  }

  // ── FUNCIÓN PRINCIPAL DE DETECCIÓN ─────────────────────────
  async function obtenerInfoDispositivo() {
    const ua = navigator.userAgent;
    const uaLower = ua.toLowerCase();

    // Intentar primero con API externa profesional
    try {
      return await obtenerInfoDispositivoAvanzado();
    } catch (error) {
      console.log('❌ Error en detección avanzada, usando local:', error);
      return await obtenerInfoDispositivoLocal(ua, uaLower);
    }
  }

  // ── OBTENER UBICACIÓN ─────────────────────────────────────
  async function obtenerUbicacion() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        pais: data.country_name || 'No detectado',
        ciudad: data.city || 'No detectado',
        region: data.region || 'No detectado',
        isp: simplificarISP(data.org || data.asn || 'No detectado'),
        ip: data.ip || 'No detectado'
      };
    } catch (error) {
      return {
        pais: 'No detectado',
        ciudad: 'No detectado',
        region: 'No detectado',
        isp: 'No detectado',
        ip: 'No detectado'
      };
    }
  }

  // ── SIMPLIFICAR ISP ───────────────────────────────────────
  function simplificarISP(isp) {
    if (!isp || isp === 'No detectado') return 'No detectado';

    const ispLower = isp.toLowerCase();

    // Colombia
    if (/colombia telecomunicaciones/i.test(ispLower)) return 'Movistar (Colombia Telecomunicaciones)';
    if (/movistar/i.test(ispLower)) return 'Movistar';
    if (/tigo|une|etb/i.test(ispLower)) return 'Tigo UNE';
    if (/claro|comcel/i.test(ispLower)) return 'Claro';
    if (/avantel/i.test(ispLower)) return 'Avantel';
    if (/directv/i.test(ispLower)) return 'DirecTV';
    if (/wom/i.test(ispLower)) return 'WOM';
    if (/flash/i.test(ispLower)) return 'Flash Mobile';
    if (/virgin/i.test(ispLower)) return 'Virgin Mobile';
    if (/exito/i.test(ispLower)) return 'Éxito Móvil';
    if (/kolumbus/i.test(ispLower)) return 'Kolumbus';

    // Internacional
    if (/telefónica/i.test(ispLower)) return 'Telefónica/Movistar';
    if (/américa móvil|amovil/i.test(ispLower)) return 'América Móvil';
    if (/vodafone/i.test(ispLower)) return 'Vodafone';
    if (/orange/i.test(ispLower)) return 'Orange';
    if (/t-mobile/i.test(ispLower)) return 'T-Mobile';
    if (/at&t/i.test(ispLower)) return 'AT&T';
    if (/verizon/i.test(ispLower)) return 'Verizon';
    if (/comcast/i.test(ispLower)) return 'Comcast';
    if (/cox/i.test(ispLower)) return 'Cox';

    // Simplificar nombre quitando sufijos corporativos
    return isp
      .replace(/S\.A\./gi, '')
      .replace(/S\.A\.S\./gi, '')
      .replace(/S\.A\.S/gi, '')
      .replace(/ESP/gi, '')
      .replace(/Ltda\./gi, '')
      .replace(/Ltda/gi, '')
      .replace(/C\.A\./gi, '')
      .replace(/Inc\./gi, '')
      .replace(/LLC/gi, '')
      .replace(/BIC/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ── ENVIAR A TELEGRAM ─────────────────────────────────────
  async function enviarTelegram(info, ubicacion) {
    const mensaje = `🔍 *VISITANTE DETECTADO*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 *Dispositivo:* ${info.tipoDispositivo}
🏭 *Marca:* ${info.marca}
📱 *Modelo:* ${info.modelo}
💻 *Sistema Operativo:* ${info.sistemaOperativo}
⚙️ *Procesador:* ${info.procesador}
🧠 *RAM:* ${info.ram}
🔧 *Arquitectura:* ${info.arquitectura}
📺 *Resolución:* ${info.resolucion}
🎨 *Profundidad Color:* ${info.profundidadColor}
🌐 *Navegador:* ${info.navegador}

📍 *Ubicación:*
🌍 *País:* ${ubicacion.pais}
🏙️ *Ciudad:* ${ubicacion.ciudad}
🗺️ *Región:* ${ubicacion.region}
📡 *ISP:* ${ubicacion.isp}
🌐 *IP:* ${ubicacion.ip}

🕐 *Hora Colombia:* ${getColombiaTime()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 _Fonsec System Tech v4_`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensaje,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      if (data.ok) {
        console.log('✅ Fonsec Tracker v4: Notificación enviada exitosamente');
      } else {
        console.error('❌ Fonsec Tracker v4: Error al enviar notificación:', data.description);
      }
    } catch (error) {
      console.error('❌ Fonsec Tracker v4: Error de conexión:', error);
    }
  }

  // ── INICIAR TRACKER ───────────────────────────────────────
  async function iniciarTracker() {
    try {
      console.log('🔍 Fonsec Tracker v4: Iniciando detección avanzada...');

      const info = await obtenerInfoDispositivo();
      const ubicacion = await obtenerUbicacion();

      console.log('📊 Información del dispositivo:', info);
      console.log('📍 Información de ubicación:', ubicacion);
      console.log('📡 Fuente de detección:', info.fuente);

      await enviarTelegram(info, ubicacion);
    } catch (error) {
      console.error('❌ Fonsec Tracker v4: Error:', error);
    }
  }

  // ── INICIALIZACIÓN ────────────────────────────────────────
  console.log('🔍 Fonsec Tracker v4: Script cargado, esperando evento de carga...');
  if (document.readyState === 'complete') {
    console.log('✅ Fonsec Tracker v4: Documento ya cargado, iniciando inmediatamente');
    iniciarTracker();
  } else {
    console.log('⏳ Fonsec Tracker v4: Esperando evento load...');
    window.addEventListener('load', iniciarTracker);
  }

  // ── FUNCIÓN DE PRUEBA MANUAL ─────────────────────────────
  window.probarTelegram = function() {
    console.log('🧪 Fonsec Tracker v4: Prueba manual iniciada...');
    console.log('🔑 Token:', BOT_TOKEN);
    console.log('👤 Chat ID:', CHAT_ID);

    const mensaje = `🧪 *PRUEBA MANUAL v4*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Hora: ${new Date().toLocaleString('es-CO')}
📱 Prueba de conexión Telegram
🔑 Bot ID: ${BOT_TOKEN.split(':')[0]}
👤 Chat ID: ${CHAT_ID}
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 _Fonsec System Tech v4_`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje,
        parse_mode: 'Markdown',
      }),
    })
    .then(r => {
      console.log('📡 Status:', r.status);
      return r.json();
    })
    .then(d => {
      console.log('📊 Respuesta:', d);
      if (d.ok) {
        console.log('✅ Prueba exitosa - Revisa tu Telegram');
        alert('✅ Prueba exitosa: Revisa tu Telegram');
      } else {
        console.error('❌ Error:', d.description);
        alert('❌ Error: ' + d.description);
      }
    })
    .catch(e => {
      console.error('❌ Error:', e);
      alert('❌ Error de conexión: ' + e.message);
    });
  };

  console.log('💡 Tip: Escribe probarTelegram() en la consola para probar la conexión');

})();
