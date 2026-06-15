import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Landing from "@/component/features/landing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>FeGame | Multiplayer Tic-Tac-Toe</title>
        <meta
          name="description"
          content="Play real-time multiplayer Tic-Tac-Toe. Log in or sign up to access your dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <Landing />
      </div>
    </>
  );
}
