/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import { elements } from './elements';

const prisma = new PrismaClient();

async function main() {
  for (const element of elements) {
    await prisma.doubleMiniElement.create({
      data: element,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
