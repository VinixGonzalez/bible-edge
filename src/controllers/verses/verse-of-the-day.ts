import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetVerseOfTheDayUseCase } from '@/use-cases/factories/make-get-verse-of-the-day-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getVerseOfTheDay(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeGetVerseOfTheDayUseCase()

  try {
    const { verse, expiresAt } = await useCase.execute()

    const now = new Date()
    const maxAge = Math.floor((expiresAt.getTime() - now.getTime()) / 1000)

    reply.header('Cache-Control', `public, max-age=${maxAge}, must-revalidate`)
    reply.header('Expires', expiresAt.toUTCString())

    return reply.status(200).send({
      verse,
      expiresAt: expiresAt.toISOString(),
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: 'Verse not found',
      })
    }

    return reply.status(500).send({
      message: 'Internal server error',
    })
  }
}
