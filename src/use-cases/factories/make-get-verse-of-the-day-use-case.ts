import { PrismaVersesRepository } from '@/repositories/prisma/prisma-verses-repository'
import { GetVerseOfTheDayUseCase } from '../get-verse-of-the-day-use-case'

export function makeGetVerseOfTheDayUseCase() {
  const versesRepository = new PrismaVersesRepository()
  return new GetVerseOfTheDayUseCase(versesRepository)
}
