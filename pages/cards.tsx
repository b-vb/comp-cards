/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import CardsList from '../components/DoubleMini/CardsList';
import Navigation from '../components/Navigation';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { prisma } from '../prisma/db';
import DoubleMiniCardWithRoutinesAndElements from '../types/doubleMiniCard';

interface CardProps {
  cards: DoubleMiniCardWithRoutinesAndElements[];
  session: Session | null;
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        cards: [],
        session: null,
      },
    };
  }
  const cards = await prisma.doubleMiniCard.findMany({
    where: {
      userId: session?.user.id,
    },
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
      cards,
      session,
    },
  };
}

const Cards = ({ cards, session }: CardProps) => {
  useProtectedRoute(session);

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Cards</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navigation session={session} />

      <div className="container py-8">
        <CardsList cards={cards} />
      </div>
    </div>
  );
};

export default Cards;
