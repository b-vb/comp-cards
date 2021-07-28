import { Prisma } from '@prisma/client';

const doubleMiniCardWithRoutinesAndElements = Prisma.validator<Prisma.DoubleMiniCardArgs>()({
  include: { routines: true },
});

type DoubleMiniCardWithRoutinesAndElements = Prisma.DoubleMiniCardGetPayload<typeof doubleMiniCardWithRoutinesAndElements>;

export default DoubleMiniCardWithRoutinesAndElements;
