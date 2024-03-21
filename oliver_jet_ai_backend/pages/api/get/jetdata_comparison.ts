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
    console.log("----- JET DATA COMPARISONS -----");
    console.log("dataInput:",req.body)
    const ids: number[] = req.body.ids
    const planes: Planes[] = await prisma.planes.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    return res.status(200).json({ message: 'Success', data: planes });
  } catch (error) {
    console.error('ERR RETRIEVE JET DATA COMPARISONS:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
