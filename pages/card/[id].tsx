import { PrismaClient } from '@prisma/client';
import React from 'react';
import DoubleMiniCardWithRoutinesAndElements from '../../types/doubleMiniCard';

interface Props {
  card: DoubleMiniCardWithRoutinesAndElements;
}

const cardPage = ({ card }: Props) => (
  <div>
    <h1>{card.name}</h1>
    <table>
      <thead>
        <tr>
          <th>Serienummer</th>
          <th>Mount</th>
          <th>Spotter</th>
          <th>Dismount</th>
        </tr>
      </thead>
      <tbody>
        {card.routines.map((routine) => (
          <tr key={routine.id}>
            <td>{routine.order}</td>
            <td>{routine.mount?.name}</td>
            <td>{routine.spotter?.name}</td>
            <td>{routine.dismount?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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
