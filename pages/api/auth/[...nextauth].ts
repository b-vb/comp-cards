import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../prisma/db';

export default NextAuth({
  providers: [
    // Providers.Instagram({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    // }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // @ts-ignore
    session: async (session, user) => ({ ...session, user: { ...session.user, id: user.id } }),
  },
});
