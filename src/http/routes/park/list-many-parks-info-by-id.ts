import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { $Enums, Gender, Groups } from '@prisma/client';

interface User {
  email: string;
  name: string;
  phone: string;
  group: Groups;
}

interface Guide {
  id: number;
  biography: string;
  nickname: string;
  birthDate: Date;
  guideImage: string;
  user: User;
  gender: Gender;
  specialtyGuide: {
    id: number;
    specialtyId: number;
    guideId: number;
    specialty: {
      id: number;
      specialtyName: string;
    }
  }[];
  languageGuide: {
    language: {
        languageName: string
    }
  }[]
}

interface Infrastructure {
  id: number;
  status: boolean;
  parkId: number;
  infrastructureId: number;
  infrastructure: {
    id: number;
    type: string;
  }
}

interface Activity {
    id: number;
    description: string;
    percurso: number;
    duracao: number;
    isMonitored: boolean;
    difficultyLevel: $Enums.DifficultyLevel;
    activityName: string;
    activityImage: string;
}

interface Park {
  id: number;
  description: string;
  site: string;
  parkImage: string;
  park_name: string;
  city: string;
  core: string;
  neighborhood: string;
  number: string;
  publicPlace: string;
  state: string;
  street: string;
  zipCode: string;
  guide: Guide[];
  openingHours?: string;
  florestType?: string;
  events: { event_name: string; eventImage: string }[];
  infrastructure: Infrastructure[]
  activity: Activity[]
}

export interface IListManyParksInfo {
  park: Park[];
}

const formatTime = (date: Date, defaultTime: string) => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}` || defaultTime;
};

export async function listManyParkInfoById(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-many-parks-info/:id',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar informações dos parques cadastrados por id',
        params: z.object({ id: z.string() }),
        response: {
          200:
          z.object({
            id: z.number(),
            description: z.string(),
            site: z.string(),
            parkImage: z.string(),
            park_name: z.string(),
            city: z.string(),
            core: z.string(),
            neighborhood: z.string(),
            number: z.string(),
            publicPlace: z.string(),
            state: z.string(),
            street: z.string(),
            zipCode: z.string(),
            openingHours: z.string(),
            florestType: z.string(),
            guide: z.array(
              z.object({
                id: z.number(),
                biography: z.string(),
                nickname: z.string(),
                birthDate: z.date(),
                guideImage: z.string(),
                gender: z.enum(["FEMININO", "MASCULINO", "NAO_RESPONDER"]),
                user: z.object({
                  email: z.string(),
                  name: z.string(),
                  phone: z.string().nullable(),
                  group: z.enum(["ADMINISTRADOR", "VISITANTE", "GERENTE", "GUIA"])
                }),
                specialtyGuide: z.array(
                  z.object({
                    id: z.number(),
                    specialtyId: z.number(),
                    guideId: z.number(),
                    specialty: z.object({
                      id: z.number(),
                      specialtyName: z.string()
                    })
                  })
                ),
                languageGuide: z.array(
                    z.object({
                        language: z.object({
                            languageName: z.string()
                        })
                    })
                )
              })
            ),
            events: z.array(
              z.object({
                event_name: z.string(),
                eventImage: z.string()
              })
            ),
            infrastructure: z.array(
              z.object({
                id: z.number(),
                status: z.boolean(),
                parkId: z.number(),
                infrastructureId: z.number(),
                infrastructure: z.object({
                  id: z.number(),
                  type: z.string(),
                }),
              })
            ),
            activity: z.array(
                z.object({
                    id: z.number(),
                    description: z.string(),
                    percurso: z.number(),
                    duracao: z.number(),
                    isMonitored: z.boolean(),
                    difficultyLevel: z.enum(['FACIL', 'MEDIO', 'DIFICIL']),
                    activityName: z.string(),
                    activityImage: z.string(),
                })
            ) 
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const id = parseInt(request.params.id);

        const park = await prisma.park.findFirst({ where: { id } });

        if (!park) {
          return reply.code(404).send({ message: 'Parque não encontrado' });
        }

        const parkManagers = await prisma.parkManager.findMany({
          where: { parkId: park.id },
          include: { user: true }
        });
        const guides = await prisma.guide.findMany({
          where: {
            parkManagerId: { in: parkManagers.map(manager => manager.id) }
          },
          include: {
            user: true,
            specialtyGuide: {
              include: {
                specialty: {
                  select: {
                    id: true,
                    specialtyName: true,
                  }
                }
              }
            },
            languageGuide: {
                select:{ language: true},
            }
          }
        });

        const events = await prisma.event.findMany({
          where: { parkId: park.id },
          select: { event_name: true, eventImage: true }
        });

        const activity = await prisma.activity.findMany({
            where: { parkId: park.id },
            select: { id: true ,activityImage: true, activityName: true, description: true, difficultyLevel: true, percurso: true, duracao: true, isMonitored: true }
          });

        const { startTime, endTime } = await prisma.openingHours.findFirst({ where: { parkId: park.id } });

        const openingHours = `seg a dom: ${formatTime(startTime, '09:00')} - ${formatTime(endTime, '16:00')}`;

        const { forestType } = await prisma.parkForestType.findFirst({ where: { parkId: park.id }, include: { forestType: true } });

        const { name } = forestType;

        const infrastructure = await prisma.parkInfrastructure.findMany({ where: { parkId: park.id }, include: { infrastructure: true } });

        const results: Park = {
          ...park,
          openingHours,
          florestType: name ?? '',
          guide: guides,
          events: events,
          infrastructure: infrastructure,
          activity: activity,
        };

        return reply.code(200).send(results);
      } catch (error) {
        console.log(error);
        return reply.code(400).send({ message: 'Ocorreu um erro ao listar os parques' });
      }
    }
  );
}
