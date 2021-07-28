import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import React from 'react';
import Routine from '../components/DoubleMini/Routine';
import DoubleMiniRoutineWithElements from '../types/doubleMiniRoutine';

const prisma = new PrismaClient();

interface RoutineProps {
  initialRoutines: DoubleMiniRoutineWithElements[];
}

export async function getServerSideProps() {
  const initialRoutines = await prisma.doubleMiniRoutine.findMany({
    include: {
      mount: true,
      spotter: true,
      dismount: true,
    },
  });

  return {
    props: {
      initialRoutines,
    },
  };
}

const Routines = ({ initialRoutines }: RoutineProps) => (
  <>
    <Head>
      <title>Routines</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    {initialRoutines.map((routine) => (
      <div key={routine.id}>
        <Routine routine={routine} />
      </div>
    ))}
  </>
);

export default Routines;
