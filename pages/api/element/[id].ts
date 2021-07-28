import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const elementHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { query: { id }, body, method } = req;

  if (id === 'string') {
    switch (method) {
      case 'DELETE':
        // Delete element from database
        const deletedElement = await prisma.doubleMiniElement.delete({ where: { id } });
        return res.status(200).json(deletedElement);

      case 'PUT':
        // Update element in database
        const updatedElement = await prisma.doubleMiniElement.update({ where: { id }, data: body });
        return res.status(200).json(updatedElement);
      default:
        res.setHeader('Allow', ['DELETE', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  return res.status(400).end('Please supply one element id');
};

export default elementHandler;
