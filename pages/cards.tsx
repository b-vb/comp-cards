/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Card from '../components/DoubleMini/Card';
import { prisma } from '../prisma/db';
import DoubleMiniCardWithRoutinesAndElements from '../types/doubleMiniCard';

interface CardProps {
  initialCards: DoubleMiniCardWithRoutinesAndElements[];
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        initialCards: [],
      },
    };
  }
  const initialCards = await prisma.doubleMiniCard.findMany({
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
      initialCards,
    },
  };
}

const Cards = ({ initialCards }: CardProps) => (
  <>
    <Head>
      <title>Cards</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-end lg:w-5/6">
          <h2 className="text-2xl font-semibold leading-tight">Mijn formulieren</h2>
          <Link href="/card/new">Formulier maken</Link>
        </div>
        <div className="overflow-x-auto">
          <div className="font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Formulier</th>
                      <th className="py-3 px-6 text-left">Gemaakt</th>
                      <th className="py-3 px-6 text-left">Gewijzigd</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {initialCards.map((card, index) => (
                      <Card key={card.id} card={card} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="underline">
        <Link href="/">Terug</Link>
      </p>
    </div>
  </>
);

export default Cards;
