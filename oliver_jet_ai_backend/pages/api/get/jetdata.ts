import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Planes } from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
  message: string;
  data?:Planes[]
};

export default async function getJetData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log("----- RETRIEVE ALL JET DATA -----");
    const planes: Planes[] = await prisma.planes.findMany();
    return res.status(200).json({ message: 'Success', data: planes });
  } catch (error) {
    console.error('ERR RETRIEVE JET DATA:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
