import { readFileSync } from 'fs';

export default () => ({
  publicKey: readFileSync('./config/public.pem').toString(),
  privateKey: readFileSync('./config/private.pem').toString(),
});
