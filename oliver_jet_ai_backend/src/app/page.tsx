'use client'
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [jets, setJets] = useState([]);
  const [checkedJets, setCheckedJets] = useState(new Array(jets.length).fill(false));
  const [organizedJets, setOrganizedJets] = useState([]);
  const [openaiValue, setOpenaiValue,] = useState('speed');

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedJets = [...checkedJets];
    updatedCheckedJets[index] = !updatedCheckedJets[index];
    setCheckedJets(updatedCheckedJets);
  };
  useEffect(() => {
    console.log('Checked New Value:', checkedJets,);
  }, [checkedJets,]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/get/jetdata');
      const returnedJson = await res.json();
      setJets(returnedJson.data);
    };
    fetchData();
  }, []);

  const handleOpenAiChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setOpenaiValue(event.target.value);
  };
  useEffect(() => {
    console.log('OpenAi Comparison Value Changed:', openaiValue,);
  }, [openaiValue,]);

  const fetchOpenAiComparison = async () => {
    console.log('Compare With OpenAi!');
    console.log('OpenAi Value:', openaiValue)
    console.log('Checked Array:', checkedJets)
    const objData = {
      "sortBy": openaiValue,
      "ids": checkedJets.map((value, index) => value === true ? index : undefined).filter(index => index !== undefined)
    };
    console.log('objData:', objData)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objData)
    };
    try {
      const organizedPlanesResponse = await fetch('http://localhost:3000/api/post/jetdata_comparison', requestOptions);
      if (!organizedPlanesResponse.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseDataOrganized = await organizedPlanesResponse.json();
      console.log('responseDataOrganized.data:', responseDataOrganized.data);
      setOrganizedJets(responseDataOrganized.data)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-black">Top 10 Charter Jets</h1>
      <table className="w-full mb-4 border border-black">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 border border-black">Select</th>
            <th className="px-4 py-2 border border-black">Name</th>
            <th className="px-4 py-2 border border-black">Wingspan <span className="arrow"></span></th>
            <th className="px-4 py-2 border border-black">Number of Engines</th>
            <th className="px-4 py-2 border border-black">Manufacturing Year</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {/* Dynamically generated rows sorted by wingspan */}
          {jets.map((jet, index) => (
            <tr key={index} className="border border-black">
              <td className="border border-black px-4 py-2"><input type="checkbox" onChange={() => handleCheckboxChange(index)} /></td>
              <td className="border border-black px-4 py-2 text-black">{jet.name}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.wingspan}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.engines}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm mb-2 text-black">Ask OpenAI GPT to Compare Selected Jets By:<select className="w-1/8 text-black p-2 mb-4 border border-gray-300 rounded-lg"
       onChange={handleOpenAiChange}>
        <option value="speed">Top Speed</option>
        <option value="fuel">Fuel Efficiency</option>
        <option value="seats">Maximum Seats</option>
      </select>
      <button className="bg-gray-200 text-black py-1 px-1 " onClick={fetchOpenAiComparison} >Compare Selected Jets</button>
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Comparison Results</h2>

      <table className="w-full border border-black">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 border border-black">Rank</th>
            <th className="px-4 py-2 border border-black">Name</th>
            <th className="px-4 py-2 border border-black">Value</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
        {organizedJets.map((jet, index) => {
        const jetData = jet.split(',').reduce((obj, pair) => {
            const [key, value] = pair.trim().split(':');
            obj[key.trim()] = value.trim();
            return obj;
          }, {});

          return (
            <tr key={index} className="border border-black">
              <td className="border border-black px-4 py-2 text-black">{jetData.rank}</td>
              <td className="border border-black px-4 py-2 text-black">{jetData.name}</td>
              <td className="border border-black px-4 py-2 text-black">{jetData.value}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

// // Sample data for jets
// const jets = [
//   { name: "Gulfstream G650", wingspan: 99.7, engines: 2, year: 2012 },
//   { name: "Bombardier Global 7500", wingspan: 104, engines: 2, year: 2018 },
//   // Add more jet data as needed
// ];
