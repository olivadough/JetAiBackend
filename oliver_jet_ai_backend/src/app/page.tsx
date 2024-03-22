import React from 'react';

export default function Home() {
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
              <td className="border border-black px-4 py-2"><input type="checkbox" /></td>
              <td className="border border-black px-4 py-2 text-black">{jet.name}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.wingspan}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.engines}</td>
              <td className="border border-black px-4 py-2 text-black">{jet.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm mb-2 text-black">Ask OpenAI GPT to Compare Selected Jets By:<select className="w-1/8 text-black p-2 mb-4 border border-gray-300 rounded-lg">
        <option value="topSpeed">Top Speed</option>
        <option value="fuelEfficiency">Fuel Efficiency</option>
        <option value="maxSeats">Maximum Seats</option>
      </select>
      <button className="bg-gray-200 text-black py-1 px-1 ">Compare Selected Jets</button>
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
          {/* Dynamically returned jet rank, name, and value for comparison */}
          {/* Add your dynamically generated rows here */}
        </tbody>
      </table>
    </div>
  );
}

// Sample data for jets
const jets = [
  { name: "Gulfstream G650", wingspan: 99.7, engines: 2, year: 2012 },
  { name: "Bombardier Global 7500", wingspan: 104, engines: 2, year: 2018 },
  // Add more jet data as needed
];
