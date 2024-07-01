import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'


const GuideSchema = z.object({
  id: z.number(),
  gender: z.enum(["FEMININO", "MASCULINO", "NAO_RESPONDER"]),
  biography: z.string(),
  nickname: z.string(),
  birthDate: z.string(),
  approvalStatus: z.enum(["PENDENTE", "APROVADO", "REPROVADO"]),
  guideImage: z.string(),
  userId: z.number(),
  parkManagerId: z.number().nullable(),
  languages: z.array(z.object({
    id: z.number(),
    languageName: z.string(),
  })),
  specialties: z.array(z.object({
    id: z.number(),
    specialtyName: z.string(),
  })),
  user: z.object({
    id: z.number(),
    name: z.string().nullable(),
    email: z.string(),
    phone: z.string().nullable(),
  }),
  park: z.array(
    z.object({
      id: z.number().nullable(),
      park_name: z.string().nullable(),
    })
  )
});

export async function listGuideByPark(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/guide/list-guide-by-park/:managerId',
    {
      schema: {
        tags: ['guide'],
        summary: 'Listar linguagens cadastradas',
        params: z.object({ managerId: z.string() }),
        response: {
          201: z.array(
            GuideSchema
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
     
      const managerId = parseInt(request.params.managerId)

      const manger  = await prisma.parkManager.findFirst(
        {
          where: { userId: managerId }
        }
      )
   
      if(!manger) {
        return reply.code(400).send({ message: 'Gerente não encontrada' });
      }

      const park = await prisma.park.findFirst(
        {
          where: { id: manger.parkId }
        }
      )

      if(!park) {
        return reply.code(400).send({ message: 'Parque não encontrada' });
      }

      const guides = await prisma.parkGuide.findMany(
        {
          where: { parkId: park.id },
          include: { 
            guide: { 
              include: 
              { 
                languageGuide: { include: { language: true } },
                specialtyGuide: {  include: { specialty: true } },
                user: true,
                parkGuide: { include: { park: true } }
              } 
            } 
          }
        }
      )

      const formattedGuides = guides.map((guide) => ({
        id: guide.guide.id,
        gender: guide.guide.gender,
        biography: guide.guide.biography,
        nickname: guide.guide.nickname,
        birthDate: guide.guide.birthDate.toISOString(),
        approvalStatus: guide.guide.approvalStatus,
        guideImage: guide.guide.guideImage,
        userId: guide.guide.userId,
        parkManagerId: guide.guide.parkManagerId,
        languages: guide.guide.languageGuide.map((lg) => ({
          id: lg.language.id,
          languageName: lg.language.languageName,
        })),
        specialties: guide.guide.specialtyGuide.map((sg) => ({
          id: sg.specialty.id,
          specialtyName: sg.specialty.specialtyName,
        })),
        user: {
          id: guide.guide.user.id,
          name: guide.guide.user.name,
          email: guide.guide.user.email,
          phone: guide.guide.user.phone,
        },
        park: guide.guide?.parkGuide.map((sg) => ({
          id: sg?.parkId,
          park_name: sg.park?.park_name
        }))
      }));

      return reply.code(201).send(formattedGuides)
    },
  )
}
