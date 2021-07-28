// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/db';

const elements = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const elementData = req.body;

  const savedElement = await prisma.doubleMiniElement.create({
    data: elementData,
  });

  res.json(savedElement);
};

export default elements;
