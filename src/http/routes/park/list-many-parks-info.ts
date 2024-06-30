import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { Gender, Groups } from '@prisma/client';

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
    birthDate: string;
    guideImage: string;
    user: User;
    gender: Gender;
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
    events: { id: number, event_name: string; eventImage: string }[];
}

export interface IListManyParksInfo {
    park: Park[];
}

export async function listManyParkInfo(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get(
        '/park/list-many-parks-info',
        {
            schema: {
                tags: ['park'],
                summary: 'Listar informações dos parques cadastrados',
                response: {
                    200: 
                    z.object({
                        park: z.array(
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
                                guide: z.array(
                                    z.object({
                                        id: z.number(),
                                        biography: z.string(),
                                        nickname: z.string(),
                                        birthDate: z.string(),
                                        guideImage: z.string(),
                                        gender: z.enum(["FEMININO", "MASCULINO", "NAO_RESPONDER"]),
                                        user: z.object({
                                            email: z.string(),
                                            name: z.string(),
                                            phone: z.string().nullable(),
                                            group: z.enum(["ADMINISTRADOR", "VISITANTE", "GERENTE", "GUIA"])
                                        })
                                    })
                                ),
                                events: z.array(
                                    z.object({
                                        id: z.number(),
                                        event_name: z.string(),
                                        eventImage: z.string()
                                    })
                                )
                            })
                        )
                    }),
                    400: z.object({
                        message: z.string(),
                    }),
                    500: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            try {
                const results: IListManyParksInfo = {
                    park: []
                };

                console.log('Fetching parks...');
                const parks = await prisma.park.findMany();

                for (const park of parks) {
                    console.log(`Fetching park managers for park id: ${park.id}`);
                    const parkManagers = await prisma.parkManager.findMany({
                        where: {
                            parkId: park.id
                        },
                        include: {
                            user: true
                        }
                    });

                    console.log(`Fetching guides for park id: ${park.id}`);
                    const guides = await prisma.guide.findMany({
                        where: {
                            parkManagerId: {
                                in: parkManagers.map(manager => manager.id)
                            }
                        },
                        include: {
                            user: true
                        }
                    });

                    console.log(`Fetching events for park id: ${park.id}`);
                    const events = await prisma.event.findMany({
                        where: {
                            parkId: park.id
                        },
                        select: {
                            id: true,
                            event_name: true,
                            eventImage: true
                        }
                    });

                    results.park.push({
                        ...park,
                        guide: guides.map(guide => ({
                            ...guide,
                            birthDate: guide.birthDate.toISOString()
                        })),
                        events: events
                    });
                }

                console.log('Successfully fetched all park data');
                console.log('Results:', JSON.stringify(results, null, 2));

                // Test serialization
                try {
                    const serializedResults = JSON.stringify(results);
                    console.log('Serialized Results:', serializedResults);
                } catch (serializationError) {
                    console.error('Serialization Error:', serializationError);
                    return reply.code(500).send({ message: 'Erro na serialização dos dados' });
                }

                return reply.code(200).send(results);
            } catch (error) {
                console.error('Error fetching park data:', error);
                return reply.code(500).send({ message: 'Ocorreu um erro ao listar os parques' });
            }
        },
    );
}
