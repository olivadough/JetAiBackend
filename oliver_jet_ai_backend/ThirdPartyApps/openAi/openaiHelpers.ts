import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { Planes } from '@prisma/client';
dotenv.config();

const jetAiSecret: string | undefined = process.env.JET_AI_SECRET;

// Check if the API key is defined and not empty
if (!jetAiSecret) {
  throw new Error('jetAiSecret environment variable is not defined or empty');
}

const openai = new OpenAI({ apiKey: jetAiSecret });

// organizeTopSpeed
export async function organizeTopSpeed(aircrafts: Planes[]) {
  try{
    console.log('-----Organize Top Speed-----')
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a helpful assistant that organizes planes in an array by fastest speed and return a json object with only the rank, name, wingspan, engine, year, value, and topSpeed. Make sure that the object returned is called planes." },
        { role: "user", content: JSON.stringify(aircrafts) }],
    });
    if (completion.choices[0].message.content !== null) {
      const content = JSON.parse(completion.choices[0].message.content);
      console.log("content:",content)
  
      const stringArray: string[] = content.planes.map((item: any) => {
        return `rank: ${item.rank}, name: ${item.name}, topSpeed: ${item.topSpeed}, wingspan:${item.wingspan}, engine:${item.engine}, year: ${item.year}, value:${item.value}`;
      });
  
      console.log("organizeTopSpeed:", stringArray);
      return stringArray;
    } else {
      console.error("Content is null");
      return [];
    }
  }catch(error){
    console.error('ERR OrganizeTopSpeed: ', error);
    return [];
  }
}

// Fuel Efficiency
export async function organizeFuelEfficiency(aircrafts: Planes[]): Promise<string[]> {
  try{
    console.log('-----Organize Fuel Efficiency-----')
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a helpful assistant that organizes planes in an array by Fuel Efficiency and return a json object with only the rank, name, wingspan, engine, year, value, fuelEfficiency.  Make sure that the object returned is called planes." },
        { role: "user", content: JSON.stringify(aircrafts) }
      ],
    });
  
    if (completion.choices[0].message.content !== null) {
      const content = JSON.parse(completion.choices[0].message.content);
      console.log("content:",content)
  
      const stringArray: string[] = content.planes.map((item: any) => {
        return `rank: ${item.rank}, name: ${item.name}, fuelEfficiency: ${item.fuelEfficiency}, wingspan:${item.wingspan}, engine:${item.engine}, year: ${item.year}, value:${item.value}`;
      });
  
      console.log("organizeFuelEfficiency:", stringArray);
      return stringArray;
    } else {
      console.error("Content is null");
      return [];
    }

  }catch(error){
    console.error('ERR OrganizeFuelEfficiency: ', error);
    return [];
  }
}

// Maximum Seats
export async function organizeMaxSeats(aircrafts: Planes[]): Promise<string[]> {
  try{
    console.log('-----Organize Max Seats-----')
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a helpful assistant that organizes planes in an array by Maximum Seats and return a json object with only the rank, name, wingspan, engine, year, value, and maxSeats.  Make sure that the object returned is called planes." },
        { role: "user", content: JSON.stringify(aircrafts) }
      ],
    });
  
    if (completion.choices[0].message.content !== null) {
      const content = JSON.parse(completion.choices[0].message.content);
      console.log("content:",content)
  
      const stringArray: string[] = content.planes.map((item: any) => {
        return `Rank: ${item.rank}, Name: ${item.name}, MaxSeats: ${item.maxSeats}, wingspan:${item.wingspan}, engine:${item.engine}, year: ${item.year}, value:${item.value}`;
      });
  
      console.log("organizeMaxSeats:", stringArray);
      return stringArray;
    } else {
      console.error("Content is null");
      return [];
    }
  }catch(error){
    console.error('ERR organizeMaxSeats: ', error);
    return [];
  }
}
