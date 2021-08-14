import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession, signin } from 'next-auth/client';
import React from 'react';
import Navigation from '../components/Navigation';

interface Props {
  session: Session | null;
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
}

const login = ({ session }: Props) => (
  <div className="max-w-7xl mx-auto">
    <Navigation session={session} />

    <div className="h-3/4 container py-8">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-xl tracking-tight font-bold text-gray-900">
          <span className="block xl:inline">Om formulieren te kunnen maken, moet je eerst inloggen</span>
        </h1>
        <div className="rounded-md shadow mt-8">
          <button
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
            type="button"
            onClick={() => signin('github')}
          >
            Inloggen met github
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default login;
