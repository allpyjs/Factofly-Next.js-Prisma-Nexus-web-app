import { useTranslation } from 'next-i18next';
import Head from 'next/head';

type PageHeadProps = {
  namespace: string;
  translationKey: string;
  isAdmin?: boolean;
};

export default function PageHead({ namespace, translationKey: key, isAdmin = false }: PageHeadProps) {
  const { t } = useTranslation(namespace);
  return (
    <Head>
      <title>
        Factofly - {isAdmin ? 'Admin - ' : ''}
        {t(key)}
      </title>
    </Head>
  );
}
