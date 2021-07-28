import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getSession, signIn, signOut } from 'next-auth/client';
import { Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

interface IndexProps {
  session: Session
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
}

export default function Index({ session }: IndexProps) {
  return (
    <div>
      <Head>
        <title>Wedforms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto mt-5">
        <h1 className="font-bold text-2xl ">Wedstrijdformulieren.nl</h1>

        { !session && <button type="button" onClick={() => signIn()}>Inloggen</button>}
        { session && (
          <>
            { session.user.image && (
            <Image
              className="rounded-full"
              src={session.user.image}
              alt="profile picture"
              width={150}
              height={150}
            />
            )}
            <h2>
              Hoi
              {' '}
              {session.user.name}
            </h2>
            <p className="underline">
              <Link href="/cards">Mijn formulieren</Link>
            </p>
            <button type="button" onClick={() => signOut()}>Uitloggen</button>
          </>
        )}

      </div>
    </div>
  );
}
