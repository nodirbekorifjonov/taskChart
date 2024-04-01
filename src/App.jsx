import React, { useEffect, useState } from "react";
import "./App.css";

import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";

// data
import csvAscendingData from "./data/ascending.csv";
import csvDescendingData from "./data/descending.csv";

const App = () => {
  const [ascendingData, setAscendingData] = useState(null);
  const [descendingData, setDescendingData] = useState(null);

  useEffect(() => {
    const mappedAscending = csvAscendingData.map((item) => item);
    setAscendingData(mappedAscending[0]);

    const mappedDescending = csvDescendingData.map((item) => item);
    setDescendingData(mappedDescending[0]);
  }, []);

  const mergeAndSortObjects = (objA, objB) => {
    const mergedObj = { ...objA, ...objB }; // Merge objects using spread operator
    const sortedObj = Object.keys(mergedObj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = mergedObj[key];
        return acc;
      }, {});

    return sortedObj;
  };

  const allData = mergeAndSortObjects(ascendingData, descendingData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ascending & Descending chart",
      },
    },
  };

  const labels = Object.keys(allData);

  const data = {
    labels,
    datasets: [
      {
        label: "Ascending",
        data: ascendingData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Descending",
        data: descendingData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default App;
