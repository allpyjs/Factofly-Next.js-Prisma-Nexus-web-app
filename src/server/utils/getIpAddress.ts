import { NextApiRequest } from 'next';

export default function getIpAddress(req: NextApiRequest): string {
  let ip;
  if (req.headers['x-forwarded-for']) {
    [ip] = (req.headers['x-forwarded-for'] as string).split(',');
  } else {
    ip = req.socket.remoteAddress;
  }
  return ip!;
}
