import { galaxyFeedback } from './content/galaxy-feedback.js';
import { galaxyEvidence } from './content/galaxy-evidence.js';

// Content and themes live outside the page templates. Add productions to this registry.
export const productions = {
  'galaxy-empire': {
    slug: 'galaxy-empire',
    path: '/galaxy-empire/',
    title: 'Galaxy Empire',
    theme: 'galaxy',
    accent: '#88c7ff',
    // teaser: { youtubeId: '3YQuk6VF7lY', url: 'https://youtu.be/3YQuk6VF7lY' },
    teaser: { youtubeId: '3dxkUG1F9KI', url: 'https://youtu.be/3dxkUG1F9KI?si=CTkhk91yVs9QJ-Ob' },
    
    testimonials: galaxyFeedback,
    evidence: galaxyEvidence,
    strapline: 'En rise and fall-historie av stort format',
    images: {
      hero: 'assets/images/galaxy-empire/ge0005.png',
      performance: 'assets/images/galaxy-empire/ge0003.png',
      human: 'assets/images/galaxy-empire/ge0004.png',
      video: 'assets/images/galaxy-empire/ge0002.png',
    },
    sections: ['hero', 'prologue', 'performance', 'themes', 'video', 'response', 'tour', 'practical'],
    tour: [
      ['2016', 'Premiere', 'Markedet for Scenekunst, Sandefjord'],
      ['2017 / 2018', 'Nordland, Troms og Oppland', ''],
      ['2020 / 2021', 'Agder, Ås kommune, Vestfold og Telemark, Trøndelag', ''],
      ['2022 / 2023', 'Trøndelag', ''],
      ['2024 / 2025', 'Vestland, Rogaland, Stavanger, Trøndelag', ''],
      ['2025 / 2026', 'Stavanger', ''],
    ],
    otherVenues: [
      ['Biblo Tøyen, Oslo', 'Opptreden'],
      ['Rønningen Folkehøgskole, Oslo', 'Opptreden'],
      ['Solbakken Folkehøgskole, Skarnes', 'Opptreden'],
      ['Gardermoen Airport Hotell, Gardermoen', 'Konferanse'],
      ['Fløygir, Feiring', 'Bestilling'],
      ['Nyskolen, Oslo', 'Opptreden'],
      ['Jordal Ungdomsskole, Oslo', 'Opptreden'],
    ],
    currentCredits: [
      ['Commander Pholdahl', 'Jon-Olav S. Gulbrandsen'],
      ['Produsent', 'Pål André Holdahl'],
    ],
    practical: [
      ['Målgruppe', '10 år +'],
      ['Spilletid', '45 min.'],
      ['Publikumskapasitet', '150-300'],
      ['Riggetid', '90 minutter'],
      ['Spillested', 'Klasserom / Auditorium / Black box / Kultursal'],
      ['Behov', 'Blending'],
      ['Teknisk', 'Har eget utstyr'],
    ],
  },
};
export const defaultProduction = 'galaxy-empire';
// Portraits are original files. Positions and individual palettes are presentation data.
export const people = [
  {
    id: 'pal', name: 'Pål André Holdahl', shortName: 'Pål', role: 'Kunstnerisk leder',
    image: 'assets/images/company/P_0001.jpg', width: 2699, height: 2699,
    alt: 'Pål André Holdahl i blått og magentafarget scenelys.',
    position: '51% 38%', facePosition: '51% 28%', faceScale: 1.35,
    biography: [
      'Pål André Holdahl er skuespiller, teknolog og kunstnerisk leder i Kompani Alterego. Med en bachelor i skuespill fra HiNT og en bachelor i dataingeniørfag fra OsloMET arbeider han i møtet mellom scenekunst, film, teknologi og audiovisuelle uttrykk.',
      'Galaxy Empire springer ut av hans egen erfaring med mobilspillavhengighet. Gjennom intervjuer utviklet dramatiker <strong><a href="https://www.imdb.com/name/nm2387486/?ref_=nv_sr_srsg_0_tt_0_nm_2_in_0_q_Ragnhild%20Tronvoll" target="_blank">Ragnhild Tronvoll</a></strong> historien til manus. Pål spilte opprinnelig Commander Pholdahl; rollen er nå overtatt av Jon-Olav S. Gulbrandsen. I dag har Pål produsentansvar for forestillingen, med søknader og koordinering av turnévirksomhet.',
      'Teknologi er en viktig del av hans kunstneriske praksis. Arbeidet spenner fra skuespill i teater, film og TV til motion capture skuespill, lys- og projeksjonsdesign og automatisering av sceniske installasjoner. I 2015 mottok han Statens kunstnerstipend i form av arbeidsstipend og diversestipend. Utforskningen av samspillet mellom utøver og audiovisuell teknologi bidro etter hvert til utviklingen av Galaxy Empire.',
    ],
    selectedWorks: [
      ['Galaxy Empire', 'Idé / teknisk utvikling / tidligere skuespiller / produsent'],
      ['Take Hold Of Me — Ane Brun', 'Lys- og projeksjonsdesign', 'https://youtu.be/xYPcDdfB8SE?si=kVCcXoOSH0Xkjfjq'],
      ['The Gatsby Maze Escape Room', 'Skuespiller / teknisk utvikling / automatisering', 'https://www.instagram.com/gatsbymaze/'],
      ['Constraints and Liberties', 'Prosjektansvar / workshopholder · Alexandria, Egypt', 'https://youtu.be/TPO2vifbC3I?si=7dXFKaaNtXS9M_uT'],
    ],
    theme: { background: '#211033', ink: '#f5edf6', muted: '#c9b9d0', accent: '#f0a2d4' },
  },
  {
    id: 'fredrik', name: 'Fredrik André Bjerkan', shortName: 'Fredrik', role: 'Teknisk ansvarlig',
    image: 'assets/images/company/F_0001.jpg', width: 2289, height: 2289,
    alt: 'Fredrik André Bjerkan i blåfiolett lys, vendt mot venstre.',
    position: '48% 38%', facePosition: '48% 26%', faceScale: 1.35,
    biography: [
      'Fredrik André Bjerkan er scenetekniker og teknisk ansvarlig i Kompani Alterego. Han arbeider med lys, lyd, sceneteknikk og tekniske spesialløsninger, og har bred erfaring fra teater, film og TV.',
      'Han har arbeidet fast som scenetekniker ved <strong><a href="https://www.detnorsketeatret.no/" target="_blank">Det Norske Teatret</a></strong> siden 2020, og har tidligere jobbet ved blant annet <strong><a href="https://www.nationaltheatret.no/" target="_blank">Nationaltheatret</a></strong> og <strong><a href="https://edderkoppenscene.no/" target="_blank">Edderkoppen Scene</a></strong>. Fredrik har vært med på Galaxy Empire fra begynnelsen, med ansvar for lys, lyd og teknisk gjennomføring. Han har også arbeidet med tekniske installasjoner gjentatte ganger ved <strong><a href="https://www.dyreparken.no/" target="_blank">Kristiansand Dyrepark</a></strong>.',
      'Ved NISS utviklet han kompetanse innen lydproduksjon. I dag kombinerer han sceneteknikk med elektronikk, 3D-printing, snekkerarbeid, rekvisittutvikling og scenografi. Han arbeider med kreative løsninger og tekniske utfordringer, blant annet med Arduino, spesialbygget LED-belysning og integrasjon mellom egen elektronikk og sceniske lysstyringssystemer.',
    ],
    selectedWorks: [
      ['Galaxy Empire', 'Lys / lyd / teknisk ansvar'],
      ['Det Norske Teatret', 'Sceneteknikk', 'https://www.detnorsketeatret.no/'],
      ['Nationaltheatret', 'Sceneteknikk', 'https://www.nationaltheatret.no/'],
      ['Quentin Crisp', 'Scenografi / lys / lyd / teknikk', 'https://www.blikk.no/elsker-oslo-homo-ikon/quentin-crisp-pa-elsker/196000'],
    ],
    theme: { background: '#171c3d', ink: '#f1f0fa', muted: '#bcbfd7', accent: '#bcc6ff' },
  },
  {
    id: 'jon-olav', name: 'Jon-Olav S. Gulbrandsen', shortName: 'Jon-Olav', role: 'Tekniker / Skuespiller / Regissør',
    image: 'assets/images/company/JO_0001.jpg', width: 590, height: 590,
    alt: 'Jon-Olav S. Gulbrandsen i mørkt blått lys, med en løftet hånd i forgrunnen.',
    position: '58% 45%', facePosition: '58% 68%', faceScale: 1,
    biography: [
      'Jon-Olav S. Gulbrandsen er skuespiller, scenetekniker og filmskaper. Foruten om sin delaktighet i Kompani Alterego er han også en del av <strong><a href="https://florateater.no/" target="_blank" rel="noopener noreferrer">Flora Teater</a></strong>, hvor han arbeider som skuespiller og er teknisk ansvarlig. Kompaniet er ungt, men har allerede produsert og turnert med 4 forestillinger, og vært med på å starte opp festivalen <strong><a href="https://barnasfestdager.no/" target="_blank" rel="noopener noreferrer">Barnas Festdager</a></strong> i Lillestrøm.',
      'I Galaxy Empire kom Jon-Olav først inn som scenetekniker hvor han tok over den tekniske gjennomføringen i en lengre periode. Senere gikk han fra teknikerrollen til scenen og overtok rollen som Commander Pholdahl. Jon-Olav er i dag forestillingens skuespiller.',
      'Han utvikler også egne filmprosjekter som regissør, manusforfatter og koreograf. <strong><a href="https://kortfilmfestivalen.no/en/film/fleur/" target="_blank" rel="noopener noreferrer">Fleur</a></strong>, laget sammen med Michael Schult Ulriksen, ble vist på Kortfilmfestivalen i Grimstad i 2023. Som medregissør og koreograf bidro han til <strong><a href="https://www.youtube.com/watch?v=qJDoquokwGQ" target="_blank" rel="noopener noreferrer">Miracle av Fig Tape</a></strong>, som fikk hederlig omtale i den norske musikkvideokonkurransen under BIFF i 2025. Han har også arbeidet som teknisk sjef og koordinator for <strong><a href="https://oslofringe.com/" target="_blank" rel="noopener noreferrer">Oslo Fringe</a></strong>.',
    ],
    biographyLinks: [
      ['Filmprofil', 'https://filmfreeway.com/JonOlavSGulbrandsen'],
    ],
    selectedWorks: [
      ['Galaxy Empire', 'Skuespiller / scenetekniker'],
      ['Fleur', 'Regi / manus / produksjon', 'https://kortfilmfestivalen.no/en/film/fleur/'],
      ['Flora Teater', 'Skuespiller / teknisk ansvarlig', 'https://florateater.no/'],
      ['Oslo Fringe', 'Teknisk sjef / koordinator', 'https://oslofringe.com/'],
    ],
    theme: { background: '#080f1a', ink: '#eff2f5', muted: '#b3bdca', accent: '#a1c7e8' },
  },
  {
    id: 'nikolas', name: 'Nikolas Steffensen Krane', shortName: 'Nikolas', role: 'Tekniker / Skuespiller / Musiker',
    image: 'assets/images/company/N_0001.jpg', width: 960, height: 958,
    alt: 'Nikolas Steffensen Krane i en hvit T-skjorte, fotografert i varmt, naturlig lys.',
    position: '51% 40%', facePosition: '51% 16%', faceScale: 1.08,
    biography: [
      'Nikolas Steffensen Krane er musiker og skuespiller som arbeider på tvers teater, film og musikk.',
      'I Kompani Alterego arbeider Nikolas som tekniker på Galaxy Empire. Han tok over den tekniske gjennomføringen på turné i en periode da Fredrik André Bjerkan var utilgjengelig, og er fortsatt stedfortredende tekniker ved behov. Forestillingen krever presis timing mellom skuespill, lyd, lys og video — et arbeid hvor hans musikalske bakgrunn er en styrke.',
      'Ved siden av Kompani Alterego har han blant annet medvirket som skuespiller i Rimfrost Produksjoners <br/> <strong><a href="https://rimfrostproduksjoner.no/no/project/vi-skal-ikke-falle/" target="_blank" rel="noopener noreferrer">Vi skal ikke falle</a></strong> og som musiker i Rogaland Teaters <br/> <strong><a href="https://seanse.no/production/den-store-fantasitesten" target="_blank" rel="noopener noreferrer">Den store fantasitesten</a></strong>. Under artistnavnet <strong><a href="https://urort.p3.no/artist/olaes" target="_blank" rel="noopener noreferrer">OLAES</a></strong> arbeider han med egen musikk som låtskriver, vokalist og produsent. Han er også medlem av <strong><a href="https://open.spotify.com/artist/1DFeu6YZiqj88ZbIxLMeWU" target="_blank" rel="noopener noreferrer">CLINOMANIA</a></strong>, hvor han bidrar med komposisjon og musikkproduksjon.',
    ],
    selectedWorks: [
      ['Galaxy Empire', 'Tekniker'],
      ['Vi skal ikke falle', 'Skuespiller · Rimfrost Produksjoner', 'https://rimfrostproduksjoner.no/no/project/vi-skal-ikke-falle/'],
      ['Den store fantasitesten', 'Musiker · Rogaland Teater', 'https://seanse.no/production/den-store-fantasitesten'],
      ['OLAES', 'Låtskriver / vokalist / produsent', 'https://www.utelivsguiden.no/event/olaes-m-band-mosa-support-norge-2026-a__support'],
    ],
    theme: { background: '#6c5d4b', ink: '#fff7ec', muted: '#ede0ce', accent: '#ffe1b6' },
  },
];
// Keep unknown contact details empty rather than publishing invented information.
export const contact = {
  email: 'kompanialterego@gmail.com', phone: '+47 992 99 869',
  instagram: 'https://www.instagram.com/kompanialterego/',
  youtube: 'https://www.youtube.com/@kompanialterego4773',
};
