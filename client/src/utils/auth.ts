import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiRoute } from './apiRoutes';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const response = await fetch(apiRoute.signIn, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.NEXT_PUBLIC_API_AUTH!,
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });
                const parsedResponse = await response.json();

                return parsedResponse;
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            session.user.id = token.id;
            session.user.licenseId = token.licenseId;
            session.user.token = token.token;

            return session;
        },
        jwt({ token, trigger, session, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                if ('_id' in user) token.id = user._id;
                if ('licenseId' in user) token.licenseId = user.licenseId;
                if ('token' in user) token.token = user.token;

            }
            if (trigger === 'update' && session?.licenseId) {
                token.licenseId = session.licenseId;
            }
            return token;
        },
    },
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET!,
};
