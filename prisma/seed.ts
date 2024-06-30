import { ApprovalStatus, DayWeek, DifficultyLevel, Gender, Groups, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetTable() {
  await prisma.parkInfrastructure.deleteMany({});
  await prisma.parkForestType.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.openingHours.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.goodPractice.deleteMany({});
  await prisma.parkVisit.deleteMany({});
  await prisma.parkGuide.deleteMany({});

  await prisma.specialtyGuide.deleteMany({});
  await prisma.languageGuide.deleteMany({});

  await prisma.guide.deleteMany({});
  await prisma.parkManager.deleteMany({});

  await prisma.specialty.deleteMany({});
  await prisma.infrastructure.deleteMany({});
  await prisma.language.deleteMany({});
  await prisma.forestType.deleteMany({});

  await prisma.refreshToken.deleteMany({});
  await prisma.park.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.$executeRaw`TRUNCATE TABLE "ParkInfrastructure" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkForestType" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Activity" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "OpeningHours" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "GoodPractice" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkVisit" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkGuide" RESTART IDENTITY CASCADE;`

  await prisma.$executeRaw`TRUNCATE TABLE "SpecialtyGuide" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "LanguageGuide" RESTART IDENTITY CASCADE;`

  
  await prisma.$executeRaw`TRUNCATE TABLE "Guide" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkManager" RESTART IDENTITY CASCADE;`

  await prisma.$executeRaw`TRUNCATE TABLE "Specialty" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Language" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ForestType" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Infrastructure" RESTART IDENTITY CASCADE;`

  await prisma.$executeRaw`TRUNCATE TABLE "Park" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "RefreshToken" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
}

async function main() {
  await resetTable();

  const topLanguages = [
    { languageName: "Espanhol" },
    { languageName: "Português" },
    { languageName: "Inglês" },
    { languageName: "Francês" },
    { languageName: "Holandês" },
    { languageName: "Alemão" },
    { languageName: "Italiano" },
    { languageName: "Chinês" },
    { languageName: "Árabe" },
    { languageName: "Japonês" }
  ];

  for (const language of topLanguages) {
    await prisma.language.create({
      data: language,
    });
    // console.log(`Língua ${language.languageName} inserida.`);
  }

  const forestTypes = [
    { name: 'Mata atlântica' },
    { name: 'Mata amazônica' },
    { name: 'Mata de galeria' },
    { name: 'Mata de restinga' },
    { name: 'Mata de araucária' },
    { name: 'Mata de enconsta' },
    { name: 'Mata ciliar' },
    { name: 'Mata de transição' },
    { name: 'Mata seca' },
    { name: 'Mata de várzea' },
    { name: 'Mata de cerrado' },
    { name: 'Mata de caatinga' },
    { name: 'Mata de manguezal' },
  ]

  for (const forest of forestTypes) {
    await prisma.forestType.create({
      data: forest
    })
  }

  const Infrastructure = [
    { type: 'Banheiro'},
    { type: 'Estacionamento'},
    { type: 'Restaurante'},
    { type: 'Hospedagem'},
    { type: 'Rampa de acesso'},
    { type: 'Loja'},
  ]

  for (const infra of Infrastructure) {
    await prisma.infrastructure.create({
      data: infra
    })
  }

  const Park = [
    { 
      park_name: 'Parque Carlos Botelho', 
      description: 'O parque ecológico municipal Zila Sisternas Fiorenzo - "da Biquinha”, situado próximo ao centro de Sorocaba, foi inaugurado em 1976 e encontra-se numa área verde que ocupa cerca de um alqueire. Essa área de topografia acidentada é privilegiada por fazer parte de uma bacia hidrográfica com nascentes e lago que embelezam a paisagem.', 
      site: 'https://turismo.sorocaba.sp.gov.br/visite/parque-da-biquinha-2/', 
      parkImage: 'https://i.ibb.co/T4fxmkt/imagem-2024-06-17-194743870.png',
      street: 'Av. Comendador Pereira Inácio',
      number: '1112',
      zipCode: '18030005',
      publicPlace: '',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Emilia',
      core: '1'
    },

    {
      park_name: 'Parque Ecológico do Tietê',
      description: 'Inaugurado em 1982 e com mais de 14 milhões de m2, está localizado na Zona Leste de São Paulo. Além de preservar fauna e flora da várzea do rio Tietê, o parque proporciona uma série de atividades culturais, educacionais, recreativas, esportivas e de lazer, recebendo mais de 330 mil visitantes todo mês. Principais atrações: Centro de Educação Ambiental, Centro Cultural, Museu do Tietê, biblioteca e Centro de Recepção de Animais Silvestres, que abriga 2 mil animais apreendidos ou doados. O projeto arquitetônico e paisagístico do parque foi concebido pelo arquiteto Ruy Ohtak.',
      site: 'https://www.parqueecologicodotiete.com.br/#google_vignette', 
      parkImage: 'https://i.ibb.co/c24fF4n/imagem-2024-06-18-224832013.png',
      street: 'Rodovia Parque',
      number: '8054',
      zipCode: '3719000',
      publicPlace: 'Parque Engenheiro Goulart',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Santo Henrique',
      core: '1'
    },

    {
      park_name: 'Parque Nacional do Iguaçu',
      description: 'O Parque Nacional do Iguaçu (PARNA Iguaçu) é uma Unidade de Conservação(UC) Federal que tem por objetivo proteger um dos mais significativos remanescentes da Mata Atlântica na América do Sul, palco do espetáculo das Cataratas do rio Iguaçu e moradia de espécies importantes da biodiversidade brasileira.',
      site: 'https://www.icmbio.gov.br/parnaiguacu/', 
      parkImage: 'https://i.ibb.co/LCsYS2z/imagem-2024-06-18-230253284.png',
      street: 'Rodovia BR 469',
      number: '225',
      zipCode: '85859899',
      publicPlace: 'Km 22,5',
      city: 'Foz do Iguaçu',
      state: 'PR',
      neighborhood: '',
      core: 'Sede Administrativa'
    },
]

  for (const parks of Park) {
    await prisma.park.create({
      data: parks
    })
  }

const Activity = [
  {
    percurso: 20000, //em metros
    duracao: 180, //em minutos
    description: 'Trilha guiada por dentro das áreas monitoradas do Parque.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Trilha',
    activityImage: 'https://i.ibb.co/M73gfTW/imagem-2024-06-18-210742738.png',
    parkId: 1,
  },

  {
    percurso: 0,
    duracao: 120,
    description: 'Prática de plantio nos viveiros do Parque para incentivar crianças e outros indivíduos a importância de cuidar do nosso planeta.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Plantio',
    activityImage: 'https://i.ibb.co/VJzBjmr/imagem-2024-06-19-192807973.png',
    parkId: 1,
  },

  {
    percurso: 1000,
    duracao: 120,
    description: 'Escalada de montanhas',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Escalada',
    activityImage: 'https://i.ibb.co/hcgMSgs/imagem-2024-06-18-222816697.png',
    parkId: 2,
  },

  {
    percurso: 5500,
    duracao: 60,
    description: 'Canoagem por meio dos riachos que se encontram em volta do Parque.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Canoagem',
    activityImage: 'https://i.ibb.co/VYnN6gs/imagem-2024-06-18-223140080.png',
    parkId: 3,
  },
]

for (const activities of Activity) {
  await prisma.activity.create({
    data: activities
  })
}

const GoodPractice = [
  {
    title: 'Reciclagem: Separar os resíduos sólidos em diferentes categorias, como plástico, papel, metal e vidro, para que possam ser reciclados e transformados em novos produtos. Isso reduz a quantidade de resíduos enviados para aterros sanitários e minimiza o uso de recursos naturais na produção de novos materiais.',
    practiceImage: 'https://i.ibb.co/vXHVJ8N/imagem-2024-06-18-202120272.png',
    parkId: 1
  },

  {
    title: 'Economia de água: Implementar hábitos como fechar torneiras enquanto escova os dentes, consertar vazamentos rapidamente, instalar dispositivos economizadores de água nos chuveiros e torneiras, e utilizar sistemas de captação de água da chuva para atividades não potáveis. A água é um recurso limitado e essencial para a vida, por isso economizá-la é crucial.',
    practiceImage: 'https://i.ibb.co/SmxXXgx/imagem-2024-06-18-202747702.png',
    parkId: 1,
  },

  {
    title: 'Economia de energia: Adotar medidas como trocar lâmpadas incandescentes por lâmpadas LED mais eficientes, desligar aparelhos eletrônicos da tomada quando não estiverem sendo utilizados (pois muitos continuam consumindo energia em standby), usar aparelhos com selo de eficiência energética, e investir em fontes de energia renovável, como painéis solares.',
    practiceImage: 'https://i.ibb.co/9VpMTxh/imagem-2024-06-18-202857462.png',
    parkId: 1,
  },

  {
    title: 'Transporte sustentável: Optar por formas de transporte que emitam menos gases poluentes, como caminhar, andar de bicicleta, usar transporte público ou veículos elétricos. Isso ajuda a reduzir a emissão de gases de efeito estufa e melhora a qualidade do ar nas cidades.',
    practiceImage: 'https://i.ibb.co/1s4KKMC/imagem-2024-06-18-202948792.png',
    parkId: 2,
  },
  
  {
    title: 'Redução do uso de plástico: Evitar o consumo excessivo de plásticos descartáveis, como sacolas, copos, talheres e garrafas. Optar por alternativas reutilizáveis, como sacolas de pano, garrafas de metal ou vidro e utensílios duráveis, ajuda a diminuir a poluição por plásticos nos oceanos e no meio ambiente em geral.',
    practiceImage: 'https://i.ibb.co/092kdVx/imagem-2024-06-18-203303172.png',
    parkId: 2,
  },

  {
    title: 'Conservação da biodiversidade: Apoiar iniciativas de conservação de ecossistemas naturais, como florestas, manguezais e recifes de coral. Participar de programas de reflorestamento, proteção de espécies ameaçadas e áreas protegidas contribui para a manutenção da biodiversidade e dos serviços ecossistêmicos essenciais para o planeta.',
    practiceImage: 'https://i.ibb.co/WvYxykd/imagem-2024-06-18-203800640.png',
    parkId: 2,
  },

  {
    title: 'Compostagem: Transformar resíduos orgânicos, como restos de alimentos e folhas secas, em adubo natural através da compostagem. Esse adubo pode ser usado em jardins, hortas e plantações, reduzindo a necessidade de fertilizantes químicos e contribuindo para um ciclo de nutrientes mais sustentável.',
    practiceImage: 'https://i.ibb.co/hcPg8gJ/imagem-2024-06-18-203853810.png',
    parkId: 3,
  },

  {
    title: 'Consumo consciente: Escolher produtos que sejam duráveis, fabricados de forma responsável e que gerem menos impacto ambiental ao longo de seu ciclo de vida. Priorizar produtos com certificações ambientais e éticas, como orgânicos, Fair Trade (comércio justo) e com baixa pegada de carbono, ajuda a promover práticas mais sustentáveis na cadeia produtiva.',
    practiceImage: 'https://i.ibb.co/0QMkLL5/imagem-2024-06-18-203957310.png',
    parkId: 3,
  },

  {
    title: 'Participação em iniciativas locais: Engajar-se em projetos comunitários de preservação ambiental, como limpeza de praias, parques e ruas, além de apoiar políticas públicas que promovam a sustentabilidade ambiental. A participação ativa na vida pública e o apoio a medidas ambientais contribuem para um ambiente mais limpo e saudável para todos.',
    practiceImage: 'https://i.ibb.co/Vmh95VZ/imagem-2024-06-18-204124265.png',
    parkId: 3,
  },
]

for (const goodPractices of GoodPractice) {
  await prisma.goodPractice.create({
    data: goodPractices
  })
}

const Event = [
  {
    event_name: 'Festival de Artes Híbridas de Sorocaba',
    description: 'O 2º Festival de Artes Híbridas (FAH) ocorrerá nos dias 22 e 23/06, a partir das 14h, no Parque da Biquinha, unindo arte, natureza e cultura em uma experiência itinerante pelas trilhas do parque. O evento gratuito apresenta diversas expressões artísticas, como teatro, dança, performance e música, com curadoria de Robson Catalunha e participação de diversos artistas.',
    start_date: new Date(2024, 6, 22),
    end_date: new Date(2024, 6, 23),
    locationRef: '',
    eventImage: 'https://i.ibb.co/XpjjmGJ/imagem-2024-06-18-194846935.png',
    parkId: 1,
  },
  
  {
    event_name: 'Corrida e Caminhada Solidária',
    description: 'A Corrida e Caminhada Inclusão Social 2024, será realizada no Parque Ecológico do Tiete.',
    start_date: new Date(2024, 5, 10),
    end_date: new Date(2024, 5, 17),
    locationRef: '',
    eventImage: 'https://i.ibb.co/t8bWnhr/imagem-2024-06-17-231804175.png',
    parkId: 2,
  },

  {
    event_name: 'Excursão Foz do Iguaçu',
    description: 'Excursão pelo Parque, apresentando seu grande número de quedas de água e cachoeiras.',
    start_date: new Date(2024, 7, 23),
    end_date: new Date(2024, 7, 23),
    locationRef: '',
    eventImage: 'https://i.ibb.co/JtDMw5W/imagem-2024-06-19-195256461.png',
    parkId: 3,
  },
]

for (const events of Event) {
  await prisma.event.create({
    data: events
  })
}

const OpeningHours = [
  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T15:00:00.000Z'),
    parkId: 1,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T12:00:00.000Z'),
    parkId: 2,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 3,
  },
]

for (const openingHour of OpeningHours) {
  await prisma.openingHours.create({
    data: openingHour
  })
}

const ParkForestType = [
  {
    parkId: 1,
    forestTypeId: 2,
  },

  {
    parkId: 1,
    forestTypeId: 3,
  },

  {
    parkId: 2,
    forestTypeId: 5,
  },

  {
    parkId: 3,
    forestTypeId: 1,
  },
]

for (const pkForestTp of ParkForestType) {
  await prisma.parkForestType.create({
    data: pkForestTp
  })
}

const ParkInfrastructure = [
  {
    status: true,
    parkId: 1,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 1,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 1,
    infrastructureId: 4,
  },

  {
    status: true,
    parkId: 1,
    infrastructureId: 5,
  },

  {
    status: true,
    parkId: 2,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 2,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 2,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 2,
    infrastructureId: 4,
  },

  {
    status: true,
    parkId: 3,
    infrastructureId: 1,
  },
  
  {
    status: true,
    parkId: 3,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 3,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 3,
    infrastructureId: 5,
  },

  {
    status: true,
    parkId: 3,
    infrastructureId: 6,
  },
]

for (const parkInfra of ParkInfrastructure) {
  await prisma.parkInfrastructure.create({
    data: parkInfra
  })
}

const users = [
  {
    name: 'Gusthavo Rangel Vieira',
    email: 'gusthavorangel@gmail.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654321',
    group: Groups.ADMINISTRADOR,
  },
  {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654321',
    group: Groups.GERENTE,
  },
  {
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '21987654321',
    group: Groups.GERENTE,
  },
  {
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '31987654321',
    group: Groups.GERENTE,
  },
  {
    name: 'Paulo Pereira',
    email: 'paulo.pereira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '41987654321',
    group: Groups.GUIA,
  },
  {
    name: 'Rafael Almeida',
    email: 'rafael.almeida@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '51987654321',
    group: Groups.GUIA,
  },
  {
    name: 'Beatriz Costa',
    email: 'beatriz.costa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654321',
    group: Groups.VISITANTE,
  },
];

for (const user of users) {
  await prisma.user.create({
    data: user,
  });
}

const parkManagers = [
  {
    cpf: '12345678901',
    rg: 'MG1234567',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 1,
    userId: 2,
    userManagerId: 1,
  },
  {
    cpf: '23456789012',
    rg: '602345678',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 2,
    userId: 3, 
    userManagerId: 1,
  },
  {
    cpf: '34567890123',
    rg: '603456789',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 3,
    userId: 4, 
    userManagerId: 1,
  },
];

for (const parkManager of parkManagers) {
  await prisma.parkManager.create({
    data: parkManager,
  });
}

const guides = [
  {
    gender: Gender.MASCULINO,
    biography: 'Paulo has a passion for wildlife and nature conservation.',
    nickname: 'Paulo',
    birthDate: new Date(1990,1,1),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/FVBTJBz/guia3.webp',
    userId: 5, 
    parkManagerId: 1, 
  },
  {
    gender: Gender.MASCULINO,
    biography: 'Rafael is an experienced guide with a love for history and culture.',
    nickname: 'Rafa',
    birthDate: new Date(1985,5,15),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/XpjkqbP/guia1.webp',
    userId: 6, 
    parkManagerId: 2, 
  },
];

for (const guide of guides) {
  await prisma.guide.create({ data: guide });
}

const specialtys = [
  { specialtyName: "Observação de Aves" },
  { specialtyName: "Caminhada" },
  { specialtyName: "Fotografia da Natureza" },
  { specialtyName: "Turismo Ecológico" },
  { specialtyName: "Arborismo" },
  { specialtyName: "Mergulho" },
  { specialtyName: "Pesca Esportiva" },
  { specialtyName: "Ciclismo de Montanha" },
  { specialtyName: "Escalada" },
  { specialtyName: "Observação de Estrelas" },
];

for (const specialty of specialtys) {
  await prisma.specialty.create({ data: specialty });
}

const specialtyGuides = [
  {specialtyId: 1, guideId: 1},
  {specialtyId: 2, guideId: 1},
  {specialtyId: 3, guideId: 1},
  {specialtyId: 4, guideId: 2},
  {specialtyId: 5, guideId: 2},
  {specialtyId: 6, guideId: 2},
]

for (const specialtyGuide of specialtyGuides) {
  await prisma.specialtyGuide.create({ data: specialtyGuide });
}

const languageGuides = [
  {languageId: 2, guideId: 1},
  {languageId: 3, guideId: 1},
  {languageId: 2, guideId: 2},
  {languageId: 3, guideId: 2},
]

for (const languageGuide of languageGuides) {
  await prisma.languageGuide.create({ data: languageGuide });
}

const parkGuides = [
  {parkId: 1, guideId: 1},
  {parkId: 2, guideId: 2},
]

for (const parkGuide of parkGuides) {
  await prisma.parkGuide.create({ data: parkGuide });
}

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
