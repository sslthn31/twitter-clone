import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "Y/utils/api";

import "Y/styles/globals.css";
import Head from "next/head";
import SideNav from "Y/components/sideNav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>notTwitter</title>
        <meta 
          name="description"
          content="this is not twitter created by sslthn31"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto flex items-start sm:pr-4">
          <SideNav />
          <div className="min-h-screen flex-grow border-x">
            <Component {...pageProps} />
          </div>
        </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
