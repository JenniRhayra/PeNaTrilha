import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

interface IResponse {
  biography: string;
  guideImage: string;
  user: {
    name: string;
    email: string;
    phone: string;
  },
  specialtyGuide: {
    specialty: {
      specialtyName: string;
    }
  }[],
  languageGuide: {
    language: {
      languageName: string
    }
  }[],
  park: {
    id: number;
    description: string;
    parkImage: string;
    park_name: string;
  }[]
}

const zInfrastructure = z.object({
  id: z.number().nullable(),
  type: z.string().nullable(),
})

const zParkInfrastructure = z.array(
  z.object({
    id: z.number().nullable(),
    status: z.boolean().nullable(),
    parkId: z.number().nullable(),
    infrastructureId: z.number().nullable(),
    infrastructure: zInfrastructure
  })
)

const zUser =  z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  isActive: z.boolean().nullable(),
  phone: z.string().nullable(),
  group: z.enum(['ADMINISTRADOR', 'VISITANTE', 'GERENTE', 'GUIA']).nullable(),
})

const zGuide = z.object({
  id: z.number().nullable(),
  gender: z.enum(['FEMININO', 'MASCULINO', 'NAO_RESPONDER']).nullable(),
  biography: z.string().nullable(),
  nickname: z.string().nullable(),
  birthDate: z.date().nullable(),
  approvalStatus: z.enum(['PENDENTE', 'APROVADO', 'REPROVADO']).nullable(),
  guideImage: z.string().nullable(),
  userId: z.number().nullable(),
  parkManagerId: z.number().nullable(),
  user: zUser
})

const zParkGuide = z.array(
  z.object({
    id: z.number().nullable(),
    parkId: z.number().nullable(),
    guideId: z.number().nullable(),
    guide: zGuide,
  })
)

const zForestType = z.object(
  {
    id: z.number().nullable(),
    name: z.string().nullable(),
  }
)

const zParkForestType = z.array(
  z.object({
    id: z.number().nullable(),
    parkId: z.number().nullable(),
    forestTypeId: z.number().nullable(),
    forestType: zForestType,
  })
)

const zOpeningHours = z.array(
  z.object({
    id: z.number().nullable(),
    dayWeek: z.enum(['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO']).nullable(),
    startTime: z.date().nullable(),
    endTime: z.date().nullable(),
    parkId: z.number().nullable(),
  })
)

const zEvent = z.array(
  z.object({
    id: z.number().nullable(),
    event_name: z.string().nullable(),
    description: z.string().nullable(),
    start_date: z.date().nullable(),
    end_date: z.date().nullable(),
    locationRef: z.string().nullable(),
    eventImage: z.string().nullable(),
    parkId: z.number().nullable(),
  })
)

const zActivity = z.array(
  z.object({
    id: z.number().nullable(),
    percurso: z.number().nullable(),
    duracao: z.number().nullable(),
    description: z.string().nullable(),
    difficultyLevel: z.enum(['FACIL', 'MEDIO', 'DIFICIL']).nullable(),
    activityName: z.string().nullable(),
    activityImage: z.string().nullable(),
    parkId: z.number().nullable(),
  })
)

const zGoodPractice = z.array(
  z.object({
    id: z.number().nullable(),
    title: z.string().nullable(),
    practiceImage: z.string().nullable(),
    parkId: z.number().nullable(),
  })
)

const zPark =  z.object({
    id: z.number().nullable(),
    park_name: z.string().nullable(),
    description: z.string().nullable(),
    site: z.string().nullable(),
    parkImage: z.string().nullable(),
    street: z.string().nullable(),
    number: z.string().nullable(),
    zipCode: z.string().nullable(),
    publicPlace: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    neighborhood: z.string().nullable(),
    core: z.string().nullable(),
    goodPractice: zGoodPractice,
    activity: zActivity,
    event: zEvent,
    openingHours: zOpeningHours,
    parkForestType: zParkForestType,
    parkGuide: zParkGuide,
    parkInfrastructure: zParkInfrastructure
  })

const zParkManager = z.object({
  id: z.number().nullable().nullable(),
  cpf: z.string().nullable(),
  rg: z.string().nullable(),
  approvalStatus: z.enum(['PENDENTE', 'APROVADO', 'REPROVADO']).nullable(),
  parkId: z.number().nullable(),
  userId: z.number().nullable(),
  userManagerId: z.number().nullable(),
  park: zPark,
  user: zUser,
})

export async function getManagerProfile(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/manager/get-manager-profile/:userId',
    {
      schema: {
        tags: ['manager'],
        summary: 'Obter perfil do gerente',
        params: z.object({ userId: z.string() }),
        response: {
          200: zParkManager,
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = parseInt(request.params.userId)

        const user = await prisma.user.findFirst({where: {id: userId}})

        if(!user) {
          return reply.code(404).send({ message: 'Usuário não encontrada' });
        }

        const manager = await prisma.parkManager.findFirst({
          where: { userId },
          include: {
            park: { 
              include: 
              { 
                goodPractice: true, 
                activity: true,
                event: true,
                openingHours: true,
                parkForestType: { include: { forestType: true } },
                parkGuide: { include: { guide: { include: { user: true } } } },
                parkInfrastructure: { include: { infrastructure: true } },
                parkManager: { include: { user: true } },
              } 
            },
            user: true
          }
        })

        if (!manager) {
          return reply.code(400).send({ message: 'Gerente não encontrado' });
        }

        // console.log('goodPractice', manager?.park?.goodPractice)
        // console.log('activity', manager?.park?.activity)
        // console.log('geventoodPractice', manager?.park?.event)
        // console.log('openingHours', manager?.park?.openingHours)
        // console.log('parkForestType', manager?.park?.parkForestType)
        // console.log('parkGuide', manager?.park?.parkGuide)
        // console.log('parkInfrastructure', manager?.park?.parkInfrastructure)
        // console.log('parkManager', manager?.park?.parkManager)

        return reply.code(200).send(manager)
      } catch (error) {
        console.log(error)
        return reply.code(400).send({ message: 'Ocorreu um erro ao buscar o gerente' });
      }

    },
  )
}
