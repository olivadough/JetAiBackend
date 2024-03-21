const { OpenAI } = require('openai');
require('dotenv').config();

const jetAiSecret = process.env.JET_AI_SECRET;
// Check if the API key is defined and not empty
if (!jetAiSecret) {
  throw new Error('jetAiSecret environment variable is not defined or empty');
}

const openai = new OpenAI({apiKey:jetAiSecret});

//organizeTopSpeed
async function organizeTopSpeed() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: [
        { role: "system", content: "You are a helpful assistant that organizes planes in an array by fastest speed and return a json object with only the rank, name, and top speed"},
        { role: "user", content: "[Gulfstream G650, Gulfstream280, Pilatus PC-24, HondaJet Elite]" }],
  });

  console.log("organizeTopSpeed:",completion.choices[0]);
}
organizeTopSpeed();

//Fuel Efficiency
async function organizeFuelEfficiency() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
          { role: "system", content: "You are a helpful assistant that organizes planes in an array by Fuel Efficiency and return a json object with only the rank, namen and fuel efficiency"},
          { role: "user", content: "[Gulfstream G650, Gulfstream280, Pilatus PC-24, HondaJet Elite]" }],
    });
  
    console.log("organizeFuelEfficiency:",completion.choices[0]);
  }
organizeFuelEfficiency()

//Maximum Seats
async function organizeMaxSeats() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
          { role: "system", content: "You are a helpful assistant that organizes planes in an array by Maximum Seats and return a json object with only the rank, name, and max seats"},
          { role: "user", content: "[Gulfstream G650, Gulfstream280, Pilatus PC-24, HondaJet Elite]" }],
    });
  
    console.log("organizeMaxSeats:",completion.choices[0]);
  }
organizeMaxSeats()

//EXAMPLE RESPONSES: 
// organizeFuelEfficiency: {
//     index: 0,
//     message: {
//       role: 'assistant',
//       content: '{\n' +
//         '  "planes": [\n' +
//         '    {\n' +
//         '      "rank": 1,\n' +
//         '      "name": "HondaJet Elite",\n' +
//         '      "fuel_efficiency": "High"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 2,\n' +
//         '      "name": "Pilatus PC-24",\n' +
//         '      "fuel_efficiency": "Medium"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 3,\n' +
//         '      "name": "Gulfstream G280",\n' +
//         '      "fuel_efficiency": "Low"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 4,\n' +
//         '      "name": "Gulfstream G650",\n' +
//         '      "fuel_efficiency": "Lowest"\n' +
//         '    }\n' +
//         '  ]\n' +
//         '}'
//     },
//     logprobs: null,
//     finish_reason: 'stop'
//   }
//   organizeMaxSeats: {
//     index: 0,
//     message: {
//       role: 'assistant',
//       content: '{\n' +
//         '    "planes": [\n' +
//         '        {\n' +
//         '            "rank": 1,\n' +
//         '            "name": "Gulfstream G650",\n' +
//         '            "max_seats": "19"\n' +
//         '        },\n' +
//         '        {\n' +
//         '            "rank": 2,\n' +
//         '            "name": "Gulfstream280",\n' +
//         '            "max_seats": "19"\n' +
//         '        },\n' +
//         '        {\n' +
//         '            "rank": 3,\n' +
//         '            "name": "Pilatus PC-24",\n' +
//         '            "max_seats": "11"\n' +
//         '        },\n' +
//         '        {\n' +
//         '            "rank": 4,\n' +
//         '            "name": "HondaJet Elite",\n' +
//         '            "max_seats": "7"\n' +
//         '        }\n' +
//         '    ]\n' +
//         '}'
//     },
//     logprobs: null,
//     finish_reason: 'stop'
//   }
//   organizeTopSpeed: {
//     index: 0,
//     message: {
//       role: 'assistant',
//       content: '{\n' +
//         '  "fastest_planes": [\n' +
//         '    {\n' +
//         '      "rank": 1,\n' +
//         '      "name": "Gulfstream G650",\n' +
//         '      "top_speed": "982 km/h"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 2,\n' +
//         '      "name": "Gulfstream280",\n' +
//         '      "top_speed": "850 km/h"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 3,\n' +
//         '      "name": "HondaJet Elite",\n' +
//         '      "top_speed": "782 km/h"\n' +
//         '    },\n' +
//         '    {\n' +
//         '      "rank": 4,\n' +
//         '      "name": "Pilatus PC-24",\n' +
//         '      "top_speed": "741 km/h"\n' +
//         '    }\n' +
//         '  ]\n' +
//         '}'
//     },
//     logprobs: null,
//     finish_reason: 'stop'
//   }