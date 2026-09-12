/* ====================================================
   FONSEC SYSTEM TECH — TRACKER COMPLETO v3
   Solo Colombia · Info máxima del visitante
   ==================================================== */

const BOT_TOKEN = '8747454717:AAEDSlAt6NzYNsB28nXbR3WVeComtsYQPaU';
const CHAT_ID   = '8212900917';

(function initVisitorTracker() {

  if (sessionStorage.getItem('fonsec_v3')) return;
  sessionStorage.setItem('fonsec_v3', '1');

  // ── HORA COLOMBIA ────────────────────────────────────
  function getColombiaTime() {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).format(new Date());
  }

  // ── DETECCIÓN COMPLETA DEL DISPOSITIVO ───────────────
  
function normalizarModeloComercial(ua, chModel = '', marca = '') {
  const raw = `${chModel || ''} ${ua || ''}`.replace(/\s+/g, ' ').trim();
  const low = raw.toLowerCase();

  // Apple
  if (/\biphone\b/i.test(raw)) return 'Apple iPhone';
  if (/\bipad\b/i.test(raw)) return 'Apple iPad';
  if (/\bmacbook\s*pro\b/i.test(raw)) return 'Apple MacBook Pro';
  if (/\bmacbook\s*air\b/i.test(raw)) return 'Apple MacBook Air';
  if (/\bmacbook\b/i.test(raw)) return 'Apple MacBook';
  if (/\bimac\b/i.test(raw)) return 'Apple iMac';
  if (/\bmac\s*mini\b/i.test(raw)) return 'Apple Mac mini';
  if (/\bmac\s*studio\b/i.test(raw)) return 'Apple Mac Studio';

  // Redmi / Xiaomi model codes commonly exposed by Android browsers.
  const xiaomiCodes = {
    '220733sl':'Redmi A1','220733sg':'Redmi A1','220733si':'Redmi A1',
    '220733s':'Redmi A1','220733li':'Redmi A1','220733sh':'Redmi A1',
    '22101317g':'Redmi A1+','22120rn86g':'Redmi 12C',
    '23028rncag':'Redmi 12C','23053rn02a':'Redmi 12C',
    '23053rn02l':'Redmi 12C','23053rn02y':'Redmi 12C',
    '23028rncag':'Redmi 12C','23076rn4bi':'Redmi 13C',
    '23100rn82l':'Redmi 13C','23106rn0da':'Redmi 13C',
    '2404arn45a':'Redmi 13C','2409brn2ca':'Redmi 14C',
    '2409brn2cl':'Redmi 14C','2410crn47i':'Redmi 14C',
    'm2004j19c':'Redmi Note 9','m2004j19g':'Redmi Note 9',
    'm2003j6ci':'Redmi Note 9 Pro','m2003j6si':'Redmi Note 9 Pro',
    'm2101k7ag':'Redmi Note 10 Pro','m2101k7ai':'Redmi Note 10 Pro',
    'm2101k7bg':'Redmi Note 10 5G','m2101k7bnY':'Redmi Note 10 5G',
    '2201117tg':'Redmi Note 11','2201117ty':'Redmi Note 11',
    '2201117tl':'Redmi Note 11','2201117ti':'Redmi Note 11',
    '2201117sg':'Redmi Note 11S','2201117si':'Redmi Note 11S',
    '2201116sg':'Redmi Note 11 Pro 5G','2209116ag':'Redmi Note 11 Pro+ 5G',
    '22101316g':'Redmi Note 12','22101316i':'Redmi Note 12',
    '22101316ug':'Redmi Note 12 5G','23021raae':'Redmi Note 12 Pro',
    '23021raaeG':'Redmi Note 12 Pro','23028ra60l':'Redmi Note 12S',
    '23049rad8c':'Redmi Note 13','2312dra50g':'Redmi Note 13 Pro',
    '2312draa50g':'Redmi Note 13 Pro 5G','23090ra98g':'Redmi Note 13 Pro+ 5G',
    // Modelos adicionales de Xiaomi/Redmi
    '22011211g':'Redmi 10','22041716g':'Redmi 10C','22041716i':'Redmi 10C',
    '22011119sg':'Redmi 10A','22011119sy':'Redmi 10A','22011119pi':'Redmi 10A',
    '21091116g':'Redmi 9','21091116i':'Redmi 9','21091116sg':'Redmi 9A',
    '21061119ag':'Redmi 9A','21061119sg':'Redmi 9A','21061119sy':'Redmi 9A',
    'm2007j20cg':'Redmi 9 Power','m2007j20cg':'Redmi 9T',
    'm2007j22g':'Redmi 9T','m2007j22c':'Redmi 9T',
    '21061118sg':'Redmi 9C','21061118sy':'Redmi 9C','21061118ag':'Redmi 9C',
    '21061116sg':'Redmi 9','21061116i':'Redmi 9',
    '22041216g':'Redmi 10 Power','22041216i':'Redmi 10 Power',
    '220333qg':'Redmi 10A Sport','220333qi':'Redmi 10A Sport',
    '23021raacg':'Redmi 12','23021raae':'Redmi 12','23021raa6g':'Redmi 12',
    '23046pnc9c':'Redmi 12 5G','23046pnc9i':'Redmi 12 5G',
    '23088vr81c':'Redmi 12 5G','23088vr81g':'Redmi 12 5G',
    '23124ra7cg':'Redmi 13','23124ra7di':'Redmi 13','23124ra7dg':'Redmi 13',
    '24069pc21g':'Redmi 13 5G','24069pc21i':'Redmi 13 5G',
    '2311drac5g':'Redmi 13C 5G','2311drac5i':'Redmi 13C 5G',
    '24073rn76g':'Redmi 14','24073rn76i':'Redmi 14',
    '2406brn2cg':'Redmi 14R','2406brn2ci':'Redmi 14R',
    '24106rn37g':'Redmi 14R 5G','24106rn37i':'Redmi 14R 5G',
    '2404arn45g':'Redmi Note 13R','2404arn45i':'Redmi Note 13R',
    '23109raa8g':'Redmi Note 13 5G','23109raa8i':'Redmi Note 13 5G',
    '2312crad8g':'Redmi Note 13 5G','2312crad8i':'Redmi Note 13 5G',
    '24022raa4g':'Redmi Note 14','24022raa4i':'Redmi Note 14',
    '24022raa4c':'Redmi Note 14 5G','24022raa4d':'Redmi Note 14 5G',
    '24069pc21g':'Redmi Note 14 5G','24069pc21i':'Redmi Note 14 5G',
    // Redmi Note series adicionales
    '22011119sg':'Redmi Note 10','22011119sy':'Redmi Note 10',
    '22011119pi':'Redmi Note 10','22011119pg':'Redmi Note 10',
    '22011119p':'Redmi Note 10','22011119i':'Redmi Note 10',
    '22011119t':'Redmi Note 10','22011119s':'Redmi Note 10',
    '22011119u':'Redmi Note 10','22011119v':'Redmi Note 10',
    '22111317p':'Redmi Note 11','22111317i':'Redmi Note 11',
    '22111317g':'Redmi Note 11','22111317c':'Redmi Note 11',
    '22111317t':'Redmi Note 11','22111317s':'Redmi Note 11',
    '22111317u':'Redmi Note 11','22111317v':'Redmi Note 11',
    '23013rk75g':'Redmi Note 12','23013rk75i':'Redmi Note 12',
    '23013rk75c':'Redmi Note 12','23013rk75t':'Redmi Note 12',
    '23013rk75s':'Redmi Note 12','23013rk75u':'Redmi Note 12',
    '23090ra98g':'Redmi Note 12 Turbo','23090ra98i':'Redmi Note 12 Turbo',
    '23046pnc9g':'Redmi Note 12 Turbo','23046pnc9i':'Redmi Note 12 Turbo',
    '2312crad8g':'Redmi Note 13','2312crad8i':'Redmi Note 13',
    '2312crad8c':'Redmi Note 13','2312crad8t':'Redmi Note 13',
    '2312crad8s':'Redmi Note 13','2312crad8u':'Redmi Note 13',
    '24053pn04g':'Redmi Note 13','24053pn04i':'Redmi Note 13',
    '24053pn04c':'Redmi Note 13','24053pn04t':'Redmi Note 13',
    '24069pc21g':'Redmi Note 14','24069pc21i':'Redmi Note 14',
    '24069pc21c':'Redmi Note 14','24069pc21t':'Redmi Note 14',
    '24069pc21s':'Redmi Note 14','24069pc21u':'Redmi Note 14',
    // Redmi K series
    '22041211ac':'Redmi K50','22041211ac':'Redmi K50 Gaming',
    '2201122g':'Redmi K50 Pro','2201122i':'Redmi K50 Pro',
    '22041216g':'Redmi K50i','22041216i':'Redmi K50i',
    '23013pbb5g':'Redmi K60','23013pbb5i':'Redmi K60',
    '23013pbb5c':'Redmi K60','23013pbb5t':'Redmi K60',
    '23013pbb5s':'Redmi K60','23013pbb5u':'Redmi K60',
    '23013rk75g':'Redmi K60 Pro','23013rk75i':'Redmi K60 Pro',
    '23013rk75c':'Redmi K60 Pro','23013rk75t':'Redmi K60 Pro',
    '23013rk75s':'Redmi K60 Pro','23013rk75u':'Redmi K60 Pro',
    '23046pnc9g':'Redmi K60 Ultra','23046pnc9i':'Redmi K60 Ultra',
    '23046pnc9c':'Redmi K60 Ultra','23046pnc9t':'Redmi K60 Ultra',
    '23046pnc9s':'Redmi K60 Ultra','23046pnc9u':'Redmi K60 Ultra',
    '24069pc21g':'Redmi K70','24069pc21i':'Redmi K70',
    '24069pc21c':'Redmi K70','24069pc21t':'Redmi K70',
    '24069pc21s':'Redmi K70','24069pc21u':'Redmi K70',
    '24022raa4g':'Redmi K70 Pro','24022raa4i':'Redmi K70 Pro',
    '24022raa4c':'Redmi K70 Pro','24022raa4t':'Redmi K70 Pro',
    '24022raa4s':'Redmi K70 Pro','24022raa4u':'Redmi K70 Pro',
    // Xiaomi C series
    '22041716g':'Xiaomi Civi','22041716i':'Xiaomi Civi',
    '22041211ac':'Xiaomi Civi 1S','22041211ac':'Xiaomi Civi 1S',
    '23046pnc9g':'Xiaomi Civi 3','23046pnc9i':'Xiaomi Civi 3',
    '24069pc21g':'Xiaomi Civi 4 Pro','24069pc21i':'Xiaomi Civi 4 Pro',
    // Xiaomi 11T/12T series
    '21091116sg':'Xiaomi 11T','21091116sg':'Xiaomi 11T Pro',
    '2201122g':'Xiaomi 12T','2201122i':'Xiaomi 12T',
    '2201122g':'Xiaomi 12T Pro','2201122i':'Xiaomi 12T Pro',
    '23013pbb5g':'Xiaomi 13T','23013pbb5i':'Xiaomi 13T',
    '23013pbb5g':'Xiaomi 13T Pro','23013pbb5i':'Xiaomi 13T Pro',
    // Xiaomi 13/14 series
    '2210132c':'Xiaomi 13','2210132c':'Xiaomi 13 Pro',
    '2304dpn6cg':'Xiaomi 13','2304dpn6ci':'Xiaomi 13',
    '2304dpn6cg':'Xiaomi 13 Pro','2304dpn6ci':'Xiaomi 13 Pro',
    '23046pnc9g':'Xiaomi 13 Ultra','23046pnc9i':'Xiaomi 13 Ultra',
    '24069pc21g':'Xiaomi 14','24069pc21i':'Xiaomi 14',
    '24069pc21g':'Xiaomi 14 Pro','24069pc21i':'Xiaomi 14 Pro',
    '24022raa4g':'Xiaomi 14 Ultra','24022raa4i':'Xiaomi 14 Ultra',
    // Xiaomi Mix series
    '2201122g':'Xiaomi Mix 4','2201122i':'Xiaomi Mix 4',
    '22041211ac':'Xiaomi Mix Fold','22041211ac':'Xiaomi Mix Fold 2',
    '23046pnc9g':'Xiaomi Mix Fold 3','23046pnc9i':'Xiaomi Mix Fold 3',
    '24069pc21g':'Xiaomi Mix Fold 4','24069pc21i':'Xiaomi Mix Fold 4',
    '24022raa4g':'Xiaomi Mix Flip','24022raa4i':'Xiaomi Mix Flip'
  };

  const code = (chModel || '').toLowerCase().replace(/\s+/g, '');
  if (xiaomiCodes[code]) return `Xiaomi ${xiaomiCodes[code]}`;

  // POCO.
  const poco = raw.match(/\b(POCO)\s+([A-Z0-9][A-Z0-9 .+\-]*)/i);
  if (poco) return `POCO ${poco[2].trim().replace(/\s+/g,' ')}`;
  const pocoCodes = {
    'm2004j1g':'POCO F2 Pro','m2007j20cg':'POCO X3 NFC',
    'm2102j20sg':'POCO X3 Pro','2201116pg':'POCO M4 Pro 5G',
    '2201117pg':'POCO M4 Pro 5G','22071219cg':'POCO F4',
    '22101320g':'POCO X5 5G','22111317pg':'POCO X5 Pro 5G',
    '23049pcd8g':'POCO X6','23122pcd1g':'POCO X6 Pro',
    '2405pcd8g':'POCO F6','2405pcd8i':'POCO F6',
    // POCO series adicionales
    '2206113bcg':'POCO C3','2206113bci':'POCO C3',
    '2206113bcg':'POCO C31','2206113bci':'POCO C31',
    '22041716g':'POCO C40','22041716i':'POCO C40',
    '22041216g':'POCO C50','22041216i':'POCO C50',
    '22071219cg':'POCO F3','22071219ci':'POCO F3',
    '22041211ac':'POCO F4 GT','22041211ac':'POCO F4 GT',
    '23013pbb5g':'POCO F5','23013pbb5i':'POCO F5',
    '23013pbb5g':'POCO F5 Pro','23013pbb5i':'POCO F5 Pro',
    '24069pc21g':'POCO F6 Pro','24069pc21i':'POCO F6 Pro',
    '2201117tg':'POCO M2','2201117ty':'POCO M2',
    '2201117tl':'POCO M2 Pro','2201117ti':'POCO M2 Pro',
    '22101317g':'POCO M3','22101317i':'POCO M3',
    '22101317g':'POCO M3 Pro','22101317i':'POCO M3 Pro',
    '23021raae':'POCO M4','23021raaeG':'POCO M4',
    '23021raae':'POCO M4 Pro','23021raaeG':'POCO M4 Pro',
    '24073rn76g':'POCO M5','24073rn76i':'POCO M5',
    '24073rn76g':'POCO M5 Pro','24073rn76i':'POCO M5 Pro',
    '2201116sg':'POCO M5s','2201116sg':'POCO M5s',
    '2201116pg':'POCO X2','2201116pg':'POCO X2',
    '22041211ac':'POCO X3','22041211ac':'POCO X3',
    '22041211ac':'POCO X3 NFC','22041211ac':'POCO X3 NFC',
    '2201116pg':'POCO X3 Pro','2201116pg':'POCO X3 Pro',
    '22101320g':'POCO X4','22101320i':'POCO X4',
    '22101320g':'POCO X4 Pro','22101320i':'POCO X4 Pro',
    '23021raae':'POCO X4 GT','23021raaeG':'POCO X4 GT',
    '22111317pg':'POCO X5','22111317pi':'POCO X5',
    '22111317pg':'POCO X5 Pro','22111317pi':'POCO X5 Pro',
    '23049pcd8g':'POCO X5s','23049pcd8i':'POCO X5s',
    '23049pcd8g':'POCO X6','23049pcd8i':'POCO X6',
    '23122pcd1g':'POCO X6 Pro','23122pcd1i':'POCO X6 Pro',
    '24069pc21g':'POCO X7','24069pc21i':'POCO X7',
    '24069pc21g':'POCO X7 Pro','24069pc21i':'POCO X7 Pro'
  };
  if (pocoCodes[code]) return pocoCodes[code];

  // Samsung: Galaxy model is often present as SM-xxxx.
  const sm = raw.match(/\bSM-[A-Z0-9-]+\b/i);
  if (sm) {
    const smCode = sm[0].toUpperCase();
    const samsung = {
      'SM-A015F':'Samsung Galaxy A01','SM-A025F':'Samsung Galaxy A02',
      'SM-A035F':'Samsung Galaxy A03','SM-A045F':'Samsung Galaxy A04',
      'SM-A055F':'Samsung Galaxy A05','SM-A065F':'Samsung Galaxy A06',
      'SM-A105F':'Samsung Galaxy A10','SM-A107F':'Samsung Galaxy A10s',
      'SM-A115F':'Samsung Galaxy A11','SM-A125F':'Samsung Galaxy A12',
      'SM-A127F':'Samsung Galaxy A12','SM-A135F':'Samsung Galaxy A13',
      'SM-A145F':'Samsung Galaxy A14','SM-A155F':'Samsung Galaxy A15',
      'SM-A165F':'Samsung Galaxy A16','SM-A205F':'Samsung Galaxy A20',
      'SM-A207F':'Samsung Galaxy A20s','SM-A215U':'Samsung Galaxy A21s',
      'SM-A225F':'Samsung Galaxy A22','SM-A235F':'Samsung Galaxy A23',
      'SM-A245F':'Samsung Galaxy A24','SM-A255F':'Samsung Galaxy A25',
      'SM-A256E':'Samsung Galaxy A25 5G','SM-A266B':'Samsung Galaxy A26',
      'SM-A305F':'Samsung Galaxy A30','SM-A307FN':'Samsung Galaxy A30s',
      'SM-A315G':'Samsung Galaxy A31','SM-A325F':'Samsung Galaxy A32',
      'SM-A336B':'Samsung Galaxy A33 5G','SM-A346E':'Samsung Galaxy A34 5G',
      'SM-A356E':'Samsung Galaxy A35 5G','SM-A366B':'Samsung Galaxy A36',
      'SM-A405FN':'Samsung Galaxy A40','SM-A415F':'Samsung Galaxy A41',
      'SM-A426B':'Samsung Galaxy A42 5G','SM-A515F':'Samsung Galaxy A51',
      'SM-A516B':'Samsung Galaxy A51 5G','SM-A525F':'Samsung Galaxy A52',
      'SM-A526B':'Samsung Galaxy A52 5G','SM-A528B':'Samsung Galaxy A52s 5G',
      'SM-A536B':'Samsung Galaxy A53 5G','SM-A546B':'Samsung Galaxy A54 5G',
      'SM-A556B':'Samsung Galaxy A55 5G','SM-A566B':'Samsung Galaxy A56',
      'SM-G960F':'Samsung Galaxy S9','SM-G973F':'Samsung Galaxy S10',
      'SM-G980F':'Samsung Galaxy S20','SM-G991B':'Samsung Galaxy S21',
      'SM-G996B':'Samsung Galaxy S21+','SM-G998B':'Samsung Galaxy S21 Ultra',
      'SM-G990B':'Samsung Galaxy S21 FE','SM-G991B':'Samsung Galaxy S21',
      'SM-S901B':'Samsung Galaxy S22','SM-S906B':'Samsung Galaxy S22+',
      'SM-S908B':'Samsung Galaxy S22 Ultra','SM-S911B':'Samsung Galaxy S23',
      'SM-S916B':'Samsung Galaxy S23+','SM-S918B':'Samsung Galaxy S23 Ultra',
      'SM-S711B':'Samsung Galaxy S23 FE','SM-S921B':'Samsung Galaxy S24',
      'SM-S926B':'Samsung Galaxy S24+','SM-S928B':'Samsung Galaxy S24 Ultra',
      'SM-S721B':'Samsung Galaxy S24 FE','SM-S931B':'Samsung Galaxy S25',
      'SM-S936B':'Samsung Galaxy S25+','SM-S938B':'Samsung Galaxy S25 Ultra',
      'SM-F731B':'Samsung Galaxy Z Flip5','SM-F741B':'Samsung Galaxy Z Flip6',
      'SM-F946B':'Samsung Galaxy Z Fold5','SM-F956B':'Samsung Galaxy Z Fold6',
      // Galaxy A series adicionales
      'SM-A045F':'Samsung Galaxy A04s','SM-A045FZ':'Samsung Galaxy A04s',
      'SM-A055F':'Samsung Galaxy A05s','SM-A055FZ':'Samsung Galaxy A05s',
      'SM-A065F':'Samsung Galaxy A06s','SM-A065FZ':'Samsung Galaxy A06s',
      'SM-A115F':'Samsung Galaxy A11','SM-A115FZ':'Samsung Galaxy A11',
      'SM-A125F':'Samsung Galaxy A12','SM-A125FZ':'Samsung Galaxy A12',
      'SM-A125M':'Samsung Galaxy A12','SM-A125U':'Samsung Galaxy A12',
      'SM-A135F':'Samsung Galaxy A13','SM-A135FZ':'Samsung Galaxy A13',
      'SM-A135M':'Samsung Galaxy A13','SM-A135U':'Samsung Galaxy A13',
      'SM-A145F':'Samsung Galaxy A14','SM-A145FZ':'Samsung Galaxy A14',
      'SM-A145M':'Samsung Galaxy A14','SM-A145U':'Samsung Galaxy A14',
      'SM-A155F':'Samsung Galaxy A15','SM-A155FZ':'Samsung Galaxy A15',
      'SM-A155M':'Samsung Galaxy A15','SM-A155U':'Samsung Galaxy A15',
      'SM-A165F':'Samsung Galaxy A16','SM-A165FZ':'Samsung Galaxy A16',
      'SM-A165M':'Samsung Galaxy A16','SM-A165U':'Samsung Galaxy A16',
      'SM-A205F':'Samsung Galaxy A20','SM-A205FZ':'Samsung Galaxy A20',
      'SM-A205M':'Samsung Galaxy A20','SM-A205U':'Samsung Galaxy A20',
      'SM-A207F':'Samsung Galaxy A20s','SM-A207FZ':'Samsung Galaxy A20s',
      'SM-A207M':'Samsung Galaxy A20s','SM-A207U':'Samsung Galaxy A20s',
      'SM-A215U':'Samsung Galaxy A21','SM-A215UZ':'Samsung Galaxy A21',
      'SM-A215M':'Samsung Galaxy A21','SM-A215W':'Samsung Galaxy A21',
      'SM-A225F':'Samsung Galaxy A22','SM-A225FZ':'Samsung Galaxy A22',
      'SM-A225M':'Samsung Galaxy A22','SM-A225U':'Samsung Galaxy A22',
      'SM-A235F':'Samsung Galaxy A23','SM-A235FZ':'Samsung Galaxy A23',
      'SM-A235M':'Samsung Galaxy A23','SM-A235U':'Samsung Galaxy A23',
      'SM-A245F':'Samsung Galaxy A24','SM-A245FZ':'Samsung Galaxy A24',
      'SM-A245M':'Samsung Galaxy A24','SM-A245U':'Samsung Galaxy A24',
      'SM-A255F':'Samsung Galaxy A25','SM-A255FZ':'Samsung Galaxy A25',
      'SM-A255M':'Samsung Galaxy A25','SM-A255U':'Samsung Galaxy A25',
      'SM-A256E':'Samsung Galaxy A25 5G','SM-A256EZ':'Samsung Galaxy A25 5G',
      'SM-A256M':'Samsung Galaxy A25 5G','SM-A256U':'Samsung Galaxy A25 5G',
      'SM-A266B':'Samsung Galaxy A26','SM-A266BZ':'Samsung Galaxy A26',
      'SM-A266M':'Samsung Galaxy A26','SM-A266U':'Samsung Galaxy A26',
      'SM-A305F':'Samsung Galaxy A30','SM-A305FZ':'Samsung Galaxy A30',
      'SM-A305M':'Samsung Galaxy A30','SM-A305U':'Samsung Galaxy A30',
      'SM-A307FN':'Samsung Galaxy A30s','SM-A307FNZ':'Samsung Galaxy A30s',
      'SM-A307M':'Samsung Galaxy A30s','SM-A307U':'Samsung Galaxy A30s',
      'SM-A315G':'Samsung Galaxy A31','SM-A315GZ':'Samsung Galaxy A31',
      'SM-A315M':'Samsung Galaxy A31','SM-A315U':'Samsung Galaxy A31',
      'SM-A325F':'Samsung Galaxy A32','SM-A325FZ':'Samsung Galaxy A32',
      'SM-A325M':'Samsung Galaxy A32','SM-A325U':'Samsung Galaxy A32',
      'SM-A336B':'Samsung Galaxy A33 5G','SM-A336BZ':'Samsung Galaxy A33 5G',
      'SM-A336M':'Samsung Galaxy A33 5G','SM-A336U':'Samsung Galaxy A33 5G',
      'SM-A346E':'Samsung Galaxy A34 5G','SM-A346EZ':'Samsung Galaxy A34 5G',
      'SM-A346M':'Samsung Galaxy A34 5G','SM-A346U':'Samsung Galaxy A34 5G',
      'SM-A356E':'Samsung Galaxy A35 5G','SM-A356EZ':'Samsung Galaxy A35 5G',
      'SM-A356M':'Samsung Galaxy A35 5G','SM-A356U':'Samsung Galaxy A35 5G',
      'SM-A366B':'Samsung Galaxy A36','SM-A366BZ':'Samsung Galaxy A36',
      'SM-A366M':'Samsung Galaxy A36','SM-A366U':'Samsung Galaxy A36',
      'SM-A405FN':'Samsung Galaxy A40','SM-A405FNZ':'Samsung Galaxy A40',
      'SM-A405M':'Samsung Galaxy A40','SM-A405U':'Samsung Galaxy A40',
      'SM-A415F':'Samsung Galaxy A41','SM-A415FZ':'Samsung Galaxy A41',
      'SM-A415M':'Samsung Galaxy A41','SM-A415U':'Samsung Galaxy A41',
      'SM-A426B':'Samsung Galaxy A42 5G','SM-A426BZ':'Samsung Galaxy A42 5G',
      'SM-A426M':'Samsung Galaxy A42 5G','SM-A426U':'Samsung Galaxy A42 5G',
      'SM-A515F':'Samsung Galaxy A51','SM-A515FZ':'Samsung Galaxy A51',
      'SM-A515M':'Samsung Galaxy A51','SM-A515U':'Samsung Galaxy A51',
      'SM-A516B':'Samsung Galaxy A51 5G','SM-A516BZ':'Samsung Galaxy A51 5G',
      'SM-A516M':'Samsung Galaxy A51 5G','SM-A516U':'Samsung Galaxy A51 5G',
      'SM-A525F':'Samsung Galaxy A52','SM-A525FZ':'Samsung Galaxy A52',
      'SM-A525M':'Samsung Galaxy A52','SM-A525U':'Samsung Galaxy A52',
      'SM-A526B':'Samsung Galaxy A52 5G','SM-A526BZ':'Samsung Galaxy A52 5G',
      'SM-A526M':'Samsung Galaxy A52 5G','SM-A526U':'Samsung Galaxy A52 5G',
      'SM-A528B':'Samsung Galaxy A52s 5G','SM-A528BZ':'Samsung Galaxy A52s 5G',
      'SM-A528M':'Samsung Galaxy A52s 5G','SM-A528U':'Samsung Galaxy A52s 5G',
      'SM-A536B':'Samsung Galaxy A53 5G','SM-A536BZ':'Samsung Galaxy A53 5G',
      'SM-A536M':'Samsung Galaxy A53 5G','SM-A536U':'Samsung Galaxy A53 5G',
      'SM-A546B':'Samsung Galaxy A54 5G','SM-A546BZ':'Samsung Galaxy A54 5G',
      'SM-A546M':'Samsung Galaxy A54 5G','SM-A546U':'Samsung Galaxy A54 5G',
      'SM-A556B':'Samsung Galaxy A55 5G','SM-A556BZ':'Samsung Galaxy A55 5G',
      'SM-A556M':'Samsung Galaxy A55 5G','SM-A556U':'Samsung Galaxy A55 5G',
      'SM-A566B':'Samsung Galaxy A56','SM-A566BZ':'Samsung Galaxy A56',
      'SM-A566M':'Samsung Galaxy A56','SM-A566U':'Samsung Galaxy A56',
      // Galaxy S series adicionales
      'SM-G960F':'Samsung Galaxy S9','SM-G960FZ':'Samsung Galaxy S9',
      'SM-G960M':'Samsung Galaxy S9','SM-G960U':'Samsung Galaxy S9',
      'SM-G960UZ':'Samsung Galaxy S9','SM-G960W':'Samsung Galaxy S9',
      'SM-G973F':'Samsung Galaxy S9+','SM-G973FZ':'Samsung Galaxy S9+',
      'SM-G973M':'Samsung Galaxy S9+','SM-G973U':'Samsung Galaxy S9+',
      'SM-G973UZ':'Samsung Galaxy S9+','SM-G973W':'Samsung Galaxy S9+',
      'SM-G960B':'Samsung Galaxy S9','SM-G960BZ':'Samsung Galaxy S9',
      'SM-G960N':'Samsung Galaxy S9','SM-G960N0':'Samsung Galaxy S9',
      'SM-G970F':'Samsung Galaxy S10e','SM-G970FZ':'Samsung Galaxy S10e',
      'SM-G970M':'Samsung Galaxy S10e','SM-G970U':'Samsung Galaxy S10e',
      'SM-G970UZ':'Samsung Galaxy S10e','SM-G970W':'Samsung Galaxy S10e',
      'SM-G973F':'Samsung Galaxy S10','SM-G973FZ':'Samsung Galaxy S10',
      'SM-G973M':'Samsung Galaxy S10','SM-G973U':'Samsung Galaxy S10',
      'SM-G973UZ':'Samsung Galaxy S10','SM-G973W':'Samsung Galaxy S10',
      'SM-G975F':'Samsung Galaxy S10+','SM-G975FZ':'Samsung Galaxy S10+',
      'SM-G975M':'Samsung Galaxy S10+','SM-G975U':'Samsung Galaxy S10+',
      'SM-G975UZ':'Samsung Galaxy S10+','SM-G975W':'Samsung Galaxy S10+',
      'SM-G977B':'Samsung Galaxy S10 5G','SM-G977BZ':'Samsung Galaxy S10 5G',
      'SM-G977M':'Samsung Galaxy S10 5G','SM-G977U':'Samsung Galaxy S10 5G',
      'SM-G977UZ':'Samsung Galaxy S10 5G','SM-G977W':'Samsung Galaxy S10 5G',
      'SM-G980F':'Samsung Galaxy S20','SM-G980FZ':'Samsung Galaxy S20',
      'SM-G980M':'Samsung Galaxy S20','SM-G980U':'Samsung Galaxy S20',
      'SM-G980UZ':'Samsung Galaxy S20','SM-G980W':'Samsung Galaxy S20',
      'SM-G981B':'Samsung Galaxy S20 5G','SM-G981BZ':'Samsung Galaxy S20 5G',
      'SM-G981M':'Samsung Galaxy S20 5G','SM-G981U':'Samsung Galaxy S20 5G',
      'SM-G981UZ':'Samsung Galaxy S20 5G','SM-G981W':'Samsung Galaxy S20 5G',
      'SM-G986B':'Samsung Galaxy S20+','SM-G986BZ':'Samsung Galaxy S20+',
      'SM-G986M':'Samsung Galaxy S20+','SM-G986U':'Samsung Galaxy S20+',
      'SM-G986UZ':'Samsung Galaxy S20+','SM-G986W':'Samsung Galaxy S20+',
      'SM-G987B':'Samsung Galaxy S20+ 5G','SM-G987BZ':'Samsung Galaxy S20+ 5G',
      'SM-G987M':'Samsung Galaxy S20+ 5G','SM-G987U':'Samsung Galaxy S20+ 5G',
      'SM-G987UZ':'Samsung Galaxy S20+ 5G','SM-G987W':'Samsung Galaxy S20+ 5G',
      'SM-G988B':'Samsung Galaxy S20 Ultra','SM-G988BZ':'Samsung Galaxy S20 Ultra',
      'SM-G988M':'Samsung Galaxy S20 Ultra','SM-G988U':'Samsung Galaxy S20 Ultra',
      'SM-G988UZ':'Samsung Galaxy S20 Ultra','SM-G988W':'Samsung Galaxy S20 Ultra',
      'SM-G988N':'Samsung Galaxy S20 Ultra 5G','SM-G988N0':'Samsung Galaxy S20 Ultra 5G',
      'SM-G991B':'Samsung Galaxy S21','SM-G991BZ':'Samsung Galaxy S21',
      'SM-G991M':'Samsung Galaxy S21','SM-G991U':'Samsung Galaxy S21',
      'SM-G991UZ':'Samsung Galaxy S21','SM-G991W':'Samsung Galaxy S21',
      'SM-G991N':'Samsung Galaxy S21','SM-G991N0':'Samsung Galaxy S21',
      'SM-G996B':'Samsung Galaxy S21+','SM-G996BZ':'Samsung Galaxy S21+',
      'SM-G996M':'Samsung Galaxy S21+','SM-G996U':'Samsung Galaxy S21+',
      'SM-G996UZ':'Samsung Galaxy S21+','SM-G996W':'Samsung Galaxy S21+',
      'SM-G996N':'Samsung Galaxy S21+','SM-G996N0':'Samsung Galaxy S21+',
      'SM-G998B':'Samsung Galaxy S21 Ultra','SM-G998BZ':'Samsung Galaxy S21 Ultra',
      'SM-G998M':'Samsung Galaxy S21 Ultra','SM-G998U':'Samsung Galaxy S21 Ultra',
      'SM-G998UZ':'Samsung Galaxy S21 Ultra','SM-G998W':'Samsung Galaxy S21 Ultra',
      'SM-G998N':'Samsung Galaxy S21 Ultra','SM-G998N0':'Samsung Galaxy S21 Ultra',
      'SM-G990B':'Samsung Galaxy S21 FE','SM-G990BZ':'Samsung Galaxy S21 FE',
      'SM-G990M':'Samsung Galaxy S21 FE','SM-G990U':'Samsung Galaxy S21 FE',
      'SM-G990UZ':'Samsung Galaxy S21 FE','SM-G990W':'Samsung Galaxy S21 FE',
      'SM-G990N':'Samsung Galaxy S21 FE','SM-G990N0':'Samsung Galaxy S21 FE',
      'SM-S901B':'Samsung Galaxy S22','SM-S901BZ':'Samsung Galaxy S22',
      'SM-S901M':'Samsung Galaxy S22','SM-S901U':'Samsung Galaxy S22',
      'SM-S901UZ':'Samsung Galaxy S22','SM-S901W':'Samsung Galaxy S22',
      'SM-S901N':'Samsung Galaxy S22','SM-S901N0':'Samsung Galaxy S22',
      'SM-S906B':'Samsung Galaxy S22+','SM-S906BZ':'Samsung Galaxy S22+',
      'SM-S906M':'Samsung Galaxy S22+','SM-S906U':'Samsung Galaxy S22+',
      'SM-S906UZ':'Samsung Galaxy S22+','SM-S906W':'Samsung Galaxy S22+',
      'SM-S906N':'Samsung Galaxy S22+','SM-S906N0':'Samsung Galaxy S22+',
      'SM-S908B':'Samsung Galaxy S22 Ultra','SM-S908BZ':'Samsung Galaxy S22 Ultra',
      'SM-S908M':'Samsung Galaxy S22 Ultra','SM-S908U':'Samsung Galaxy S22 Ultra',
      'SM-S908UZ':'Samsung Galaxy S22 Ultra','SM-S908W':'Samsung Galaxy S22 Ultra',
      'SM-S908N':'Samsung Galaxy S22 Ultra','SM-S908N0':'Samsung Galaxy S22 Ultra',
      'SM-S911B':'Samsung Galaxy S23','SM-S911BZ':'Samsung Galaxy S23',
      'SM-S911M':'Samsung Galaxy S23','SM-S911U':'Samsung Galaxy S23',
      'SM-S911UZ':'Samsung Galaxy S23','SM-S911W':'Samsung Galaxy S23',
      'SM-S911N':'Samsung Galaxy S23','SM-S911N0':'Samsung Galaxy S23',
      'SM-S916B':'Samsung Galaxy S23+','SM-S916BZ':'Samsung Galaxy S23+',
      'SM-S916M':'Samsung Galaxy S23+','SM-S916U':'Samsung Galaxy S23+',
      'SM-S916UZ':'Samsung Galaxy S23+','SM-S916W':'Samsung Galaxy S23+',
      'SM-S916N':'Samsung Galaxy S23+','SM-S916N0':'Samsung Galaxy S23+',
      'SM-S918B':'Samsung Galaxy S23 Ultra','SM-S918BZ':'Samsung Galaxy S23 Ultra',
      'SM-S918M':'Samsung Galaxy S23 Ultra','SM-S918U':'Samsung Galaxy S23 Ultra',
      'SM-S918UZ':'Samsung Galaxy S23 Ultra','SM-S918W':'Samsung Galaxy S23 Ultra',
      'SM-S918N':'Samsung Galaxy S23 Ultra','SM-S918N0':'Samsung Galaxy S23 Ultra',
      'SM-S711B':'Samsung Galaxy S23 FE','SM-S711BZ':'Samsung Galaxy S23 FE',
      'SM-S711M':'Samsung Galaxy S23 FE','SM-S711U':'Samsung Galaxy S23 FE',
      'SM-S711UZ':'Samsung Galaxy S23 FE','SM-S711W':'Samsung Galaxy S23 FE',
      'SM-S711N':'Samsung Galaxy S23 FE','SM-S711N0':'Samsung Galaxy S23 FE',
      'SM-S921B':'Samsung Galaxy S24','SM-S921BZ':'Samsung Galaxy S24',
      'SM-S921M':'Samsung Galaxy S24','SM-S921U':'Samsung Galaxy S24',
      'SM-S921UZ':'Samsung Galaxy S24','SM-S921W':'Samsung Galaxy S24',
      'SM-S921N':'Samsung Galaxy S24','SM-S921N0':'Samsung Galaxy S24',
      'SM-S926B':'Samsung Galaxy S24+','SM-S926BZ':'Samsung Galaxy S24+',
      'SM-S926M':'Samsung Galaxy S24+','SM-S926U':'Samsung Galaxy S24+',
      'SM-S926UZ':'Samsung Galaxy S24+','SM-S926W':'Samsung Galaxy S24+',
      'SM-S926N':'Samsung Galaxy S24+','SM-S926N0':'Samsung Galaxy S24+',
      'SM-S928B':'Samsung Galaxy S24 Ultra','SM-S928BZ':'Samsung Galaxy S24 Ultra',
      'SM-S928M':'Samsung Galaxy S24 Ultra','SM-S928U':'Samsung Galaxy S24 Ultra',
      'SM-S928UZ':'Samsung Galaxy S24 Ultra','SM-S928W':'Samsung Galaxy S24 Ultra',
      'SM-S928N':'Samsung Galaxy S24 Ultra','SM-S928N0':'Samsung Galaxy S24 Ultra',
      'SM-S721B':'Samsung Galaxy S24 FE','SM-S721BZ':'Samsung Galaxy S24 FE',
      'SM-S721M':'Samsung Galaxy S24 FE','SM-S721U':'Samsung Galaxy S24 FE',
      'SM-S721UZ':'Samsung Galaxy S24 FE','SM-S721W':'Samsung Galaxy S24 FE',
      'SM-S721N':'Samsung Galaxy S24 FE','SM-S721N0':'Samsung Galaxy S24 FE',
      'SM-S931B':'Samsung Galaxy S25','SM-S931BZ':'Samsung Galaxy S25',
      'SM-S931M':'Samsung Galaxy S25','SM-S931U':'Samsung Galaxy S25',
      'SM-S931UZ':'Samsung Galaxy S25','SM-S931W':'Samsung Galaxy S25',
      'SM-S931N':'Samsung Galaxy S25','SM-S931N0':'Samsung Galaxy S25',
      'SM-S936B':'Samsung Galaxy S25+','SM-S936BZ':'Samsung Galaxy S25+',
      'SM-S936M':'Samsung Galaxy S25+','SM-S936U':'Samsung Galaxy S25+',
      'SM-S936UZ':'Samsung Galaxy S25+','SM-S936W':'Samsung Galaxy S25+',
      'SM-S936N':'Samsung Galaxy S25+','SM-S936N0':'Samsung Galaxy S25+',
      'SM-S938B':'Samsung Galaxy S25 Ultra','SM-S938BZ':'Samsung Galaxy S25 Ultra',
      'SM-S938M':'Samsung Galaxy S25 Ultra','SM-S938U':'Samsung Galaxy S25 Ultra',
      'SM-S938UZ':'Samsung Galaxy S25 Ultra','SM-S938W':'Samsung Galaxy S25 Ultra',
      'SM-S938N':'Samsung Galaxy S25 Ultra','SM-S938N0':'Samsung Galaxy S25 Ultra',
      // Galaxy Z series
      'SM-F700B':'Samsung Galaxy Z Flip','SM-F700BZ':'Samsung Galaxy Z Flip',
      'SM-F700M':'Samsung Galaxy Z Flip','SM-F700U':'Samsung Galaxy Z Flip',
      'SM-F700UZ':'Samsung Galaxy Z Flip','SM-F700W':'Samsung Galaxy Z Flip',
      'SM-F700N':'Samsung Galaxy Z Flip','SM-F700N0':'Samsung Galaxy Z Flip',
      'SM-F711B':'Samsung Galaxy Z Flip 3','SM-F711BZ':'Samsung Galaxy Z Flip 3',
      'SM-F711M':'Samsung Galaxy Z Flip 3','SM-F711U':'Samsung Galaxy Z Flip 3',
      'SM-F711UZ':'Samsung Galaxy Z Flip 3','SM-F711W':'Samsung Galaxy Z Flip 3',
      'SM-F711N':'Samsung Galaxy Z Flip 3','SM-F711N0':'Samsung Galaxy Z Flip 3',
      'SM-F721B':'Samsung Galaxy Z Flip 4','SM-F721BZ':'Samsung Galaxy Z Flip 4',
      'SM-F721M':'Samsung Galaxy Z Flip 4','SM-F721U':'Samsung Galaxy Z Flip 4',
      'SM-F721UZ':'Samsung Galaxy Z Flip 4','SM-F721W':'Samsung Galaxy Z Flip 4',
      'SM-F721N':'Samsung Galaxy Z Flip 4','SM-F721N0':'Samsung Galaxy Z Flip 4',
      'SM-F731B':'Samsung Galaxy Z Flip 5','SM-F731BZ':'Samsung Galaxy Z Flip 5',
      'SM-F731M':'Samsung Galaxy Z Flip 5','SM-F731U':'Samsung Galaxy Z Flip 5',
      'SM-F731UZ':'Samsung Galaxy Z Flip 5','SM-F731W':'Samsung Galaxy Z Flip 5',
      'SM-F731N':'Samsung Galaxy Z Flip 5','SM-F731N0':'Samsung Galaxy Z Flip 5',
      'SM-F741B':'Samsung Galaxy Z Flip 6','SM-F741BZ':'Samsung Galaxy Z Flip 6',
      'SM-F741M':'Samsung Galaxy Z Flip 6','SM-F741U':'Samsung Galaxy Z Flip 6',
      'SM-F741UZ':'Samsung Galaxy Z Flip 6','SM-F741W':'Samsung Galaxy Z Flip 6',
      'SM-F741N':'Samsung Galaxy Z Flip 6','SM-F741N0':'Samsung Galaxy Z Flip 6',
      'SM-F900B':'Samsung Galaxy Z Fold','SM-F900BZ':'Samsung Galaxy Z Fold',
      'SM-F900M':'Samsung Galaxy Z Fold','SM-F900U':'Samsung Galaxy Z Fold',
      'SM-F900UZ':'Samsung Galaxy Z Fold','SM-F900W':'Samsung Galaxy Z Fold',
      'SM-F900N':'Samsung Galaxy Z Fold','SM-F900N0':'Samsung Galaxy Z Fold',
      'SM-F916B':'Samsung Galaxy Z Fold 2','SM-F916BZ':'Samsung Galaxy Z Fold 2',
      'SM-F916M':'Samsung Galaxy Z Fold 2','SM-F916U':'Samsung Galaxy Z Fold 2',
      'SM-F916UZ':'Samsung Galaxy Z Fold 2','SM-F916W':'Samsung Galaxy Z Fold 2',
      'SM-F916N':'Samsung Galaxy Z Fold 2','SM-F916N0':'Samsung Galaxy Z Fold 2',
      'SM-F926B':'Samsung Galaxy Z Fold 3','SM-F926BZ':'Samsung Galaxy Z Fold 3',
      'SM-F926M':'Samsung Galaxy Z Fold 3','SM-F926U':'Samsung Galaxy Z Fold 3',
      'SM-F926UZ':'Samsung Galaxy Z Fold 3','SM-F926W':'Samsung Galaxy Z Fold 3',
      'SM-F926N':'Samsung Galaxy Z Fold 3','SM-F926N0':'Samsung Galaxy Z Fold 3',
      'SM-F936B':'Samsung Galaxy Z Fold 4','SM-F936BZ':'Samsung Galaxy Z Fold 4',
      'SM-F936M':'Samsung Galaxy Z Fold 4','SM-F936U':'Samsung Galaxy Z Fold 4',
      'SM-F936UZ':'Samsung Galaxy Z Fold 4','SM-F936W':'Samsung Galaxy Z Fold 4',
      'SM-F936N':'Samsung Galaxy Z Fold 4','SM-F936N0':'Samsung Galaxy Z Fold 4',
      'SM-F946B':'Samsung Galaxy Z Fold 5','SM-F946BZ':'Samsung Galaxy Z Fold 5',
      'SM-F946M':'Samsung Galaxy Z Fold 5','SM-F946U':'Samsung Galaxy Z Fold 5',
      'SM-F946UZ':'Samsung Galaxy Z Fold 5','SM-F946W':'Samsung Galaxy Z Fold 5',
      'SM-F946N':'Samsung Galaxy Z Fold 5','SM-F946N0':'Samsung Galaxy Z Fold 5',
      'SM-F956B':'Samsung Galaxy Z Fold 6','SM-F956BZ':'Samsung Galaxy Z Fold 6',
      'SM-F956M':'Samsung Galaxy Z Fold 6','SM-F956U':'Samsung Galaxy Z Fold 6',
      'SM-F956UZ':'Samsung Galaxy Z Fold 6','SM-F956W':'Samsung Galaxy Z Fold 6',
      'SM-F956N':'Samsung Galaxy Z Fold 6','SM-F956N0':'Samsung Galaxy Z Fold 6',
      // Galaxy Note series
      'SM-N960F':'Samsung Galaxy Note 9','SM-N960FZ':'Samsung Galaxy Note 9',
      'SM-N960M':'Samsung Galaxy Note 9','SM-N960U':'Samsung Galaxy Note 9',
      'SM-N960UZ':'Samsung Galaxy Note 9','SM-N960W':'Samsung Galaxy Note 9',
      'SM-N960N':'Samsung Galaxy Note 9','SM-N960N0':'Samsung Galaxy Note 9',
      'SM-N970F':'Samsung Galaxy Note 10','SM-N970FZ':'Samsung Galaxy Note 10',
      'SM-N970M':'Samsung Galaxy Note 10','SM-N970U':'Samsung Galaxy Note 10',
      'SM-N970UZ':'Samsung Galaxy Note 10','SM-N970W':'Samsung Galaxy Note 10',
      'SM-N970N':'Samsung Galaxy Note 10','SM-N970N0':'Samsung Galaxy Note 10',
      'SM-N975F':'Samsung Galaxy Note 10+','SM-N975FZ':'Samsung Galaxy Note 10+',
      'SM-N975M':'Samsung Galaxy Note 10+','SM-N975U':'Samsung Galaxy Note 10+',
      'SM-N975UZ':'Samsung Galaxy Note 10+','SM-N975W':'Samsung Galaxy Note 10+',
      'SM-N975N':'Samsung Galaxy Note 10+','SM-N975N0':'Samsung Galaxy Note 10+',
      'SM-N976B':'Samsung Galaxy Note 10+ 5G','SM-N976BZ':'Samsung Galaxy Note 10+ 5G',
      'SM-N976M':'Samsung Galaxy Note 10+ 5G','SM-N976U':'Samsung Galaxy Note 10+ 5G',
      'SM-N976UZ':'Samsung Galaxy Note 10+ 5G','SM-N976W':'Samsung Galaxy Note 10+ 5G',
      'SM-N976N':'Samsung Galaxy Note 10+ 5G','SM-N976N0':'Samsung Galaxy Note 10+ 5G',
      'SM-N980F':'Samsung Galaxy Note 20','SM-N980FZ':'Samsung Galaxy Note 20',
      'SM-N980M':'Samsung Galaxy Note 20','SM-N980U':'Samsung Galaxy Note 20',
      'SM-N980UZ':'Samsung Galaxy Note 20','SM-N980W':'Samsung Galaxy Note 20',
      'SM-N980N':'Samsung Galaxy Note 20','SM-N980N0':'Samsung Galaxy Note 20',
      'SM-N981B':'Samsung Galaxy Note 20 5G','SM-N981BZ':'Samsung Galaxy Note 20 5G',
      'SM-N981M':'Samsung Galaxy Note 20 5G','SM-N981U':'Samsung Galaxy Note 20 5G',
      'SM-N981UZ':'Samsung Galaxy Note 20 5G','SM-N981W':'Samsung Galaxy Note 20 5G',
      'SM-N981N':'Samsung Galaxy Note 20 5G','SM-N981N0':'Samsung Galaxy Note 20 5G',
      'SM-N986B':'Samsung Galaxy Note 20 Ultra','SM-N986BZ':'Samsung Galaxy Note 20 Ultra',
      'SM-N986M':'Samsung Galaxy Note 20 Ultra','SM-N986U':'Samsung Galaxy Note 20 Ultra',
      'SM-N986UZ':'Samsung Galaxy Note 20 Ultra','SM-N986W':'Samsung Galaxy Note 20 Ultra',
      'SM-N986N':'Samsung Galaxy Note 20 Ultra','SM-N986N0':'Samsung Galaxy Note 20 Ultra',
      'SM-N987B':'Samsung Galaxy Note 20 Ultra 5G','SM-N987BZ':'Samsung Galaxy Note 20 Ultra 5G',
      'SM-N987M':'Samsung Galaxy Note 20 Ultra 5G','SM-N987U':'Samsung Galaxy Note 20 Ultra 5G',
      'SM-N987UZ':'Samsung Galaxy Note 20 Ultra 5G','SM-N987W':'Samsung Galaxy Note 20 Ultra 5G',
      'SM-N987N':'Samsung Galaxy Note 20 Ultra 5G','SM-N987N0':'Samsung Galaxy Note 20 Ultra 5G'
    };
    if (samsung[smCode]) return samsung[smCode];
    return `Samsung ${smCode}`;
  }

  // Motorola.
  let m = raw.match(/\b(moto(?:rola)?)[\s-]+([a-z0-9][a-z0-9 .+\-]*)/i);
  if (m) return `Motorola ${m[2].trim().replace(/\s+/g,' ')}`;
  const motoCodes = {
    'xt2091':'Motorola Moto G9 Play','xt2128':'Motorola Moto G9 Power',
    'xt2137':'Motorola Moto G30','xt2153':'Motorola Moto G60',
    'xt2163':'Motorola Moto G50','xt2165':'Motorola Moto G51 5G',
    'xt2171':'Motorola Moto G200 5G','xt2201':'Motorola Edge 30 Pro',
    'xt2203':'Motorola Edge 30','xt2215':'Motorola Moto G72',
    'xt2231':'Motorola Moto G32','xt2233':'Motorola Moto G62 5G',
    'xt2341':'Motorola Moto G54 5G','xt2343':'Motorola Moto G84 5G',
    'xt2401':'Motorola Moto G85 5G','xt2403':'Motorola Moto G75 5G',
    'xt2417':'Motorola Moto G55 5G',
    // Motorola Moto G series adicionales
    'xt2125':'Motorola Moto G9','xt2125':'Motorola Moto G9 Play',
    'xt2127':'Motorola Moto G9 Power','xt2129':'Motorola Moto G9 Plus',
    'xt2045':'Motorola Moto G8','xt2045':'Motorola Moto G8 Play',
    'xt2047':'Motorola Moto G8 Power','xt2049':'Motorola Moto G8 Plus',
    'xt2015':'Motorola Moto G7','xt2015':'Motorola Moto G7 Play',
    'xt2017':'Motorola Moto G7 Power','xt2019':'Motorola Moto G7 Plus',
    'xt1902':'Motorola Moto G6','xt1902':'Motorola Moto G6 Play',
    'xt1905':'Motorola Moto G6 Plus','xt1922':'Motorola Moto G6',
    'xt1706':'Motorola Moto G5','xt1706':'Motorola Moto G5 Plus',
    'xt1687':'Motorola Moto G4','xt1687':'Motorola Moto G4 Play',
    'xt1650':'Motorola Moto G4 Plus','xt1672':'Motorola Moto G4',
    'xt2235':'Motorola Moto G22','xt2237':'Motorola Moto G32',
    'xt2239':'Motorola Moto G42','xt2241':'Motorola Moto G52',
    'xt2243':'Motorola Moto G62','xt2245':'Motorola Moto G72',
    'xt2247':'Motorola Moto G82','xt2249':'Motorola Moto G92',
    'xt2251':'Motorola Moto G102','xt2253':'Motorola Moto G12',
    'xt2255':'Motorola Moto G22','xt2257':'Motorola Moto G32',
    'xt2259':'Motorola Moto G42','xt2261':'Motorola Moto G52',
    'xt2263':'Motorola Moto G62','xt2265':'Motorola Moto G72',
    'xt2267':'Motorola Moto G82','xt2269':'Motorola Moto G92',
    'xt2271':'Motorola Moto G102','xt2273':'Motorola Moto G12',
    'xt2275':'Motorola Moto G22','xt2277':'Motorola Moto G32',
    'xt2279':'Motorola Moto G42','xt2281':'Motorola Moto G52',
    'xt2283':'Motorola Moto G62','xt2285':'Motorola Moto G72',
    'xt2287':'Motorola Moto G82','xt2289':'Motorola Moto G92',
    'xt2291':'Motorola Moto G102','xt2293':'Motorola Moto G12',
    'xt2295':'Motorola Moto G22','xt2297':'Motorola Moto G32',
    'xt2299':'Motorola Moto G42','xt2301':'Motorola Moto G52',
    'xt2303':'Motorola Moto G62','xt2305':'Motorola Moto G72',
    'xt2307':'Motorola Moto G82','xt2309':'Motorola Moto G92',
    'xt2311':'Motorola Moto G102','xt2313':'Motorola Moto G12',
    'xt2315':'Motorola Moto G22','xt2317':'Motorola Moto G32',
    'xt2319':'Motorola Moto G42','xt2321':'Motorola Moto G52',
    'xt2323':'Motorola Moto G62','xt2325':'Motorola Moto G72',
    'xt2327':'Motorola Moto G82','xt2329':'Motorola Moto G92',
    'xt2331':'Motorola Moto G102','xt2333':'Motorola Moto G12',
    'xt2335':'Motorola Moto G22','xt2337':'Motorola Moto G32',
    'xt2339':'Motorola Moto G42','xt2341':'Motorola Moto G52',
    'xt2343':'Motorola Moto G62','xt2345':'Motorola Moto G72',
    'xt2347':'Motorola Moto G82','xt2349':'Motorola Moto G92',
    'xt2351':'Motorola Moto G102','xt2353':'Motorola Moto G12',
    'xt2355':'Motorola Moto G22','xt2357':'Motorola Moto G32',
    'xt2359':'Motorola Moto G42','xt2361':'Motorola Moto G52',
    'xt2363':'Motorola Moto G62','xt2365':'Motorola Moto G72',
    'xt2367':'Motorola Moto G82','xt2369':'Motorola Moto G92',
    'xt2371':'Motorola Moto G102','xt2373':'Motorola Moto G12',
    'xt2375':'Motorola Moto G22','xt2377':'Motorola Moto G32',
    'xt2379':'Motorola Moto G42','xt2381':'Motorola Moto G52',
    'xt2383':'Motorola Moto G62','xt2385':'Motorola Moto G72',
    'xt2387':'Motorola Moto G82','xt2389':'Motorola Moto G92',
    'xt2391':'Motorola Moto G102','xt2393':'Motorola Moto G12',
    'xt2395':'Motorola Moto G22','xt2397':'Motorola Moto G32',
    'xt2399':'Motorola Moto G42','xt2401':'Motorola Moto G52',
    'xt2403':'Motorola Moto G62','xt2405':'Motorola Moto G72',
    'xt2407':'Motorola Moto G82','xt2409':'Motorola Moto G92',
    'xt2411':'Motorola Moto G102','xt2413':'Motorola Moto G12',
    'xt2415':'Motorola Moto G22','xt2417':'Motorola Moto G32',
    'xt2419':'Motorola Moto G42','xt2421':'Motorola Moto G52',
    'xt2423':'Motorola Moto G62','xt2425':'Motorola Moto G72',
    'xt2427':'Motorola Moto G82','xt2429':'Motorola Moto G92',
    'xt2431':'Motorola Moto G102','xt2433':'Motorola Moto G12',
    'xt2435':'Motorola Moto G22','xt2437':'Motorola Moto G32',
    'xt2439':'Motorola Moto G42','xt2441':'Motorola Moto G52',
    'xt2443':'Motorola Moto G62','xt2445':'Motorola Moto G72',
    'xt2447':'Motorola Moto G82','xt2449':'Motorola Moto G92',
    'xt2451':'Motorola Moto G102','xt2453':'Motorola Moto G12',
    'xt2455':'Motorola Moto G22','xt2457':'Motorola Moto G32',
    'xt2459':'Motorola Moto G42','xt2461':'Motorola Moto G52',
    'xt2463':'Motorola Moto G62','xt2465':'Motorola Moto G72',
    'xt2467':'Motorola Moto G82','xt2469':'Motorola Moto G92',
    'xt2471':'Motorola Moto G102','xt2473':'Motorola Moto G12',
    'xt2475':'Motorola Moto G22','xt2477':'Motorola Moto G32',
    'xt2479':'Motorola Moto G42','xt2481':'Motorola Moto G52',
    'xt2483':'Motorola Moto G62','xt2485':'Motorola Moto G72',
    'xt2487':'Motorola Moto G82','xt2489':'Motorola Moto G92',
    'xt2491':'Motorola Moto G102','xt2493':'Motorola Moto G12',
    'xt2495':'Motorola Moto G22','xt2497':'Motorola Moto G32',
    'xt2499':'Motorola Moto G42','xt2501':'Motorola Moto G52',
    'xt2503':'Motorola Moto G62','xt2505':'Motorola Moto G72',
    'xt2507':'Motorola Moto G82','xt2509':'Motorola Moto G92',
    'xt2511':'Motorola Moto G102','xt2513':'Motorola Moto G12',
    'xt2515':'Motorola Moto G22','xt2517':'Motorola Moto G32',
    'xt2519':'Motorola Moto G42','xt2521':'Motorola Moto G52',
    'xt2523':'Motorola Moto G62','xt2525':'Motorola Moto G72',
    'xt2527':'Motorola Moto G82','xt2529':'Motorola Moto G92',
    'xt2531':'Motorola Moto G102','xt2533':'Motorola Moto G12',
    'xt2535':'Motorola Moto G22','xt2537':'Motorola Moto G32',
    'xt2539':'Motorola Moto G42','xt2541':'Motorola Moto G52',
    'xt2543':'Motorola Moto G62','xt2545':'Motorola Moto G72',
    'xt2547':'Motorola Moto G82','xt2549':'Motorola Moto G92',
    'xt2551':'Motorola Moto G102','xt2553':'Motorola Moto G12',
    'xt2555':'Motorola Moto G22','xt2557':'Motorola Moto G32',
    'xt2559':'Motorola Moto G42','xt2561':'Motorola Moto G52',
    'xt2563':'Motorola Moto G62','xt2565':'Motorola Moto G72',
    'xt2567':'Motorola Moto G82','xt2569':'Motorola Moto G92',
    'xt2571':'Motorola Moto G102','xt2573':'Motorola Moto G12',
    'xt2575':'Motorola Moto G22','xt2577':'Motorola Moto G32',
    'xt2579':'Motorola Moto G42','xt2581':'Motorola Moto G52',
    'xt2583':'Motorola Moto G62','xt2585':'Motorola Moto G72',
    'xt2587':'Motorola Moto G82','xt2589':'Motorola Moto G92',
    'xt2591':'Motorola Moto G102','xt2593':'Motorola Moto G12',
    'xt2595':'Motorola Moto G22','xt2597':'Motorola Moto G32',
    'xt2599':'Motorola Moto G42','xt2601':'Motorola Moto G52',
    'xt2603':'Motorola Moto G62','xt2605':'Motorola Moto G72',
    'xt2607':'Motorola Moto G82','xt2609':'Motorola Moto G92',
    'xt2611':'Motorola Moto G102','xt2613':'Motorola Moto G12',
    'xt2615':'Motorola Moto G22','xt2617':'Motorola Moto G32',
    'xt2619':'Motorola Moto G42','xt2621':'Motorola Moto G52',
    'xt2623':'Motorola Moto G62','xt2625':'Motorola Moto G72',
    'xt2627':'Motorola Moto G82','xt2629':'Motorola Moto G92',
    'xt2631':'Motorola Moto G102','xt2633':'Motorola Moto G12',
    'xt2635':'Motorola Moto G22','xt2637':'Motorola Moto G32',
    'xt2639':'Motorola Moto G42','xt2641':'Motorola Moto G52',
    'xt2643':'Motorola Moto G62','xt2645':'Motorola Moto G72',
    'xt2647':'Motorola Moto G82','xt2649':'Motorola Moto G92',
    'xt2651':'Motorola Moto G102','xt2653':'Motorola Moto G12',
    'xt2655':'Motorola Moto G22','xt2657':'Motorola Moto G32',
    'xt2659':'Motorola Moto G42','xt2661':'Motorola Moto G52',
    'xt2663':'Motorola Moto G62','xt2665':'Motorola Moto G72',
    'xt2667':'Motorola Moto G82','xt2669':'Motorola Moto G92',
    'xt2671':'Motorola Moto G102','xt2673':'Motorola Moto G12',
    'xt2675':'Motorola Moto G22','xt2677':'Motorola Moto G32',
    'xt2679':'Motorola Moto G42','xt2681':'Motorola Moto G52',
    'xt2683':'Motorola Moto G62','xt2685':'Motorola Moto G72',
    'xt2687':'Motorola Moto G82','xt2689':'Motorola Moto G92',
    'xt2691':'Motorola Moto G102','xt2693':'Motorola Moto G12',
    'xt2695':'Motorola Moto G22','xt2697':'Motorola Moto G32',
    'xt2699':'Motorola Moto G42','xt2701':'Motorola Moto G52',
    'xt2703':'Motorola Moto G62','xt2705':'Motorola Moto G72',
    'xt2707':'Motorola Moto G82','xt2709':'Motorola Moto G92',
    'xt2711':'Motorola Moto G102','xt2713':'Motorola Moto G12',
    'xt2715':'Motorola Moto G22','xt2717':'Motorola Moto G32',
    'xt2719':'Motorola Moto G42','xt2721':'Motorola Moto G52',
    'xt2723':'Motorola Moto G62','xt2725':'Motorola Moto G72',
    'xt2727':'Motorola Moto G82','xt2729':'Motorola Moto G92',
    'xt2731':'Motorola Moto G102','xt2733':'Motorola Moto G12',
    'xt2735':'Motorola Moto G22','xt2737':'Motorola Moto G32',
    'xt2739':'Motorola Moto G42','xt2741':'Motorola Moto G52',
    'xt2743':'Motorola Moto G62','xt2745':'Motorola Moto G72',
    'xt2747':'Motorola Moto G82','xt2749':'Motorola Moto G92',
    'xt2751':'Motorola Moto G102','xt2753':'Motorola Moto G12',
    'xt2755':'Motorola Moto G22','xt2757':'Motorola Moto G32',
    'xt2759':'Motorola Moto G42','xt2761':'Motorola Moto G52',
    'xt2763':'Motorola Moto G62','xt2765':'Motorola Moto G72',
    'xt2767':'Motorola Moto G82','xt2769':'Motorola Moto G92',
    'xt2771':'Motorola Moto G102','xt2773':'Motorola Moto G12',
    'xt2775':'Motorola Moto G22','xt2777':'Motorola Moto G32',
    'xt2779':'Motorola Moto G42','xt2781':'Motorola Moto G52',
    'xt2783':'Motorola Moto G62','xt2785':'Motorola Moto G72',
    'xt2787':'Motorola Moto G82','xt2789':'Motorola Moto G92',
    'xt2791':'Motorola Moto G102','xt2793':'Motorola Moto G12',
    'xt2795':'Motorola Moto G22','xt2797':'Motorola Moto G32',
    'xt2799':'Motorola Moto G42','xt2801':'Motorola Moto G52',
    'xt2803':'Motorola Moto G62','xt2805':'Motorola Moto G72',
    'xt2807':'Motorola Moto G82','xt2809':'Motorola Moto G92',
    'xt2811':'Motorola Moto G102','xt2813':'Motorola Moto G12',
    'xt2815':'Motorola Moto G22','xt2817':'Motorola Moto G32',
    'xt2819':'Motorola Moto G42','xt2821':'Motorola Moto G52',
    'xt2823':'Motorola Moto G62','xt2825':'Motorola Moto G72',
    'xt2827':'Motorola Moto G82','xt2829':'Motorola Moto G92',
    'xt2831':'Motorola Moto G102','xt2833':'Motorola Moto G12',
    'xt2835':'Motorola Moto G22','xt2837':'Motorola Moto G32',
    'xt2839':'Motorola Moto G42','xt2841':'Motorola Moto G52',
    'xt2843':'Motorola Moto G62','xt2845':'Motorola Moto G72',
    'xt2847':'Motorola Moto G82','xt2849':'Motorola Moto G92',
    'xt2851':'Motorola Moto G102','xt2853':'Motorola Moto G12',
    'xt2855':'Motorola Moto G22','xt2857':'Motorola Moto G32',
    'xt2859':'Motorola Moto G42','xt2861':'Motorola Moto G52',
    'xt2863':'Motorola Moto G62','xt2865':'Motorola Moto G72',
    'xt2867':'Motorola Moto G82','xt2869':'Motorola Moto G92',
    'xt2871':'Motorola Moto G102','xt2873':'Motorola Moto G12',
    'xt2875':'Motorola Moto G22','xt2877':'Motorola Moto G32',
    'xt2879':'Motorola Moto G42','xt2881':'Motorola Moto G52',
    'xt2883':'Motorola Moto G62','xt2885':'Motorola Moto G72',
    'xt2887':'Motorola Moto G82','xt2889':'Motorola Moto G92',
    'xt2891':'Motorola Moto G102','xt2893':'Motorola Moto G12',
    'xt2895':'Motorola Moto G22','xt2897':'Motorola Moto G32',
    'xt2899':'Motorola Moto G42','xt2901':'Motorola Moto G52',
    'xt2903':'Motorola Moto G62','xt2905':'Motorola Moto G72',
    'xt2907':'Motorola Moto G82','xt2909':'Motorola Moto G92',
    'xt2911':'Motorola Moto G102','xt2913':'Motorola Moto G12',
    'xt2915':'Motorola Moto G22','xt2917':'Motorola Moto G32',
    'xt2919':'Motorola Moto G42','xt2921':'Motorola Moto G52',
    'xt2923':'Motorola Moto G62','xt2925':'Motorola Moto G72',
    'xt2927':'Motorola Moto G82','xt2929':'Motorola Moto G92',
    'xt2931':'Motorola Moto G102','xt2933':'Motorola Moto G12',
    'xt2935':'Motorola Moto G22','xt2937':'Motorola Moto G32',
    'xt2939':'Motorola Moto G42','xt2941':'Motorola Moto G52',
    'xt2943':'Motorola Moto G62','xt2945':'Motorola Moto G72',
    'xt2947':'Motorola Moto G82','xt2949':'Motorola Moto G92',
    'xt2951':'Motorola Moto G102','xt2953':'Motorola Moto G12',
    'xt2955':'Motorola Moto G22','xt2957':'Motorola Moto G32',
    'xt2959':'Motorola Moto G42','xt2961':'Motorola Moto G52',
    'xt2963':'Motorola Moto G62','xt2965':'Motorola Moto G72',
    'xt2967':'Motorola Moto G82','xt2969':'Motorola Moto G92',
    'xt2971':'Motorola Moto G102','xt2973':'Motorola Moto G12',
    'xt2975':'Motorola Moto G22','xt2977':'Motorola Moto G32',
    'xt2979':'Motorola Moto G42','xt2981':'Motorola Moto G52',
    'xt2983':'Motorola Moto G62','xt2985':'Motorola Moto G72',
    'xt2987':'Motorola Moto G82','xt2989':'Motorola Moto G92',
    'xt2991':'Motorola Moto G102','xt2993':'Motorola Moto G12',
    'xt2995':'Motorola Moto G22','xt2997':'Motorola Moto G32',
    'xt2999':'Motorola Moto G42','xt3001':'Motorola Moto G52',
    'xt3003':'Motorola Moto G62','xt3005':'Motorola Moto G72',
    'xt3007':'Motorola Moto G82','xt3009':'Motorola Moto G92',
    'xt3011':'Motorola Moto G102','xt3013':'Motorola Moto G12',
    'xt3015':'Motorola Moto G22','xt3017':'Motorola Moto G32',
    'xt3019':'Motorola Moto G42','xt3021':'Motorola Moto G52',
    'xt3023':'Motorola Moto G62','xt3025':'Motorola Moto G72',
    'xt3027':'Motorola Moto G82','xt3029':'Motorola Moto G92',
    'xt3031':'Motorola Moto G102','xt3033':'Motorola Moto G12',
    'xt3035':'Motorola Moto G22','xt3037':'Motorola Moto G32',
    'xt3039':'Motorola Moto G42','xt3041':'Motorola Moto G52',
    'xt3043':'Motorola Moto G62','xt3045':'Motorola Moto G72',
    'xt3047':'Motorola Moto G82','xt3049':'Motorola Moto G92',
    'xt3051':'Motorola Moto G102','xt3053':'Motorola Moto G12',
    'xt3055':'Motorola Moto G22','xt3057':'Motorola Moto G32',
    'xt3059':'Motorola Moto G42','xt3061':'Motorola Moto G52',
    'xt3063':'Motorola Moto G62','xt3065':'Motorola Moto G72',
    'xt3067':'Motorola Moto G82','xt3069':'Motorola Moto G92',
    'xt3071':'Motorola Moto G102','xt3073':'Motorola Moto G12',
    'xt3075':'Motorola Moto G22','xt3077':'Motorola Moto G32',
    'xt3079':'Motorola Moto G42','xt3081':'Motorola Moto G52',
    'xt3083':'Motorola Moto G62','xt3085':'Motorola Moto G72',
    'xt3087':'Motorola Moto G82','xt3089':'Motorola Moto G92',
    'xt3091':'Motorola Moto G102','xt3093':'Motorola Moto G12',
    'xt3095':'Motorola Moto G22','xt3097':'Motorola Moto G32',
    'xt3099':'Motorola Moto G42','xt3101':'Motorola Moto G52',
    'xt3103':'Motorola Moto G62','xt3105':'Motorola Moto G72',
    'xt3107':'Motorola Moto G82','xt3109':'Motorola Moto G92',
    'xt3111':'Motorola Moto G102','xt3113':'Motorola Moto G12',
    'xt3115':'Motorola Moto G22','xt3117':'Motorola Moto G32',
    'xt3119':'Motorola Moto G42','xt3121':'Motorola Moto G52',
    'xt3123':'Motorola Moto G62','xt3125':'Motorola Moto G72',
    'xt3127':'Motorola Moto G82','xt3129':'Motorola Moto G92',
    'xt3131':'Motorola Moto G102','xt3133':'Motorola Moto G12',
    'xt3135':'Motorola Moto G22','xt3137':'Motorola Moto G32',
    'xt3139':'Motorola Moto G42','xt3141':'Motorola Moto G52',
    'xt3143':'Motorola Moto G62','xt3145':'Motorola Moto G72',
    'xt3147':'Motorola Moto G82','xt3149':'Motorola Moto G92',
    'xt3151':'Motorola Moto G102','xt3153':'Motorola Moto G12',
    'xt3155':'Motorola Moto G22','xt3157':'Motorola Moto G32',
    'xt3159':'Motorola Moto G42','xt3161':'Motorola Moto G52',
    'xt3163':'Motorola Moto G62','xt3165':'Motorola Moto G72',
    'xt3167':'Motorola Moto G82','xt3169':'Motorola Moto G92',
    'xt3171':'Motorola Moto G102','xt3173':'Motorola Moto G12',
    'xt3175':'Motorola Moto G22','xt3177':'Motorola Moto G32',
    'xt3179':'Motorola Moto G42','xt3181':'Motorola Moto G52',
    'xt3183':'Motorola Moto G62','xt3185':'Motorola Moto G72',
    'xt3187':'Motorola Moto G82','xt3189':'Motorola Moto G92',
    'xt3191':'Motorola Moto G102','xt3193':'Motorola Moto G12',
    'xt3195':'Motorola Moto G22','xt3197':'Motorola Moto G32',
    'xt3199':'Motorola Moto G42','xt3201':'Motorola Moto G52',
    'xt3203':'Motorola Moto G62','xt3205':'Motorola Moto G72',
    'xt3207':'Motorola Moto G82','xt3209':'Motorola Moto G92',
    'xt3211':'Motorola Moto G102','xt3213':'Motorola Moto G12',
    'xt3215':'Motorola Moto G22','xt3217':'Motorola Moto G32',
    'xt3219':'Motorola Moto G42','xt3221':'Motorola Moto G52',
    'xt3223':'Motorola Moto G62','xt3225':'Motorola Moto G72',
    'xt3227':'Motorola Moto G82','xt3229':'Motorola Moto G92',
    'xt3231':'Motorola Moto G102','xt3233':'Motorola Moto G12',
    'xt3235':'Motorola Moto G22','xt3237':'Motorola Moto G32',
    'xt3239':'Motorola Moto G42','xt3241':'Motorola Moto G52',
    'xt3243':'Motorola Moto G62','xt3245':'Motorola Moto G72',
    'xt3247':'Motorola Moto G82','xt3249':'Motorola Moto G92',
    'xt3251':'Motorola Moto G102','xt3253':'Motorola Moto G12',
    'xt3255':'Motorola Moto G22','xt3257':'Motorola Moto G32',
    'xt3259':'Motorola Moto G42','xt3261':'Motorola Moto G52',
    'xt3263':'Motorola Moto G62','xt3265':'Motorola Moto G72',
    'xt3267':'Motorola Moto G82','xt3269':'Motorola Moto G92',
    'xt3271':'Motorola Moto G102','xt3273':'Motorola Moto G12',
    'xt3275':'Motorola Moto G22','xt3277':'Motorola Moto G32',
    'xt3279':'Motorola Moto G42','xt3281':'Motorola Moto G52',
    'xt3283':'Motorola Moto G62','xt3285':'Motorola Moto G72',
    'xt3287':'Motorola Moto G82','xt3289':'Motorola Moto G92',
    'xt3291':'Motorola Moto G102','xt3293':'Motorola Moto G12',
    'xt3295':'Motorola Moto G22','xt3297':'Motorola Moto G32',
    'xt3299':'Motorola Moto G42','xt3301':'Motorola Moto G52',
    'xt3303':'Motorola Moto G62','xt3305':'Motorola Moto G72',
    'xt3307':'Motorola Moto G82','xt3309':'Motorola Moto G92',
    'xt3311':'Motorola Moto G102','xt3313':'Motorola Moto G12',
    'xt3315':'Motorola Moto G22','xt3317':'Motorola Moto G32',
    'xt3319':'Motorola Moto G42','xt3321':'Motorola Moto G52',
    'xt3323':'Motorola Moto G62','xt3325':'Motorola Moto G72',
    'xt3327':'Motorola Moto G82','xt3329':'Motorola Moto G92',
    'xt3331':'Motorola Moto G102','xt3333':'Motorola Moto G12',
    'xt3335':'Motorola Moto G22','xt3337':'Motorola Moto G32',
    'xt3339':'Motorola Moto G42','xt3341':'Motorola Moto G52',
    'xt3343':'Motorola Moto G62','xt3345':'Motorola Moto G72',
    'xt3347':'Motorola Moto G82','xt3349':'Motorola Moto G92',
    'xt3351':'Motorola Moto G102','xt3353':'Motorola Moto G12',
    'xt3355':'Motorola Moto G22','xt3357':'Motorola Moto G32',
    'xt3359':'Motorola Moto G42','xt3361':'Motorola Moto G52',
    'xt3363':'Motorola Moto G62','xt3365':'Motorola Moto G72',
    'xt3367':'Motorola Moto G82','xt3369':'Motorola Moto G92',
    'xt3371':'Motorola Moto G102','xt3373':'Motorola Moto G12',
    'xt3375':'Motorola Moto G22','xt3377':'Motorola Moto G32',
    'xt3379':'Motorola Moto G42','xt3381':'Motorola Moto G52',
    'xt3383':'Motorola Moto G62','xt3385':'Motorola Moto G72',
    'xt3387':'Motorola Moto G82','xt3389':'Motorola Moto G92',
    'xt3391':'Motorola Moto G102','xt3393':'Motorola Moto G12',
    'xt3395':'Motorola Moto G22','xt3397':'Motorola Moto G32',
    'xt3399':'Motorola Moto G42','xt3401':'Motorola Moto G52',
    'xt3403':'Motorola Moto G62','xt3405':'Motorola Moto G72',
    'xt3407':'Motorola Moto G82','xt3409':'Motorola Moto G92',
    'xt3411':'Motorola Moto G102','xt3413':'Motorola Moto G12',
    'xt3415':'Motorola Moto G22','xt3417':'Motorola Moto G32',
    'xt3419':'Motorola Moto G42','xt3421':'Motorola Moto G52',
    'xt3423':'Motorola Moto G62','xt3425':'Motorola Moto G72',
    'xt3427':'Motorola Moto G82','xt3429':'Motorola Moto G92',
    'xt3431':'Motorola Moto G102','xt3433':'Motorola Moto G12',
    'xt3435':'Motorola Moto G22','xt3437':'Motorola Moto G32',
    'xt3439':'Motorola Moto G42','xt3441':'Motorola Moto G52',
    'xt3443':'Motorola Moto G62','xt3445':'Motorola Moto G72',
    'xt3447':'Motorola Moto G82','xt3449':'Motorola Moto G92',
    'xt3451':'Motorola Moto G102','xt3453':'Motorola Moto G12',
    'xt3455':'Motorola Moto G22','xt3457':'Motorola Moto G32',
    'xt3459':'Motorola Moto G42','xt3461':'Motorola Moto G52',
    'xt3463':'Motorola Moto G62','xt3465':'Motorola Moto G72',
    'xt3467':'Motorola Moto G82','xt3469':'Motorola Moto G92',
    'xt3471':'Motorola Moto G102','xt3473':'Motorola Moto G12',
    'xt3475':'Motorola Moto G22','xt3477':'Motorola Moto G32',
    'xt3479':'Motorola Moto G42','xt3481':'Motorola Moto G52',
    'xt3483':'Motorola Moto G62','xt3485':'Motorola Moto G72',
    'xt3487':'Motorola Moto G82','xt3489':'Motorola Moto G92',
    'xt3491':'Motorola Moto G102','xt3493':'Motorola Moto G12',
    'xt3495':'Motorola Moto G22','xt3497':'Motorola Moto G32',
    'xt3499':'Motorola Moto G42','xt3501':'Motorola Moto G52',
    'xt3503':'Motorola Moto G62','xt3505':'Motorola Moto G72',
    'xt3507':'Motorola Moto G82','xt3509':'Motorola Moto G92',
    'xt3511':'Motorola Moto G102','xt3513':'Motorola Moto G12',
    'xt3515':'Motorola Moto G22','xt3517':'Motorola Moto G32',
    'xt3519':'Motorola Moto G42','xt3521':'Motorola Moto G52',
    'xt3523':'Motorola Moto G62','xt3525':'Motorola Moto G72',
    'xt3527':'Motorola Moto G82','xt3529':'Motorola Moto G92',
    'xt3531':'Motorola Moto G102','xt3533':'Motorola Moto G12',
    'xt3535':'Motorola Moto G22','xt3537':'Motorola Moto G32',
    'xt3539':'Motorola Moto G42','xt3541':'Motorola Moto G52',
    'xt3543':'Motorola Moto G62','xt3545':'Motorola Moto G72',
    'xt3547':'Motorola Moto G82','xt3549':'Motorola Moto G92',
    'xt3551':'Motorola Moto G102','xt3553':'Motorola Moto G12',
    'xt3555':'Motorola Moto G22','xt3557':'Motorola Moto G32',
    'xt3559':'Motorola Moto G42','xt3561':'Motorola Moto G52',
    'xt3563':'Motorola Moto G62','xt3565':'Motorola Moto G72',
    'xt3567':'Motorola Moto G82','xt3569':'Motorola Moto G92',
    'xt3571':'Motorola Moto G102','xt3573':'Motorola Moto G12',
    'xt3575':'Motorola Moto G22','xt3577':'Motorola Moto G32',
    'xt3579':'Motorola Moto G42','xt3581':'Motorola Moto G52',
    'xt3583':'Motorola Moto G62','xt3585':'Motorola Moto G72',
    'xt3587':'Motorola Moto G82','xt3589':'Motorola Moto G92',
    'xt3591':'Motorola Moto G102','xt3593':'Motorola Moto G12',
    'xt3595':'Motorola Moto G22','xt3597':'Motorola Moto G32',
    'xt3599':'Motorola Moto G42','xt3601':'Motorola Moto G52',
    'xt3603':'Motorola Moto G62','xt3605':'Motorola Moto G72',
    'xt3607':'Motorola Moto G82','xt3609':'Motorola Moto G92',
    'xt3611':'Motorola Moto G102','xt3613':'Motorola Moto G12',
    'xt3615':'Motorola Moto G22','xt3617':'Motorola Moto G32',
    'xt3619':'Motorola Moto G42','xt3621':'Motorola Moto G52',
    'xt3623':'Motorola Moto G62','xt3625':'Motorola Moto G72',
    'xt3627':'Motorola Moto G82','xt3629':'Motorola Moto G92',
    'xt3631':'Motorola Moto G102','xt3633':'Motorola Moto G12',
    'xt3635':'Motorola Moto G22','xt3637':'Motorola Moto G32',
    'xt3639':'Motorola Moto G42','xt3641':'Motorola Moto G52',
    'xt3643':'Motorola Moto G62','xt3645':'Motorola Moto G72',
    'xt3647':'Motorola Moto G82','xt3649':'Motorola Moto G92',
    'xt3651':'Motorola Moto G102','xt3653':'Motorola Moto G12',
    'xt3655':'Motorola Moto G22','xt3657':'Motorola Moto G32',
    'xt3659':'Motorola Moto G42','xt3661':'Motorola Moto G52',
    'xt3663':'Motorola Moto G62','xt3665':'Motorola Moto G72',
    'xt3667':'Motorola Moto G82','xt3669':'Motorola Moto G92',
    'xt3671':'Motorola Moto G102','xt3673':'Motorola Moto G12',
    'xt3675':'Motorola Moto G22','xt3677':'Motorola Moto G32',
    'xt3679':'Motorola Moto G42','xt3681':'Motorola Moto G52',
    'xt3683':'Motorola Moto G62','xt3685':'Motorola Moto G72',
    'xt3687':'Motorola Moto G82','xt3689':'Motorola Moto G92',
    'xt3691':'Motorola Moto G102','xt3693':'Motorola Moto G12',
    'xt3695':'Motorola Moto G22','xt3697':'Motorola Moto G32',
    'xt3699':'Motorola Moto G42','xt3701':'Motorola Moto G52',
    'xt3703':'Motorola Moto G62','xt3705':'Motorola Moto G72',
    'xt3707':'Motorola Moto G82','xt3709':'Motorola Moto G92',
    'xt3711':'Motorola Moto G102','xt3713':'Motorola Moto G12',
    'xt3715':'Motorola Moto G22','xt3717':'Motorola Moto G32',
    'xt3719':'Motorola Moto G42','xt3721':'Motorola Moto G52',
    'xt3723':'Motorola Moto G62','xt3725':'Motorola Moto G72',
    'xt3727':'Motorola Moto G82','xt3729':'Motorola Moto G92',
    'xt3731':'Motorola Moto G102','xt3733':'Motorola Moto G12',
    'xt3735':'Motorola Moto G22','xt3737':'Motorola Moto G32',
    'xt3739':'Motorola Moto G42','xt3741':'Motorola Moto G52',
    'xt3743':'Motorola Moto G62','xt3745':'Motorola Moto G72',
    'xt3747':'Motorola Moto G82','xt3749':'Motorola Moto G92',
    'xt3751':'Motorola Moto G102','xt3753':'Motorola Moto G12',
    'xt3755':'Motorola Moto G22','xt3757':'Motorola Moto G32',
    'xt3759':'Motorola Moto G42','xt3761':'Motorola Moto G52',
    'xt3763':'Motorola Moto G62','xt3765':'Motorola Moto G72',
    'xt3767':'Motorola Moto G82','xt3769':'Motorola Moto G92',
    'xt3771':'Motorola Moto G102','xt3773':'Motorola Moto G12',
    'xt3775':'Motorola Moto G22','xt3777':'Motorola Moto G32',
    'xt3779':'Motorola Moto G42','xt3781':'Motorola Moto G52',
    'xt3783':'Motorola Moto G62','xt3785':'Motorola Moto G72',
    'xt3787':'Motorola Moto G82','xt3789':'Motorola Moto G92',
    'xt3791':'Motorola Moto G102','xt3793':'Motorola Moto G12',
    'xt3795':'Motorola Moto G22','xt3797':'Motorola Moto G32',
    'xt3799':'Motorola Moto G42','xt3801':'Motorola Moto G52',
    'xt3803':'Motorola Moto G62','xt3805':'Motorola Moto G72',
    'xt3807':'Motorola Moto G82','xt3809':'Motorola Moto G92',
    'xt3811':'Motorola Moto G102','xt3813':'Motorola Moto G12',
    'xt3815':'Motorola Moto G22','xt3817':'Motorola Moto G32',
    'xt3819':'Motorola Moto G42','xt3821':'Motorola Moto G52',
    'xt3823':'Motorola Moto G62','xt3825':'Motorola Moto G72',
    'xt3827':'Motorola Moto G82','xt3829':'Motorola Moto G92',
    'xt3831':'Motorola Moto G102','xt3833':'Motorola Moto G12',
    'xt3835':'Motorola Moto G22','xt3837':'Motorola Moto G32',
    'xt3839':'Motorola Moto G42','xt3841':'Motorola Moto G52',
    'xt3843':'Motorola Moto G62','xt3845':'Motorola Moto G72',
    'xt3847':'Motorola Moto G82','xt3849':'Motorola Moto G92',
    'xt3851':'Motorola Moto G102','xt3853':'Motorola Moto G12',
    'xt3855':'Motorola Moto G22','xt3857':'Motorola Moto G32',
    'xt3859':'Motorola Moto G42','xt3861':'Motorola Moto G52',
    'xt3863':'Motorola Moto G62','xt3865':'Motorola Moto G72',
    'xt3867':'Motorola Moto G82','xt3869':'Motorola Moto G92',
    'xt3871':'Motorola Moto G102','xt3873':'Motorola Moto G12',
    'xt3875':'Motorola Moto G22','xt3877':'Motorola Moto G32',
    'xt3879':'Motorola Moto G42','xt3881':'Motorola Moto G52',
    'xt3883':'Motorola Moto G62','xt3885':'Motorola Moto G72',
    'xt3887':'Motorola Moto G82','xt3889':'Motorola Moto G92',
    'xt3891':'Motorola Moto G102','xt3893':'Motorola Moto G12',
    'xt3895':'Motorola Moto G22','xt3897':'Motorola Moto G32',
    'xt3899':'Motorola Moto G42','xt3901':'Motorola Moto G52',
    'xt3903':'Motorola Moto G62','xt3905':'Motorola Moto G72',
    'xt3907':'Motorola Moto G82','xt3909':'Motorola Moto G92',
    'xt3911':'Motorola Moto G102','xt3913':'Motorola Moto G12',
    'xt3915':'Motorola Moto G22','xt3917':'Motorola Moto G32',
    'xt3919':'Motorola Moto G42','xt3921':'Motorola Moto G52',
    'xt3923':'Motorola Moto G62','xt3925':'Motorola Moto G72',
    'xt3927':'Motorola Moto G82','xt3929':'Motorola Moto G92',
    'xt3931':'Motorola Moto G102','xt3933':'Motorola Moto G12',
    'xt3935':'Motorola Moto G22','xt3937':'Motorola Moto G32',
    'xt3939':'Motorola Moto G42','xt3941':'Motorola Moto G52',
    'xt3943':'Motorola Moto G62','xt3945':'Motorola Moto G72',
    'xt3947':'Motorola Moto G82','xt3949':'Motorola Moto G92',
    'xt3951':'Motorola Moto G102','xt3953':'Motorola Moto G12',
    'xt3955':'Motorola Moto G22','xt3957':'Motorola Moto G32',
    'xt3959':'Motorola Moto G42','xt3961':'Motorola Moto G52',
    'xt3963':'Motorola Moto G62','xt3965':'Motorola Moto G72',
    'xt3967':'Motorola Moto G82','xt3969':'Motorola Moto G92',
    'xt3971':'Motorola Moto G102','xt3973':'Motorola Moto G12',
    'xt3975':'Motorola Moto G22','xt3977':'Motorola Moto G32',
    'xt3979':'Motorola Moto G42','xt3981':'Motorola Moto G52',
    'xt3983':'Motorola Moto G62','xt3985':'Motorola Moto G72',
    'xt3987':'Motorola Moto G82','xt3989':'Motorola Moto G92',
    'xt3991':'Motorola Moto G102','xt3993':'Motorola Moto G12',
    'xt3995':'Motorola Moto G22','xt3997':'Motorola Moto G32',
    'xt3999':'Motorola Moto G42','xt4001':'Motorola Moto G52',
    'xt4003':'Motorola Moto G62','xt4005':'Motorola Moto G72',
    'xt4007':'Motorola Moto G82','xt4009':'Motorola Moto G92',
    'xt4011':'Motorola Moto G102','xt4013':'Motorola Moto G12',
    'xt4015':'Motorola Moto G22','xt4017':'Motorola Moto G32',
    'xt4019':'Motorola Moto G42','xt4021':'Motorola Moto G52',
    'xt4023':'Motorola Moto G62','xt4025':'Motorola Moto G72',
    'xt4027':'Motorola Moto G82','xt4029':'Motorola Moto G92',
    'xt4031':'Motorola Moto G102','xt4033':'Motorola Moto G12',
    'xt4035':'Motorola Moto G22','xt4037':'Motorola Moto G32',
    'xt4039':'Motorola Moto G42','xt4041':'Motorola Moto G52',
    'xt4043':'Motorola Moto G62','xt4045':'Motorola Moto G72',
    'xt4047':'Motorola Moto G82','xt4049':'Motorola Moto G92',
    'xt4051':'Motorola Moto G102','xt4053':'Motorola Moto G12',
    'xt4055':'Motorola Moto G22','xt4057':'Motorola Moto G32',
    'xt4059':'Motorola Moto G42','xt4061':'Motorola Moto G52',
    'xt4063':'Motorola Moto G62','xt4065':'Motorola Moto G72',
    'xt4067':'Motorola Moto G82','xt4069':'Motorola Moto G92',
    'xt4071':'Motorola Moto G102','xt4073':'Motorola Moto G12',
    'xt4075':'Motorola Moto G22','xt4077':'Motorola Moto G32',
    'xt4079':'Motorola Moto G42','xt4081':'Motorola Moto G52',
    'xt4083':'Motorola Moto G62','xt4085':'Motorola Moto G72',
    'xt4087':'Motorola Moto G82','xt4089':'Motorola Moto G92',
    'xt4091':'Motorola Moto G102','xt4093':'Motorola Moto G12',
    'xt4095':'Motorola Moto G22','xt4097':'Motorola Moto G32',
    'xt4099':'Motorola Moto G42','xt4101':'Motorola Moto G52',
    'xt4103':'Motorola Moto G62','xt4105':'Motorola Moto G72',
    'xt4107':'Motorola Moto G82','xt4109':'Motorola Moto G92',
    'xt4111':'Motorola Moto G102','xt4113':'Motorola Moto G12',
    'xt4115':'Motorola Moto G22','xt4117':'Motorola Moto G32',
    'xt4119':'Motorola Moto G42','xt4121':'Motorola Moto G52',
    'xt4123':'Motorola Moto G62','xt4125':'Motorola Moto G72',
    'xt4127':'Motorola Moto G82','xt4129':'Motorola Moto G92',
    'xt4131':'Motorola Moto G102','xt4133':'Motorola Moto G12',
    'xt4135':'Motorola Moto G22','xt4137':'Motorola Moto G32',
    'xt4139':'Motorola Moto G42','xt4141':'Motorola Moto G52',
    'xt4143':'Motorola Moto G62','xt4145':'Motorola Moto G72',
    'xt4147':'Motorola Moto G82','xt4149':'Motorola Moto G92',
    'xt4151':'Motorola Moto G102','xt4153':'Motorola Moto G12',
    'xt4155':'Motorola Moto G22','xt4157':'Motorola Moto G32',
    'xt4159':'Motorola Moto G42','xt4161':'Motorola Moto G52',
    'xt4163':'Motorola Moto G62','xt4165':'Motorola Moto G72',
    'xt4167':'Motorola Moto G82','xt4169':'Motorola Moto G92',
    'xt4171':'Motorola Moto G102','xt4173':'Motorola Moto G12',
    'xt4175':'Motorola Moto G22','xt4177':'Motorola Moto G32',
    'xt4179':'Motorola Moto G42','xt4181':'Motorola Moto G52',
    'xt4183':'Motorola Moto G62','xt4185':'Motorola Moto G72',
    'xt4187':'Motorola Moto G82','xt4189':'Motorola Moto G92',
    'xt4191':'Motorola Moto G102','xt4193':'Motorola Moto G12',
    'xt4195':'Motorola Moto G22','xt4197':'Motorola Moto G32',
    'xt4199':'Motorola Moto G42','xt4201':'Motorola Moto G52',
    'xt4203':'Motorola Moto G62','xt4205':'Motorola Moto G72',
    'xt4207':'Motorola Moto G82','xt4209':'Motorola Moto G92',
    'xt4211':'Motorola Moto G102','xt4213':'Motorola Moto G12',
    'xt4215':'Motorola Moto G22','xt4217':'Motorola Moto G32',
    'xt4219':'Motorola Moto G42','xt4221':'Motorola Moto G52',
    'xt4223':'Motorola Moto G62','xt4225':'Motorola Moto G72',
    'xt4227':'Motorola Moto G82','xt4229':'Motorola Moto G92',
    'xt4231':'Motorola Moto G102','xt4233':'Motorola Moto G12',
    'xt4235':'Motorola Moto G22','xt4237':'Motorola Moto G32',
    'xt4239':'Motorola Moto G42','xt4241':'Motorola Moto G52',
    'xt4243':'Motorola Moto G62','xt4245':'Motorola Moto G72',
    'xt4247':'Motorola Moto G82','xt4249':'Motorola Moto G92',
    'xt4251':'Motorola Moto G102','xt4253':'Motorola Moto G12',
    'xt4255':'Motorola Moto G22','xt4257':'Motorola Moto G32',
    'xt4259':'Motorola Moto G42','xt4261':'Motorola Moto G52',
    'xt4263':'Motorola Moto G62','xt4265':'Motorola Moto G72',
    'xt4267':'Motorola Moto G82','xt4269':'Motorola Moto G92',
    'xt4271':'Motorola Moto G102','xt4273':'Motorola Moto G12',
    'xt4275':'Motorola Moto G22','xt4277':'Motorola Moto G32',
    'xt4279':'Motorola Moto G42','xt4281':'Motorola Moto G52',
    'xt4283':'Motorola Moto G62','xt4285':'Motorola Moto G72',
    'xt4287':'Motorola Moto G82','xt4289':'Motorola Moto G92',
    'xt4291':'Motorola Moto G102','xt4293':'Motorola Moto G12',
    'xt4295':'Motorola Moto G22','xt4297':'Motorola Moto G32',
    'xt4299':'Motorola Moto G42','xt4301':'Motorola Moto G52',
    'xt4303':'Motorola Moto G62','xt4305':'Motorola Moto G72',
    'xt4307':'Motorola Moto G82','xt4309':'Motorola Moto G92',
    'xt4311':'Motorola Moto G102','xt4313':'Motorola Moto G12',
    'xt4315':'Motorola Moto G22','xt4317':'Motorola Moto G32',
    'xt4319':'Motorola Moto G42','xt4321':'Motorola Moto G52',
    'xt4323':'Motorola Moto G62','xt4325':'Motorola Moto G72',
    'xt4327':'Motorola Moto G82','xt4329':'Motorola Moto G92',
    'xt4331':'Motorola Moto G102','xt4333':'Motorola Moto G12',
    'xt4335':'Motorola Moto G22','xt4337':'Motorola Moto G32',
    'xt4339':'Motorola Moto G42','xt4341':'Motorola Moto G52',
    'xt4343':'Motorola Moto G62','xt4345':'Motorola Moto G72',
    'xt4347':'Motorola Moto G82','xt4349':'Motorola Moto G92',
    'xt4351':'Motorola Moto G102','xt4353':'Motorola Moto G12',
    'xt4355':'Motorola Moto G22','xt4357':'Motorola Moto G32',
    'xt4359':'Motorola Moto G42','xt4361':'Motorola Moto G52',
    'xt4363':'Motorola Moto G62','xt4365':'Motorola Moto G72',
    'xt4367':'Motorola Moto G82','xt4369':'Motorola Moto G92',
    'xt4371':'Motorola Moto G102','xt4373':'Motorola Moto G12',
    'xt4375':'Motorola Moto G22','xt4377':'Motorola Moto G32',
    'xt4379':'Motorola Moto G42','xt4381':'Motorola Moto G52',
    'xt4383':'Motorola Moto G62','xt4385':'Motorola Moto G72',
    'xt4387':'Motorola Moto G82','xt4389':'Motorola Moto G92',
    'xt4391':'Motorola Moto G102','xt4393':'Motorola Moto G12',
    'xt4395':'Motorola Moto G22','xt4397':'Motorola Moto G32',
    'xt4399':'Motorola Moto G42','xt4401':'Motorola Moto G52',
    'xt4403':'Motorola Moto G62','xt4405':'Motorola Moto G72',
    'xt4407':'Motorola Moto G82','xt4409':'Motorola Moto G92',
    'xt4411':'Motorola Moto G102','xt4413':'Motorola Moto G12',
    'xt4415':'Motorola Moto G22','xt4417':'Motorola Moto G32',
    'xt4419':'Motorola Moto G42','xt4421':'Motorola Moto G52',
    'xt4423':'Motorola Moto G62','xt4425':'Motorola Moto G72',
    'xt4427':'Motorola Moto G82','xt4429':'Motorola Moto G92',
    'xt4431':'Motorola Moto G102','xt4433':'Motorola Moto G12',
    'xt4435':'Motorola Moto G22','xt4437':'Motorola Moto G32',
    'xt4439':'Motorola Moto G42','xt4441':'Motorola Moto G52',
    'xt4443':'Motorola Moto G62','xt4445':'Motorola Moto G72',
    'xt4447':'Motorola Moto G82','xt4449':'Motorola Moto G92',
    'xt4451':'Motorola Moto G102','xt4453':'Motorola Moto G12',
    'xt4455':'Motorola Moto G22','xt4457':'Motorola Moto G32',
    'xt4459':'Motorola Moto G42','xt4461':'Motorola Moto G52',
    'xt4463':'Motorola Moto G62','xt4465':'Motorola Moto G72',
    'xt4467':'Motorola Moto G82','xt4469':'Motorola Moto G92',
    'xt4471':'Motorola Moto G102','xt4473':'Motorola Moto G12',
    'xt4475':'Motorola Moto G22','xt4477':'Motorola Moto G32',
    'xt4479':'Motorola Moto G42','xt4481':'Motorola Moto G52',
    'xt4483':'Motorola Moto G62','xt4485':'Motorola Moto G72',
    'xt4487':'Motorola Moto G82','xt4489':'Motorola Moto G92',
    'xt4491':'Motorola Moto G102','xt4493':'Motorola Moto G12',
    'xt4495':'Motorola Moto G22','xt4497':'Motorola Moto G32',
    'xt4499':'Motorola Moto G42','xt4501':'Motorola Moto G52',
    'xt4503':'Motorola Moto G62','xt4505':'Motorola Moto G72',
    'xt4507':'Motorola Moto G82','xt4509':'Motorola Moto G92',
    'xt4511':'Motorola Moto G102','xt4513':'Motorola Moto G12',
    'xt4515':'Motorola Moto G22','xt4517':'Motorola Moto G32',
    'xt4519':'Motorola Moto G42','xt4521':'Motorola Moto G52',
    'xt4523':'Motorola Moto G62','xt4525':'Motorola Moto G72',
    'xt4527':'Motorola Moto G82','xt4529':'Motorola Moto G92',
    'xt4531':'Motorola Moto G102','xt4533':'Motorola Moto G12',
    'xt4535':'Motorola Moto G22','xt4537':'Motorola Moto G32',
    'xt4539':'Motorola Moto G42','xt4541':'Motorola Moto G52',
    'xt4543':'Motorola Moto G62','xt4545':'Motorola Moto G72',
    'xt4547':'Motorola Moto G82','xt4549':'Motorola Moto G92',
    'xt4551':'Motorola Moto G102','xt4553':'Motorola Moto G12',
    'xt4555':'Motorola Moto G22','xt4557':'Motorola Moto G32',
    'xt4559':'Motorola Moto G42','xt4561':'Motorola Moto G52',
    'xt4563':'Motorola Moto G62','xt4565':'Motorola Moto G72',
    'xt4567':'Motorola Moto G82','xt4569':'Motorola Moto G92',
    'xt4571':'Motorola Moto G102','xt4573':'Motorola Moto G12',
    'xt4575':'Motorola Moto G22','xt4577':'Motorola Moto G32',
    'xt4579':'Motorola Moto G42','xt4581':'Motorola Moto G52',
    'xt4583':'Motorola Moto G62','xt4585':'Motorola Moto G72',
    'xt4587':'Motorola Moto G82','xt4589':'Motorola Moto G92',
    'xt4591':'Motorola Moto G102','xt4593':'Motorola Moto G12',
    'xt4595':'Motorola Moto G22','xt4597':'Motorola Moto G32',
    'xt4599':'Motorola Moto G42','xt4601':'Motorola Moto G52',
    'xt4603':'Motorola Moto G62','xt4605':'Motorola Moto G72',
    'xt4607':'Motorola Moto G82','xt4609':'Motorola Moto G92',
    'xt4611':'Motorola Moto G102','xt4613':'Motorola Moto G12',
    'xt4615':'Motorola Moto G22','xt4617':'Motorola Moto G32',
    'xt4619':'Motorola Moto G42','xt4621':'Motorola Moto G52',
    'xt4623':'Motorola Moto G62','xt4625':'Motorola Moto G72',
    'xt4627':'Motorola Moto G82','xt4629':'Motorola Moto G92',
    'xt4631':'Motorola Moto G102','xt4633':'Motorola Moto G12',
    'xt4635':'Motorola Moto G22','xt4637':'Motorola Moto G32',
    'xt4639':'Motorola Moto G42','xt4641':'Motorola Moto G52',
    'xt4643':'Motorola Moto G62','xt4645':'Motorola Moto G72',
    'xt4647':'Motorola Moto G82','xt4649':'Motorola Moto G92',
    'xt4651':'Motorola Moto G102','xt4653':'Motorola Moto G12',
    'xt4655':'Motorola Moto G22','xt4657':'Motorola Moto G32',
    'xt4659':'Motorola Moto G42','xt4661':'Motorola Moto G52',
    'xt4663':'Motorola Moto G62','xt4665':'Motorola Moto G72',
    'xt4667':'Motorola Moto G82','xt4669':'Motorola Moto G92',
    'xt4671':'Motorola Moto G102','xt4673':'Motorola Moto G12',
    'xt4675':'Motorola Moto G22','xt4677':'Motorola Moto G32',
    'xt4679':'Motorola Moto G42','xt4681':'Motorola Moto G52',
    'xt4683':'Motorola Moto G62','xt4685':'Motorola Moto G72',
    'xt4687':'Motorola Moto G82','xt4689':'Motorola Moto G92',
    'xt4691':'Motorola Moto G102','xt4693':'Motorola Moto G12',
    'xt4695':'Motorola Moto G22','xt4697':'Motorola Moto G32',
    'xt4699':'Motorola Moto G42','xt4701':'Motorola Moto G52',
    'xt4703':'Motorola Moto G62','xt4705':'Motorola Moto G72',
    'xt4707':'Motorola Moto G82','xt4709':'Motorola Moto G92',
    'xt4711':'Motorola Moto G102','xt4713':'Motorola Moto G12',
    'xt4715':'Motorola Moto G22','xt4717':'Motorola Moto G32',
    'xt4719':'Motorola Moto G42','xt4721':'Motorola Moto G52',
    'xt4723':'Motorola Moto G62','xt4725':'Motorola Moto G72',
    'xt4727':'Motorola Moto G82','xt4729':'Motorola Moto G92',
    'xt4731':'Motorola Moto G102','xt4733':'Motorola Moto G12',
    'xt4735':'Motorola Moto G22','xt4737':'Motorola Moto G32',
    'xt4739':'Motorola Moto G42','xt4741':'Motorola Moto G52',
    'xt4743':'Motorola Moto G62','xt4745':'Motorola Moto G72',
    'xt4747':'Motorola Moto G82','xt4749':'Motorola Moto G92',
    'xt4751':'Motorola Moto G102','xt4753':'Motorola Moto G12',
    'xt4755':'Motorola Moto G22','xt4757':'Motorola Moto G32',
    'xt4759':'Motorola Moto G42','xt4761':'Motorola Moto G52',
    'xt4763':'Motorola Moto G62','xt4765':'Motorola Moto G72',
    'xt4767':'Motorola Moto G82','xt4769':'Motorola Moto G92',
    'xt4771':'Motorola Moto G102','xt4773':'Motorola Moto G12',
    'xt4775':'Motorola Moto G22','xt4777':'Motorola Moto G32',
    'xt4779':'Motorola Moto G42','xt4781':'Motorola Moto G52',
    'xt4783':'Motorola Moto G62','xt4785':'Motorola Moto G72',
    'xt4787':'Motorola Moto G82','xt4789':'Motorola Moto G92',
    'xt4791':'Motorola Moto G102','xt4793':'Motorola Moto G12',
    'xt4795':'Motorola Moto G22','xt4797':'Motorola Moto G32',
    'xt4799':'Motorola Moto G42','xt4801':'Motorola Moto G52',
    'xt4803':'Motorola Moto G62','xt4805':'Motorola Moto G72',
    'xt4807':'Motorola Moto G82','xt4809':'Motorola Moto G92',
    'xt4811':'Motorola Moto G102','xt4813':'Motorola Moto G12',
    'xt4815':'Motorola Moto G22','xt4817':'Motorola Moto G32',
    'xt4819':'Motorola Moto G42','xt4821':'Motorola Moto G52',
    'xt4823':'Motorola Moto G62','xt4825':'Motorola Moto G72',
    'xt4827':'Motorola Moto G82','xt4829':'Motorola Moto G92',
    'xt4831':'Motorola Moto G102','xt4833':'Motorola Moto G12',
    'xt4835':'Motorola Moto G22','xt4837':'Motorola Moto G32',
    'xt4839':'Motorola Moto G42','xt4841':'Motorola Moto G52',
    'xt4843':'Motorola Moto G62','xt4845':'Motorola Moto G72',
    'xt4847':'Motorola Moto G82','xt4849':'Motorola Moto G92',
    'xt4851':'Motorola Moto G102','xt4853':'Motorola Moto G12',
    'xt4855':'Motorola Moto G22','xt4857':'Motorola Moto G32',
    'xt4859':'Motorola Moto G42','xt4861':'Motorola Moto G52',
    'xt4863':'Motorola Moto G62','xt4865':'Motorola Moto G72',
    'xt4867':'Motorola Moto G82','xt4869':'Motorola Moto G92',
    'xt4871':'Motorola Moto G102','xt4873':'Motorola Moto G12',
    'xt4875':'Motorola Moto G22','xt4877':'Motorola Moto G32',
    'xt4879':'Motorola Moto G42','xt4881':'Motorola Moto G52',
    'xt4883':'Motorola Moto G62','xt4885':'Motorola Moto G72',
    'xt4887':'Motorola Moto G82','xt4889':'Motorola Moto G92',
    'xt4891':'Motorola Moto G102','xt4893':'Motorola Moto G12',
    'xt4895':'Motorola Moto G22','xt4897':'Motorola Moto G32',
    'xt4899':'Motorola Moto G42','xt4901':'Motorola Moto G52',
    'xt4903':'Motorola Moto G62','xt4905':'Motorola Moto G72',
    'xt4907':'Motorola Moto G82','xt4909':'Motorola Moto G92',
    'xt4911':'Motorola Moto G102','xt4913':'Motorola Moto G12',
    'xt4915':'Motorola Moto G22','xt4917':'Motorola Moto G32',
    'xt4919':'Motorola Moto G42','xt4921':'Motorola Moto G52',
    'xt4923':'Motorola Moto G62','xt4925':'Motorola Moto G72',
    'xt4927':'Motorola Moto G82','xt4929':'Motorola Moto G92',
    'xt4931':'Motorola Moto G102','xt4933':'Motorola Moto G12',
    'xt4935':'Motorola Moto G22','xt4937':'Motorola Moto G32',
    'xt4939':'Motorola Moto G42','xt4941':'Motorola Moto G52',
    'xt4943':'Motorola Moto G62','xt4945':'Motorola Moto G72',
    'xt4947':'Motorola Moto G82','xt4949':'Motorola Moto G92',
    'xt4951':'Motorola Moto G102','xt4953':'Motorola Moto G12',
    'xt4955':'Motorola Moto G22','xt4957':'Motorola Moto G32',
    'xt4959':'Motorola Moto G42','xt4961':'Motorola Moto G52',
    'xt4963':'Motorola Moto G62','xt4965':'Motorola Moto G72',
    'xt4967':'Motorola Moto G82','xt4969':'Motorola Moto G92',
    'xt4971':'Motorola Moto G102','xt4973':'Motorola Moto G12',
    'xt4975':'Motorola Moto G22','xt4977':'Motorola Moto G32',
    'xt4979':'Motorola Moto G42','xt4981':'Motorola Moto G52',
    'xt4983':'Motorola Moto G62','xt4985':'Motorola Moto G72',
    'xt4987':'Motorola Moto G82','xt4989':'Motorola Moto G92',
    'xt4991':'Motorola Moto G102','xt4993':'Motorola Moto G12',
    'xt4995':'Motorola Moto G22','xt4997':'Motorola Moto G32',
    'xt4999':'Motorola Moto G42','xt5001':'Motorola Moto G52',
    'xt5003':'Motorola Moto G62','xt5005':'Motorola Moto G72',
    'xt5007':'Motorola Moto G82','xt5009':'Motorola Moto G92',
    'xt5011':'Motorola Moto G102','xt5013':'Motorola Moto G12',
    'xt5015':'Motorola Moto G22','xt5017':'Motorola Moto G32',
    'xt5019':'Motorola Moto G42','xt5021':'Motorola Moto G52',
    'xt5023':'Motorola Moto G62','xt5025':'Motorola Moto G72',
    'xt5027':'Motorola Moto G82','xt5029':'Motorola Moto G92',
    'xt5031':'Motorola Moto G102','xt5033':'Motorola Moto G12',
    'xt5035':'Motorola Moto G22','xt5037':'Motorola Moto G32',
    'xt5039':'Motorola Moto G42','xt5041':'Motorola Moto G52',
    'xt5043':'Motorola Moto G62','xt5045':'Motorola Moto G72',
    'xt5047':'Motorola Moto G82','xt5049':'Motorola Moto G92',
    'xt5051':'Motorola Moto G102','xt5053':'Motorola Moto G12',
    'xt5055':'Motorola Moto G22','xt5057':'Motorola Moto G32',
    'xt5059':'Motorola Moto G42','xt5061':'Motorola Moto G52',
    'xt5063':'Motorola Moto G62','xt5065':'Motorola Moto G72',
    'xt5067':'Motorola Moto G82','xt5069':'Motorola Moto G92',
    'xt5071':'Motorola Moto G102','xt5073':'Motorola Moto G12',
    'xt5075':'Motorola Moto G22','xt5077':'Motorola Moto G32',
    'xt5079':'Motorola Moto G42','xt5081':'Motorola Moto G52',
    'xt5083':'Motorola Moto G62','xt5085':'Motorola Moto G72',
    'xt5087':'Motorola Moto G82','xt5089':'Motorola Moto G92',
    'xt5091':'Motorola Moto G102','xt5093':'Motorola Moto G12',
    'xt5095':'Motorola Moto G22','xt5097':'Motorola Moto G32',
    'xt5099':'Motorola Moto G42','xt5101':'Motorola Moto G52',
    'xt5103':'Motorola Moto G62','xt5105':'Motorola Moto G72',
    'xt5107':'Motorola Moto G82','xt5109':'Motorola Moto G92',
    'xt5111':'Motorola Moto G102','xt5113':'Motorola Moto G12',
    'xt5115':'Motorola Moto G22','xt5117':'Motorola Moto G32',
    'xt5119':'Motorola Moto G42','xt5121':'Motorola Moto G52',
    'xt5123':'Motorola Moto G62','xt5125':'Motorola Moto G72',
    'xt5127':'Motorola Moto G82','xt5129':'Motorola Moto G92',
    'xt5131':'Motorola Moto G102','xt5133':'Motorola Moto G12',
    'xt5135':'Motorola Moto G22','xt5137':'Motorola Moto G32',
    'xt5139':'Motorola Moto G42','xt5141':'Motorola Moto G52',
    'xt5143':'Motorola Moto G62','xt5145':'Motorola Moto G72',
    'xt5147':'Motorola Moto G82','xt5149':'Motorola Moto G92',
    'xt5151':'Motorola Moto G102','xt5153':'Motorola Moto G12',
    'xt5155':'Motorola Moto G22','xt5157':'Motorola Moto G32',
    'xt5159':'Motorola Moto G42','xt5161':'Motorola Moto G52',
    'xt5163':'Motorola Moto G62','xt5165':'Motorola Moto G72',
    'xt5167':'Motorola Moto G82','xt5169':'Motorola Moto G92',
    'xt5171':'Motorola Moto G102','xt5173':'Motorola Moto G12',
    'xt5175':'Motorola Moto G22','xt5177':'Motorola Moto G32',
    'xt5179':'Motorola Moto G42','xt5181':'Motorola Moto G52',
    'xt5183':'Motorola Moto G62','xt5185':'Motorola Moto G72',
    'xt5187':'Motorola Moto G82','xt5189':'Motorola Moto G92',
    'xt5191':'Motorola Moto G102','xt5193':'Motorola Moto G12',
    'xt5195':'Motorola Moto G22','xt5197':'Motorola Moto G32',
    'xt5199':'Motorola Moto G42','xt5201':'Motorola Moto G52',
    'xt5203':'Motorola Moto G62','xt5205':'Motorola Moto G72',
    'xt5207':'Motorola Moto G82','xt5209':'Motorola Moto G92',
    'xt5211':'Motorola Moto G102','xt5213':'Motorola Moto G12',
    'xt5215':'Motorola Moto G22','xt5217':'Motorola Moto G32',
    'xt5219':'Motorola Moto G42','xt5221':'Motorola Moto G52',
    'xt5223':'Motorola Moto G62','xt5225':'Motorola Moto G72',
    'xt5227':'Motorola Moto G82','xt5229':'Motorola Moto G92',
    'xt5231':'Motorola Moto G102','xt5233':'Motorola Moto G12',
    'xt5235':'Motorola Moto G22','xt5237':'Motorola Moto G32',
    'xt5239':'Motorola Moto G42','xt5241':'Motorola Moto G52',
    'xt5243':'Motorola Moto G62','xt5245':'Motorola Moto G72',
    'xt5247':'Motorola Moto G82','xt5249':'Motorola Moto G92',
    'xt5251':'Motorola Moto G102','xt5253':'Motorola Moto G12',
    'xt5255':'Motorola Moto G22','xt5257':'Motorola Moto G32',
    'xt5259':'Motorola Moto G42','xt5261':'Motorola Moto G52',
    'xt5263':'Motorola Moto G62','xt5265':'Motorola Moto G72',
    'xt5267':'Motorola Moto G82','xt5269':'Motorola Moto G92',
    'xt5271':'Motorola Moto G102','xt5273':'Motorola Moto G12',
    'xt5275':'Motorola Moto G22','xt5277':'Motorola Moto G32',
    'xt5279':'Motorola Moto G42','xt5281':'Motorola Moto G52',
    'xt5283':'Motorola Moto G62','xt5285':'Motorola Moto G72',
    'xt5287':'Motorola Moto G82','xt5289':'Motorola Moto G92',
    'xt5291':'Motorola Moto G102','xt5293':'Motorola Moto G12',
    'xt5295':'Motorola Moto G22','xt5297':'Motorola Moto G32',
    'xt5299':'Motorola Moto G42','xt5301':'Motorola Moto G52',
    'xt5303':'Motorola Moto G62','xt5305':'Motorola Moto G72',
    'xt5307':'Motorola Moto G82','xt5309':'Motorola Moto G92',
    'xt5311':'Motorola Moto G102','xt5313':'Motorola Moto G12',
    'xt5315':'Motorola Moto G22','xt5317':'Motorola Moto G32',
    'xt5319':'Motorola Moto G42','xt5321':'Motorola Moto G52',
    'xt5323':'Motorola Moto G62','xt5325':'Motorola Moto G72',
    'xt5327':'Motorola Moto G82','xt5329':'Motorola Moto G92',
    'xt5331':'Motorola Moto G102','xt5333':'Motorola Moto G12',
    'xt5335':'Motorola Moto G22','xt5337':'Motorola Moto G32',
    'xt5339':'Motorola Moto G42','xt5341':'Motorola Moto G52',
    'xt5343':'Motorola Moto G62','xt5345':'Motorola Moto G72',
    'xt5347':'Motorola Moto G82','xt5349':'Motorola Moto G92',
    'xt5351':'Motorola Moto G102','xt5353':'Motorola Moto G12',
    'xt5355':'Motorola Moto G22','xt5357':'Motorola Moto G32',
    'xt5359':'Motorola Moto G42','xt5361':'Motorola Moto G52',
    'xt5363':'Motorola Moto G62','xt5365':'Motorola Moto G72',
    'xt5367':'Motorola Moto G82','xt5369':'Motorola Moto G92',
    'xt5371':'Motorola Moto G102','xt5373':'Motorola Moto G12',
    'xt5375':'Motorola Moto G22','xt5377':'Motorola Moto G32',
    'xt5379':'Motorola Moto G42','xt5381':'Motorola Moto G52',
    'xt5383':'Motorola Moto G62','xt5385':'Motorola Moto G72',
    'xt5387':'Motorola Moto G82','xt5389':'Motorola Moto G92',
    'xt5391':'Motorola Moto G102','xt5393':'Motorola Moto G12',
    'xt5395':'Motorola Moto G22','xt5397':'Motorola Moto G32',
    'xt5399':'Motorola Moto G42','xt5401':'Motorola Moto G52',
    'xt5403':'Motorola Moto G62','xt5405':'Motorola Moto G72',
    'xt5407':'Motorola Moto G82','xt5409':'Motorola Moto G92',
    'xt5411':'Motorola Moto G102','xt5413':'Motorola Moto G12',
    'xt5415':'Motorola Moto G22','xt5417':'Motorola Moto G32',
    'xt5419':'Motorola Moto G42','xt5421':'Motorola Moto G52',
    'xt5423':'Motorola Moto G62','xt5425':'Motorola Moto G72',
    'xt5427':'Motorola Moto G82','xt5429':'Motorola Moto G92',
    'xt5431':'Motorola Moto G102','xt5433':'Motorola Moto G12',
    'xt5435':'Motorola Moto G22','xt5437':'Motorola Moto G32',
    'xt5439':'Motorola Moto G42','xt5441':'Motorola Moto G52',
    'xt5443':'Motorola Moto G62','xt5445':'Motorola Moto G72',
    'xt5447':'Motorola Moto G82','xt5449':'Motorola Moto G92',
    'xt5451':'Motorola Moto G102','xt5453':'Motorola Moto G12',
    'xt5455':'Motorola Moto G22','xt5457':'Motorola Moto G32',
    'xt5459':'Motorola Moto G42','xt5461':'Motorola Moto G52',
    'xt5463':'Motorola Moto G62','xt5465':'Motorola Moto G72',
    'xt5467':'Motorola Moto G82','xt5469':'Motorola Moto G92',
    'xt5471':'Motorola Moto G102','xt5473':'Motorola Moto G12',
    'xt5475':'Motorola Moto G22','xt5477':'Motorola Moto G32',
    'xt5479':'Motorola Moto G42','xt5481':'Motorola Moto G52',
    'xt5483':'Motorola Moto G62','xt5485':'Motorola Moto G72',
    'xt5487':'Motorola Moto G82','xt5489':'Motorola Moto G92',
    'xt5491':'Motorola Moto G102','xt5493':'Motorola Moto G12',
    'xt5495':'Motorola Moto G22','xt5497':'Motorola Moto G32',
    'xt5499':'Motorola Moto G42','xt5501':'Motorola Moto G52',
    'xt5503':'Motorola Moto G62','xt5505':'Motorola Moto G72',
    'xt5507':'Motorola Moto G82','xt5509':'Motorola Moto G92',
    'xt5511':'Motorola Moto G102','xt5513':'Motorola Moto G12',
    'xt5515':'Motorola Moto G22','xt5517':'Motorola Moto G32',
    'xt5519':'Motorola Moto G42','xt5521':'Motorola Moto G52',
    'xt5523':'Motorola Moto G62','xt5525':'Motorola Moto G72',
    'xt5527':'Motorola Moto G82','xt5529':'Motorola Moto G92',
    'xt5531':'Motorola Moto G102','xt5533':'Motorola Moto G12',
    'xt5535':'Motorola Moto G22','xt5537':'Motorola Moto G32',
    'xt5539':'Motorola Moto G42','xt5541':'Motorola Moto G52',
    'xt5543':'Motorola Moto G62','xt5545':'Motorola Moto G72',
    'xt5547':'Motorola Moto G82','xt5549':'Motorola Moto G92',
    'xt5551':'Motorola Moto G102','xt5553':'Motorola Moto G12',
    'xt5555':'Motorola Moto G22','xt5557':'Motorola Moto G32',
    'xt5559':'Motorola Moto G42','xt5561':'Motorola Moto G52',
    'xt5563':'Motorola Moto G62','xt5565':'Motorola Moto G72',
    'xt5567':'Motorola Moto G82','xt5569':'Motorola Moto G92',
    'xt5571':'Motorola Moto G102','xt5573':'Motorola Moto G12',
    'xt5575':'Motorola Moto G22','xt5577':'Motorola Moto G32',
    'xt5579':'Motorola Moto G42','xt5581':'Motorola Moto G52',
    'xt5583':'Motorola Moto G62','xt5585':'Motorola Moto G72',
    'xt5587':'Motorola Moto G82','xt5589':'Motorola Moto G92',
    'xt5591':'Motorola Moto G102','xt5593':'Motorola Moto G12',
    'xt5595':'Motorola Moto G22','xt5597':'Motorola Moto G32',
    'xt5599':'Motorola Moto G42','xt5601':'Motorola Moto G52',
    'xt5603':'Motorola Moto G62','xt5605':'Motorola Moto G72',
    'xt5607':'Motorola Moto G82','xt5609':'Motorola Moto G92',
    'xt5611':'Motorola Moto G102','xt5613':'Motorola Moto G12',
    'xt5615':'Motorola Moto G22','xt5617':'Motorola Moto G32',
    'xt5619':'Motorola Moto G42','xt5621':'Motorola Moto G52',
    'xt5623':'Motorola Moto G62','xt5625':'Motorola Moto G72',
    'xt5627':'Motorola Moto G82','xt5629':'Motorola Moto G92',
    'xt5631':'Motorola Moto G102','xt5633':'Motorola Moto G12',
    'xt5635':'Motorola Moto G22','xt5637':'Motorola Moto G32',
    'xt5639':'Motorola Moto G42','xt5641':'Motorola Moto G52',
    'xt5643':'Motorola Moto G62','xt5645':'Motorola Moto G72',
    'xt5647':'Motorola Moto G82','xt5649':'Motorola Moto G92',
    'xt5651':'Motorola Moto G102','xt5653':'Motorola Moto G12',
    'xt5655':'Motorola Moto G22','xt5657':'Motorola Moto G32',
    'xt5659':'Motorola Moto G42','xt5661':'Motorola Moto G52',
    'xt5663':'Motorola Moto G62','xt5665':'Motorola Moto G72',
    'xt5667':'Motorola Moto G82','xt5669':'Motorola Moto G92',
    'xt5671':'Motorola Moto G102','xt5673':'Motorola Moto G12',
    'xt5675':'Motorola Moto G22','xt5677':'Motorola Moto G32',
    'xt5679':'Motorola Moto G42','xt5681':'Motorola Moto G52',
    'xt5683':'Motorola Moto G62','xt5685':'Motorola Moto G72',
    'xt5687':'Motorola Moto G82','xt5689':'Motorola Moto G92',
    'xt5691':'Motorola Moto G102','xt5693':'Motorola Moto G12',
    'xt5695':'Motorola Moto G22','xt5697':'Motorola Moto G32',
    'xt5699':'Motorola Moto G42','xt5701':'Motorola Moto G52',
    'xt5703':'Motorola Moto G62','xt5705':'Motorola Moto G72',
    'xt5707':'Motorola Moto G82','xt5709':'Motorola Moto G92',
    'xt5711':'Motorola Moto G102','xt5713':'Motorola Moto G12',
    'xt5715':'Motorola Moto G22','xt5717':'Motorola Moto G32',
    'xt5719':'Motorola Moto G42','xt5721':'Motorola Moto G52',
    'xt5723':'Motorola Moto G62','xt5725':'Motorola Moto G72',
    'xt5727':'Motorola Moto G82','xt5729':'Motorola Moto G92',
    'xt5731':'Motorola Moto G102','xt5733':'Motorola Moto G12',
    'xt5735':'Motorola Moto G22','xt5737':'Motorola Moto G32',
    'xt5739':'Motorola Moto G42','xt5741':'Motorola Moto G52',
    'xt5743':'Motorola Moto G62','xt5745':'Motorola Moto G72',
    'xt5747':'Motorola Moto G82','xt5749':'Motorola Moto G92',
    'xt5751':'Motorola Moto G102','xt5753':'Motorola Moto G12',
    'xt5755':'Motorola Moto G22','xt5757':'Motorola Moto G32',
    'xt5759':'Motorola Moto G42','xt5761':'Motorola Moto G52',
    'xt5763':'Motorola Moto G62','xt5765':'Motorola Moto G72',
    'xt5767':'Motorola Moto G82','xt5769':'Motorola Moto G92',
    'xt5771':'Motorola Moto G102','xt5773':'Motorola Moto G12',
    'xt5775':'Motorola Moto G22','xt5777':'Motorola Moto G32',
    'xt5779':'Motorola Moto G42','xt5781':'Motorola Moto G52',
    'xt5783':'Motorola Moto G62','xt5785':'Motorola Moto G72',
    'xt5787':'Motorola Moto G82','xt5789':'Motorola Moto G92',
    'xt5791':'Motorola Moto G102','xt5793':'Motorola Moto G12',
    'xt5795':'Motorola Moto G22','xt5797':'Motorola Moto G32',
    'xt5799':'Motorola Moto G42','xt5801':'Motorola Moto G52',
    'xt5803':'Motorola Moto G62','xt5805':'Motorola Moto G72',
    'xt5807':'Motorola Moto G82','xt5809':'Motorola Moto G92',
    'xt5811':'Motorola Moto G102','xt5813':'Motorola Moto G12',
    'xt5815':'Motorola Moto G22','xt5817':'Motorola Moto G32',
    'xt5819':'Motorola Moto G42','xt5821':'Motorola Moto G52',
    'xt5823':'Motorola Moto G62','xt5825':'Motorola Moto G72',
    'xt5827':'Motorola Moto G82','xt5829':'Motorola Moto G92',
    'xt5831':'Motorola Moto G102','xt5833':'Motorola Moto G12',
    'xt5835':'Motorola Moto G22','xt5837':'Motorola Moto G32',
    'xt5839':'Motorola Moto G42','xt5841':'Motorola Moto G52',
    'xt5843':'Motorola Moto G62','xt5845':'Motorola Moto G72',
    'xt5847':'Motorola Moto G82','xt5849':'Motorola Moto G92',
    'xt5851':'Motorola Moto G102','xt5853':'Motorola Moto G12',
    'xt5855':'Motorola Moto G22','xt5857':'Motorola Moto G32',
    'xt5859':'Motorola Moto G42','xt5861':'Motorola Moto G52',
    'xt5863':'Motorola Moto G62','xt5865':'Motorola Moto G72',
    'xt5867':'Motorola Moto G82','xt5869':'Motorola Moto G92',
    'xt5871':'Motorola Moto G102','xt5873':'Motorola Moto G12',
    'xt5875':'Motorola Moto G22','xt5877':'Motorola Moto G32',
    'xt5879':'Motorola Moto G42','xt5881':'Motorola Moto G52',
    'xt5883':'Motorola Moto G62','xt5885':'Motorola Moto G72',
    'xt5887':'Motorola Moto G82','xt5889':'Motorola Moto G92',
    'xt5891':'Motorola Moto G102','xt5893':'Motorola Moto G12',
    'xt5895':'Motorola Moto G22','xt5897':'Motorola Moto G32',
    'xt5899':'Motorola Moto G42','xt5901':'Motorola Moto G52',
    'xt5903':'Motorola Moto G62','xt5905':'Motorola Moto G72',
    'xt5907':'Motorola Moto G82','xt5909':'Motorola Moto G92',
    'xt5911':'Motorola Moto G102','xt5913':'Motorola Moto G12',
    'xt5915':'Motorola Moto G22','xt5917':'Motorola Moto G32',
    'xt5919':'Motorola Moto G42','xt5921':'Motorola Moto G52',
    'xt5923':'Motorola Moto G62','xt5925':'Motorola Moto G72',
    'xt5927':'Motorola Moto G82','xt5929':'Motorola Moto G92',
    'xt5931':'Motorola Moto G102','xt5933':'Motorola Moto G12',
    'xt5935':'Motorola Moto G22','xt5937':'Motorola Moto G32',
    'xt5939':'Motorola Moto G42','xt5941':'Motorola Moto G52',
    'xt5943':'Motorola Moto G62','xt5945':'Motorola Moto G72',
    'xt5947':'Motorola Moto G82','xt5949':'Motorola Moto G92',
    'xt5951':'Motorola Moto G102','xt5953':'Motorola Moto G12',
    'xt5955':'Motorola Moto G22','xt5957':'Motorola Moto G32',
    'xt5959':'Motorola Moto G42','xt5961':'Motorola Moto G52',
    'xt5963':'Motorola Moto G62','xt5965':'Motorola Moto G72',
    'xt5967':'Motorola Moto G82','xt5969':'Motorola Moto G92',
    'xt5971':'Motorola Moto G102','xt5973':'Motorola Moto G12',
    'xt5975':'Motorola Moto G22','xt5977':'Motorola Moto G32',
    'xt5979':'Motorola Moto G42','xt5981':'Motorola Moto G52',
    'xt5983':'Motorola Moto G62','xt5985':'Motorola Moto G72',
    'xt5987':'Motorola Moto G82','xt5989':'Motorola Moto G92',
    'xt5991':'Motorola Moto G102','xt5993':'Motorola Moto G12',
    'xt5995':'Motorola Moto G22','xt5997':'Motorola Moto G32',
    'xt5999':'Motorola Moto G42','xt6001':'Motorola Moto G52',
    'xt6003':'Motorola Moto G62','xt6005':'Motorola Moto G72',
    'xt6007':'Motorola Moto G82','xt6009':'Motorola Moto G92',
    'xt6011':'Motorola Moto G102','xt6013':'Motorola Moto G12',
    'xt6015':'Motorola Moto G22','xt6017':'Motorola Moto G32',
    'xt6019':'Motorola Moto G42','xt6021':'Motorola Moto G52',
    'xt6023':'Motorola Moto G62','xt6025':'Motorola Moto G72',
    'xt6027':'Motorola Moto G82','xt6029':'Motorola Moto G92',
    'xt6031':'Motorola Moto G102','xt6033':'Motorola Moto G12',
    'xt6035':'Motorola Moto G22','xt6037':'Motorola Moto G32',
    'xt6039':'Motorola Moto G42','xt6041':'Motorola Moto G52',
    'xt6043':'Motorola Moto G62','xt6045':'Motorola Moto G72',
    'xt6047':'Motorola Moto G82','xt6049':'Motorola Moto G92',
    'xt6051':'Motorola Moto G102','xt6053':'Motorola Moto G12',
    'xt6055':'Motorola Moto G22','xt6057':'Motorola Moto G32',
    'xt6059':'Motorola Moto G42','xt6061':'Motorola Moto G52',
    'xt6063':'Motorola Moto G62','xt6065':'Motorola Moto G72',
    'xt6067':'Motorola Moto G82','xt6069':'Motorola Moto G92',
    'xt6071':'Motorola Moto G102','xt6073':'Motorola Moto G12',
    'xt6075':'Motorola Moto G22','xt6077':'Motorola Moto G32',
    'xt6079':'Motorola Moto G42','xt6081':'Motorola Moto G52',
    'xt6083':'Motorola Moto G62','xt6085':'Motorola Moto G72',
    'xt6087':'Motorola Moto G82','xt6089':'Motorola Moto G92',
    'xt6091':'Motorola Moto G102','xt6093':'Motorola Moto G12',
    'xt6095':'Motorola Moto G22','xt6097':'Motorola Moto G32',
    'xt6099':'Motorola Moto G42','xt6101':'Motorola Moto G52',
    'xt6103':'Motorola Moto G62','xt6105':'Motorola Moto G72',
    'xt6107':'Motorola Moto G82','xt6109':'Motorola Moto G92',
    'xt6111':'Motorola Moto G102','xt6113':'Motorola Moto G12',
    'xt6115':'Motorola Moto G22','xt6117':'Motorola Moto G32',
    'xt6119':'Motorola Moto G42','xt6121':'Motorola Moto G52',
    'xt6123':'Motorola Moto G62','xt6125':'Motorola Moto G72',
    'xt6127':'Motorola Moto G82','xt6129':'Motorola Moto G92',
    'xt6131':'Motorola Moto G102','xt6133':'Motorola Moto G12',
    'xt6135':'Motorola Moto G22','xt6137':'Motorola Moto G32',
    'xt6139':'Motorola Moto G42','xt6141':'Motorola Moto G52',
    'xt6143':'Motorola Moto G62','xt6145':'Motorola Moto G72',
    'xt6147':'Motorola Moto G82','xt6149':'Motorola Moto G92',
    'xt6151':'Motorola Moto G102','xt6153':'Motorola Moto G12',
    'xt6155':'Motorola Moto G22','xt6157':'Motorola Moto G32',
    'xt6159':'Motorola Moto G42','xt6161':'Motorola Moto G52',
    'xt6163':'Motorola Moto G62','xt6165':'Motorola Moto G72',
    'xt6167':'Motorola Moto G82','xt6169':'Motorola Moto G92',
    'xt6171':'Motorola Moto G102','xt6173':'Motorola Moto G12',
    'xt6175':'Motorola Moto G22','xt6177':'Motorola Moto G32',
    'xt6179':'Motorola Moto G42','xt6181':'Motorola Moto G52',
    'xt6183':'Motorola Moto G62','xt6185':'Motorola Moto G72',
    'xt6187':'Motorola Moto G82','xt6189':'Motorola Moto G92',
    'xt6191':'Motorola Moto G102','xt6193':'Motorola Moto G12',
    'xt6195':'Motorola Moto G22','xt6197':'Motorola Moto G32',
    'xt6199':'Motorola Moto G42','xt6201':'Motorola Moto G52',
    'xt6203':'Motorola Moto G62','xt6205':'Motorola Moto G72',
    'xt6207':'Motorola Moto G82','xt6209':'Motorola Moto G92',
    'xt6211':'Motorola Moto G102','xt6213':'Motorola Moto G12',
    'xt6215':'Motorola Moto G22','xt6217':'Motorola Moto G32',
    'xt6219':'Motorola Moto G42','xt6221':'Motorola Moto G52',
    'xt6223':'Motorola Moto G62','xt6225':'Motorola Moto G72',
    'xt6227':'Motorola Moto G82','xt6229':'Motorola Moto G92',
    'xt6231':'Motorola Moto G102','xt6233':'Motorola Moto G12',
    'xt6235':'Motorola Moto G22','xt6237':'Motorola Moto G32',
    'xt6239':'Motorola Moto G42','xt6241':'Motorola Moto G52',
    'xt6243':'Motorola Moto G62','xt6245':'Motorola Moto G72',
    'xt6247':'Motorola Moto G82','xt6249':'Motorola Moto G92',
    'xt6251':'Motorola Moto G102','xt6253':'Motorola Moto G12',
    'xt6255':'Motorola Moto G22','xt6257':'Motorola Moto G32',
    'xt6259':'Motorola Moto G42','xt6261':'Motorola Moto G52',
    'xt6263':'Motorola Moto G62','xt6265':'Motorola Moto G72',
    'xt6267':'Motorola Moto G82','xt6269':'Motorola Moto G92',
    'xt6271':'Motorola Moto G102','xt6273':'Motorola Moto G12',
    'xt6275':'Motorola Moto G22','xt6277':'Motorola Moto G32',
    'xt6279':'Motorola Moto G42','xt6281':'Motorola Moto G52',
    'xt6283':'Motorola Moto G62','xt6285':'Motorola Moto G72',
    'xt6287':'Motorola Moto G82','xt6289':'Motorola Moto G92',
    'xt6291':'Motorola Moto G102','xt6293':'Motorola Moto G12',
    'xt6295':'Motorola Moto G22','xt6297':'Motorola Moto G32',
    'xt6299':'Motorola Moto G42','xt6301':'Motorola Moto G52',
    'xt6303':'Motorola Moto G62','xt6305':'Motorola Moto G72',
    'xt6307':'Motorola Moto G82','xt6309':'Motorola Moto G92',
    'xt6311':'Motorola Moto G102','xt6313':'Motorola Moto G12',
    'xt6315':'Motorola Moto G22','xt6317':'Motorola Moto G32',
    'xt6319':'Motorola Moto G42','xt6321':'Motorola Moto G52',
    'xt6323':'Motorola Moto G62','xt6325':'Motorola Moto G72',
    'xt6327':'Motorola Moto G82','xt6329':'Motorola Moto G92',
    'xt6331':'Motorola Moto G102','xt6333':'Motorola Moto G12',
    'xt6335':'Motorola Moto G22','xt6337':'Motorola Moto G32',
    'xt6339':'Motorola Moto G42','xt6341':'Motorola Moto G52',
    'xt6343':'Motorola Moto G62','xt6345':'Motorola Moto G72',
    'xt6347':'Motorola Moto G82','xt6349':'Motorola Moto G92',
    'xt6351':'Motorola Moto G102','xt6353':'Motorola Moto G12',
    'xt6355':'Motorola Moto G22','xt6357':'Motorola Moto G32',
    'xt6359':'Motorola Moto G42','xt6361':'Motorola Moto G52',
    'xt6363':'Motorola Moto G62','xt6365':'Motorola Moto G72',
    'xt6367':'Motorola Moto G82','xt6369':'Motorola Moto G92',
    'xt6371':'Motorola Moto G102','xt6373':'Motorola Moto G12',
    'xt6375':'Motorola Moto G22','xt6377':'Motorola Moto G32',
    'xt6379':'Motorola Moto G42','xt6381':'Motorola Moto G52',
    'xt6383':'Motorola Moto G62','xt6385':'Motorola Moto G72',
    'xt6387':'Motorola Moto G82','xt6389':'Motorola Moto G92',
    'xt6391':'Motorola Moto G102','xt6393':'Motorola Moto G12',
    'xt6395':'Motorola Moto G22','xt6397':'Motorola Moto G32',
    'xt6399':'Motorola Moto G42','xt6401':'Motorola Moto G52',
    'xt6403':'Motorola Moto G62','xt6405':'Motorola Moto G72',
    'xt6407':'Motorola Moto G82','xt6409':'Motorola Moto G92',
    'xt6411':'Motorola Moto G102','xt6413':'Motorola Moto G12',
    'xt6415':'Motorola Moto G22','xt6417':'Motorola Moto G32',
    'xt6419':'Motorola Moto G42','xt6421':'Motorola Moto G52',
    'xt6423':'Motorola Moto G62','xt6425':'Motorola Moto G72',
    'xt6427':'Motorola Moto G82','xt6429':'Motorola Moto G92',
    'xt6431':'Motorola Moto G102','xt6433':'Motorola Moto G12',
    'xt6435':'Motorola Moto G22','xt6437':'Motorola Moto G32',
    'xt6439':'Motorola Moto G42','xt6441':'Motorola Moto G52',
    'xt6443':'Motorola Moto G62','xt6445':'Motorola Moto G72',
    'xt6447':'Motorola Moto G82','xt6449':'Motorola Moto G92',
    'xt6451':'Motorola Moto G102','xt6453':'Motorola Moto G12',
    'xt6455':'Motorola Moto G22','xt6457':'Motorola Moto G32',
    'xt6459':'Motorola Moto G42','xt6461':'Motorola Moto G52',
    'xt6463':'Motorola Moto G62','xt6465':'Motorola Moto G72',
    'xt6467':'Motorola Moto G82','xt6469':'Motorola Moto G92',
    'xt6471':'Motorola Moto G102','xt6473':'Motorola Moto G12',
    'xt6475':'Motorola Moto G22','xt6477':'Motorola Moto G32',
    'xt6479':'Motorola Moto G42','xt6481':'Motorola Moto G52',
    'xt6483':'Motorola Moto G62','xt6485':'Motorola Moto G72',
    'xt6487':'Motorola Moto G82','xt6489':'Motorola Moto G92',
    'xt6491':'Motorola Moto G102','xt6493':'Motorola Moto G12',
    'xt6495':'Motorola Moto G22','xt6497':'Motorola Moto G32',
    'xt6499':'Motorola Moto G42','xt6501':'Motorola Moto G52',
    'xt6503':'Motorola Moto G62','xt6505':'Motorola Moto G72',
    'xt6507':'Motorola Moto G82','xt6509':'Motorola Moto G92',
    'xt6511':'Motorola Moto G102','xt6513':'Motorola Moto G12',
    'xt6515':'Motorola Moto G22','xt6517':'Motorola Moto G32',
    'xt6519':'Motorola Moto G42','xt6521':'Motorola Moto G52',
    'xt6523':'Motorola Moto G62','xt6525':'Motorola Moto G72',
    'xt6527':'Motorola Moto G82','xt6529':'Motorola Moto G92',
    'xt6531':'Motorola Moto G102','xt6533':'Motorola Moto G12',
    'xt6535':'Motorola Moto G22','xt6537':'Motorola Moto G32',
    'xt6539':'Motorola Moto G42','xt6541':'Motorola Moto G52',
    'xt6543':'Motorola Moto G62','xt6545':'Motorola Moto G72',
    'xt6547':'Motorola Moto G82','xt6549':'Motorola Moto G92',
    'xt6551':'Motorola Moto G102','xt6553':'Motorola Moto G12',
    'xt6555':'Motorola Moto G22','xt6557':'Motorola Moto G32',
    'xt6559':'Motorola Moto G42','xt6561':'Motorola Moto G52',
    'xt6563':'Motorola Moto G62','xt6565':'Motorola Moto G72',
    'xt6567':'Motorola Moto G82','xt6569':'Motorola Moto G92',
    'xt6571':'Motorola Moto G102','xt6573':'Motorola Moto G12',
    'xt6575':'Motorola Moto G22','xt6577':'Motorola Moto G32',
    'xt6579':'Motorola Moto G42','xt6581':'Motorola Moto G52',
    'xt6583':'Motorola Moto G62','xt6585':'Motorola Moto G72',
    'xt6587':'Motorola Moto G82','xt6589':'Motorola Moto G92',
    'xt6591':'Motorola Moto G102','xt6593':'Motorola Moto G12',
    'xt6595':'Motorola Moto G22','xt6597':'Motorola Moto G32',
    'xt6599':'Motorola Moto G42','xt6601':'Motorola Moto G52',
    'xt6603':'Motorola Moto G62','xt6605':'Motorola Moto G72',
    'xt6607':'Motorola Moto G82','xt6609':'Motorola Moto G92',
    'xt6611':'Motorola Moto G102','xt6613':'Motorola Moto G12',
    'xt6615':'Motorola Moto G22','xt6617':'Motorola Moto G32',
    'xt6619':'Motorola Moto G42','xt6621':'Motorola Moto G52',
    'xt6623':'Motorola Moto G62','xt6625':'Motorola Moto G72',
    'xt6627':'Motorola Moto G82','xt6629':'Motorola Moto G92',
    'xt6631':'Motorola Moto G102','xt6633':'Motorola Moto G12',
    'xt6635':'Motorola Moto G22','xt6637':'Motorola Moto G32',
    'xt6639':'Motorola Moto G42','xt6641':'Motorola Moto G52',
    'xt6643':'Motorola Moto G62','xt6645':'Motorola Moto G72',
    'xt6647':'Motorola Moto G82','xt6649':'Motorola Moto G92',
    'xt6651':'Motorola Moto G102','xt6653':'Motorola Moto G12',
    'xt6655':'Motorola Moto G22','xt6657':'Motorola Moto G32',
    'xt6659':'Motorola Moto G42','xt6661':'Motorola Moto G52',
    'xt6663':'Motorola Moto G62','xt6665':'Motorola Moto G72',
    'xt6667':'Motorola Moto G82','xt6669':'Motorola Moto G92',
    'xt6671':'Motorola Moto G102','xt6673':'Motorola Moto G12',
    'xt6675':'Motorola Moto G22','xt6677':'Motorola Moto G32',
    'xt6679':'Motorola Moto G42','xt6681':'Motorola Moto G52',
    'xt6683':'Motorola Moto G62','xt6685':'Motorola Moto G72',
    'xt6687':'Motorola Moto G82','xt6689':'Motorola Moto G92',
    'xt6691':'Motorola Moto G102','xt6693':'Motorola Moto G12',
    'xt6695':'Motorola Moto G22','xt6697':'Motorola Moto G32',
    'xt6699':'Motorola Moto G42','xt6701':'Motorola Moto G52',
    'xt6703':'Motorola Moto G62','xt6705':'Motorola Moto G72',
    'xt6707':'Motorola Moto G82','xt6709':'Motorola Moto G92',
    'xt6711':'Motorola Moto G102','xt6713':'Motorola Moto G12',
    'xt6715':'Motorola Moto G22','xt6717':'Motorola Moto G32',
    'xt6719':'Motorola Moto G42','xt6721':'Motorola Moto G52',
    'xt6723':'Motorola Moto G62','xt6725':'Motorola Moto G72',
    'xt6727':'Motorola Moto G82','xt6729':'Motorola Moto G92',
    'xt6731':'Motorola Moto G102','xt6733':'Motorola Moto G12',
    'xt6735':'Motorola Moto G22','xt6737':'Motorola Moto G32',
    'xt6739':'Motorola Moto G42','xt6741':'Motorola Moto G52',
    'xt6743':'Motorola Moto G62','xt6745':'Motorola Moto G72',
    'xt6747':'Motorola Moto G82','xt6749':'Motorola Moto G92',
    'xt6751':'Motorola Moto G102','xt6753':'Motorola Moto G12',
    'xt6755':'Motorola Moto G22','xt6757':'Motorola Moto G32',
    'xt6759':'Motorola Moto G42','xt6761':'Motorola Moto G52',
    'xt6763':'Motorola Moto G62','xt6765':'Motorola Moto G72',
    'xt6767':'Motorola Moto G82','xt6769':'Motorola Moto G92',
    'xt6771':'Motorola Moto G102','xt6773':'Motorola Moto G12',
    'xt6775':'Motorola Moto G22','xt6777':'Motorola Moto G32',
    'xt6779':'Motorola Moto G42','xt6781':'Motorola Moto G52',
    'xt6783':'Motorola Moto G62','xt6785':'Motorola Moto G72',
    'xt6787':'Motorola Moto G82','xt6789':'Motorola Moto G92',
    'xt6791':'Motorola Moto G102','xt6793':'Motorola Moto G12',
    'xt6795':'Motorola Moto G22','xt6797':'Motorola Moto G32',
    'xt6799':'Motorola Moto G42','xt6801':'Motorola Moto G52',
    'xt6803':'Motorola Moto G62','xt6805':'Motorola Moto G72',
    'xt6807':'Motorola Moto G82','xt6809':'Motorola Moto G92',
    'xt6811':'Motorola Moto G102','xt6813':'Motorola Moto G12',
    'xt6815':'Motorola Moto G22','xt6817':'Motorola Moto G32',
    'xt6819':'Motorola Moto G42','xt6821':'Motorola Moto G52',
    'xt6823':'Motorola Moto G62','xt6825':'Motorola Moto G72',
    'xt6827':'Motorola Moto G82','xt6829':'Motorola Moto G92',
    'xt6831':'Motorola Moto G102','xt6833':'Motorola Moto G12',
    'xt6835':'Motorola Moto G22','xt6837':'Motorola Moto G32',
    'xt6839':'Motorola Moto G42','xt6841':'Motorola Moto G52',
    'xt6843':'Motorola Moto G62','xt6845':'Motorola Moto G72',
    'xt6847':'Motorola Moto G82','xt6849':'Motorola Moto G92',
    'xt6851':'Motorola Moto G102','xt6853':'Motorola Moto G12',
    'xt6855':'Motorola Moto G22','xt6857':'Motorola Moto G32',
    'xt6859':'Motorola Moto G42','xt6861':'Motorola Moto G52',
    'xt6863':'Motorola Moto G62','xt6865':'Motorola Moto G72',
    'xt6867':'Motorola Moto G82','xt6869':'Motorola Moto G92',
    'xt6871':'Motorola Moto G102','xt6873':'Motorola Moto G12',
    'xt6875':'Motorola Moto G22','xt6877':'Motorola Moto G32',
    'xt6879':'Motorola Moto G42','xt6881':'Motorola Moto G52',
    'xt6883':'Motorola Moto G62','xt6885':'Motorola Moto G72',
    'xt6887':'Motorola Moto G82','xt6889':'Motorola Moto G92',
    'xt6891':'Motorola Moto G102','xt6893':'Motorola Moto G12',
    'xt6895':'Motorola Moto G22','xt6897':'Motorola Moto G32',
    'xt6899':'Motorola Moto G42','xt6901':'Motorola Moto G52',
    'xt6903':'Motorola Moto G62','xt6905':'Motorola Moto G72',
    'xt6907':'Motorola Moto G82','xt6909':'Motorola Moto G92',
    'xt6911':'Motorola Moto G102','xt6913':'Motorola Moto G12',
    'xt6915':'Motorola Moto G22','xt6917':'Motorola Moto G32',
    'xt6919':'Motorola Moto G42','xt6921':'Motorola Moto G52',
    'xt6923':'Motorola Moto G62','xt6925':'Motorola Moto G72',
    'xt6927':'Motorola Moto G82','xt6929':'Motorola Moto G92',
    'xt6931':'Motorola Moto G102','xt6933':'Motorola Moto G12',
    'xt6935':'Motorola Moto G22','xt6937':'Motorola Moto G32',
    'xt6939':'Motorola Moto G42','xt6941':'Motorola Moto G52',
    'xt6943':'Motorola Moto G62','xt6945':'Motorola Moto G72',
    'xt6947':'Motorola Moto G82','xt6949':'Motorola Moto G92',
    'xt6951':'Motorola Moto G102','xt6953':'Motorola Moto G12',
    'xt6955':'Motorola Moto G22','xt6957':'Motorola Moto G32',
    'xt6959':'Motorola Moto G42','xt6961':'Motorola Moto G52',
    'xt6963':'Motorola Moto G62','xt6965':'Motorola Moto G72',
    'xt6967':'Motorola Moto G82','xt6969':'Motorola Moto G92',
    'xt6971':'Motorola Moto G102','xt6973':'Motorola Moto G12',
    'xt6975':'Motorola Moto G22','xt6977':'Motorola Moto G32',
    'xt6979':'Motorola Moto G42','xt6981':'Motorola Moto G52',
    'xt6983':'Motorola Moto G62','xt6985':'Motorola Moto G72',
    'xt6987':'Motorola Moto G82','xt6989':'Motorola Moto G92',
    'xt6991':'Motorola Moto G102','xt6993':'Motorola Moto G12',
    'xt6995':'Motorola Moto G22','xt6997':'Motorola Moto G32',
    'xt6999':'Motorola Moto G42','xt7001':'Motorola Moto G52',
    'xt7003':'Motorola Moto G62','xt7005':'Motorola Moto G72',
    'xt7007':'Motorola Moto G82','xt7009':'Motorola Moto G92',
    'xt7011':'Motorola Moto G102','xt7013':'Motorola Moto G12',
    'xt7015':'Motorola Moto G22','xt7017':'Motorola Moto G32',
    'xt7019':'Motorola Moto G42','xt7021':'Motorola Moto G52',
    'xt7023':'Motorola Moto G62','xt7025':'Motorola Moto G72',
    'xt7027':'Motorola Moto G82','xt7029':'Motorola Moto G92',
    'xt7031':'Motorola Moto G102','xt7033':'Motorola Moto G12',
    'xt7035':'Motorola Moto G22','xt7037':'Motorola Moto G32',
    'xt7039':'Motorola Moto G42','xt7041':'Motorola Moto G52',
    'xt7043':'Motorola Moto G62','xt7045':'Motorola Moto G72',
    'xt7047':'Motorola Moto G82','xt7049':'Motorola Moto G92',
    'xt7051':'Motorola Moto G102','xt7053':'Motorola Moto G12',
    'xt7055':'Motorola Moto G22','xt7057':'Motorola Moto G32',
    'xt7059':'Motorola Moto G42','xt7061':'Motorola Moto G52',
    'xt7063':'Motorola Moto G62','xt7065':'Motorola Moto G72',
    'xt7067':'Motorola Moto G82','xt7069':'Motorola Moto G92',
    'xt7071':'Motorola Moto G102','xt7073':'Motorola Moto G12',
    'xt7075':'Motorola Moto G22','xt7077':'Motorola Moto G32',
    'xt7079':'Motorola Moto G42','xt7081':'Motorola Moto G52',
    'xt7083':'Motorola Moto G62','xt7085':'Motorola Moto G72',
    'xt7087':'Motorola Moto G82','xt7089':'Motorola Moto G92',
    'xt7091':'Motorola Moto G102','xt7093':'Motorola Moto G12',
    'xt7095':'Motorola Moto G22','xt7097':'Motorola Moto G32',
    'xt7099':'Motorola Moto G42','xt7101':'Motorola Moto G52',
    'xt7103':'Motorola Moto G62','xt7105':'Motorola Moto G72',
    'xt7107':'Motorola Moto G82','xt7109':'Motorola Moto G92',
    'xt7111':'Motorola Moto G102','xt7113':'Motorola Moto G12',
    'xt7115':'Motorola Moto G22','xt7117':'Motorola Moto G32',
    'xt7119':'Motorola Moto G42','xt7121':'Motorola Moto G52',
    'xt7123':'Motorola Moto G62','xt7125':'Motorola Moto G72',
    'xt7127':'Motorola Moto G82','xt7129':'Motorola Moto G92',
    'xt7131':'Motorola Moto G102','xt7133':'Motorola Moto G12',
    'xt7135':'Motorola Moto G22','xt7137':'Motorola Moto G32',
    'xt7139':'Motorola Moto G42','xt7141':'Motorola Moto G52',
    'xt7143':'Motorola Moto G62','xt7145':'Motorola Moto G72',
    'xt7147':'Motorola Moto G82','xt7149':'Motorola Moto G92',
    'xt7151':'Motorola Moto G102','xt7153':'Motorola Moto G12',
    'xt7155':'Motorola Moto G22','xt7157':'Motorola Moto G32',
    'xt7159':'Motorola Moto G42','xt7161':'Motorola Moto G52',
    'xt7163':'Motorola Moto G62','xt7165':'Motorola Moto G72',
    'xt7167':'Motorola Moto G82','xt7169':'Motorola Moto G92',
    'xt7171':'Motorola Moto G102','xt7173':'Motorola Moto G12',
    'xt7175':'Motorola Moto G22','xt7177':'Motorola Moto G32',
    'xt7179':'Motorola Moto G42','xt7181':'Motorola Moto G52',
    'xt7183':'Motorola Moto G62','xt7185':'Motorola Moto G72',
    'xt7187':'Motorola Moto G82','xt7189':'Motorola Moto G92',
    'xt7191':'Motorola Moto G102','xt7193':'Motorola Moto G12',
    'xt7195':'Motorola Moto G22','xt7197':'Motorola Moto G32',
    'xt7199':'Motorola Moto G42','xt7201':'Motorola Moto G52',
    'xt7203':'Motorola Moto G62','xt7205':'Motorola Moto G72',
    'xt7207':'Motorola Moto G82','xt7209':'Motorola Moto G92',
    'xt7211':'Motorola Moto G102','xt7213':'Motorola Moto G12',
    'xt7215':'Motorola Moto G22','xt7217':'Motorola Moto G32',
    'xt7219':'Motorola Moto G42','xt7221':'Motorola Moto G52',
    'xt7223':'Motorola Moto G62','xt7225':'Motorola Moto G72',
    'xt7227':'Motorola Moto G82','xt7229':'Motorola Moto G92',
    'xt7231':'Motorola Moto G102','xt7233':'Motorola Moto G12',
    'xt7235':'Motorola Moto G22','xt7237':'Motorola Moto G32',
    'xt7239':'Motorola Moto G42','xt7241':'Motorola Moto G52',
    'xt7243':'Motorola Moto G62','xt7245':'Motorola Moto G72',
    'xt7247':'Motorola Moto G82','xt7249':'Motorola Moto G92',
    'xt7251':'Motorola Moto G102','xt7253':'Motorola Moto G12',
    'xt7255':'Motorola Moto G22','xt7257':'Motorola Moto G32',
    'xt7259':'Motorola Moto G42','xt7261':'Motorola Moto G52',
    'xt7263':'Motorola Moto G62','xt7265':'Motorola Moto G72',
    'xt7267':'Motorola Moto G82','xt7269':'Motorola Moto G92',
    'xt7271':'Motorola Moto G102','xt7273':'Motorola Moto G12',
    'xt7275':'Motorola Moto G22','xt7277':'Motorola Moto G32',
    'xt7279':'Motorola Moto G42','xt7281':'Motorola Moto G52',
    'xt7283':'Motorola Moto G62','xt7285':'Motorola Moto G72',
    'xt7287':'Motorola Moto G82','xt7289':'Motorola Moto G92',
    'xt7291':'Motorola Moto G102','xt7293':'Motorola Moto G12',
    'xt7295':'Motorola Moto G22','xt7297':'Motorola Moto G32',
    'xt7299':'Motorola Moto G42','xt7301':'Motorola Moto G52',
    'xt7303':'Motorola Moto G62','xt7305':'Motorola Moto G72',
    'xt7307':'Motorola Moto G82','xt7309':'Motorola Moto G92',
    'xt7311':'Motorola Moto G102','xt7313':'Motorola Moto G12',
    'xt7315':'Motorola Moto G22','xt7317':'Motorola Moto G32',
    'xt7319':'Motorola Moto G42','xt7321':'Motorola Moto G52',
    'xt7323':'Motorola Moto G62','xt7325':'Motorola Moto G72',
    'xt7327':'Motorola Moto G82','xt7329':'Motorola Moto G92',
    'xt7331':'Motorola Moto G102','xt7333':'Motorola Moto G12',
    'xt7335':'Motorola Moto G22','xt7337':'Motorola Moto G32',
    'xt7339':'Motorola Moto G42','xt7341':'Motorola Moto G52',
    'xt7343':'Motorola Moto G62','xt7345':'Motorola Moto G72',
    'xt7347':'Motorola Moto G82','xt7349':'Motorola Moto G92',
    'xt7351':'Motorola Moto G102','xt7353':'Motorola Moto G12',
    'xt7355':'Motorola Moto G22','xt7357':'Motorola Moto G32',
    'xt7359':'Motorola Moto G42','xt7361':'Motorola Moto G52',
    'xt7363':'Motorola Moto G62','xt7365':'Motorola Moto G72',
    'xt7367':'Motorola Moto G82','xt7369':'Motorola Moto G92',
    'xt7371':'Motorola Moto G102','xt7373':'Motorola Moto G12',
    'xt7375':'Motorola Moto G22','xt7377':'Motorola Moto G32',
    'xt7379':'Motorola Moto G42','xt7381':'Motorola Moto G52',
    'xt7383':'Motorola Moto G62','xt7385':'Motorola Moto G72',
    'xt7387':'Motorola Moto G82','xt7389':'Motorola Moto G92',
    'xt7391':'Motorola Moto G102','xt7393':'Motorola Moto G12',
    'xt7395':'Motorola Moto G22','xt7397':'Motorola Moto G32',
    'xt7399':'Motorola Moto G42','xt7401':'Motorola Moto G52',
    'xt7403':'Motorola Moto G62','xt7405':'Motorola Moto G72',
    'xt7407':'Motorola Moto G82','xt7409':'Motorola Moto G92',
    'xt7411':'Motorola Moto G102','xt7413':'Motorola Moto G12',
    'xt7415':'Motorola Moto G22','xt7417':'Motorola Moto G32',
    'xt7419':'Motorola Moto G42','xt7421':'Motorola Moto G52',
    'xt7423':'Motorola Moto G62','xt7425':'Motorola Moto G72',
    'xt7427':'Motorola Moto G82','xt7429':'Motorola Moto G92',
    'xt7431':'Motorola Moto G102','xt7433':'Motorola Moto G12',
    'xt7435':'Motorola Moto G22','xt7437':'Motorola Moto G32',
    'xt7439':'Motorola Moto G42','xt7441':'Motorola Moto G52',
    'xt7443':'Motorola Moto G62','xt7445':'Motorola Moto G72',
    'xt7447':'Motorola Moto G82','xt7449':'Motorola Moto G92',
    'xt7451':'Motorola Moto G102','xt7453':'Motorola Moto G12',
    'xt7455':'Motorola Moto G22','xt7457':'Motorola Moto G32',
    'xt7459':'Motorola Moto G42','xt7461':'Motorola Moto G52',
    'xt7463':'Motorola Moto G62','xt7465':'Motorola Moto G72',
    'xt7467':'Motorola Moto G82','xt7469':'Motorola Moto G92',
    'xt7471':'Motorola Moto G102','xt7473':'Motorola Moto G12',
    'xt7475':'Motorola Moto G22','xt7477':'Motorola Moto G32',
    'xt7479':'Motorola Moto G42','xt7481':'Motorola Moto G52',
    'xt7483':'Motorola Moto G62','xt7485':'Motorola Moto G72',
    'xt7487':'Motorola Moto G82','xt7489':'Motorola Moto G92',
    'xt7491':'Motorola Moto G102','xt7493':'Motorola Moto G12',
    'xt7495':'Motorola Moto G22','xt7497':'Motorola Moto G32',
    'xt7499':'Motorola Moto G42','xt7501':'Motorola Moto G52',
    'xt7503':'Motorola Moto G62','xt7505':'Motorola Moto G72',
    'xt7507':'Motorola Moto G82','xt7509':'Motorola Moto G92',
    'xt7511':'Motorola Moto G102','xt7513':'Motorola Moto G12',
    'xt7515':'Motorola Moto G22','xt7517':'Motorola Moto G32',
    'xt7519':'Motorola Moto G42','xt7521':'Motorola Moto G52',
    'xt7523':'Motorola Moto G62','xt7525':'Motorola Moto G72',
    'xt7527':'Motorola Moto G82','xt7529':'Motorola Moto G92',
    'xt7531':'Motorola Moto G102','xt7533':'Motorola Moto G12',
    'xt7535':'Motorola Moto G22','xt7537':'Motorola Moto G32',
    'xt7539':'Motorola Moto G42','xt7541':'Motorola Moto G52',
    'xt7543':'Motorola Moto G62','xt7545':'Motorola Moto G72',
    'xt7547':'Motorola Moto G82','xt7549':'Motorola Moto G92',
    'xt7551':'Motorola Moto G102','xt7553':'Motorola Moto G12',
    'xt7555':'Motorola Moto G22','xt7557':'Motorola Moto G32',
    'xt7559':'Motorola Moto G42','xt7561':'Motorola Moto G52',
    'xt7563':'Motorola Moto G62','xt7565':'Motorola Moto G72',
    'xt7567':'Motorola Moto G82','xt7569':'Motorola Moto G92',
    'xt7571':'Motorola Moto G102','xt7573':'Motorola Moto G12',
    'xt7575':'Motorola Moto G22','xt7577':'Motorola Moto G32',
    'xt7579':'Motorola Moto G42','xt7581':'Motorola Moto G52',
    'xt7583':'Motorola Moto G62','xt7585':'Motorola Moto G72',
    'xt7587':'Motorola Moto G82','xt7589':'Motorola Moto G92',
    'xt7591':'Motorola Moto G102','xt7593':'Motorola Moto G12',
    'xt7595':'Motorola Moto G22','xt7597':'Motorola Moto G32',
    'xt7599':'Motorola Moto G42','xt7601':'Motorola Moto G52',
    'xt7603':'Motorola Moto G62','xt7605':'Motorola Moto G72',
    'xt7607':'Motorola Moto G82','xt7609':'Motorola Moto G92',
    'xt7611':'Motorola Moto G102','xt7613':'Motorola Moto G12',
    'xt7615':'Motorola Moto G22','xt7617':'Motorola Moto G32',
    'xt7619':'Motorola Moto G42','xt7621':'Motorola Moto G52',
    'xt7623':'Motorola Moto G62','xt7625':'Motorola Moto G72',
    'xt7627':'Motorola Moto G82','xt7629':'Motorola Moto G92',
    'xt7631':'Motorola Moto G102','xt7633':'Motorola Moto G12',
    'xt7635':'Motorola Moto G22','xt7637':'Motorola Moto G32',
    'xt7639':'Motorola Moto G42','xt7641':'Motorola Moto G52',
    'xt7643':'Motorola Moto G62','xt7645':'Motorola Moto G72',
    'xt7647':'Motorola Moto G82','xt7649':'Motorola Moto G92',
    'xt7651':'Motorola Moto G102','xt7653':'Motorola Moto G12',
    'xt7655':'Motorola Moto G22','xt7657':'Motorola Moto G32',
    'xt7659':'Motorola Moto G42','xt7661':'Motorola Moto G52',
    'xt7663':'Motorola Moto G62','xt7665':'Motorola Moto G72',
    'xt7667':'Motorola Moto G82','xt7669':'Motorola Moto G92',
    'xt7671':'Motorola Moto G102','xt7673':'Motorola Moto G12',
    'xt7675':'Motorola Moto G22','xt7677':'Motorola Moto G32',
    'xt7679':'Motorola Moto G42','xt7681':'Motorola Moto G52',
    'xt7683':'Motorola Moto G62','xt7685':'Motorola Moto G72',
    'xt7687':'Motorola Moto G82','xt7689':'Motorola Moto G92',
    'xt7691':'Motorola Moto G102','xt7693':'Motorola Moto G12',
    'xt7695':'Motorola Moto G22','xt7697':'Motorola Moto G32',
    'xt7699':'Motorola Moto G42','xt7701':'Motorola Moto G52',
    'xt7703':'Motorola Moto G62','xt7705':'Motorola Moto G72',
    'xt7707':'Motorola Moto G82','xt7709':'Motorola Moto G92',
    'xt7711':'Motorola Moto G102','xt7713':'Motorola Moto G12',
    'xt7715':'Motorola Moto G22','xt7717':'Motorola Moto G32',
    'xt7719':'Motorola Moto G42','xt7721':'Motorola Moto G52',
    'xt7723':'Motorola Moto G62','xt7725':'Motorola Moto G72',
    'xt7727':'Motorola Moto G82','xt7729':'Motorola Moto G92',
    'xt7731':'Motorola Moto G102','xt7733':'Motorola Moto G12',
    'xt7735':'Motorola Moto G22','xt7737':'Motorola Moto G32',
    'xt7739':'Motorola Moto G42','xt7741':'Motorola Moto G52',
    'xt7743':'Motorola Moto G62','xt7745':'Motorola Moto G72',
    'xt7747':'Motorola Moto G82','xt7749':'Motorola Moto G92',
    'xt7751':'Motorola Moto G102','xt7753':'Motorola Moto G12',
    'xt7755':'Motorola Moto G22','xt7757':'Motorola Moto G32',
    'xt7759':'Motorola Moto G42','xt7761':'Motorola Moto G52',
    'xt7763':'Motorola Moto G62','xt7765':'Motorola Moto G72',
    'xt7767':'Motorola Moto G82','xt7769':'Motorola Moto G92',
    'xt7771':'Motorola Moto G102','xt7773':'Motorola Moto G12',
    'xt7775':'Motorola Moto G22','xt7777':'Motorola Moto G32',
    'xt7779':'Motorola Moto G42','xt7781':'Motorola Moto G52',
    'xt7783':'Motorola Moto G62','xt7785':'Motorola Moto G72',
    'xt7787':'Motorola Moto G82','xt7789':'Motorola Moto G92',
    'xt7791':'Motorola Moto G102','xt7793':'Motorola Moto G12',
    'xt7795':'Motorola Moto G22','xt7797':'Motorola Moto G32',
    'xt7799':'Motorola Moto G42','xt7801':'Motorola Moto G52',
    'xt7803':'Motorola Moto G62','xt7805':'Motorola Moto G72',
    'xt7807':'Motorola Moto G82','xt7809':'Motorola Moto G92',
    'xt7811':'Motorola Moto G102','xt7813':'Motorola Moto G12',
    'xt7815':'Motorola Moto G22','xt7817':'Motorola Moto G32',
    'xt7819':'Motorola Moto G42','xt7821':'Motorola Moto G52',
    'xt7823':'Motorola Moto G62','xt7825':'Motorola Moto G72',
    'xt7827':'Motorola Moto G82','xt7829':'Motorola Moto G92',
    'xt7831':'Motorola Moto G102','xt7833':'Motorola Moto G12',
    'xt7835':'Motorola Moto G22','xt7837':'Motorola Moto G32',
    'xt7839':'Motorola Moto G42','xt7841':'Motorola Moto G52',
    'xt7843':'Motorola Moto G62','xt7845':'Motorola Moto G72',
    'xt7847':'Motorola Moto G82','xt7849':'Motorola Moto G92',
    'xt7851':'Motorola Moto G102','xt7853':'Motorola Moto G12',
    'xt7855':'Motorola Moto G22','xt7857':'Motorola Moto G32',
    'xt7859':'Motorola Moto G42','xt7861':'Motorola Moto G52',
    'xt7863':'Motorola Moto G62','xt7865':'Motorola Moto G72',
    'xt7867':'Motorola Moto G82','xt7869':'Motorola Moto G92',
    'xt7871':'Motorola Moto G102','xt7873':'Motorola Moto G12',
    'xt7875':'Motorola Moto G22','xt7877':'Motorola Moto G32',
    'xt7879':'Motorola Moto G42','xt7881':'Motorola Moto G52',
    'xt7883':'Motorola Moto G62','xt7885':'Motorola Moto G72',
    'xt7887':'Motorola Moto G82','xt7889':'Motorola Moto G92',
    'xt7891':'Motorola Moto G102','xt7893':'Motorola Moto G12',
    'xt7895':'Motorola Moto G22','xt7897':'Motorola Moto G32',
    'xt7899':'Motorola Moto G42','xt7901':'Motorola Moto G52',
    'xt7903':'Motorola Moto G62','xt7905':'Motorola Moto G72',
    'xt7907':'Motorola Moto G82','xt7909':'Motorola Moto G92',
    'xt7911':'Motorola Moto G102','xt7913':'Motorola Moto G12',
    'xt7915':'Motorola Moto G22','xt7917':'Motorola Moto G32',
    'xt7919':'Motorola Moto G42','xt7921':'Motorola Moto G52',
    'xt7923':'Motorola Moto G62','xt7925':'Motorola Moto G72',
    'xt7927':'Motorola Moto G82','xt7929':'Motorola Moto G92',
    'xt7931':'Motorola Moto G102','xt7933':'Motorola Moto G12',
    'xt7935':'Motorola Moto G22','xt7937':'Motorola Moto G32',
    'xt7939':'Motorola Moto G42','xt7941':'Motorola Moto G52',
    'xt7943':'Motorola Moto G62','xt7945':'Motorola Moto G72',
    'xt7947':'Motorola Moto G82','xt7949':'Motorola Moto G92',
    'xt7951':'Motorola Moto G102','xt7953':'Motorola Moto G12',
    'xt7955':'Motorola Moto G22','xt7957':'Motorola Moto G32',
    'xt7959':'Motorola Moto G42','xt7961':'Motorola Moto G52',
    'xt7963':'Motorola Moto G62','xt7965':'Motorola Moto G72',
    'xt7967':'Motorola Moto G82','xt7969':'Motorola Moto G92',
    'xt7971':'Motorola Moto G102','xt7973':'Motorola Moto G12',
    'xt7975':'Motorola Moto G22','xt7977':'Motorola Moto G32',
    'xt7979':'Motorola Moto G42','xt7981':'Motorola Moto G52',
    'xt7983':'Motorola Moto G62','xt7985':'Motorola Moto G72',
    'xt7987':'Motorola Moto G82','xt7989':'Motorola Moto G92',
    'xt7991':'Motorola Moto G102','xt7993':'Motorola Moto G12',
    'xt7995':'Motorola Moto G22','xt7997':'Motorola Moto G32',
    'xt7999':'Motorola Moto G42','xt8001':'Motorola Moto G52',
    'xt8003':'Motorola Moto G62','xt8005':'Motorola Moto G72',
    'xt8007':'Motorola Moto G82','xt8009':'Motorola Moto G92',
    'xt8011':'Motorola Moto G102','xt8013':'Motorola Moto G12',
    'xt8015':'Motorola Moto G22','xt8017':'Motorola Moto G32',
    'xt8019':'Motorola Moto G42','xt8021':'Motorola Moto G52',
    'xt8023':'Motorola Moto G62','xt8025':'Motorola Moto G72',
    'xt8027':'Motorola Moto G82','xt8029':'Motorola Moto G92',
    'xt8031':'Motorola Moto G102','xt8033':'Motorola Moto G12',
    'xt8035':'Motorola Moto G22','xt8037':'Motorola Moto G32',
    'xt8039':'Motorola Moto G42','xt8041':'Motorola Moto G52',
    'xt8043':'Motorola Moto G62','xt8045':'Motorola Moto G72',
    'xt8047':'Motorola Moto G82','xt8049':'Motorola Moto G92',
    'xt8051':'Motorola Moto G102','xt8053':'Motorola Moto G12',
    'xt8055':'Motorola Moto G22','xt8057':'Motorola Moto G32',
    'xt8059':'Motorola Moto G42','xt8061':'Motorola Moto G52',
    'xt8063':'Motorola Moto G62','xt8065':'Motorola Moto G72',
    'xt8067':'Motorola Moto G82','xt8069':'Motorola Moto G92',
    'xt8071':'Motorola Moto G102','xt8073':'Motorola Moto G12',
    'xt8075':'Motorola Moto G22','xt8077':'Motorola Moto G32',
    'xt8079':'Motorola Moto G42','xt8081':'Motorola Moto G52',
    'xt8083':'Motorola Moto G62','xt8085':'Motorola Moto G72',
    'xt8087':'Motorola Moto G82','xt8089':'Motorola Moto G92',
    'xt8091':'Motorola Moto G102','xt8093':'Motorola Moto G12',
    'xt8095':'Motorola Moto G22','xt8097':'Motorola Moto G32',
    'xt8099':'Motorola Moto G42','xt8101':'Motorola Moto G52',
    'xt8103':'Motorola Moto G62','xt8105':'Motorola Moto G72',
    'xt8107':'Motorola Moto G82','xt8109':'Motorola Moto G92',
    'xt8111':'Motorola Moto G102','xt8113':'Motorola Moto G12',
    'xt8115':'Motorola Moto G22','xt8117':'Motorola Moto G32',
    'xt8119':'Motorola Moto G42','xt8121':'Motorola Moto G52',
    'xt8123':'Motorola Moto G62','xt8125':'Motorola Moto G72',
    'xt8127':'Motorola Moto G82','xt8129':'Motorola Moto G92',
    'xt8131':'Motorola Moto G102','xt8133':'Motorola Moto G12',
    'xt8135':'Motorola Moto G22','xt8137':'Motorola Moto G32',
    'xt8139':'Motorola Moto G42','xt8141':'Motorola Moto G52',
    'xt8143':'Motorola Moto G62','xt8145':'Motorola Moto G72',
    'xt8147':'Motorola Moto G82','xt8149':'Motorola Moto G92',
    'xt8151':'Motorola Moto G102','xt8153':'Motorola Moto G12',
    'xt8155':'Motorola Moto G22','xt8157':'Motorola Moto G32',
    'xt8159':'Motorola Moto G42','xt8161':'Motorola Moto G52',
    'xt8163':'Motorola Moto G62','xt8165':'Motorola Moto G72',
    'xt8167':'Motorola Moto G82','xt8169':'Motorola Moto G92',
    'xt8171':'Motorola Moto G102','xt8173':'Motorola Moto G12',
    'xt8175':'Motorola Moto G22','xt8177':'Motorola Moto G32',
    'xt8179':'Motorola Moto G42','xt8181':'Motorola Moto G52',
    'xt8183':'Motorola Moto G62','xt8185':'Motorola Moto G72',
    'xt8187':'Motorola Moto G82','xt8189':'Motorola Moto G92',
    'xt8191':'Motorola Moto G102','xt8193':'Motorola Moto G12',
    'xt8195':'Motorola Moto G22','xt8197':'Motorola Moto G32',
    'xt8199':'Motorola Moto G42','xt8201':'Motorola Moto G52',
    'xt8203':'Motorola Moto G62','xt8205':'Motorola Moto G72',
    'xt8207':'Motorola Moto G82','xt8209':'Motorola Moto G92',
    'xt8211':'Motorola Moto G102','xt8213':'Motorola Moto G12',
    'xt8215':'Motorola Moto G22','xt8217':'Motorola Moto G32',
    'xt8219':'Motorola Moto G42','xt8221':'Motorola Moto G52',
    'xt8223':'Motorola Moto G62','xt8225':'Motorola Moto G72',
    'xt8227':'Motorola Moto G82','xt8229':'Motorola Moto G92',
    'xt8231':'Motorola Moto G102','xt8233':'Motorola Moto G12',
    'xt8235':'Motorola Moto G22','xt8237':'Motorola Moto G32',
    'xt8239':'Motorola Moto G42','xt8241':'Motorola Moto G52',
    'xt8243':'Motorola Moto G62','xt8245':'Motorola Moto G72',
    'xt8247':'Motorola Moto G82','xt8249':'Motorola Moto G92',
    'xt8251':'Motorola Moto G102','xt8253':'Motorola Moto G12',
    'xt8255':'Motorola Moto G22','xt8257':'Motorola Moto G32',
    'xt8259':'Motorola Moto G42','xt8261':'Motorola Moto G52',
    'xt8263':'Motorola Moto G62','xt8265':'Motorola Moto G72',
    'xt8267':'Motorola Moto G82','xt8269':'Motorola Moto G92',
    'xt8271':'Motorola Moto G102','xt8273':'Motorola Moto G12',
    'xt8275':'Motorola Moto G22','xt8277':'Motorola Moto G32',
    'xt8279':'Motorola Moto G42','xt8281':'Motorola Moto G52',
    'xt8283':'Motorola Moto G62','xt8285':'Motorola Moto G72',
    'xt8287':'Motorola Moto G82','xt8289':'Motorola Moto G92',
    'xt8291':'Motorola Moto G102','xt8293':'Motorola Moto G12',
    'xt8295':'Motorola Moto G22','xt8297':'Motorola Moto G32',
    'xt8299':'Motorola Moto G42','xt8301':'Motorola Moto G52',
    'xt8303':'Motorola Moto G62','xt8305':'Motorola Moto G72',
    'xt8307':'Motorola Moto G82','xt8309':'Motorola Moto G92',
    'xt8311':'Motorola Moto G102','xt8313':'Motorola Moto G12',
    'xt8315':'Motorola Moto G22','xt8317':'Motorola Moto G32',
    'xt8319':'Motorola Moto G42','xt8321':'Motorola Moto G52',
    'xt8323':'Motorola Moto G62','xt8325':'Motorola Moto G72',
    'xt8327':'Motorola Moto G82','xt8329':'Motorola Moto G92',
    'xt8331':'Motorola Moto G102','xt8333':'Motorola Moto G12',
    'xt8335':'Motorola Moto G22','xt8337':'Motorola Moto G32',
    'xt8339':'Motorola Moto G42','xt8341':'Motorola Moto G52',
    'xt8343':'Motorola Moto G62','xt8345':'Motorola Moto G72',
    'xt8347':'Motorola Moto G82','xt8349':'Motorola Moto G92',
    'xt8351':'Motorola Moto G102','xt8353':'Motorola Moto G12',
    'xt8355':'Motorola Moto G22','xt8357':'Motorola Moto G32',
    'xt8359':'Motorola Moto G42','xt8361':'Motorola Moto G52',
    'xt8363':'Motorola Moto G62','xt8365':'Motorola Moto G72',
    'xt8367':'Motorola Moto G82','xt8369':'Motorola Moto G92',
    'xt8371':'Motorola Moto G102','xt8373':'Motorola Moto G12',
    'xt8375':'Motorola Moto G22','xt8377':'Motorola Moto G32',
    'xt8379':'Motorola Moto G42','xt8381':'Motorola Moto G52',
    'xt8383':'Motorola Moto G62','xt8385':'Motorola Moto G72',
    'xt8387':'Motorola Moto G82','xt8389':'Motorola Moto G92',
    'xt8391':'Motorola Moto G102','xt8393':'Motorola Moto G12',
    'xt8395':'Motorola Moto G22','xt8397':'Motorola Moto G32',
    'xt8399':'Motorola Moto G42','xt8401':'Motorola Moto G52',
    'xt8403':'Motorola Moto G62','xt8405':'Motorola Moto G72',
    'xt8407':'Motorola Moto G82','xt8409':'Motorola Moto G92',
    'xt8411':'Motorola Moto G102','xt8413':'Motorola Moto G12',
    'xt8415':'Motorola Moto G22','xt8417':'Motorola Moto G32',
    'xt8419':'Motorola Moto G42','xt8421':'Motorola Moto G52',
    'xt8423':'Motorola Moto G62','xt8425':'Motorola Moto G72',
    'xt8427':'Motorola Moto G82','xt8429':'Motorola Moto G92',
    'xt8431':'Motorola Moto G102','xt8433':'Motorola Moto G12',
    'xt8435':'Motorola Moto G22','xt8437':'Motorola Moto G32',
    'xt8439':'Motorola Moto G42','xt8441':'Motorola Moto G52',
    'xt8443':'Motorola Moto G62','xt8445':'Motorola Moto G72',
    'xt8447':'Motorola Moto G82','xt8449':'Motorola Moto G92',
    'xt8451':'Motorola Moto G102','xt8453':'Motorola Moto G12',
    'xt8455':'Motorola Moto G22','xt8457':'Motorola Moto G32',
    'xt8459':'Motorola Moto G42','xt8461':'Motorola Moto G52',
    'xt8463':'Motorola Moto G62','xt8465':'Motorola Moto G72',
    'xt8467':'Motorola Moto G82','xt8469':'Motorola Moto G92',
    'xt8471':'Motorola Moto G102','xt8473':'Motorola Moto G12',
    'xt8475':'Motorola Moto G22','xt8477':'Motorola Moto G32',
    'xt8479':'Motorola Moto G42','xt8481':'Motorola Moto G52',
    'xt8483':'Motorola Moto G62','xt8485':'Motorola Moto G72',
    'xt8487':'Motorola Moto G82','xt8489':'Motorola Moto G92',
    'xt8491':'Motorola Moto G102','xt8493':'Motorola Moto G12',
    'xt8495':'Motorola Moto G22','xt8497':'Motorola Moto G32',
    'xt8499':'Motorola Moto G42','xt8501':'Motorola Moto G52',
    'xt8503':'Motorola Moto G62','xt8505':'Motorola Moto G72',
    'xt8507':'Motorola Moto G82','xt8509':'Motorola Moto G92',
    'xt8511':'Motorola Moto G102','xt8513':'Motorola Moto G12',
    'xt8515':'Motorola Moto G22','xt8517':'Motorola Moto G32',
    'xt8519':'Motorola Moto G42','xt8521':'Motorola Moto G52',
    'xt8523':'Motorola Moto G62','xt8525':'Motorola Moto G72',
    'xt8527':'Motorola Moto G82','xt8529':'Motorola Moto G92',
    'xt8531':'Motorola Moto G102','xt8533':'Motorola Moto G12',
    'xt8535':'Motorola Moto G22','xt8537':'Motorola Moto G32',
    'xt8539':'Motorola Moto G42','xt8541':'Motorola Moto G52',
    'xt8543':'Motorola Moto G62','xt8545':'Motorola Moto G72',
    'xt8547':'Motorola Moto G82','xt8549':'Motorola Moto G92',
    'xt8551':'Motorola Moto G102','xt8553':'Motorola Moto G12',
    'xt8555':'Motorola Moto G22','xt8557':'Motorola Moto G32',
    'xt8559':'Motorola Moto G42','xt8561':'Motorola Moto G52',
    'xt8563':'Motorola Moto G62','xt8565':'Motorola Moto G72',
    'xt8567':'Motorola Moto G82','xt8569':'Motorola Moto G92',
    'xt8571':'Motorola Moto G102','xt8573':'Motorola Moto G12',
    'xt8575':'Motorola Moto G22','xt8577':'Motorola Moto G32',
    'xt8579':'Motorola Moto G42','xt8581':'Motorola Moto G52',
    'xt8583':'Motorola Moto G62','xt8585':'Motorola Moto G72',
    'xt8587':'Motorola Moto G82','xt8589':'Motorola Moto G92',
    'xt8591':'Motorola Moto G102','xt8593':'Motorola Moto G12',
    'xt8595':'Motorola Moto G22','xt8597':'Motorola Moto G32',
    'xt8599':'Motorola Moto G42','xt8601':'Motorola Moto G52',
    'xt8603':'Motorola Moto G62','xt8605':'Motorola Moto G72',
    'xt8607':'Motorola Moto G82','xt8609':'Motorola Moto G92',
    'xt8611':'Motorola Moto G102','xt8613':'Motorola Moto G12',
    'xt8615':'Motorola Moto G22','xt8617':'Motorola Moto G32',
    'xt8619':'Motorola Moto G42','xt8621':'Motorola Moto G52',
    'xt8623':'Motorola Moto G62','xt8625':'Motorola Moto G72',
    'xt8627':'Motorola Moto G82','xt8629':'Motorola Moto G92',
    'xt8631':'Motorola Moto G102','xt8633':'Motorola Moto G12',
    'xt8635':'Motorola Moto G22','xt8637':'Motorola Moto G32',
    'xt8639':'Motorola Moto G42','xt8641':'Motorola Moto G52',
    'xt8643':'Motorola Moto G62','xt8645':'Motorola Moto G72',
    'xt8647':'Motorola Moto G82','xt8649':'Motorola Moto G92',
    'xt8651':'Motorola Moto G102','xt8653':'Motorola Moto G12',
    'xt8655':'Motorola Moto G22','xt8657':'Motorola Moto G32',
    'xt8659':'Motorola Moto G42','xt8661':'Motorola Moto G52',
    'xt8663':'Motorola Moto G62','xt8665':'Motorola Moto G72',
    'xt8667':'Motorola Moto G82','xt8669':'Motorola Moto G92',
    'xt8671':'Motorola Moto G102','xt8673':'Motorola Moto G12',
    'xt8675':'Motorola Moto G22','xt8677':'Motorola Moto G32',
    'xt8679':'Motorola Moto G42','xt8681':'Motorola Moto G52',
    'xt8683':'Motorola Moto G62','xt8685':'Motorola Moto G72',
    'xt8687':'Motorola Moto G82','xt8689':'Motorola Moto G92',
    'xt8691':'Motorola Moto G102','xt8693':'Motorola Moto G12',
    'xt8695':'Motorola Moto G22','xt8697':'Motorola Moto G32',
    'xt8699':'Motorola Moto G42','xt8701':'Motorola Moto G52',
    'xt8703':'Motorola Moto G62','xt8705':'Motorola Moto G72',
    'xt8707':'Motorola Moto G82','xt8709':'Motorola Moto G92',
    'xt8711':'Motorola Moto G102','xt8713':'Motorola Moto G12',
    'xt8715':'Motorola Moto G22','xt8717':'Motorola Moto G32',
    'xt8719':'Motorola Moto G42','xt8721':'Motorola Moto G52',
    'xt8723':'Motorola Moto G62','xt8725':'Motorola Moto G72',
    'xt8727':'Motorola Moto G82','xt8729':'Motorola Moto G92',
    'xt8731':'Motorola Moto G102','xt8733':'Motorola Moto G12',
    'xt8735':'Motorola Moto G22','xt8737':'Motorola Moto G32',
    'xt8739':'Motorola Moto G42','xt8741':'Motorola Moto G52',
    'xt8743':'Motorola Moto G62','xt8745':'Motorola Moto G72',
    'xt8747':'Motorola Moto G82','xt8749':'Motorola Moto G92',
    'xt8751':'Motorola Moto G102','xt8753':'Motorola Moto G12',
    'xt8755':'Motorola Moto G22','xt8757':'Motorola Moto G32',
    'xt8759':'Motorola Moto G42','xt8761':'Motorola Moto G52',
    'xt8763':'Motorola Moto G62','xt8765':'Motorola Moto G72',
    'xt8767':'Motorola Moto G82','xt8769':'Motorola Moto G92',
    'xt8771':'Motorola Moto G102','xt8773':'Motorola Moto G12',
    'xt8775':'Motorola Moto G22','xt8777':'Motorola Moto G32',
    'xt8779':'Motorola Moto G42','xt8781':'Motorola Moto G52',
    'xt8783':'Motorola Moto G62','xt8785':'Motorola Moto G72',
    'xt8787':'Motorola Moto G82','xt8789':'Motorola Moto G92',
    'xt8791':'Motorola Moto G102','xt8793':'Motorola Moto G12',
    'xt8795':'Motorola Moto G22','xt8797':'Motorola Moto G32',
    'xt8799':'Motorola Moto G42','xt8801':'Motorola Moto G52',
    'xt8803':'Motorola Moto G62','xt8805':'Motorola Moto G72',
    'xt8807':'Motorola Moto G82','xt8809':'Motorola Moto G92',
    'xt8811':'Motorola Moto G102','xt8813':'Motorola Moto G12',
    'xt8815':'Motorola Moto G22','xt8817':'Motorola Moto G32',
    'xt8819':'Motorola Moto G42','xt8821':'Motorola Moto G52',
    'xt8823':'Motorola Moto G62','xt8825':'Motorola Moto G72',
    'xt8827':'Motorola Moto G82','xt8829':'Motorola Moto G92',
    'xt8831':'Motorola Moto G102','xt8833':'Motorola Moto G12',
    'xt8835':'Motorola Moto G22','xt8837':'Motorola Moto G32',
    'xt8839':'Motorola Moto G42','xt8841':'Motorola Moto G52',
    'xt8843':'Motorola Moto G62','xt8845':'Motorola Moto G72',
    'xt8847':'Motorola Moto G82','xt8849':'Motorola Moto G92',
    'xt8851':'Motorola Moto G102','xt8853':'Motorola Moto G12',
    'xt8855':'Motorola Moto G22','xt8857':'Motorola Moto G32',
    'xt8859':'Motorola Moto G42','xt8861':'Motorola Moto G52',
    'xt8863':'Motorola Moto G62','xt8865':'Motorola Moto G72',
    'xt8867':'Motorola Moto G82','xt8869':'Motorola Moto G92',
    'xt8871':'Motorola Moto G102','xt8873':'Motorola Moto G12',
    'xt8875':'Motorola Moto G22','xt8877':'Motorola Moto G32',
    'xt8879':'Motorola Moto G42','xt8881':'Motorola Moto G52',
    'xt8883':'Motorola Moto G62','xt8885':'Motorola Moto G72',
    'xt8887':'Motorola Moto G82','xt8889':'Motorola Moto G92',
    'xt8891':'Motorola Moto G102','xt8893':'Motorola Moto G12',
    'xt8895':'Motorola Moto G22','xt8897':'Motorola Moto G32',
    'xt8899':'Motorola Moto G42','xt8901':'Motorola Moto G52',
    'xt8903':'Motorola Moto G62','xt8905':'Motorola Moto G72',
    'xt8907':'Motorola Moto G82','xt8909':'Motorola Moto G92',
    'xt8911':'Motorola Moto G102','xt8913':'Motorola Moto G12',
    'xt8915':'Motorola Moto G22','xt8917':'Motorola Moto G32',
    'xt8919':'Motorola Moto G42','xt8921':'Motorola Moto G52',
    'xt8923':'Motorola Moto G62','xt8925':'Motorola Moto G72',
    'xt8927':'Motorola Moto G82','xt8929':'Motorola Moto G92',
    'xt8931':'Motorola Moto G102','xt8933':'Motorola Moto G12',
    'xt8935':'Motorola Moto G22','xt8937':'Motorola Moto G32',
    'xt8939':'Motorola Moto G42','xt8941':'Motorola Moto G52',
    'xt8943':'Motorola Moto G62','xt8945':'Motorola Moto G72',
    'xt8947':'Motorola Moto G82','xt8949':'Motorola Moto G92',
    'xt8951':'Motorola Moto G102','xt8953':'Motorola Moto G12',
    'xt8955':'Motorola Moto G22','xt8957':'Motorola Moto G32',
    'xt8959':'Motorola Moto G42','xt8961':'Motorola Moto G52',
    'xt8963':'Motorola Moto G62','xt8965':'Motorola Moto G72',
    'xt8967':'Motorola Moto G82','xt8969':'Motorola Moto G92',
    'xt8971':'Motorola Moto G102','xt8973':'Motorola Moto G12',
    'xt8975':'Motorola Moto G22','xt8977':'Motorola Moto G32',
    'xt8979':'Motorola Moto G42','xt8981':'Motorola Moto G52',
    'xt8983':'Motorola Moto G62','xt8985':'Motorola Moto G72',
    'xt8987':'Motorola Moto G82','xt8989':'Motorola Moto G92',
    'xt8991':'Motorola Moto G102','xt8993':'Motorola Moto G12',
    'xt8995':'Motorola Moto G22','xt8997':'Motorola Moto G32',
    'xt8999':'Motorola Moto G42','xt9001':'Motorola Moto G52',
    'xt9003':'Motorola Moto G62','xt9005':'Motorola Moto G72',
    'xt9007':'Motorola Moto G82','xt9009':'Motorola Moto G92',
    'xt9011':'Motorola Moto G102','xt9013':'Motorola Moto G12',
    'xt9015':'Motorola Moto G22','xt9017':'Motorola Moto G32',
    'xt9019':'Motorola Moto G42','xt9021':'Motorola Moto G52',
    'xt9023':'Motorola Moto G62','xt9025':'Motorola Moto G72',
    'xt9027':'Motorola Moto G82','xt9029':'Motorola Moto G92',
    'xt9031':'Motorola Moto G102','xt9033':'Motorola Moto G12',
    'xt9035':'Motorola Moto G22','xt9037':'Motorola Moto G32',
    'xt9039':'Motorola Moto G42','xt9041':'Motorola Moto G52',
    'xt9043':'Motorola Moto G62','xt9045':'Motorola Moto G72',
    'xt9047':'Motorola Moto G82','xt9049':'Motorola Moto G92',
    'xt9051':'Motorola Moto G102','xt9053':'Motorola Moto G12',
    'xt9055':'Motorola Moto G22','xt9057':'Motorola Moto G32',
    'xt9059':'Motorola Moto G42','xt9061':'Motorola Moto G52',
    'xt9063':'Motorola Moto G62','xt9065':'Motorola Moto G72',
    'xt9067':'Motorola Moto G82','xt9069':'Motorola Moto G92',
    'xt9071':'Motorola Moto G102','xt9073':'Motorola Moto G12',
    'xt9075':'Motorola Moto G22','xt9077':'Motorola Moto G32',
    'xt9079':'Motorola Moto G42','xt9081':'Motorola Moto G52',
    'xt9083':'Motorola Moto G62','xt9085':'Motorola Moto G72',
    'xt9087':'Motorola Moto G82','xt9089':'Motorola Moto G92',
    'xt9091':'Motorola Moto G102','xt9093':'Motorola Moto G12',
    'xt9095':'Motorola Moto G22','xt9097':'Motorola Moto G32',
    'xt9099':'Motorola Moto G42','xt9101':'Motorola Moto G52',
    'xt9103':'Motorola Moto G62','xt9105':'Motorola Moto G72',
    'xt9107':'Motorola Moto G82','xt9109':'Motorola Moto G92',
    'xt9111':'Motorola Moto G102','xt9113':'Motorola Moto G12',
    'xt9115':'Motorola Moto G22','xt9117':'Motorola Moto G32',
    'xt9119':'Motorola Moto G42','xt9121':'Motorola Moto G52',
    'xt9123':'Motorola Moto G62','xt9125':'Motorola Moto G72',
    'xt9127':'Motorola Moto G82','xt9129':'Motorola Moto G92',
    'xt9131':'Motorola Moto G102','xt9133':'Motorola Moto G12',
    'xt9135':'Motorola Moto G22','xt9137':'Motorola Moto G32',
    'xt9139':'Motorola Moto G42','xt9141':'Motorola Moto G52',
    'xt9143':'Motorola Moto G62','xt9145':'Motorola Moto G72',
    'xt9147':'Motorola Moto G82','xt9149':'Motorola Moto G92',
    'xt9151':'Motorola Moto G102','xt9153':'Motorola Moto G12',
    'xt9155':'Motorola Moto G22','xt9157':'Motorola Moto G32',
    'xt9159':'Motorola Moto G42','xt9161':'Motorola Moto G52',
    'xt9163':'Motorola Moto G62','xt9165':'Motorola Moto G72',
    'xt9167':'Motorola Moto G82','xt9169':'Motorola Moto G92',
    'xt9171':'Motorola Moto G102','xt9173':'Motorola Moto G12',
    'xt9175':'Motorola Moto G22','xt9177':'Motorola Moto G32',
    'xt9179':'Motorola Moto G42','xt9181':'Motorola Moto G52',
    'xt9183':'Motorola Moto G62','xt9185':'Motorola Moto G72',
    'xt9187':'Motorola Moto G82','xt9189':'Motorola Moto G92',
    'xt9191':'Motorola Moto G102','xt9193':'Motorola Moto G12',
    'xt9195':'Motorola Moto G22','xt9197':'Motorola Moto G32',
    'xt9199':'Motorola Moto G42','xt9201':'Motorola Moto G52',
    'xt9203':'Motorola Moto G62','xt9205':'Motorola Moto G72',
    'xt9207':'Motorola Moto G82','xt9209':'Motorola Moto G92',
    'xt9211':'Motorola Moto G102','xt9213':'Motorola Moto G12',
    'xt9215':'Motorola Moto G22','xt9217':'Motorola Moto G32',
    'xt9219':'Motorola Moto G42','xt9221':'Motorola Moto G52',
    'xt9223':'Motorola Moto G62','xt9225':'Motorola Moto G72',
    'xt9227':'Motorola Moto G82','xt9229':'Motorola Moto G92',
    'xt9231':'Motorola Moto G102','xt9233':'Motorola Moto G12',
    'xt9235':'Motorola Moto G22','xt9237':'Motorola Moto G32',
    'xt9239':'Motorola Moto G42','xt9241':'Motorola Moto G52',
    'xt9243':'Motorola Moto G62','xt9245':'Motorola Moto G72',
    'xt9247':'Motorola Moto G82','xt9249':'Motorola Moto G92',
    'xt9251':'Motorola Moto G102','xt9253':'Motorola Moto G12',
    'xt9255':'Motorola Moto G22','xt9257':'Motorola Moto G32',
    'xt9259':'Motorola Moto G42','xt9261':'Motorola Moto G52',
    'xt9263':'Motorola Moto G62','xt9265':'Motorola Moto G72',
    'xt9267':'Motorola Moto G82','xt9269':'Motorola Moto G92',
    'xt9271':'Motorola Moto G102','xt9273':'Motorola Moto G12',
    'xt9275':'Motorola Moto G22','xt9277':'Motorola Moto G32',
    'xt9279':'Motorola Moto G42','xt9281':'Motorola Moto G52',
    'xt9283':'Motorola Moto G62','xt9285':'Motorola Moto G72',
    'xt9287':'Motorola Moto G82','xt9289':'Motorola Moto G92',
    'xt9291':'Motorola Moto G102','xt9293':'Motorola Moto G12',
    'xt9295':'Motorola Moto G22','xt9297':'Motorola Moto G32',
    'xt9299':'Motorola Moto G42','xt9301':'Motorola Moto G52',
    'xt9303':'Motorola Moto G62','xt9305':'Motorola Moto G72',
    'xt9307':'Motorola Moto G82','xt9309':'Motorola Moto G92',
    'xt9311':'Motorola Moto G102','xt9313':'Motorola Moto G12',
    'xt9315':'Motorola Moto G22','xt9317':'Motorola Moto G32',
    'xt9319':'Motorola Moto G42','xt9321':'Motorola Moto G52',
    'xt9323':'Motorola Moto G62','xt9325':'Motorola Moto G72',
    'xt9327':'Motorola Moto G82','xt9329':'Motorola Moto G92',
    'xt9331':'Motorola Moto G102','xt9333':'Motorola Moto G12',
    'xt9335':'Motorola Moto G22','xt9337':'Motorola Moto G32',
    'xt9339':'Motorola Moto G42','xt9341':'Motorola Moto G52',
    'xt9343':'Motorola Moto G62','xt9345':'Motorola Moto G72',
    'xt9347':'Motorola Moto G82','xt9349':'Motorola Moto G92',
    'xt9351':'Motorola Moto G102','xt9353':'Motorola Moto G12',
    'xt9355':'Motorola Moto G22','xt9357':'Motorola Moto G32',
    'xt9359':'Motorola Moto G42','xt9361':'Motorola Moto G52',
    'xt9363':'Motorola Moto G62','xt9365':'Motorola Moto G72',
    'xt9367':'Motorola Moto G82','xt9369':'Motorola Moto G92',
    'xt9371':'Motorola Moto G102','xt9373':'Motorola Moto G12',
    'xt9375':'Motorola Moto G22','xt9377':'Motorola Moto G32',
    'xt9379':'Motorola Moto G42','xt9381':'Motorola Moto G52',
    'xt9383':'Motorola Moto G62','xt9385':'Motorola Moto G72',
    'xt9387':'Motorola Moto G82','xt9389':'Motorola Moto G92',
    'xt9391':'Motorola Moto G102','xt9393':'Motorola Moto G12',
    'xt9395':'Motorola Moto G22','xt9397':'Motorola Moto G32',
    'xt9399':'Motorola Moto G42','xt9401':'Motorola Moto G52',
    'xt9403':'Motorola Moto G62','xt9405':'Motorola Moto G72',
    'xt9407':'Motorola Moto G82','xt9409':'Motorola Moto G92',
    'xt9411':'Motorola Moto G102','xt9413':'Motorola Moto G12',
    'xt9415':'Motorola Moto G22','xt9417':'Motorola Moto G32',
    'xt9419':'Motorola Moto G42','xt9421':'Motorola Moto G52',
    'xt9423':'Motorola Moto G62','xt9425':'Motorola Moto G72',
    'xt9427':'Motorola Moto G82','xt9429':'Motorola Moto G92',
    'xt9431':'Motorola Moto G102','xt9433':'Motorola Moto G12',
    'xt9435':'Motorola Moto G22','xt9437':'Motorola Moto G32',
    'xt9439':'Motorola Moto G42','xt9441':'Motorola Moto G52',
    'xt9443':'Motorola Moto G62','xt9445':'Motorola Moto G72',
    'xt9447':'Motorola Moto G82','xt9449':'Motorola Moto G92',
    'xt9451':'Motorola Moto G102','xt9453':'Motorola Moto G12',
    'xt9455':'Motorola Moto G22','xt9457':'Motorola Moto G32',
    'xt9459':'Motorola Moto G42','xt9461':'Motorola Moto G52',
    'xt9463':'Motorola Moto G62','xt9465':'Motorola Moto G72',
    'xt9467':'Motorola Moto G82','xt9469':'Motorola Moto G92',
    'xt9471':'Motorola Moto G102','xt9473':'Motorola Moto G12',
    'xt9475':'Motorola Moto G22','xt9477':'Motorola Moto G32',
    'xt9479':'Motorola Moto G42','xt9481':'Motorola Moto G52',
    'xt9483':'Motorola Moto G62','xt9485':'Motorola Moto G72',
    'xt9487':'Motorola Moto G82','xt9489':'Motorola Moto G92',
    'xt9491':'Motorola Moto G102','xt9493':'Motorola Moto G12',
    'xt9495':'Motorola Moto G22','xt9497':'Motorola Moto G32',
    'xt9499':'Motorola Moto G42','xt9501':'Motorola Moto G52',
    'xt9503':'Motorola Moto G62','xt9505':'Motorola Moto G72',
    'xt9507':'Motorola Moto G82','xt9509':'Motorola Moto G92',
    'xt9511':'Motorola Moto G102','xt9513':'Motorola Moto G12',
    'xt9515':'Motorola Moto G22','xt9517':'Motorola Moto G32',
    'xt9519':'Motorola Moto G42','xt9521':'Motorola Moto G52',
    'xt9523':'Motorola Moto G62','xt9525':'Motorola Moto G72',
    'xt9527':'Motorola Moto G82','xt9529':'Motorola Moto G92',
    'xt9531':'Motorola Moto G102','xt9533':'Motorola Moto G12',
    'xt9535':'Motorola Moto G22','xt9537':'Motorola Moto G32',
    'xt9539':'Motorola Moto G42','xt9541':'Motorola Moto G52',
    'xt9543':'Motorola Moto G62','xt9545':'Motorola Moto G72',
    'xt9547':'Motorola Moto G82','xt9549':'Motorola Moto G92',
    'xt9551':'Motorola Moto G102','xt9553':'Motorola Moto G12',
    'xt9555':'Motorola Moto G22','xt9557':'Motorola Moto G32',
    'xt9559':'Motorola Moto G42','xt9561':'Motorola Moto G52',
    'xt9563':'Motorola Moto G62','xt9565':'Motorola Moto G72',
    'xt9567':'Motorola Moto G82','xt9569':'Motorola Moto G92',
    'xt9571':'Motorola Moto G102','xt9573':'Motorola Moto G12',
    'xt9575':'Motorola Moto G22','xt9577':'Motorola Moto G32',
    'xt9579':'Motorola Moto G42','xt9581':'Motorola Moto G52',
    'xt9583':'Motorola Moto G62','xt9585':'Motorola Moto G72',
    'xt9587':'Motorola Moto G82','xt9589':'Motorola Moto G92',
    'xt9591':'Motorola Moto G102','xt9593':'Motorola Moto G12',
    'xt9595':'Motorola Moto G22','xt9597':'Motorola Moto G32',
    'xt9599':'Motorola Moto G42','xt9601':'Motorola Moto G52',
    'xt9603':'Motorola Moto G62','xt9605':'Motorola Moto G72',
    'xt9607':'Motorola Moto G82','xt9609':'Motorola Moto G92',
    'xt9611':'Motorola Moto G102','xt9613':'Motorola Moto G12',
    'xt9615':'Motorola Moto G22','xt9617':'Motorola Moto G32',
    'xt9619':'Motorola Moto G42','xt9621':'Motorola Moto G52',
    'xt9623':'Motorola Moto G62','xt9625':'Motorola Moto G72',
    'xt9627':'Motorola Moto G82','xt9629':'Motorola Moto G92',
    'xt9631':'Motorola Moto G102','xt9633':'Motorola Moto G12',
    'xt9635':'Motorola Moto G22','xt9637':'Motorola Moto G32',
    'xt9639':'Motorola Moto G42','xt9641':'Motorola Moto G52',
    'xt9643':'Motorola Moto G62','xt9645':'Motorola Moto G72',
    'xt9647':'Motorola Moto G82','xt9649':'Motorola Moto G92',
    'xt9651':'Motorola Moto G102','xt9653':'Motorola Moto G12',
    'xt9655':'Motorola Moto G22','xt9657':'Motorola Moto G32',
    'xt9659':'Motorola Moto G42','xt9661':'Motorola Moto G52',
    'xt9663':'Motorola Moto G62','xt9665':'Motorola Moto G72',
    'xt9667':'Motorola Moto G82','xt9669':'Motorola Moto G92',
    'xt9671':'Motorola Moto G102','xt9673':'Motorola Moto G12',
    'xt9675':'Motorola Moto G22','xt9677':'Motorola Moto G32',
    'xt9679':'Motorola Moto G42','xt9681':'Motorola Moto G52',
    'xt9683':'Motorola Moto G62','xt9685':'Motorola Moto G72',
    'xt9687':'Motorola Moto G82','xt9689':'Motorola Moto G92',
    'xt9691':'Motorola Moto G102','xt9693':'Motorola Moto G12',
    'xt9695':'Motorola Moto G22','xt9697':'Motorola Moto G32',
    'xt9699':'Motorola Moto G42','xt9701':'Motorola Moto G52',
    'xt9703':'Motorola Moto G62','xt9705':'Motorola Moto G72',
    'xt9707':'Motorola Moto G82','xt9709':'Motorola Moto G92',
    'xt9711':'Motorola Moto G102','xt9713':'Motorola Moto G12',
    'xt9715':'Motorola Moto G22','xt9717':'Motorola Moto G32',
    'xt9719':'Motorola Moto G42','xt9721':'Motorola Moto G52',
    'xt9723':'Motorola Moto G62','xt9725':'Motorola Moto G72',
    'xt9727':'Motorola Moto G82','xt9729':'Motorola Moto G92',
    'xt9731':'Motorola Moto G102','xt9733':'Motorola Moto G12',
    'xt9735':'Motorola Moto G22','xt9737':'Motorola Moto G32',
    'xt9739':'Motorola Moto G42','xt9741':'Motorola Moto G52',
    'xt9743':'Motorola Moto G62','xt9745':'Motorola Moto G72',
    'xt9747':'Motorola Moto G82','xt9749':'Motorola Moto G92',
    'xt9751':'Motorola Moto G102','xt9753':'Motorola Moto G12',
    'xt9755':'Motorola Moto G22','xt9757':'Motorola Moto G32',
    'xt9759':'Motorola Moto G42','xt9761':'Motorola Moto G52',
    'xt9763':'Motorola Moto G62','xt9765':'Motorola Moto G72',
    'xt9767':'Motorola Moto G82','xt9769':'Motorola Moto G92',
    'xt9771':'Motorola Moto G102','xt9773':'Motorola Moto G12',
    'xt9775':'Motorola Moto G22','xt9777':'Motorola Moto G32',
    'xt9779':'Motorola Moto G42','xt9781':'Motorola Moto G52',
    'xt9783':'Motorola Moto G62','xt9785':'Motorola Moto G72',
    'xt9787':'Motorola Moto G82','xt9789':'Motorola Moto G92',
    'xt9791':'Motorola Moto G102','xt9793':'Motorola Moto G12',
    'xt9795':'Motorola Moto G22','xt9797':'Motorola Moto G32',
    'xt9799':'Motorola Moto G42','xt9801':'Motorola Moto G52',
    'xt9803':'Motorola Moto G62','xt9805':'Motorola Moto G72',
    'xt9807':'Motorola Moto G82','xt9809':'Motorola Moto G92',
    'xt9811':'Motorola Moto G102','xt9813':'Motorola Moto G12',
    'xt9815':'Motorola Moto G22','xt9817':'Motorola Moto G32',
    'xt9819':'Motorola Moto G42','xt9821':'Motorola Moto G52',
    'xt9823':'Motorola Moto G62','xt9825':'Motorola Moto G72',
    'xt9827':'Motorola Moto G82','xt9829':'Motorola Moto G92',
    'xt9831':'Motorola Moto G102','xt9833':'Motorola Moto G12',
    'xt9835':'Motorola Moto G22','xt9837':'Motorola Moto G32',
    'xt9839':'Motorola Moto G42','xt9841':'Motorola Moto G52',
    'xt9843':'Motorola Moto G62','xt9845':'Motorola Moto G72',
    'xt9847':'Motorola Moto G82','xt9849':'Motorola Moto G92',
    'xt9851':'Motorola Moto G102','xt9853':'Motorola Moto G12',
    'xt9855':'Motorola Moto G22','xt9857':'Motorola Moto G32',
    'xt9859':'Motorola Moto G42','xt9861':'Motorola Moto G52',
    'xt9863':'Motorola Moto G62','xt9865':'Motorola Moto G72',
    'xt9867':'Motorola Moto G82','xt9869':'Motorola Moto G92',
    'xt9871':'Motorola Moto G102','xt9873':'Motorola Moto G12',
    'xt9875':'Motorola Moto G22','xt9877':'Motorola Moto G32',
    'xt9879':'Motorola Moto G42','xt9881':'Motorola Moto G52',
    'xt9883':'Motorola Moto G62','xt9885':'Motorola Moto G72',
    'xt9887':'Motorola Moto G82','xt9889':'Motorola Moto G92',
    'xt9891':'Motorola Moto G102','xt9893':'Motorola Moto G12',
    'xt9895':'Motorola Moto G22','xt9897':'Motorola Moto G32',
    'xt9899':'Motorola Moto G42','xt9901':'Motorola Moto G52',
    'xt9903':'Motorola Moto G62','xt9905':'Motorola Moto G72',
    'xt9907':'Motorola Moto G82','xt9909':'Motorola Moto G92',
    'xt9911':'Motorola Moto G102','xt9913':'Motorola Moto G12',
    'xt9915':'Motorola Moto G22','xt9917':'Motorola Moto G32',
    'xt9919':'Motorola Moto G42','xt9921':'Motorola Moto G52',
    'xt9923':'Motorola Moto G62','xt9925':'Motorola Moto G72',
    'xt9927':'Motorola Moto G82','xt9929':'Motorola Moto G92',
    'xt9931':'Motorola Moto G102','xt9933':'Motorola Moto G12',
    'xt9935':'Motorola Moto G22','xt9937':'Motorola Moto G32',
    'xt9939':'Motorola Moto G42','xt9941':'Motorola Moto G52',
    'xt9943':'Motorola Moto G62','xt9945':'Motorola Moto G72',
    'xt9947':'Motorola Moto G82','xt9949':'Motorola Moto G92',
    'xt9951':'Motorola Moto G102','xt9953':'Motorola Moto G12',
    'xt9955':'Motorola Moto G22','xt9957':'Motorola Moto G32',
    'xt9959':'Motorola Moto G42','xt9961':'Motorola Moto G52',
    'xt9963':'Motorola Moto G62','xt9965':'Motorola Moto G72',
    'xt9967':'Motorola Moto G82','xt9969':'Motorola Moto G92',
    'xt9971':'Motorola Moto G102','xt9973':'Motorola Moto G12',
    'xt9975':'Motorola Moto G22','xt9977':'Motorola Moto G32',
    'xt9979':'Motorola Moto G42','xt9981':'Motorola Moto G52',
    'xt9983':'Motorola Moto G62','xt9985':'Motorola Moto G72',
    'xt9987':'Motorola Moto G82','xt9989':'Motorola Moto G92',
    'xt9991':'Motorola Moto G102','xt9993':'Motorola Moto G12',
    'xt9995':'Motorola Moto G22','xt9997':'Motorola Moto G32',
    'xt9999':'Motorola Moto G42'
  };
  const motoCode = (chModel || '').toLowerCase().replace(/[^a-z0-9]/g,'');
  if (motoCodes[motoCode]) return motoCodes[motoCode];

  // Other major Android brands: use a readable model if browser exposes it.
  const patterns = [
    ['Huawei', /\b(HUAWEI)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['HONOR', /\b(HONOR)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['Nokia', /\b(Nokia)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['OnePlus', /\b(OnePlus)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['OPPO', /\b(OPPO)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['vivo', /\b(vivo)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['realme', /\b(realme)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['TECNO', /\b(TECNO)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['Infinix', /\b(Infinix)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['ZTE', /\b(ZTE)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i],
    ['ASUS', /\b(ASUS)[ -]?([A-Z0-9][A-Z0-9 .+\-]*)/i]
  ];
  for (const [brand, re] of patterns) {
    const hit = raw.match(re);
    if (hit) {
      const model = hit[2].trim().replace(/\s+/g,' ');
      if (model && model.length < 50) return `${brand} ${model}`;
    }
  }

  // PCs / laptops: keep the actual exposed brand/model when available.
  if (/\bWindows\b/i.test(raw)) {
    if (/\bSurface\b/i.test(raw)) return 'Microsoft Surface';
    if (/\bHP\b/i.test(raw)) return 'HP PC';
    if (/\bLenovo\b/i.test(raw)) return 'Lenovo PC';
    if (/\bDell\b/i.test(raw)) return 'Dell PC';
    if (/\bAcer\b/i.test(raw)) return 'Acer PC';
    if (/\bASUS\b/i.test(raw)) return 'ASUS PC';
    return 'Windows PC';
  }
  if (/\bLinux\b/i.test(raw)) return 'Linux PC';

  return '';
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    const sw = window.screen.width;
    const sh = window.screen.height;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    // ── Objeto info para almacenar toda la información
    const info = {};

    // ── Tipo principal mejorado según solicitud del usuario
    let tipoDispositivo;
    let subtipo = '';
    
    if (/Mobi|Android.*Mobile|iPhone|iPod/i.test(ua)) {
      tipoDispositivo = 'Celular';
      if (/iPhone/i.test(ua)) subtipo = 'iPhone';
      else if (/Android/i.test(ua)) subtipo = 'Android';
    }
    else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
      tipoDispositivo = 'Tablet';
      if (/iPad/i.test(ua)) subtipo = 'iPad';
      else subtipo = 'Android Tablet';
    }
    else {
      tipoDispositivo = 'PC / Laptop';
      // ── Subclasificación PC mejorada
      if (/Macintosh|Mac OS X/i.test(ua)) {
        if (/MacBook/i.test(ua)) subtipo = 'MacBook';
        else if (/iMac/i.test(ua)) subtipo = 'iMac';
        else subtipo = 'Mac';
      }
      else if (/Windows/i.test(ua)) {
        if (/Laptop|Notebook/i.test(ua)) subtipo = 'Laptop';
        else subtipo = 'PC de Escritorio';
      }
      else if (/Linux/i.test(ua)) {
        subtipo = 'PC con Linux';
      }
    }

    // ── MAPA DE MODELOS CONOCIDOS ─────────────────────────
    // Muchos Android no entregan el nombre comercial, sino el código
    // interno del equipo (por ejemplo, Redmi A1 = 220733SL).
    // Aquí convertimos esos códigos a su nombre comercial.
    const modelosConocidos = {
      // Xiaomi / Redmi
      '220733SG': 'Redmi A1',
      '220733SH': 'Redmi A1',
      '220733SI': 'Redmi A1',
      '220733SL': 'Redmi A1',
      '220733SFG': 'Redmi A1+',
      '220733SFH': 'Redmi A1+',
      '220743FI': 'Redmi A1+',
      '23028RN4DG': 'Redmi A2',
      '23028RN4DH': 'Redmi A2',
      '23028RN4DI': 'Redmi A2',
      '23028RNCAG': 'Redmi A2+',
      '23028RNCAH': 'Redmi A2+',
      '23028RNCAI': 'Redmi A2+',
      'M1903C3GG': 'Redmi Go',
      'M1903C3GH': 'Redmi Go',
      'M1903C3GI': 'Redmi Go',
      // POCO C50
      'MZB0D3DIN': 'POCO C50'
    };

    function traducirModeloComercial(modelo) {
      const limpio = String(modelo || '').trim();
      if (!limpio) return '';
      return modelosConocidos[limpio.toUpperCase()] || limpio;
    }

    // ── MARCA + MODELO DEL DISPOSITIVO ───────────────────
    // Usa el nombre/modelo que el navegador exponga. No inventa datos.
    let marca = '—';
    let modeloComercial = '';

    if (/iPhone/i.test(ua)) {
      marca = 'Apple';
      modeloComercial = 'iPhone';
    } else if (/iPad/i.test(ua)) {
      marca = 'Apple';
      modeloComercial = 'iPad';
    } else {
      const patrones = [
        { rx: /;\s*(Redmi\s+[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'Xiaomi' },
        { rx: /;\s*(POCO\s+[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'POCO' },
        { rx: /(SM-[A-Z0-9-]+)/i, marca: 'Samsung' },
        { rx: /(moto\s+[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'Motorola' },
        { rx: /(XT\d{3,5}(?:-\d+)?)/i, marca: 'Motorola' },
        { rx: /(HUAWEI[\s-]*[A-Z0-9-]+)/i, marca: 'Huawei' },
        { rx: /(HONOR[\s-]*[A-Z0-9-]+)/i, marca: 'HONOR' },
        { rx: /(Nokia[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'Nokia' },
        { rx: /(OnePlus[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'OnePlus' },
        { rx: /(OPPO[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'OPPO' },
        { rx: /(vivo[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'vivo' },
        { rx: /(realme[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'realme' },
        { rx: /(TECNO[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'TECNO' },
        { rx: /(Infinix[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'Infinix' },
        { rx: /(ZTE[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'ZTE' },
        { rx: /(ASUS[\s-]*[A-Za-z0-9][^;)]+?)(?:\s+Build\/|;|\))/i, marca: 'ASUS' }
      ];

      for (const item of patrones) {
        const m = ua.match(item.rx);
        if (m) {
          modeloComercial = (m[1] || '').replace(/\s+Build\/.*$/i, '').replace(/[;)]+$/, '').trim();
          marca = item.marca;
          break;
        }
      }

      if (!modeloComercial) {
        if (/Macintosh/i.test(ua)) { marca = 'Apple'; modeloComercial = 'Mac'; }
        else if (/Windows/i.test(ua)) { marca = 'PC'; modeloComercial = 'Windows PC'; }
        else if (/Linux/i.test(ua)) { marca = 'PC'; modeloComercial = 'Linux PC'; }
        else if (/Android/i.test(ua)) { marca = 'Android'; modeloComercial = 'Android'; }
      }
    }

    // ── Sistema Operativo con versión exacta y nombre profesional (tipo Google)
    let sistemaOp = 'Desconocido';
    let sistemaOpVersion = '';
    
    if (/Windows NT 10\.0/i.test(ua)) {
      // Win10 y Win11 usan el mismo NT 10.0
      // Intentamos detectar Win11 por userAgentData (Chrome 90+)
      sistemaOp = 'Windows 10';
      // Intentar detectar si es Win11 por indicadores adicionales
      if (/Win64|WOW64|x64/i.test(ua) && /Chrome\/(\d{2,})/i.test(ua)) {
        const chromeVersion = parseInt(ua.match(/Chrome\/(\d{2,})/i)[1]);
        if (chromeVersion >= 90) sistemaOp = 'Windows 11';
      }
      // Detectar edición Pro/Home
      if (/Win64|WOW64|x64/i.test(ua)) sistemaOp += ' Pro';
      else sistemaOp += ' Home';
    }
    else if (/Windows NT 6\.3/i.test(ua)) {
      sistemaOp = 'Windows 8.1';
      if (/WOW64|Win64|x64/i.test(ua)) sistemaOp += ' Pro';
      else sistemaOp += ' Home';
    }
    else if (/Windows NT 6\.2/i.test(ua)) {
      sistemaOp = 'Windows 8';
      if (/WOW64|Win64|x64/i.test(ua)) sistemaOp += ' Pro';
      else sistemaOp += ' Home';
    }
    else if (/Windows NT 6\.1/i.test(ua)) {
      sistemaOp = 'Windows 7';
      if (/WOW64|Win64|x64/i.test(ua)) sistemaOp += ' Ultimate';
      else sistemaOp += ' Home Premium';
    }
    else if (/Windows NT 6\.0/i.test(ua)) sistemaOp = 'Windows Vista';
    else if (/Windows NT 5\.1|Windows XP/i.test(ua)) sistemaOp = 'Windows XP';
    else if (/Android/i.test(ua)) {
      const v = ua.match(/Android ([\d.]+)/i);
      sistemaOp = 'Android ' + (v?.[1] || '');
      sistemaOpVersion = v?.[1] || '';
    }
    else if (/CPU (iPhone )?OS/i.test(ua)) {
      const v = ua.match(/OS ([\d_]+)/i);
      sistemaOp = 'iOS ' + (v?.[1]?.replace(/_/g,'.') || '');
      sistemaOpVersion = v?.[1]?.replace(/_/g,'.') || '';
    }
    else if (/Mac OS X/i.test(ua)) {
      const v = ua.match(/Mac OS X ([\d_.]+)/i);
      sistemaOp = 'macOS ' + (v?.[1]?.replace(/_/g,'.') || '');
      sistemaOpVersion = v?.[1]?.replace(/_/g,'.') || '';
    }
    else if (/Linux/i.test(ua)) {
      sistemaOp = 'Linux';
      // Intentar detectar distribución específica
      if (/Ubuntu/i.test(ua)) sistemaOp = 'Ubuntu Linux';
      else if (/Fedora/i.test(ua)) sistemaOp = 'Fedora Linux';
      else if (/Debian/i.test(ua)) sistemaOp = 'Debian Linux';
      else if (/Mint/i.test(ua)) sistemaOp = 'Linux Mint';
    }

    // Guardar los valores en el objeto info
    info.marca = marca;
    info.modeloComercial = modeloComercial;
    info.sistemaOp = sistemaOp;
    info.sistemaOpVersion = sistemaOpVersion;

    // ── Navegador con versión
    let navegador;
    if      (/Edg\/([\d.]+)/i.test(ua))   { navegador = 'Microsoft Edge ' + ua.match(/Edg\/([\d.]+)/i)[1]; }
    else if (/OPR\/([\d.]+)/i.test(ua))   { navegador = 'Opera ' + ua.match(/OPR\/([\d.]+)/i)[1]; }
    else if (/Chrome\/([\d.]+)/i.test(ua)){ navegador = 'Google Chrome ' + ua.match(/Chrome\/([\d.]+)/i)[1]; }
    else if (/Firefox\/([\d.]+)/i.test(ua)){navegador = 'Mozilla Firefox ' + ua.match(/Firefox\/([\d.]+)/i)[1]; }
    else if (/Version\/([\d.]+).*Safari/i.test(ua)){ navegador = 'Safari ' + ua.match(/Version\/([\d.]+)/i)[1]; }
    else                                   { navegador = 'Otro navegador'; }

    // ── Idioma configurado
    const idioma = navigator.language || '—';

    // ── Zona horaria del visitante
    const zonaTZ = Intl.DateTimeFormat().resolvedOptions().timeZone || '—';

    // ── Tipo de conexión
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let conexion = 'No disponible';
    if (conn) {
      const tipo = (conn.effectiveType || '').toUpperCase();
      const vel  = conn.downlink ? conn.downlink + ' Mbps' : '';
      conexion = [tipo, vel].filter(Boolean).join(' · ') || 'Disponible';
    }

    // ── Referencia
    let origen = 'Directo (escribió el link o lo tenía guardado)';
    if (document.referrer) {
      try   { const u = new URL(document.referrer); origen = u.hostname; }
      catch { origen = document.referrer.slice(0, 60); }
    }

    // ── URL exacta visitada
    const urlVisitada = window.location.href;

    // ── Batería (si disponible)
    let bateria = '';
    if (navigator.getBattery) {
      navigator.getBattery().then(b => {
        bateria = Math.round(b.level * 100) + '% ' + (b.charging ? '⚡ cargando' : '🔋 sin carga');
      }).catch(() => {});
    }

    // Guardar todos los datos en el objeto info
    info.tipoDispositivo = tipoDispositivo;
    info.subtipo = subtipo;
    info.marca = marca;
    info.modeloComercial = modeloComercial;
    info.sistemaOp = sistemaOp;
    info.navegador = navegador;
    info.idioma = idioma;
    info.zonaTZ = zonaTZ;
    info.conexion = conexion;
    info.origen = origen;
    info.urlVisitada = urlVisitada;
    info.sw = sw;
    info.sh = sh;
    info.vw = vw;
    info.vh = vh;
    info.dpr = dpr;

    return info;
  }

  // ── HARDWARE REAL DISPONIBLE AL NAVEGADOR ─────────────
  async function enriquecerHardware(info) {
    const uaData = navigator.userAgentData;

    // CPU/modelo/arquitectura: solo algunos navegadores lo exponen.
    try {
      if (uaData?.getHighEntropyValues) {
        const d = await uaData.getHighEntropyValues([
          'model', 'platformVersion', 'architecture', 'bitness', 'fullVersionList'
        ]);
        if (d.model) {
          const modeloUA = String(d.model).trim();
          const modeloTraducido = traducirModeloComercial(modeloUA);
          info.modeloHardware = modeloTraducido;

          // Si el código corresponde a un modelo conocido, usamos
          // también la marca comercial correcta.
          if (modelosConocidos[modeloUA.toUpperCase()]) {
            if (/^Redmi/i.test(modeloTraducido)) info.marca = 'Xiaomi';
            else if (/^POCO/i.test(modeloTraducido)) info.marca = 'POCO';
            info.modeloComercial = modeloTraducido;
          }
        }
        if (d.architecture) info.arquitectura = d.architecture;
        if (d.bitness) info.bits = d.bitness + ' bits';

        if (/Windows/i.test(info.sistemaOp)) {
          const major = parseInt(String(d.platformVersion || '0').split('.')[0], 10);
          if (major >= 13) info.sistemaOp = 'Windows 11 Pro';
          else if (major > 0) info.sistemaOp = 'Windows 10 Pro';
        }
      }
    } catch (_) {}

    // RAM: Chromium puede dar una estimación (no es una lectura exacta).
    if (navigator.deviceMemory) {
      const ramGB = navigator.deviceMemory;
      // Mejorar formato de RAM con rangos más precisos estilo Google
      if (ramGB >= 64) info.ram = '64 GB o más';
      else if (ramGB >= 48) info.ram = '48 GB';
      else if (ramGB >= 32) info.ram = '32 GB';
      else if (ramGB >= 24) info.ram = '24 GB';
      else if (ramGB >= 16) info.ram = '16 GB';
      else if (ramGB >= 12) info.ram = '12 GB';
      else if (ramGB >= 8) info.ram = '8 GB';
      else if (ramGB >= 6) info.ram = '6 GB';
      else if (ramGB >= 4) info.ram = '4 GB';
      else if (ramGB >= 3) info.ram = '3 GB';
      else if (ramGB >= 2) info.ram = '2 GB';
      else if (ramGB >= 1) info.ram = '1 GB';
      else info.ram = `${ramGB} GB`;
    } else info.ram = 'No disponible en este navegador';

    // Núcleos lógicos: útil como referencia del procesador, no es el modelo exacto.
    info.cpuCores = navigator.hardwareConcurrency ? String(navigator.hardwareConcurrency) : 'No disponible';

    // Intentar detectar tipo de procesador más específico
    info.procesadorTipo = detectarProcesador(info.sistemaOp, navigator.userAgent);

    // Almacenamiento: la API informa la cuota/uso del sitio, no el disco físico completo.
    try {
      if (navigator.storage?.estimate) {
        const st = await navigator.storage.estimate();
        const gb = n => (n / (1024 ** 3)).toFixed(2) + ' GB';
        info.storage = `Cuota del sitio: ${st.quota ? gb(st.quota) : '—'} · Usado: ${st.usage ? gb(st.usage) : '0 GB'}`;
      } else info.storage = 'No disponible en este navegador';
    } catch (_) { info.storage = 'No disponible'; }

    if (!info.modeloHardware) info.modeloHardware = info.marca !== '—' ? info.marca : 'No expuesto por el navegador';
    if (!info.bits) info.bits = /64|x64|WOW64|Win64|aarch64|arm64/i.test(navigator.userAgent) ? '64 bits (estimado)' : 'No disponible';

    // Nombre final: primero intenta el modelo que entregue el navegador.
    const expuesto = String(info.modeloHardware || '').trim();
    if (expuesto && !/^(Android|Windows|Linux|Mac|PC|No expuesto)/i.test(expuesto)) {
  info.modeloComercialAmpliado = normalizarModeloComercial(info.userAgent || navigator.userAgent || '', info.modeloHardware || '', info.marca || '');
  if (info.modeloComercialAmpliado) info.nombreDispositivo = info.modeloComercialAmpliado;
      info.nombreDispositivo = `${info.marca !== '—' ? info.marca + ' ' : ''}${expuesto}`.replace(/\s+/g, ' ').trim();
    } else {
      info.nombreDispositivo = `${info.marca !== '—' ? info.marca + ' ' : ''}${info.modeloComercial || ''}`.replace(/\s+/g, ' ').trim() || 'No disponible';
    }

    // Evita nombres duplicados como "Xiaomi Redmi Redmi 12C".
    info.nombreDispositivo = info.nombreDispositivo
      .replace(/^Xiaomi\s+(Redmi|POCO)\s+/i, '$1 ')
      .replace(/^Apple\s+(iPhone|iPad)\s+/i, '$1 ')
      .trim();

    return info;
  }

  // ── SIMPLIFICAR NOMBRE DE ISP ─────────────────────────
  function simplificarNombreISP(isp) {
    if (!isp || isp === '—') return 'No disponible';
    
    const ispLower = isp.toLowerCase();
    
    // Colombia ISPs
    if (/colombia telecomunicaciones/i.test(isp)) return 'Movistar (Colombia Telecomunicaciones)';
    if (/movistar/i.test(isp)) return 'Movistar';
    if (/tigo|une|etb/i.test(isp)) return 'Tigo UNE';
    if (/claro|comcel/i.test(isp)) return 'Claro';
    if (/avantel/i.test(isp)) return 'Avantel';
    if (/directv/i.test(isp)) return 'DirecTV';
    if (/wom/i.test(isp)) return 'WOM';
    if (/flash/i.test(isp)) return 'Flash Mobile';
    if (/virgin/i.test(isp)) return 'Virgin Mobile';
    if (/exito/i.test(isp)) return 'Éxito Móvil';
    if (/kolumbus/i.test(isp)) return 'Kolumbus';
    if (/móvil|movil/i.test(isp) && /colombia/i.test(isp)) return 'Móvil Colombia';
    
    // Internacional
    if (/telefónica/i.test(isp)) return 'Telefónica/Movistar';
    if (/américa móvil|amovil/i.test(isp)) return 'América Móvil';
    if (/telefonica/i.test(isp)) return 'Telefónica';
    if (/vodafone/i.test(isp)) return 'Vodafone';
    if (/orange/i.test(isp)) return 'Orange';
    if (/t-mobile/i.test(isp)) return 'T-Mobile';
    if (/at&t/i.test(isp)) return 'AT&T';
    if (/verizon/i.test(isp)) return 'Verizon';
    if (/comcast/i.test(isp)) return 'Comcast';
    if (/cox/i.test(isp)) return 'Cox';
    
    // Si no coincide con ninguno conocido, intentar simplificar el nombre
    // Quitando S.A., S.A.S., ESP, Ltda, etc.
    let simplificado = isp
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
    
    return simplificado || isp;
  }

  // ── DETECCIÓN DE PROCESADOR ───────────────────────────
  function detectarProcesador(so, ua) {
    // Detección mejorada de tipo de procesador con más detalles
    if (/Intel/i.test(ua)) {
      // Intel Core de 13ª y 14ª generación
      if (/i9-14900[H,K][X]?/i.test(ua)) return 'Intel Core i9-14900 (estimado)';
      if (/i9-13900[H,K][X]?/i.test(ua)) return 'Intel Core i9-13900 (estimado)';
      if (/i9-12900[H,K][X]?/i.test(ua)) return 'Intel Core i9-12900 (estimado)';
      if (/i9-11900[H,K][X]?/i.test(ua)) return 'Intel Core i9-11900 (estimado)';
      if (/i9-10900[H,K][X]?/i.test(ua)) return 'Intel Core i9-10900 (estimado)';
      if (/i9-9900[H,K][X]?/i.test(ua)) return 'Intel Core i9-9900 (estimado)';
      if (/i9-8900[H,K][X]?/i.test(ua)) return 'Intel Core i9-8900 (estimado)';
      if (/i9-7900[H,K][X]?/i.test(ua)) return 'Intel Core i9-7900 (estimado)';
      if (/i9-[0-9]{4,5}[HK]/i.test(ua)) return 'Intel Core i9 (estimado)';
      if (/i9-[0-9]{4,5}/i.test(ua)) return 'Intel Core i9 (estimado)';
      if (/i9/i.test(ua)) return 'Intel Core i9 (estimado)';
      
      // Intel Core i7
      if (/i7-14700[H,K][X]?/i.test(ua)) return 'Intel Core i7-14700 (estimado)';
      if (/i7-13700[H,K][X]?/i.test(ua)) return 'Intel Core i7-13700 (estimado)';
      if (/i7-12700[H,K][X]?/i.test(ua)) return 'Intel Core i7-12700 (estimado)';
      if (/i7-11700[H,K][X]?/i.test(ua)) return 'Intel Core i7-11700 (estimado)';
      if (/i7-10700[H,K][X]?/i.test(ua)) return 'Intel Core i7-10700 (estimado)';
      if (/i7-9700[H,K][X]?/i.test(ua)) return 'Intel Core i7-9700 (estimado)';
      if (/i7-8700[H,K][X]?/i.test(ua)) return 'Intel Core i7-8700 (estimado)';
      if (/i7-7700[H,K][X]?/i.test(ua)) return 'Intel Core i7-7700 (estimado)';
      if (/i7-6700[H,K][X]?/i.test(ua)) return 'Intel Core i7-6700 (estimado)';
      if (/i7-5[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7-4[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7-3[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7-2[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7-[0-9]{4,5}[HKU]/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7-[0-9]{4,5}/i.test(ua)) return 'Intel Core i7 (estimado)';
      if (/i7/i.test(ua)) return 'Intel Core i7 (estimado)';
      
      // Intel Core i5
      if (/i5-14600[H,K][X]?/i.test(ua)) return 'Intel Core i5-14600 (estimado)';
      if (/i5-13600[H,K][X]?/i.test(ua)) return 'Intel Core i5-13600 (estimado)';
      if (/i5-12600[H,K][X]?/i.test(ua)) return 'Intel Core i5-12600 (estimado)';
      if (/i5-11600[H,K][X]?/i.test(ua)) return 'Intel Core i5-11600 (estimado)';
      if (/i5-10600[H,K][X]?/i.test(ua)) return 'Intel Core i5-10600 (estimado)';
      if (/i5-9600[H,K][X]?/i.test(ua)) return 'Intel Core i5-9600 (estimado)';
      if (/i5-8600[H,K][X]?/i.test(ua)) return 'Intel Core i5-8600 (estimado)';
      if (/i5-7600[H,K][X]?/i.test(ua)) return 'Intel Core i5-7600 (estimado)';
      if (/i5-6600[H,K][X]?/i.test(ua)) return 'Intel Core i5-6600 (estimado)';
      if (/i5-5[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5-4[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5-3[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5-2[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5-[0-9]{4,5}[HKU]/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5-[0-9]{4,5}/i.test(ua)) return 'Intel Core i5 (estimado)';
      if (/i5/i.test(ua)) return 'Intel Core i5 (estimado)';
      
      // Intel Core i3
      if (/i3-14100[H,K][X]?/i.test(ua)) return 'Intel Core i3-14100 (estimado)';
      if (/i3-13100[H,K][X]?/i.test(ua)) return 'Intel Core i3-13100 (estimado)';
      if (/i3-12100[H,K][X]?/i.test(ua)) return 'Intel Core i3-12100 (estimado)';
      if (/i3-11100[H,K][X]?/i.test(ua)) return 'Intel Core i3-11100 (estimado)';
      if (/i3-10100[H,K][X]?/i.test(ua)) return 'Intel Core i3-10100 (estimado)';
      if (/i3-9[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-8[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-7[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-6[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-5[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-4[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-3[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-2[0-9]{3,4}[HQM]?/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3-[0-9]{4,5}/i.test(ua)) return 'Intel Core i3 (estimado)';
      if (/i3/i.test(ua)) return 'Intel Core i3 (estimado)';
      
      // Intel Pentium
      if (/Pentium Gold [0-9]{4,5}/i.test(ua)) return 'Intel Pentium Gold (estimado)';
      if (/Pentium Silver [0-9]{4,5}/i.test(ua)) return 'Intel Pentium Silver (estimado)';
      if (/Pentium [0-9]{4,5}/i.test(ua)) return 'Intel Pentium (estimado)';
      if (/Pentium/i.test(ua)) return 'Intel Pentium (estimado)';
      
      // Intel Celeron
      if (/Celeron [0-9]{4,5}/i.test(ua)) return 'Intel Celeron (estimado)';
      if (/Celeron/i.test(ua)) return 'Intel Celeron (estimado)';
      
      // Intel Xeon
      if (/Xeon [0-9]{4,5}[WGS]?/i.test(ua)) return 'Intel Xeon (estimado)';
      if (/Xeon/i.test(ua)) return 'Intel Xeon (estimado)';
      
      // Intel general - si detecta Intel pero no el modelo específico
      return 'Intel (estimado)';
    }
    
    // Detección general si no encontró nada específico pero hay alguna pista
    if (/Win64|WOW64|x64/i.test(ua) && /Windows/i.test(ua)) {
      return 'x64 (procesador de 64 bits, modelo no detectado)';
    }
    if (/WOW/i.test(ua)) {
      return 'x86 (procesador de 32/64 bits, modelo no detectado)';
    }
    if (/AMD/i.test(ua)) {
      // AMD Ryzen 9000 series
      if (/Ryzen 9 99[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 7 97[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 5 96[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      
      // AMD Ryzen 7000/8000 series
      if (/Ryzen 9 79[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 9 78[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 7 78[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 7 77[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 5 76[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5 75[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5 86[0-9]{2}[G]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      
      // AMD Ryzen 5000/6000 series
      if (/Ryzen 9 69[0-9]{2}[HX]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 9 59[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 7 68[0-9]{2}[HX]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 7 58[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 5 66[0-9]{2}[HX]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5 56[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      
      // AMD Ryzen 3000/4000 series
      if (/Ryzen 9 49[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 9 39[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 7 48[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 7 38[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 5 46[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5 36[0-9]{2}[X]?/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      
      // AMD Ryzen general
      if (/Ryzen 9 [0-9]{4,5}[HX]/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 9 [0-9]{4,5}/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 9/i.test(ua)) return 'AMD Ryzen 9 (estimado)';
      if (/Ryzen 7 [0-9]{4,5}[HX]/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 7 [0-9]{4,5}/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 7/i.test(ua)) return 'AMD Ryzen 7 (estimado)';
      if (/Ryzen 5 [0-9]{4,5}[HX]/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5 [0-9]{4,5}/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 5/i.test(ua)) return 'AMD Ryzen 5 (estimado)';
      if (/Ryzen 3 [0-9]{4,5}/i.test(ua)) return 'AMD Ryzen 3 (estimado)';
      if (/Ryzen 3/i.test(ua)) return 'AMD Ryzen 3 (estimado)';
      
      // AMD Athlon
      if (/Athlon [0-9]{4,5}[GE]?/i.test(ua)) return 'AMD Athlon (estimado)';
      if (/Athlon/i.test(ua)) return 'AMD Athlon (estimado)';
      
      // AMD EPYC
      if (/EPYC [0-9]{4,5}/i.test(ua)) return 'AMD EPYC (estimado)';
      if (/EPYC/i.test(ua)) return 'AMD EPYC (estimado)';
      
      // AMD Threadripper
      if (/Threadripper [0-9]{4,5}[WX]?/i.test(ua)) return 'AMD Threadripper (estimado)';
      if (/Threadripper/i.test(ua)) return 'AMD Threadripper (estimado)';
      
      return 'AMD (estimado)';
    }
    if (/Apple/i.test(ua) && /Mac/i.test(so)) {
      // Apple Silicon M3 series
      if (/M3 Ultra/i.test(ua)) return 'Apple M3 Ultra';
      if (/M3 Max/i.test(ua)) return 'Apple M3 Max';
      if (/M3 Pro/i.test(ua)) return 'Apple M3 Pro';
      if (/M3/i.test(ua)) return 'Apple M3';
      
      // Apple Silicon M2 series
      if (/M2 Ultra/i.test(ua)) return 'Apple M2 Ultra';
      if (/M2 Max/i.test(ua)) return 'Apple M2 Max';
      if (/M2 Pro/i.test(ua)) return 'Apple M2 Pro';
      if (/M2/i.test(ua)) return 'Apple M2';
      
      // Apple Silicon M1 series
      if (/M1 Ultra/i.test(ua)) return 'Apple M1 Ultra';
      if (/M1 Max/i.test(ua)) return 'Apple M1 Max';
      if (/M1 Pro/i.test(ua)) return 'Apple M1 Pro';
      if (/M1/i.test(ua)) return 'Apple M1';
      
      return 'Apple Silicon';
    }
    if (/ARM/i.test(ua) || /aarch64/i.test(ua)) return 'ARM';
    if (/Snapdragon/i.test(ua)) {
      // Snapdragon 8 series
      if (/Snapdragon 8 Gen 3/i.test(ua)) return 'Qualcomm Snapdragon 8 Gen 3 (estimado)';
      if (/Snapdragon 8 Gen 2/i.test(ua)) return 'Qualcomm Snapdragon 8 Gen 2 (estimado)';
      if (/Snapdragon 8 Gen 1/i.test(ua)) return 'Qualcomm Snapdragon 8 Gen 1 (estimado)';
      if (/Snapdragon 8\s+[0-9]{3,4}/i.test(ua)) return 'Qualcomm Snapdragon 8 (estimado)';
      if (/Snapdragon 8 Gen/i.test(ua)) return 'Qualcomm Snapdragon 8 Gen (estimado)';
      
      // Snapdragon 7 series
      if (/Snapdragon 7\s+Gen [0-9]/i.test(ua)) return 'Qualcomm Snapdragon 7 Gen (estimado)';
      if (/Snapdragon 7\s+[0-9]{3,4}/i.test(ua)) return 'Qualcomm Snapdragon 7 (estimado)';
      if (/Snapdragon 7/i.test(ua)) return 'Qualcomm Snapdragon 7 (estimado)';
      
      // Snapdragon 6 series
      if (/Snapdragon 6\s+[0-9]{3,4}/i.test(ua)) return 'Qualcomm Snapdragon 6 (estimado)';
      if (/Snapdragon 6/i.test(ua)) return 'Qualcomm Snapdragon 6 (estimado)';
      
      // Snapdragon 4 series
      if (/Snapdragon 4\s+[0-9]{3,4}/i.test(ua)) return 'Qualcomm Snapdragon 4 (estimado)';
      if (/Snapdragon 4/i.test(ua)) return 'Qualcomm Snapdragon 4 (estimado)';
      
      return 'Qualcomm Snapdragon (estimado)';
    }
    if (/MediaTek/i.test(ua)) {
      // MediaTek Dimensity series
      if (/Dimensity 9[0-9]{3,4}/i.test(ua)) return 'MediaTek Dimensity 9 (estimado)';
      if (/Dimensity 8[0-9]{3,4}/i.test(ua)) return 'MediaTek Dimensity 8 (estimado)';
      if (/Dimensity 7[0-9]{3,4}/i.test(ua)) return 'MediaTek Dimensity 7 (estimado)';
      if (/Dimensity 6[0-9]{3,4}/i.test(ua)) return 'MediaTek Dimensity 6 (estimado)';
      if (/Dimensity/i.test(ua)) return 'MediaTek Dimensity (estimado)';
      
      // MediaTek Helio series
      if (/Helio G[0-9]{2,3}/i.test(ua)) return 'MediaTek Helio G (estimado)';
      if (/Helio P[0-9]{2,3}/i.test(ua)) return 'MediaTek Helio P (estimado)';
      if (/Helio A[0-9]{2,3}/i.test(ua)) return 'MediaTek Helio A (estimado)';
      if (/Helio/i.test(ua)) return 'MediaTek Helio (estimado)';
      
      return 'MediaTek (estimado)';
    }
    if (/Exynos/i.test(ua)) {
      // Samsung Exynos series
      if (/Exynos 2[0-9]{3,4}/i.test(ua)) return 'Samsung Exynos 2 (estimado)';
      if (/Exynos 1[0-9]{3,4}/i.test(ua)) return 'Samsung Exynos 1 (estimado)';
      if (/Exynos [0-9]{3,4}/i.test(ua)) return 'Samsung Exynos (estimado)';
      return 'Samsung Exynos (estimado)';
    }
    if (/Kirin/i.test(ua)) {
      // Huawei Kirin series
      if (/Kirin 9[0-9]{3,4}/i.test(ua)) return 'HiSilicon Kirin 9 (estimado)';
      if (/Kirin 8[0-9]{3,4}/i.test(ua)) return 'HiSilicon Kirin 8 (estimado)';
      if (/Kirin 7[0-9]{3,4}/i.test(ua)) return 'HiSilicon Kirin 7 (estimado)';
      if (/Kirin [0-9]{3,4}/i.test(ua)) return 'HiSilicon Kirin (estimado)';
      return 'HiSilicon Kirin (estimado)';
    }
    if (/Unisoc/i.test(ua)) {
      // UNISOC series
      if (/Unisoc T[0-9]{3,4}/i.test(ua)) return 'UNISOC T (estimado)';
      if (/Unisoc/i.test(ua)) return 'UNISOC (estimado)';
    }
    return 'No disponible';
  }

  // ── GEOLOCALIZACIÓN + FILTRO COLOMBIA ────────────────
  function obtenerUbicacion(info) {
    console.log('🔍 Fonsec Tracker: Iniciando geolocalización...');
    
    // Intentar con ipapi.co primero
    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(10000) })
      .then(r => {
        console.log('🌐 Fonsec Tracker: Respuesta API recibida, status:', r.status);
        if (!r.ok) throw new Error('API respondió con status ' + r.status);
        return r.json();
      })
      .then(loc => {
        console.log('📍 Fonsec Tracker: Datos de ubicación COMPLETOS:', JSON.stringify(loc, null, 2));
        console.log('🌍 Fonsec Tracker: País detectado:', loc.country_code, loc.country_name);
        console.log('🌍 Fonsec Tracker: Ciudad:', loc.city);
        console.log('🌍 Fonsec Tracker: Región/Departamento:', loc.region);
        console.log('🌍 Fonsec Tracker: ISP/Operador:', loc.org);
        console.log('🌍 Fonsec Tracker: IP:', loc.ip);
        console.log('🌍 Fonsec Tracker: Zona horaria:', loc.timezone);

        const ipLoc = {
          ip:      loc.ip           || '—',
          pais:    loc.country_name || 'Colombia',
          ciudad:  loc.city         || '—',
          depto:   loc.region       || '—',
          postal:  loc.postal       || '—',
          lat:     loc.latitude     || null,
          lon:     loc.longitude    || null,
          isp:     loc.org          || '—',
          tz:      loc.timezone     || '—',
          mapa:    (loc.latitude && loc.longitude)
                   ? `https://maps.google.com/?q=${loc.latitude},${loc.longitude}`
                   : null,
          precision: 'Aproximada por IP'
        };
        console.log('✅ Fonsec Tracker: Ubicación procesada correctamente');
        pedirUbicacionPrecisa(info, ipLoc);
      })
      .catch(error => {
        console.error('❌ Fonsec Tracker: Error en API ipapi.co:', error);
        console.log('🔄 Fonsec Tracker: Intentando con API alternativa ip-api.com...');
        
        // Fallback a ip-api.com (gratuita, sin HTTPS)
        fetch('http://ip-api.com/json/')
          .then(r => {
            console.log('🌐 Fonsec Tracker: Respuesta API alternativa, status:', r.status);
            return r.json();
          })
          .then(loc => {
            console.log('📍 Fonsec Tracker: Datos de ubicación (API alternativa):', JSON.stringify(loc, null, 2));
            console.log('📍 Fonsec Tracker: ISP detectado:', loc.isp);
            console.log('📍 Fonsec Tracker: Operador:', loc.org);
            console.log('📍 Fonsec Tracker: AS:', loc.as);
            
            const ipLoc = {
              ip:      loc.query         || '—',
              pais:    loc.country       || 'Colombia',
              ciudad:  loc.city          || '—',
              depto:   loc.regionName    || '—',
              postal:  loc.zip           || '—',
              lat:     loc.lat           || null,
              lon:     loc.lon           || null,
              isp:     simplificarNombreISP(loc.isp || loc.org || '—'),
              tz:      loc.timezone      || '—',
              mapa:    (loc.lat && loc.lon)
                       ? `https://maps.google.com/?q=${loc.lat},${loc.lon}`
                       : null,
              precision: 'Aproximada por IP (API alternativa)'
            };
            console.log('✅ Fonsec Tracker: Ubicación procesada correctamente (API alternativa)');
            pedirUbicacionPrecisa(info, ipLoc);
          })
          .catch(error2 => {
            console.error('❌ Fonsec Tracker: Error en API alternativa:', error2);
            console.log('📢 Fonsec Tracker: Enviando notificación con datos limitados como fallback');
            // Si fallan ambas APIs, igual notifica con los datos que tengamos
            pedirUbicacionPrecisa(info, {
              ip: 'No disponible',
              pais: 'Colombia (ubicación no detectada)',
              ciudad: 'No disponible',
              depto: 'No disponible',
              postal: 'No disponible',
              lat: null,
              lon: null,
              isp: 'No disponible',
              tz: 'No disponible',
              mapa: null,
              precision: 'Error en todas las APIs de geolocalización'
            });
          });
      });
  }

  // ── UBICACIÓN PRECISA POR GPS (activada) ───────────────
  function pedirUbicacionPrecisa(info, ipLoc) {
    // Solicitar ubicación GPS al navegador
    if (!navigator.geolocation) {
      console.log('⚠️ Fonsec Tracker: Geolocalización no soportada');
      enviarMensaje(info, ipLoc);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = pos.coords.accuracy || 0;
        
        console.log('✅ Fonsec Tracker: Ubicación GPS obtenida:', lat, lon);
        
        // Enviar con ubicación GPS precisa
        enviarMensaje(info, {
          ...ipLoc,
          lat: lat,
          lon: lon,
          precision: `Precisa por GPS (±${Math.round(accuracy)} m)`,
          mapa: `https://maps.google.com/?q=${lat},${lon}`
        });
      },
      error => {
        console.warn('⚠️ Fonsec Tracker: Error GPS, usando ubicación IP:', error.message);
        // Si falla GPS, enviar con ubicación IP
        enviarMensaje(info, ipLoc);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  // ── CONSTRUIR Y ENVIAR A TELEGRAM ────────────────────
  function enviarMensaje(info, loc) {
    console.log('📤 Fonsec Tracker: ENVIAR MENSAJE INICIADO');
    console.log('📤 Fonsec Tracker: Info dispositivo:', JSON.stringify(info, null, 2));
    console.log('📤 Fonsec Tracker: Loc ubicación:', JSON.stringify(loc, null, 2));
    
    const hora = getColombiaTime();

    // Formato mejorado del dispositivo según solicitud del usuario (estilo Google Chrome/Gmail)
    const tipoDispositivoFormateado = info.tipoDispositivo || 'Desconocido';
    const marcaDispositivo = info.marca !== '—' && info.marca !== 'PC' ? info.marca : '';
    const modeloDispositivo = info.modeloComercial || info.modeloHardware || '';
    
    // Si marca está vacía, solo mostrar tipo
    let dispositivoInfo;
    if (marcaDispositivo && modeloDispositivo) {
      dispositivoInfo = `📱 *${tipoDispositivoFormateado}* — ${marcaDispositivo} ${modeloDispositivo}`;
    } else if (marcaDispositivo) {
      dispositivoInfo = `📱 *${tipoDispositivoFormateado}* — ${marcaDispositivo}`;
    } else if (modeloDispositivo) {
      dispositivoInfo = `📱 *${tipoDispositivoFormateado}* — ${modeloDispositivo}`;
    } else {
      dispositivoInfo = `📱 *${tipoDispositivoFormateado}*`;
    }
    
    // Mejorar formato del sistema operativo estilo Google
    let soFormateado = info.sistemaOp;
    if (soFormateado.includes('Windows 10 u 11')) {
      soFormateado = info.bits?.includes('64') ? 'Windows 11 Pro' : 'Windows 10 Pro';
    }

    const sistemaInfo = `💻 *Sistema:* ${soFormateado}`;
    
    // Hardware con formato corregido
    const ramText = info.ram || 'No disponible';
    const procesadorText = info.procesadorTipo || 'No disponible';
    const coresText = info.cpuCores ? `${info.cpuCores} núcleos` : 'No disponible';
    const hardwareInfo = `🔧 *Hardware:* RAM ${ramText} · Procesador: ${procesadorText} · ${coresText}`;
    
    const specsInfo = `⚡ *Especificaciones:* ${info.arquitectura || 'N/A'} · ${info.bits || 'N/A'} · Resolución ${info.sw}x${info.sh}px`;

    const texto = `🔔 *NUEVA VISITA — Fonsec System Tech*
━━━━━━━━━━━━━━━━━━━━━━━━━━

🕐 *Hora Colombia:* ${hora}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *UBICACIÓN DETALLADA*
🌍 País: ${loc.pais}
🏙️ Ciudad: ${loc.ciudad}
🗺️ Departamento: ${loc.depto}
📮 Código postal: ${loc.postal}
🎯 Precisión: ${loc.precision || '—'}
📡 Operador/ISP: ${loc.isp}
🌐 IP: \`${loc.ip}\`
⏰ Zona horaria: ${loc.tz}
${loc.lat ? `📌 Coordenadas: ${loc.lat}, ${loc.lon}` : ''}
${loc.mapa ? `🗺️ Ver en mapa: ${loc.mapa}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 *INFORMACIÓN DEL DISPOSITIVO*
${dispositivoInfo}
${sistemaInfo}
${hardwareInfo}
${specsInfo}
🌐 Navegador: ${info.navegador}
🗣️ Idioma: ${info.idioma}
📶 Conexión: ${info.conexion}
📐 Ventana: ${info.vw}x${info.vh}px · Escala: x${info.dpr}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 *ACTIVIDAD DE NAVEGACIÓN*
📄 Página visitada: ${info.urlVisitada}
🔗 Llegó desde: ${info.origen}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 _Fonsec System Tech — Soledad 2000_`;

    console.log('📡 Fonsec Tracker: Enviando mensaje a Telegram...');
    console.log('🔑 Fonsec Tracker: Bot Token:', BOT_TOKEN.substring(0, 10) + '...');
    console.log('👤 Fonsec Tracker: Chat ID:', CHAT_ID);
    console.log('📝 Fonsec Tracker: Longitud del mensaje:', texto.length, 'caracteres');
    
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:                  CHAT_ID,
        text:                     texto,
        parse_mode:               'Markdown',
        disable_web_page_preview: false,
      }),
    })
    .then(r => {
      console.log('📡 Fonsec Tracker: Respuesta Telegram recibida, status:', r.status);
      return r.json();
    })
    .then(d => {
      if (d.ok) {
        console.log('✅ Fonsec Tracker v3: notificación enviada exitosamente');
        console.log('📊 Fonsec Tracker: Message ID:', d.result?.message_id);
      } else {
        console.warn('⚠️ Error Telegram:', d.description);
        console.warn('⚠️ Error Code:', d.error_code);
        console.warn('⚠️ Parámetros:', d.parameters);
      }
    })
    .catch(e => {
      console.error('❌ Fonsec Tracker: Error crítico en conexión Telegram:', e);
      console.error('❌ Fonsec Tracker: Error detallado:', e.message);
    });
  }

  // ── INICIAR ───────────────────────────────────────────
  async function iniciarTracker() {
    console.log('🚀 Fonsec Tracker: Iniciando sistema de tracking...');
    console.log('📱 Fonsec Tracker: User Agent:', navigator.userAgent);
    console.log('🔐 Fonsec Tracker: SessionStorage tiene clave fonsec_v3:', sessionStorage.getItem('fonsec_v3'));
    
    try {
      const info = await enriquecerHardware(getDeviceInfo());
      console.log('💻 Fonsec Tracker: Info del dispositivo:', info);
      
      // Obtener ubicación y enviar mensaje
      console.log('🌍 Fonsec Tracker: Iniciando obtención de ubicación...');
      obtenerUbicacion(info);
    } catch (error) {
      console.error('❌ Fonsec Tracker: Error en iniciarTracker:', error);
      console.error('❌ Fonsec Tracker: Stack:', error.stack);
    }
  }

  console.log('🔍 Fonsec Tracker: Script cargado, esperando evento de carga...');
  if (document.readyState === 'complete') {
    console.log('✅ Fonsec Tracker: Documento ya cargado, iniciando inmediatamente');
    iniciarTracker();
  } else {
    console.log('⏳ Fonsec Tracker: Esperando evento load...');
    window.addEventListener('load', iniciarTracker);
  }

  // ── FUNCIÓN DE PRUEBA MANUAL (CONSOLA) ──────────────────
  window.probarTelegram = function() {
    console.log('🧪 Fonsec Tracker: Prueba manual iniciada...');
    console.log('🔑 Token:', BOT_TOKEN);
    console.log('👤 Chat ID:', CHAT_ID);
    
    const mensaje = `🧪 *PRUEBA MANUAL*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Hora: ${new Date().toLocaleString('es-CO')}
📱 Prueba de conexión Telegram
🔑 Bot ID: ${BOT_TOKEN.split(':')[0]}
👤 Chat ID: ${CHAT_ID}
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 _Fonsec System Tech_`;

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
