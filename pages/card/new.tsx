/* eslint-disable jsx-a11y/label-has-associated-control */
import { PrismaClient, DoubleMiniElement } from '@prisma/client';
import axios from 'axios';
import React from 'react';

import router from 'next/router';

import { useForm, SubmitHandler } from 'react-hook-form';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';
import Navigation from '../../components/Navigation';
import DoubleMiniCardWithRoutinesAndElements from '../../types/doubleMiniCard';
import useProtectedRoute from '../../hooks/useProtectedRoute';

const prisma = new PrismaClient();

type Inputs = {
  name: string;
  first: {
    mountId: string;
    spotterId: string;
    dismountId: string;
  };
  // second: {
  //   mount: string;
  //   spotter: string;
  //   dismount: string;
  // };
  // third: {
  //   mount: string;
  //   spotter: string;
  //   dismount: string;
  // };
  // fourth: {
  //   mount: string;
  //   spotter: string;
  //   dismount: string;
  // };
};

interface Props {
  elements: DoubleMiniElement[];
  session: Session | null
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });
  const elements = await prisma.doubleMiniElement.findMany();
  return {
    props: {
      elements,
      session,
    },
  };
}

const saveCard = async (card: Inputs) => {
  try {
    const { data } = await axios.post<DoubleMiniCardWithRoutinesAndElements>('/api/cards', card);
    return data;
  } catch (error) {
    console.error('error:', error);
    return null;
  }
};

const NewCard = ({ elements, session }: Props) => {
  useProtectedRoute(session);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const savedCard = await saveCard(data);
    console.log('savedCard:', savedCard);
    router.push('/cards');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Navigation session={session} />

      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <h2 className="text-2xl font-bold">Maak een nieuw formulier</h2>
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label htmlFor="name" className="block">
              <span className="text-gray-700">Naam</span>
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              {...register('name', { required: true })}
            />
            <label className="block">
              <span className="text-gray-700">Serie 1: mount</span>
              <select
                {...register('first.mountId')}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">-</option>
                {elements.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Serie 1: spotter</span>
              <select
                {...register('first.spotterId')}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">-</option>
                {elements.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Serie 1: dismount</span>
              <select
                {...register('first.dismountId')}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">-</option>
                {elements.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Opslaan</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCard;
