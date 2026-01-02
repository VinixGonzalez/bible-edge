import { VersesRepository } from '@/repositories/verses-repository'
import { Verse } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetVerseOfTheDayUseCaseResponse {
  verse: Verse
  expiresAt: Date
}

export class GetVerseOfTheDayUseCase {
  constructor(private versesRepository: VersesRepository) {}

  async execute(): Promise<GetVerseOfTheDayUseCaseResponse> {
    const verse = await this.versesRepository.findRandom()

    if (!verse) {
      throw new ResourceNotFoundError()
    }

    const expiresAt = this.calculateExpirationTime()

    return {
      verse,
      expiresAt,
    }
  }

  private calculateExpirationTime(): Date {
    const now = new Date()
    const expirationTime = new Date(now)

    expirationTime.setHours(7, 0, 0, 0)

    if (now.getHours() >= 7) {
      expirationTime.setDate(expirationTime.getDate() + 1)
    }

    return expirationTime
  }
}
