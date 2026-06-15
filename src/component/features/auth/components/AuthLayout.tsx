import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { Squircle } from "@squircle-js/react";
import { Geist } from "next/font/google";
import styles from "../AuthForm.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type AuthLayoutProps = {
  pageTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  children: ReactNode;
};

export default function AuthLayout({
  pageTitle,
  metaDescription,
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerHref,
  children,
}: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={`${styles.page} ${geistSans.variable}`}>
        <Squircle cornerRadius={24} cornerSmoothing={0.75} className={styles.card}>
          <Link href="/" className={styles.backLink}>
            Back to home
          </Link>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
          <p className={styles.footerText}>
            {footerText}{" "}
            <Link href={footerHref} className={styles.footerLink}>
              {footerLinkLabel}
            </Link>
          </p>
        </Squircle>
      </div>
    </>
  );
}
