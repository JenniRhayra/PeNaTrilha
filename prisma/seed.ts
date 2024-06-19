import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetTable() {
  await prisma.parkGuide.deleteMany({});
  await prisma.languageGuide.deleteMany({});
  await prisma.guide.deleteMany({});

  await prisma.parkLocalization.deleteMany({});
  await prisma.parkForestType.deleteMany({});
  await prisma.parkManager.deleteMany({});
  await prisma.park.deleteMany({});

  await prisma.language.deleteMany({});
  await prisma.forestType.deleteMany({});
  await prisma.specialty.deleteMany({});

  await prisma.$executeRaw`TRUNCATE TABLE "ParkGuide" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "LanguageGuide" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Guide" RESTART IDENTITY CASCADE;`


  await prisma.$executeRaw`TRUNCATE TABLE "ParkLocalization" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkForestType" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ParkManager" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Park" RESTART IDENTITY CASCADE;`

  await prisma.$executeRaw`TRUNCATE TABLE "Language" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ForestType" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Specialty" RESTART IDENTITY CASCADE;`
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

  const specialtys = [
    {specialtyName: 'História e Cultura'},
    {specialtyName: 'Ecoturismo'},
    {specialtyName: 'Turismo de Aventura'},
    {specialtyName: 'Turismo Gastronômico'},
    {specialtyName: 'Turismo de Luxo'},
    {specialtyName: 'Turismo Religioso'},
    {specialtyName: 'Turismo Arqueológico'},
    {specialtyName: 'Turismo de Acessibilidade'},
    {specialtyName: 'Turismo Esportivo'},
    {specialtyName: 'Turismo de Bem-Estar'},
    {specialtyName: 'Turismo de Compras'},
    {specialtyName: 'Turismo Fotográfico'},
  ]

  for (const specialty of specialtys) {
    await prisma.specialty.create({
      data: specialty
    })
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
