import { lstatSync, readdirSync } from 'fs';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import apiConfig from '~/apiConfig';

const basePath = path.resolve('./public', 'locales');

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next.use(Backend).init({
  fallbackLng: 'en',
  lng: 'en',
  debug: apiConfig.i18n.debug,
  ns: ['common', 'contracts', 'invoices', 'tasks', 'deductions'],
  initImmediate: false,
  preload: readdirSync(basePath).filter((fileName) => {
    const joinedPath = path.join(basePath, fileName);
    const isDirectory = lstatSync(joinedPath).isDirectory();
    return isDirectory;
  }),
  backend: {
    loadPath: path.join(basePath, '{{lng}}/{{ns}}.json'),
    addPath: path.join(basePath, '{{lng}}/{{ns}}.missing.json')
  }
});

export default i18next;
