import { Prisma } from '@prisma/client';

const doubleMiniRoutineWithElements = Prisma.validator<Prisma.DoubleMiniRoutineArgs>()({
  include: { mount: true, spotter: true, dismount: true },
});

type DoubleMiniRoutineWithElements = Prisma.DoubleMiniRoutineGetPayload<typeof doubleMiniRoutineWithElements>;

export default DoubleMiniRoutineWithElements;
