import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Planes } from '@prisma/client';
import { organizeTopSpeed, organizeFuelEfficiency, organizeMaxSeats } from '../../../ThirdPartyApps/openAi/openaiHelpers';
const prisma = new PrismaClient();

type ResponseData = {
  message: string;
  data?:string[]
};


export default async function getJetData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log("----- JET DATA COMPARISONS -----");
    console.log("dataInput:",req.body)
    const ids: number[] = req.body.ids
    const sortBy: string = req.body.sortBy

    const planes: Planes[] = await prisma.planes.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    let sortedPlanes: string[] = [];

    if (sortBy === "speed") {
      sortedPlanes = await organizeTopSpeed(planes);
    } else if (sortBy === "fuel") {
      sortedPlanes = await organizeFuelEfficiency(planes);
    } else {
      sortedPlanes = await organizeMaxSeats(planes);
    }

    return res.status(200).json({ message: 'Success', data: sortedPlanes });
  } catch (error) {
    console.error('ERR RETRIEVE JET DATA COMPARISONS:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
