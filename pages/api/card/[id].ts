import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CardHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { query: { id }, body, method } = req;

  if (typeof id === 'string') {
    switch (method) {
      case 'DELETE':
        // Delete Card from database
        const deletedCard = await prisma.doubleMiniCard.delete({
          where: { id },
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
        return res.status(200).json(deletedCard);

      case 'PUT':
        // Update Card in database
        const updatedCard = await prisma.doubleMiniCard.update({ where: { id }, data: body });
        return res.status(200).json(updatedCard);
      default:
        res.setHeader('Allow', ['DELETE', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  return res.status(400).end('Please supply one Card id');
};

export default CardHandler;
