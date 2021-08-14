import { Prisma } from '@prisma/client';

const doubleMiniCardWithRoutinesAndElements = Prisma.validator<Prisma.DoubleMiniCardArgs>()({
  include: {
    routines: {
      include: {
        mount: true,
        spotter: true,
        dismount: true,
      },
    },
  },
});

type DoubleMiniCardWithRoutinesAndElements =
Prisma.DoubleMiniCardGetPayload<typeof doubleMiniCardWithRoutinesAndElements>;

export default DoubleMiniCardWithRoutinesAndElements;
