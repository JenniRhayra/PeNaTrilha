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

    {
      park_name: 'Parque Nacional da Chapada dos Veadeiros',
      description: 'O Parque Nacional da Chapada dos Veadeiros fica no estado de Goiás, no centro do Brasil. É conhecido pelos deslumbrantes desfiladeiros e formações de cristais de quartzo. O rio Preto tem piscinas rochosas e quedas de água, algumas delas com mais de 100 metros de altura. O parque de biodiversidade alberga várias espécies de orquídeas e de vida selvagem, incluindo tatus, jaguares e tucanos. O acesso ao parque faz-se através das cidades vizinhas do Alto Paraíso de Goiás ou de São Jorge.',
      site: 'https://www.icmbio.gov.br/parnachapadadosveadeiros/guia-do-visitante.html', 
      parkImage: 'https://i.ibb.co/HTTDw4y/imagem-2024-06-29-183228779.png',
      street: 'Rodovia GO 239',
      number: 'Km 36',
      zipCode: '73770000',
      publicPlace: 'Alto Paraíso de Goiás',
      city: 'Alto Paraíso',
      state: 'GO',
      neighborhood: 'Vila de São Jorge',
      core: '1'
    },

    {
      park_name: 'Parque Nacional Serra da Capivara',
      description: 'O Parque Nacional Serra da Capivara foi criado em 1979, para preservar vestígios arqueológicos da mais remota presença do homem na América do Sul. Sua demarcação foi concluída em 1990 e o parque é subordinado ao Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio). Por sua importância, a Unesco o inscreveu na Lista do Patrimônio Mundial em 13 de dezembro de 1991, e também na Lista Indicativa brasileira como patrimônio misto. ',
      site: 'http://portal.iphan.gov.br/pagina/detalhes/42', 
      parkImage: 'https://i.ibb.co/7GbX1wg/imagem-2024-06-29-184917030.png',
      street: 'Rua Dr. Luís Paixão',
      number: '188',
      zipCode: '64770000',
      publicPlace: '',
      city: 'João Costa',
      state: 'PI',
      neighborhood: 'Milonga',
      core: '1'
    },

    {
      park_name: 'Parque Nacional dos Lençóis Maranhenses',
      description: 'O Parque Nacional dos Lençóis Maranhenses é o destino perfeito para aqueles que buscam aventura e contemplação da natureza. Caminhar sobre as areias brancas do maior campo de dunas do Brasil, se refrescar em lagoas de água cristalina e observar o pôr-do-sol são experiências únicas que você levará para o resto da vida.',
      site: 'https://www.icmbio.gov.br/parnalencoismaranhenses/guia-do-visitante.html', 
      parkImage: 'https://i.ibb.co/kG8b5gr/imagem-2024-06-29-190056080.png',
      street: 'Rua Principal',
      number: '',
      zipCode: '65590000',
      publicPlace: '',
      city: 'Barreirinhas',
      state: 'MA',
      neighborhood: 'Povoado Cantinho',
      core: '1'
    },

    {
      park_name: 'Parque Nacional da Tijuca',
      description: 'Além de estar presente em quase todas as imagens marcantes do Rio de Janeiro e ser uma excelente alternativa de lazer para a população e turistas, o Parque Nacional da Tijuca tem muita história: suas florestas são resultado do primeiro grande projeto de reflorestamento no Mundo, iniciado em 1861. Após a destruição quase total da floresta para produção de carvão e plantio de café, as fontes de água que abasteciam a cidade começaram a secar.',
      site: 'https://www.icmbio.gov.br/parnatijuca/guia-do-visitante.html', 
      parkImage: 'https://i.ibb.co/ZY3hGb3/imagem-2024-06-29-190343245.png',
      street: 'Estrada da Cascadinha',
      number: '850',
      zipCode: '20531590',
      publicPlace: 'Alto da Boa Vista',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: '',
      core: '1'
    },

    {
      park_name: 'Parque Nacional Cavernas do Peruaçu',
      description: 'O Parque Nacional Cavernas do Peruaçu é um local onde belas paisagens são emolduradas pela arte rupestre pré-histórica, em sítios arqueológicos milenares de importância internacional e suas cavernas de grandeza colossal. A Unidade de Conservação foi criada em 1999, e possui uma área de 56.448 hectares, que compreende os municípios de Januária, Itacarambi e São João das Missões, na região norte de Minas Gerais.',
      site: 'https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/cerrado/lista-de-ucs/parna-cavernas-do-peruacu/informacoes-sobre-visitacao-parna-cavernas-do-peruacu', 
      parkImage: 'https://i.ibb.co/rG5DZvp/imagem-2024-06-29-192201295.png',
      street: 'BR 135',
      number: '',
      zipCode: '39480000',
      publicPlace: 'Km 155',
      city: 'Januária',
      state: 'MG',
      neighborhood: 'Comunidade do Fabião I',
      core: '1'
    },

    {
      park_name: 'Parque Nacional de Aparados da Serra',
      description: 'Inserido na região natural denominada comumente de Aparados da Serra, o Parque tem 13 141,05 hectares de área e perímetro de 63,00 km, fazendo fronteira tanto ao sul quanto ao norte ao Parque Nacional da Serra Geral, que também é administrado pelo ICMBio. Juntos, os dois parques abrangem uma área de aproximadamente 30.400 hectares.',
      site: 'https://www.icmbio.gov.br/parnaaparadosdaserra/', 
      parkImage: 'https://i.ibb.co/mNZ6xjt/imagem-2024-06-29-192417876.png',
      street: 'Rodovia RS 429',
      number: '',
      zipCode: '95480000',
      publicPlace: 'Km 18',
      city: 'Cambará do Sul',
      state: 'RS',
      neighborhood: '',
      core: '1'
    },

    {
      park_name: 'Área de Proteção Ambiental Costa dos Corais',
      description: 'A APA Costa dos Corais é um território tão especial que é protegido por Lei, gerido pelo ICMBio de forma participativa junto às instituições e comunidade local. Também pudera, uma das maiores faixas de recifes contínuos do mundo que se conecta com extensos manguezais, lar do peixe-boi e local de sustento de pescadores e pescadoras.',
      site: 'https://www.icmbio.gov.br/apacostadoscorais/guia-do-visitante.html', 
      parkImage: 'https://i.ibb.co/4FF8YD7/imagem-2024-06-29-193432300.png',
      street: 'Rua Samuel Hardman',
      number: '',
      zipCode: '55578000',
      publicPlace: 'Centro',
      city: 'Tamandaré',
      state: 'PE',
      neighborhood: '',
      core: '1'
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

  {
    percurso: 9000,
    duracao: 270,
    description: 'Localizada no município de Serranópolis do Iguaçu, a trilha possui 9km de extensão, é linear e tem várias saídas para a Estrada Velha de Guarapuava.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Trilha da Onça',
    activityImage: '',
    parkId: 3,
  },

  {
    percurso: 8000,
    duracao: 240,
    description: 'Aberto para visitantes em geral das 8h às 17h, todos os dias da semana e para observadores de aves a partir das 5h da manhã, acompanhados com condutores de visitantes credenciados. É necessário realizar agendamento.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Trilha da Cachoeira do Manoel Gomes',
    activityImage: 'https://i.ibb.co/6F1BYr5/imagem-2024-06-29-232708898.png',
    parkId: 3,
  },

  {
    percurso: 0,
    duracao: 180,
    description: 'Uma aventura de barco com muita adrenalina pelas corredeiras do Rio Iguaçu culminando num verdadeiro banho de cachoeira nas Cataratas do Iguaçu. O ponto de partida do passeio é no interior do Parque Nacional do Iguaçu.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Passeio de Barco',
    activityImage: 'https://i.ibb.co/q7Kgp0m/imagem-2024-06-29-232521153.png',
    parkId: 3,
  },

  {
    percurso: 11000,
    duracao: 480,
    description: 'O percurso é feito na maior parte do tempo em terreno acidentado e bastante pedregoso. Na ida, inclui a passagem pelo local conhecido como Garimpo, considerado o maior garimpo de cristal de quartzo da região.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Trilha dos Saltos, Carrossel e Corredeiras',
    activityImage: '',
    parkId: 4,
  },

  {
    percurso: 3000,
    duracao: 120,
    description: 'Setor de escalada no Mulungu onde os visitantes podem realizar a prática de escalada em algumas das íngremes encostas rochosas do parque.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Escalada do Morro da Baleia',
    activityImage: 'https://i.ibb.co/sJMTsFr/imagem-2024-06-29-221101542.png',
    parkId: 4,
  },

  {
    percurso: 1000,
    duracao: 120,
    description: 'O canionismo no rio Preto é uma das experiências mais intensas e fascinantes em contato com a natureza disponíveis aqu ino Parque Nacional da Chapada dos Veadeiros. A atividade de canionismo ocorre na temporada mais seca do ano, geralmente entre os meses de julho a setembro.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Canionismo',
    activityImage: 'https://i.ibb.co/YTS1Yng/imagem-2024-06-29-220753172.png',
    parkId: 4,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Há diversas pinturas rupestres presentes no parque, estas que representam uma parte da história do nosso país.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Pinturas Rupestres',
    activityImage: 'https://i.ibb.co/HB21HRL/imagem-2024-06-29-220234881.png',
    parkId: 5,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'No Parque, há pontos onde é possível observar uma variedade de pássaros diferentes.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Observação de Pássaros',
    activityImage: 'https://i.ibb.co/4Vq36DJ/imagem-2024-06-29-220156737.png',
    parkId: 5,
  },

  {
    percurso: 5000,
    duracao: 180,
    description: 'Para realizar a observação dos cânions e fendas presentes no parque, será necessário realizar algumas caminhadas não muito longas.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Observação de Cânions',
    activityImage: 'https://i.ibb.co/3RVjCtT/imagem-2024-06-29-220110056.png',
    parkId: 5,
  },

  {
    percurso: 1500000,
    duracao: 7200,
    description: 'Localizadas no interior do campo de dunas do Parque Nacional dos Lençóis Maranhenses, essas duas manchas de vegetação de restinga são verdadeiros oásis e um perfeito abrigo para pernoite para aqueles que buscam realizar o trekking de travessia do parque.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Queimada dos Britos e Baixa grande',
    activityImage: '',
    parkId: 6,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Piquenique nas áreas abertas e de visitação.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Piquenique',
    activityImage: 'https://i.ibb.co/D8tRF12/imagem-2024-06-29-214159415.png',
    parkId: 6,
  },

  {
    percurso: 15000,
    duracao: 0,
    description: 'Localizada a 15km de Barreirinhas, o atrativo apresenta grau médio de dificuldade de acesso, pois é necessário subir uma duna íngreme de cerca de 30 metros de altura. Há uma corda para auxiliar a subida.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Circuito da Lagoa Bonita',
    activityImage: 'https://i.ibb.co/R6t6DXt/imagem-2024-06-29-213928687.png',
    parkId: 6,
  },

  {
    percurso: 14000,
    duracao: 0,
    description: 'Trata-se do atrativo mais visitado da Unidade de Conservação. Após 12 Km de trilhas na restinga, o passeio segue pelo campo de dunas em uma trilha de aproximadamente 02 km.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Circuito da Lagoa Azul',
    activityImage: 'https://i.ibb.co/mHkZD83/imagem-2024-06-29-213719023.png',
    parkId: 6,
  },

  {
    percurso: 4000,
    duracao: 180,
    description: 'Também conhecida como Pedra Aguda, se destaca entre as montanhas do Parque por seu formato pontiagudo, apresentando uma caminhada curta, porém com alguns trechos acidentados. Essa montanha também é bastante procurada por escaladores.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Agulhinha da Gávea',
    activityImage: 'https://i.ibb.co/FmvhtWd/imagem-2024-06-29-213406285.png',
    parkId: 7,
  },

  {
    percurso: 5500,
    duracao: 300,
    description: 'O Bico do Papagaio tem seu cume a 989 metros de altitude e é um dos picos mais frequentados do Parque. Seu nome advém de sua semelhança com um bico de papagaio e do seu cume é possível vislumbrar uma das mais fantásticas vistas da cidade.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Bico do Papagaio',
    activityImage: 'https://i.ibb.co/Zdf5nC5/imagem-2024-06-29-212913675.png',
    parkId: 7,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'O Mirante Dona Marta está localizado na Estrada das Paineiras, a 364 metros de altitude. Por sua posição geográfica privilegiada, proporciona ao visitante uma vista detalhada da Cidade do Rio de Janeiro.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Mirante Dona Marta',
    activityImage: 'https://i.ibb.co/C9gPvfg/imagem-2024-06-29-212426418.png',
    parkId: 7,
  },

  {
    percurso: 7500,
    duracao: 330,
    description: 'Percorrendo os 7,5 quilômetros do Circuito do Vale Histórico o caminhante conhecerá as principais edificações, fontes e monumentos de interesse histórico-cultural do Setor Floresta.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Circuito do Vale Histórico',
    activityImage: 'https://i.ibb.co/g4HsNg7/imagem-2024-06-29-212146712.png',
    parkId: 7,
  },

  {
    percurso: 4800,
    duracao: 330,
    description: 'A Gruta do Janelão é o principal atrativo do Parque. A grandiosidade da caverna é expressa em suas enormes dolinas, na imensidão de seus salões e em seus gigantescos espeleotemas.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Trilha Gruta do Janelão',
    activityImage: 'https://i.ibb.co/T0WdTc6/imagem-2024-06-29-210802035.png',
    parkId: 8,
  },

  {
    percurso: 8000,
    duracao: 420,
    description: 'A trilha do Arco do André conta com mirantes naturais únicos, sendo dois deles o Mirante das Cinco Torres e do Mundo Inteiro, cavernas monumentais como a Caverna do Arco do André, Troncos e Cascudos, aonde nas duas últimas o Rio Peruaçu passa por dentro, complementando o cenário único formado pela beleza das rochas carbonáticas de calcário e pelo rio criando o espelho de água com a cor de tom verde esmeralda.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Trilha do Arco do André',
    activityImage: 'https://i.ibb.co/3k9TcHw/imagem-2024-06-29-211002819.png',
    parkId: 8,
  },

  {
    percurso: 1500,
    duracao: 140,
    description: 'A gruta Bonita é uma das mais belas e ornamentadas grutas do Parque e também a única caverna totalmente escura aberta a visitação. Possui salões e galerias repletos de espeleotemas.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Gruta Bonita',
    activityImage: 'https://i.ibb.co/268YP8z/imagem-2024-06-29-211358146.png',
    parkId: 8,
  },

  {
    percurso: 2600,
    duracao: 140,
    description: 'Os maiores atrativos da Lapa dos Desenhos são os fabulosos painéis de arte rupestre pré-histórica que se encontram na entrada da caverna.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Lapa dos Desenhos',
    activityImage: 'https://i.ibb.co/g6LtTyv/imagem-2024-06-29-211541090.png',
    parkId: 8,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Realização de atividades como contemplação dos cenários naturais do parque, fotografia ou pinturas das paisagens.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Contemplação, Fotografia ou Arte',
    activityImage: 'https://i.ibb.co/GkKnLTV/imagem-2024-06-29-210254869.png',
    parkId: 9,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Piqueniques em áreas autorizadas para descanso e alimentação.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Piquenique',
    activityImage: 'https://i.ibb.co/Yp95YMm/imagem-2024-06-29-210146102.png',
    parkId: 9,
  },

  {
    percurso: 2500,
    duracao: 60,
    description: 'Trilha que passa pelos planaltos do parque, se iniciando em Cambará do Sul.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Trilha Vértice',
    activityImage: 'https://i.ibb.co/zxnwVz3/imagem-2024-06-29-210033461.png',
    parkId: 9,
  },

  {
    percurso: 12000,
    duracao: 420,
    description: 'Trilha pelo Rio do Boi que passa pelo interior do parque. Se inicia em Praia Grande.',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.DIFICIL,
    activityName: 'Trilha Rio do Boi',
    activityImage: 'https://i.ibb.co/ssZ30Jx/imagem-2024-06-29-210000145.png',
    parkId: 9,
  },

  {
    percurso: 5000,
    duracao: 150,
    description: 'Bicicleta nas áreas de planalto',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Ciclismo',
    activityImage: 'https://i.ibb.co/zPgN8Yy/imagem-2024-06-29-205918952.png',
    parkId: 9,
  },

  {
    percurso: 0,
    duracao: 180,
    description: 'A exploração serviços de turismo náutico nas piscinas naturais dependem de autorização da APA Costa dos Corais',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Passeio às Piscinas Naturais',
    activityImage: 'https://i.ibb.co/7jp11zM/imagem-2024-06-29-203820097.png',
    parkId: 10,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Mergulho com snorkel que pode ser realizado na área costeira.',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Mergulho Livre',
    activityImage: 'https://i.ibb.co/PGh9RPJ/imagem-2024-06-29-204014621.png',
    parkId: 10,
  },

  {
    percurso: 0,
    duracao: 60,
    description: 'Mergulho com equipamento de mergulho autônomo com presença em tempo integral do instrutor de mergulho',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Batismo',
    activityImage: 'https://i.ibb.co/ZV2NgMZ/imagem-2024-06-29-204256847.png',
    parkId: 10,
  },

  {
    percurso: 0,
    duracao: 0,
    description: 'Pesca esportiva que pode ser realizada por pescadores credenciados pelo Ministério da Pesca e Aquicultura - MPA',
    isMonitored: false,
    difficultyLevel: DifficultyLevel.FACIL,
    activityName: 'Pesca Esportiva',
    activityImage: 'https://i.ibb.co/Zzj2Fz6/imagem-2024-06-29-204524318.png',
    parkId: 10,
  },

  {
    percurso: 2000,
    duracao: 120,
    description: 'Curso para aprendizado de mergulho individual que só pode ser ministrado por instrutor de mergulho credenciado',
    isMonitored: true,
    difficultyLevel: DifficultyLevel.MEDIO,
    activityName: 'Curso de Mergulho Autônomo',
    activityImage: '',
    parkId: 10,
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
    parkId: 3,
  },

  {
    title: 'Transporte sustentável: Optar por formas de transporte que emitam menos gases poluentes, como caminhar, andar de bicicleta, usar transporte público ou veículos elétricos. Isso ajuda a reduzir a emissão de gases de efeito estufa e melhora a qualidade do ar nas cidades.',
    practiceImage: 'https://i.ibb.co/1s4KKMC/imagem-2024-06-18-202948792.png',
    parkId: 4,
  },
  
  {
    title: 'Redução do uso de plástico: Evitar o consumo excessivo de plásticos descartáveis, como sacolas, copos, talheres e garrafas. Optar por alternativas reutilizáveis, como sacolas de pano, garrafas de metal ou vidro e utensílios duráveis, ajuda a diminuir a poluição por plásticos nos oceanos e no meio ambiente em geral.',
    practiceImage: 'https://i.ibb.co/092kdVx/imagem-2024-06-18-203303172.png',
    parkId: 6,
  },

  {
    title: 'Conservação da biodiversidade: Apoiar iniciativas de conservação de ecossistemas naturais, como florestas, manguezais e recifes de coral. Participar de programas de reflorestamento, proteção de espécies ameaçadas e áreas protegidas contribui para a manutenção da biodiversidade e dos serviços ecossistêmicos essenciais para o planeta.',
    practiceImage: 'https://i.ibb.co/WvYxykd/imagem-2024-06-18-203800640.png',
    parkId: 6,
  },

  {
    title: 'Compostagem: Transformar resíduos orgânicos, como restos de alimentos e folhas secas, em adubo natural através da compostagem. Esse adubo pode ser usado em jardins, hortas e plantações, reduzindo a necessidade de fertilizantes químicos e contribuindo para um ciclo de nutrientes mais sustentável.',
    practiceImage: 'https://i.ibb.co/hcPg8gJ/imagem-2024-06-18-203853810.png',
    parkId: 7,
  },

  {
    title: 'Consumo consciente: Escolher produtos que sejam duráveis, fabricados de forma responsável e que gerem menos impacto ambiental ao longo de seu ciclo de vida. Priorizar produtos com certificações ambientais e éticas, como orgânicos, Fair Trade (comércio justo) e com baixa pegada de carbono, ajuda a promover práticas mais sustentáveis na cadeia produtiva.',
    practiceImage: 'https://i.ibb.co/0QMkLL5/imagem-2024-06-18-203957310.png',
    parkId: 8,
  },

  {
    title: 'Participação em iniciativas locais: Engajar-se em projetos comunitários de preservação ambiental, como limpeza de praias, parques e ruas, além de apoiar políticas públicas que promovam a sustentabilidade ambiental. A participação ativa na vida pública e o apoio a medidas ambientais contribuem para um ambiente mais limpo e saudável para todos.',
    practiceImage: 'https://i.ibb.co/Vmh95VZ/imagem-2024-06-18-204124265.png',
    parkId: 8,
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

  {
    event_name: 'Chapada dos Veadeiros Turma 2',
    description: 'Um dos destinos turísticos mais visitados do mundo! A Chapada dos Veadeiros abriga as mais diversas belezas naturais do cerrado, com cânions, cachoeiras e mirantes além da rica fauna que conta com presença de animais magníficos como a onça-pintada e lobo guará, além de inúmeras espécies de pássaros e outros animais.',
    start_date: new Date(2024, 7, 6),
    end_date: new Date(2024, 7, 9),
    locationRef: 'Aeroporto Internacional de Brasília BSB',
    eventImage: 'https://i.ibb.co/TkRSrjR/imagem-2024-06-30-121431758.png',
    parkId: 4,
  },

  {
    event_name: 'Chapada Dreams 7 Anos',
    description: 'Estamos felizes em celebrar sete anos de música, amizade e conexões inesquecíveis neste lugar mágico. Nossa missão é criar experiências que harmonizem pessoas e natureza, e este ano preparamos uma programação especial com atrações musicais, cenografia, atividades revigorantes e uma gastronomia deliciosa. Agradecemos a todos que fazem parte desta jornada, desde os participantes que nos acompanham há anos até aqueles que estão conosco pela primeira vez. Vocês são a essência dessa celebração.',
    start_date: new Date(2024, 7, 13),
    end_date: new Date(2024, 7, 14),
    locationRef: 'Cachoeira dos Cristais',
    eventImage: 'https://i.ibb.co/xJqtfLm/imagem-2024-06-30-122536104.png',
    parkId: 4,
  },

  {
    event_name: 'Ópera da Serra da Capivara',
    description: 'O Parque Nacional Serra da Capivara, no Piauí, é a maior e mais antiga concentração de sítios arqueológicos pré-históricos da América. Pinturas rupestres que indicam a presença humana na região há mais de 50 mil anos estão conservadas em suas formações rochosas, que compõem um monumental museu a céu aberto e serão cenário para a quinta edição da Ópera da Serra da Capivara.',
    start_date: new Date(2024, 7, 29),
    end_date: new Date(2024, 7, 29),
    locationRef: '',
    eventImage: 'https://i.ibb.co/xgGmjK4/imagem-2024-06-30-121842321.png',
    parkId: 5,
  },


  {
    event_name: 'Trilha do Corcovado com acesso ao Cristo Redentor',
    description: 'Trilha do Corcovado com Parque Lage com acesso ao monumento Cristo Redentor.',
    start_date: new Date(2024, 7, 15),
    end_date: new Date(2024, 7, 15),
    locationRef: 'Parque Lage',
    eventImage: 'https://i.ibb.co/pjy9T9c/imagem-2024-06-30-123908167.png',
    parkId: 7,
  },

  {
    event_name: 'Expedição Fotográfica Cavernas do Peruaçu',
    description: 'Evento fotográfico com o objetivo de contemplar a natureza e as belezas das Cavernas do Peruaçu.',
    start_date: new Date(2025, 5, 13),
    end_date: new Date(2025, 5, 17),
    locationRef: 'Parque Nacional Cavernas do Peruaçu',
    eventImage: 'https://i.ibb.co/VWHcL80/imagem-2024-06-30-124321312.png',
    parkId: 8,
  },

  {
    event_name: 'Roteiro Tradicional 2024',
    description: 'programação que dura 5 dias e 4 noites que irá proporcionar aos visitantes diversas atividades e passeios ao longo deste período.',
    start_date: new Date(2024, 8, 12),
    end_date: new Date(2024, 8, 17),
    locationRef: '',
    eventImage: 'https://i.ibb.co/BwgKsZW/imagem-2024-06-30-125213022.png',
    parkId: 9,
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

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T07:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 4,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 5,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T06:00:00.000Z'),
    endTime: new Date('1970-01-01T14:00:00.000Z'),
    parkId: 6,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 7,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T09:00:00.000Z'),
    endTime: new Date('1970-01-01T16:00:00.000Z'),
    parkId: 8,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T18:00:00.000Z'),
    parkId: 9,
  },

  {
    dayWeek: DayWeek.SEGUNDA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },
  
  {
    dayWeek: DayWeek.TERCA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },

  {
    dayWeek: DayWeek.QUARTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },

  {
    dayWeek: DayWeek.QUINTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },

  {
    dayWeek: DayWeek.SEXTA,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },

  {
    dayWeek: DayWeek.SABADO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
  },

  {
    dayWeek: DayWeek.DOMINGO,
    startTime: new Date('1970-01-01T08:00:00.000Z'),
    endTime: new Date('1970-01-01T17:00:00.000Z'),
    parkId: 10,
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
    parkId: 2,
    forestTypeId: 3,
  },

  {
    parkId: 3,
    forestTypeId: 5,
  },

  {
    parkId: 4,
    forestTypeId: 1,
  },

  {
    parkId: 5,
    forestTypeId: 6,
  },

  {
    parkId: 6,
    forestTypeId: 7,
  },

  {
    parkId: 7,
    forestTypeId: 2,
  },

  {
    parkId: 8,
    forestTypeId: 1,
  },

  {
    parkId: 9,
    forestTypeId: 5,
  },

  {
    parkId: 10,
    forestTypeId: 3,
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

  {
    status: true,
    parkId: 4,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 4,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 4,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 5,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 5,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 5,
    infrastructureId: 4,
  },

  {
    status: true,
    parkId: 5,
    infrastructureId: 6,
  },

  {
    status: true,
    parkId: 6,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 6,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 6,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 6,
    infrastructureId: 4,
  },

  {
    status: true,
    parkId: 7,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 7,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 7,
    infrastructureId: 4,
  },

  {
    status: true,
    parkId: 8,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 8,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 8,
    infrastructureId: 5,
  },

  {
    status: true,
    parkId: 8,
    infrastructureId: 6,
  },

  {
    status: true,
    parkId: 9,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 9,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 9,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 10,
    infrastructureId: 1,
  },

  {
    status: true,
    parkId: 10,
    infrastructureId: 2,
  },

  {
    status: true,
    parkId: 10,
    infrastructureId: 3,
  },

  {
    status: true,
    parkId: 10,
    infrastructureId: 4,
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
    name: 'João Pereira',
    email: 'joao.pereira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654333',
    group: Groups.ADMINISTRADOR,
  },

  {
    name: 'Ana Souza',
    email: 'ana.souza@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654334',
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
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654335',
    group: Groups.GERENTE,
  },

  {
    name: 'Beatriz Santos',
    email: 'beatriz.santos@example.com',
    password: '$$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654336',
    group: Groups.GERENTE,
  },

  {
    name: 'Lucas Lima',
    email: 'lucas.lima@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654337',
    group: Groups.GERENTE,
  },

  {
    name: 'Fernanda Alves',
    email: 'fernanda.alves@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654338',
    group: Groups.GERENTE,
  },

  {
    name: 'Rafael Fernandes',
    email: 'rafael.fernandes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654339',
    group: Groups.GERENTE,
  },

  {
    name: 'Juliana Costa',
    email: 'juliana.costa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654340',
    group: Groups.GERENTE,
  },

  {
    name: 'Marcio Araujo',
    email: 'marcio.araujo@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654341',
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
    name: 'Patrícia Dias',
    email: 'patricia.dias@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654342',
    group: Groups.GUIA,
  },

  {
    name: 'Mariana Carvalho',
    email: 'mariana.carvalho@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654343',
    group: Groups.GUIA
  },

  {
    name: 'Pedro Martins',
    email: 'pedro.martins@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654344',
    group: Groups.GUIA
  },

  {
    name: 'Júlia Ferreira',
    email: 'julia.ferreira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654345',
    group: Groups.GUIA
  },

  {
    name: 'Felipe Almeida',
    email: 'felipe.almeida@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654346',
    group: Groups.GUIA
  },

  {
    name: 'Gabriela Rocha',
    email: 'gabriela.rocha@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654347',
    group: Groups.GUIA
  },

  {
    name: 'Leonardo Ribeiro',
    email: 'leonardo.ribeiro@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654348',
    group: Groups.GUIA
  },

  {
    name: 'Larissa Lopes',
    email: 'larissa.lopes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654349',
    group: Groups.GUIA
  },

  {
    name: 'Ricardo Silva',
    email: 'ricardo.silva@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654350',
    group: Groups.GUIA
  },

  {
    name: 'Tatiana Costa',
    email: 'tatiana.costa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654351',
    group: Groups.GUIA
  },

  {
    name: 'Vinícius Mendes',
    email: 'vinicius.mendes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654352',
    group: Groups.GUIA
  },

  {
    name: 'Sofia Barbosa',
    email: 'sofia.barbosa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654353',
    group: Groups.GUIA
  },

  {
    name: 'Miguel Cardoso',
    email: 'miguel.cardoso@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654354',
    group: Groups.GUIA
  },

  {
    name: 'Bianca Gomes',
    email: 'bianca.gomes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654355',
    group: Groups.GUIA
  },

  {
    name: 'Thiago Araújo',
    email: 'thiago.araujo@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654356',
    group: Groups.GUIA
  },

  {
    name: 'Camila Martins',
    email: 'camila.martins@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654357',
    group: Groups.GUIA
  },

  {
    name: 'Gustavo Silva',
    email: 'gustavo.silva@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654358',
    group: Groups.GUIA
  },

  {
    name: 'Raquel Almeida',
    email: 'raquel.almeida@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654359',
    group: Groups.GUIA
  },

  {
    name: 'Daniel Sousa',
    email: 'daniel.sousa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654360',
    group: Groups.GUIA
  },

  {
    name: 'Alice Oliveira',
    email: 'alice.oliveira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654361',
    group: Groups.GUIA
  },

  {
    name: 'Marcelo Mendes',
    email: 'marcelo.mendes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '11987654362',
    group: Groups.GUIA
  },
  
  {
    name: 'Beatriz Costa',
    email: 'beatriz.costa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654321',
    group: Groups.VISITANTE,
  },
 
  {
    name: 'Bruno Lima',
    email: 'bruno.lima@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654322',
    group: Groups.VISITANTE
  },

  {
    name: 'Clara Melo',
    email: 'clara.melo@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654323',
    group: Groups.VISITANTE
  },

  {
    name: 'Diego Nunes',
    email: 'diego.nunes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654324',
    group: Groups.VISITANTE
  },

  {
    name: 'Eliana Vieira',
    email: 'eliana.vieira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654325',
    group: Groups.VISITANTE
  },

  {
    name: 'Fábio Almeida',
    email: 'fabio.almeida@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654326',
    group: Groups.VISITANTE
  },

  {
    name: 'Giovana Barbosa',
    email: 'giovana.barbosa@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654327',
    group: Groups.VISITANTE
  },

  {
    name: 'Henrique Rocha',
    email: 'henrique.rocha@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654328',
    group: Groups.VISITANTE
  },

  {
    name: 'Isabela Santos',
    email: 'isabela.santos@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654329',
    group: Groups.VISITANTE
  },

  {
    name: 'Jorge Teixeira',
    email: 'jorge.teixeira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654330',
    group: Groups.VISITANTE
  },

  {
    name: 'Karen Ferreira',
    email: 'karen.ferreira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654331',
    group: Groups.VISITANTE
  },

  {
    name: 'Lucas Batista',
    email: 'lucas.batista@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654332',
    group: Groups.VISITANTE
  },

  {
    name: 'Marta Correia',
    email: 'marta.correia@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654333',
    group: Groups.VISITANTE
  },

  {
    name: 'Nicolas Ramos',
    email: 'nicolas.ramos@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654334',
    group: Groups.VISITANTE
  },

  {
    name: 'Olivia Oliveira',
    email: 'olivia.oliveira@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654335',
    group: Groups.VISITANTE
  },

  {
    name: 'Paulo Moraes',
    email: 'paulo.moraes@example.com',
    password: '$2a$08$0/k9D/lzETUK5ki45pvOeu6pJ1Nz0jfVPvEILUfRDRrLRmPa68KwO',
    phone: '61987654336',
    group: Groups.VISITANTE
  }
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
    userId: 4,
    userManagerId: 1,
  },

  {
    cpf: '23456789012',
    rg: '602345678',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 2,
    userId: 5, 
    userManagerId: 1,
  },

  {
    cpf: '34567890124',
    rg: '603456789',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 3,
    userId: 6, 
    userManagerId: 1,
  },

  {
    cpf: '90123456789',
    rg: '609012345',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 4,
    userId: 7,
    userManagerId: 1
  },
  {
    cpf: '01234567890',
    rg: '610123456',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 5,
    userId: 8,
    userManagerId: 1
  },
  {
    cpf: '12345678902',
    rg: '611234567',
    approvalStatus: ApprovalStatus.REPROVADO,
    parkId: 6,
    userId: 9,
    userManagerId: 1
  },
  {
    cpf: '23456789013',
    rg: '612345678',
    approvalStatus: ApprovalStatus.PENDENTE,
    parkId: 7,
    userId: 10,
    userManagerId: 1
  },
  {
    cpf: '34567890123',
    rg: '613456789',
    approvalStatus: ApprovalStatus.PENDENTE,
    parkId: 8,
    userId: 11,
    userManagerId: 1
  },
  {
    cpf: '45678901234',
    rg: '614567890',
    approvalStatus: ApprovalStatus.APROVADO,
    parkId: 9,
    userId: 12,
    userManagerId: 1
  },
  {
    cpf: '56789012345',
    rg: '615678901',
    approvalStatus: ApprovalStatus.REPROVADO,
    parkId: 10,
    userId: 13,
    userManagerId: 1
  }
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
    userId: 14, 
    parkManagerId: 1, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Rafael is an experienced guide with a love for history and culture.',
    nickname: 'Rafa',
    birthDate: new Date(1985,5,15),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/XpjkqbP/guia1.webp',
    userId: 15, 
    parkManagerId: 1, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Patricia has a passion for wildlife and enjoys sharing his knowledge with visitors.',
    nickname: 'Rafa',
    birthDate: new Date(1975,8,19),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/51KNFgt/imagem-2024-06-30-155022150.png',
    userId: 16, 
    parkManagerId: 2, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Mariana is a dedicated guide who loves exploring ancient ruins and sharing their stories.',
    nickname: 'Mari',
    birthDate: new Date(1980, 5, 15),
    approvalStatus: ApprovalStatus.REPROVADO,
    guideImage: 'https://i.ibb.co/T0xwVRT/imagem-2024-06-30-160356414.png',
    userId: 17, 
    parkManagerId: 2, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Pedro is a nature enthusiast with extensive knowledge of local flora and fauna.',
    nickname: 'Pedrinho',
    birthDate: new Date(1990, 11, 22),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/J2jDt5v/imagem-2024-06-30-160532504.png',
    userId: 18, 
    parkManagerId: 3, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Júlia is a history buff who enjoys uncovering the secrets of historic landmarks.',
    nickname: 'Júlia',
    birthDate: new Date(1965, 2, 10),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/3CtbDdj/imagem-2024-06-30-161006021.png',
    userId: 19, 
    parkManagerId: 3, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Felipe is a skilled guide who specializes in architectural tours and urban exploration.',
    nickname: 'Felipe',
    birthDate: new Date(1978, 6, 30),
    approvalStatus: ApprovalStatus.REPROVADO,
    guideImage: 'https://i.ibb.co/6wQq0XM/imagem-2024-06-30-160611255.png',
    userId: 20, 
    parkManagerId: 4, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Gabriela is an avid birdwatcher who loves guiding visitors through natural reserves.',
    nickname: 'Gabi',
    birthDate: new Date(1992, 1, 17),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/fY6Lbpj/imagem-2024-06-30-162123122.png',
    userId: 21, 
    parkManagerId: 4, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Leonardo',
    nickname: 'Leo',
    birthDate: new Date(1983, 3, 25),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/1MB02k3/imagem-2024-06-30-160640208.png',
    userId: 22, 
    parkManagerId: 5, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Larissa has a deep appreciation for art and enjoys leading tours in museums and galleries.',
    nickname: 'Lari',
    birthDate: new Date(1976, 9, 5),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/61mp8FH/imagem-2024-06-30-162154834.png',
    userId: 23, 
    parkManagerId: 5, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Ricardo is an outdoor adventurer who excels in leading hiking and camping trips.',
    nickname: 'Ricardinho',
    birthDate: new Date(1995, 7, 8),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/DDNmSLf/imagem-2024-06-30-160826067.png',
    userId: 24, 
    parkManagerId: 6, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Tatiana is passionate about marine life and enjoys conducting tours at aquariums and coastal areas.',
    nickname: 'Tati',
    birthDate: new Date(1988, 4, 20),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/h8hsw69/imagem-2024-06-30-162225042.png',
    userId: 25, 
    parkManagerId: 6, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Vinícius is an expert in geology who loves explaining the natural formations of the region.',
    nickname: 'Vini',
    birthDate: new Date(1973, 10, 11),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/RPJ9xCC/imagem-2024-06-30-161129328.png',
    userId: 26, 
    parkManagerId: 7, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Sofia is a cultural guide who specializes in local traditions and folklore.',
    nickname: 'Sofia',
    birthDate: new Date(1979, 11, 14),
    approvalStatus: ApprovalStatus.REPROVADO,
    guideImage: 'https://i.ibb.co/g3Jbfkc/imagem-2024-06-30-162251581.png',
    userId: 27, 
    parkManagerId: 7, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Miguel is a wildlife photographer who enjoys teaching visitors about animal behavior.',
    nickname: 'Miguel',
    birthDate: new Date(1982, 8, 6),
    approvalStatus: ApprovalStatus.REPROVADO,
    guideImage: 'https://i.ibb.co/MsBhbmw/imagem-2024-06-30-162439630.png',
    userId: 28, 
    parkManagerId: 8, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Bianca is a culinary guide with a deep love for local cuisine and food tours.',
    nickname: 'Bianca',
    birthDate: new Date(1991, 0, 19),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/zrWbnTB/imagem-2024-06-30-162338335.png',
    userId: 29, 
    parkManagerId: 8, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Thiago is an experienced guide who specializes in eco-tours and sustainable travel.',
    nickname: 'Thiaguinho',
    birthDate: new Date(1987, 5, 27),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/37sqmjd/imagem-2024-06-30-162612166.png',
    userId: 30, 
    parkManagerId: 9, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Camila is an art historian who enjoys leading tours in historic districts.',
    nickname: 'Camila',
    birthDate: new Date(1977, 2, 3),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/2ncdxnd/imagem-2024-06-30-162732830.png',
    userId: 31, 
    parkManagerId: 9, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Gustavo is a passionate guide with expertise in botany and plant life.',
    nickname: 'Gustavo',
    birthDate: new Date(1984, 10, 23),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/4gbjhT5/imagem-2024-06-30-162706054.png',
    userId: 32, 
    parkManagerId: 9, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Raquel is a seasoned guide who loves exploring historical battlefields and war sites.',
    nickname: 'Raquel',
    birthDate: new Date(1994, 9, 2),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/YkXkByx/imagem-2024-06-30-163000381.png',
    userId: 33, 
    parkManagerId: 10, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Daniel is a geographer who enjoys explaining the landscapes and physical features of the area.',
    nickname: 'Daniel',
    birthDate: new Date(1981, 6, 12),
    approvalStatus: ApprovalStatus.APROVADO,
    guideImage: 'https://i.ibb.co/jW0M5Nf/imagem-2024-06-30-162759295.png',
    userId: 34, 
    parkManagerId: 10, 
  },

  {
    gender: Gender.FEMININO,
    biography: 'Alice is an archaeology enthusiast who loves sharing the mysteries of ancient civilizations.',
    nickname: 'Alice',
    birthDate: new Date(1986, 4, 29),
    approvalStatus: ApprovalStatus.REPROVADO,
    guideImage: 'https://i.ibb.co/r7rTRzy/imagem-2024-06-30-163255761.png',
    userId: 35, 
    parkManagerId: 10, 
  },

  {
    gender: Gender.MASCULINO,
    biography: 'Marcelo is a dedicated guide who specializes in mountain trekking and adventure tours.',
    nickname: 'Marcelo',
    birthDate: new Date(1993, 7, 13),
    approvalStatus: ApprovalStatus.PENDENTE,
    guideImage: 'https://i.ibb.co/2kKQQpY/imagem-2024-06-30-162907443.png',
    userId: 36, 
    parkManagerId: 10, 
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
  {specialtyId: 1, guideId: 3},
  {specialtyId: 2, guideId: 3},
  {specialtyId: 3, guideId: 3},
  {specialtyId: 4, guideId: 3},
  {specialtyId: 5, guideId: 4},
  {specialtyId: 6, guideId: 4},
  {specialtyId: 1, guideId: 4},
  {specialtyId: 2, guideId: 4},
  {specialtyId: 3, guideId: 5},
  {specialtyId: 4, guideId: 5},
  {specialtyId: 5, guideId: 5},
  {specialtyId: 6, guideId: 6},
  {specialtyId: 1, guideId: 6},
  {specialtyId: 2, guideId: 6},
  {specialtyId: 3, guideId: 7},
  {specialtyId: 4, guideId: 7},
  {specialtyId: 5, guideId: 7},
  {specialtyId: 6, guideId: 7},
  {specialtyId: 1, guideId: 7},
  {specialtyId: 2, guideId: 8},
  {specialtyId: 3, guideId: 8},
  {specialtyId: 4, guideId: 8},
  {specialtyId: 5, guideId: 8},
  {specialtyId: 6, guideId: 9},
  {specialtyId: 1, guideId: 9},
  {specialtyId: 2, guideId: 10},
  {specialtyId: 3, guideId: 10},
  {specialtyId: 4, guideId: 10},
  {specialtyId: 5, guideId: 11},
  {specialtyId: 6, guideId: 11},
  {specialtyId: 7, guideId: 11},
  {specialtyId: 9, guideId: 12},
  {specialtyId: 3, guideId: 12},
  {specialtyId: 5, guideId: 12},
  {specialtyId: 1, guideId: 13},
  {specialtyId: 10, guideId: 13},
  {specialtyId: 7, guideId: 13},
  {specialtyId: 5, guideId: 14},
  {specialtyId: 4, guideId: 14},
  {specialtyId: 6, guideId: 14},
  {specialtyId: 2, guideId: 15},
  {specialtyId: 3, guideId: 15},
  {specialtyId: 1, guideId: 15},
  {specialtyId: 8, guideId: 16},
  {specialtyId: 9, guideId: 16},
  {specialtyId: 10, guideId: 16},
  {specialtyId: 7, guideId: 17},
  {specialtyId: 5, guideId: 17},
  {specialtyId: 4, guideId: 18},
  {specialtyId: 6, guideId: 18},
  {specialtyId: 2, guideId: 18},
  {specialtyId: 3, guideId: 18},
  {specialtyId: 1, guideId: 19},
  {specialtyId: 8, guideId: 19},
  {specialtyId: 9, guideId: 19},
  {specialtyId: 10, guideId: 19},
  {specialtyId: 7, guideId: 19},
  {specialtyId: 5, guideId: 20},
  {specialtyId: 4, guideId: 20},
  {specialtyId: 6, guideId: 20},
  {specialtyId: 2, guideId: 21},
  {specialtyId: 3, guideId: 21},
  {specialtyId: 1, guideId: 22},
  {specialtyId: 8, guideId: 22},
  {specialtyId: 9, guideId: 23},
  {specialtyId: 10, guideId: 23},

]

for (const specialtyGuide of specialtyGuides) {
  await prisma.specialtyGuide.create({ data: specialtyGuide });
}

const languageGuides = [
  {languageId: 2, guideId: 1},
  {languageId: 3, guideId: 1},
  {languageId: 2, guideId: 2},
  {languageId: 3, guideId: 2},
  {languageId: 1, guideId: 2},
  {languageId: 2, guideId: 3},
  {languageId: 3, guideId: 3},
  {languageId: 4, guideId: 4},
  {languageId: 5, guideId: 4},
  {languageId: 6, guideId: 5},
  {languageId: 7, guideId: 5},
  {languageId: 8, guideId: 6},
  {languageId: 9, guideId: 7},
  {languageId: 10, guideId: 8},
  {languageId: 1, guideId: 8},
  {languageId: 2, guideId: 9},
  {languageId: 3, guideId: 9},
  {languageId: 4, guideId: 9},
  {languageId: 5, guideId: 10},
  {languageId: 6, guideId: 11},
  {languageId: 7, guideId: 12},
  {languageId: 8, guideId: 13},
  {languageId: 9, guideId: 13},
  {languageId: 10, guideId: 14},
  {languageId: 1, guideId: 15},
  {languageId: 2, guideId: 15},
  {languageId: 3, guideId: 16},
  {languageId: 10, guideId: 16},
  {languageId: 1, guideId: 16},
  {languageId: 2, guideId: 17},
  {languageId: 3, guideId: 17},
  {languageId: 10, guideId: 18},
  {languageId: 1, guideId: 19},
  {languageId: 2, guideId: 19},
  {languageId: 3, guideId: 20},
  {languageId: 2, guideId: 20},
  {languageId: 3, guideId: 20},
  {languageId: 2, guideId: 21},
  {languageId: 3, guideId: 21},
  {languageId: 1, guideId: 21},
  {languageId: 2, guideId: 22},
  {languageId: 3, guideId: 22},
  {languageId: 2, guideId: 23},
  {languageId: 3, guideId: 23},
  {languageId: 1, guideId: 23},
]

for (const languageGuide of languageGuides) {
  await prisma.languageGuide.create({ data: languageGuide });
}

const parkGuides = [
  {parkId: 1, guideId: 1},
  {parkId: 1, guideId: 2},
  {parkId: 2, guideId: 3},
  {parkId: 2, guideId: 4},
  {parkId: 3, guideId: 5},
  {parkId: 3, guideId: 6},
  {parkId: 4, guideId: 7},
  {parkId: 4, guideId: 8},
  {parkId: 5, guideId: 9},
  {parkId: 5, guideId: 10},
  {parkId: 6, guideId: 11},
  {parkId: 6, guideId: 12},
  {parkId: 7, guideId: 13},
  {parkId: 7, guideId: 14},
  {parkId: 8, guideId: 15},
  {parkId: 8, guideId: 16},
  {parkId: 9, guideId: 17},
  {parkId: 9, guideId: 18},
  {parkId: 9, guideId: 19},
  {parkId: 10, guideId: 20},
  {parkId: 10, guideId: 21},
  {parkId: 10, guideId: 22},
  {parkId: 10, guideId: 23},
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
