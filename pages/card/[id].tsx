import { PrismaClient } from '@prisma/client';
import React from 'react';
import DoubleMiniCardWithRoutinesAndElements from '../../types/doubleMiniCard';
import { formatDate } from '../../util/util';

interface Props {
  card: DoubleMiniCardWithRoutinesAndElements;
}

const cardPage = ({ card }: Props) => {
  console.log('card:', card);
  return (
    <div>
      <h1>{card.name}</h1>
      <span>{formatDate(card.createdAt)}</span>
      <ol>
        {card.routines.map((routine) => (
          <li key={routine.id}>
            {routine.mountId}
            {'   '}
            {routine.order}
          </li>
        ))}
      </ol>
    </div>
  );
};

export const getServerSideProps = async ({ query: { id: cardId } }: { query: { id: string } }) => {
  const prisma = new PrismaClient();

  const card = await prisma.doubleMiniCard.findUnique({
    where: { id: cardId },
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

  return {
    props: {
      card,
    },
  };
};

export default cardPage;
