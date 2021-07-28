// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { prisma } from '../../prisma/db';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }
}

interface Request extends NextApiRequest {
  body: {
    name: string,
    first: {
      mountId: string,
      spotterId: string,
      dismountId: string
    },
    second: {
      mountId: string,
      spotterId: string,
      dismountId: string
    },
    third: {
      mountId: string,
      spotterId: string,
      dismountId: string
    },
    fourth: {
      mountId: string,
      spotterId: string,
      dismountId: string
    }
  }
}

const elements = async (
  req: Request,
  res: NextApiResponse,
) => {
  const {
    body: {
      name, first,
    },
  } = req;

  const session = await getSession({ req });
  if (session === null) {
    return res.json('Login aub');
  }

  const savedCard = await prisma.doubleMiniCard.create({
    include: {
      routines: {
        include: {
          mount: true,
          spotter: true,
          dismount: true,
        },
      },
    },
    data: {
      name,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      routines: {
        create: [{
          order: 1,
          mount: first.mountId ? { connect: { id: first.mountId } } : undefined,
          spotter: first.spotterId ? { connect: { id: first.spotterId } } : undefined,
          dismount: first.dismountId ? { connect: { id: first.dismountId } } : undefined,
        },
        // {
        //   order: 2,
        //   mount: second.mountId ? { connect: { id: second.mountId } } : undefined,
        //   spotter: second.spotterId ? { connect: { id: second.spotterId } } : undefined,
        //   dismount: second.dismountId ? { connect: { id: second.dismountId } } : undefined,
        // }
        ],
      },
    },
  });

  return res.json(savedCard);
};

export default elements;
