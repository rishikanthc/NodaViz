import React, { useRef } from "react";
import Papa from "papaparse";
import { useAppContext } from "./App";
import upIcon from "./up.svg";

export const Home = () => {
  const inFile = useRef(null);
  const { updateContext } = useAppContext();

  const getFile = (e) => {
    console.log("Getting file");
    const f = e.target.files[0];
    console.log(f);
    updateContext({ gfile: f });
    console.log("Updated Gfile");

    parseCSV(f, (newGraphData, allTextData) => {
      updateContext({ gfile: f, graph: newGraphData, allText: allTextData });
    });
  };

  const triggerFile = () => {
    inFile.current.click();
  };

  return (
    <div className="flex space-x-6 text-black text-xs">
      <button onClick={triggerFile}>
        <img src={upIcon} alt="Load CSV" className="w-6" />
      </button>
      <input
        type="file"
        accept=".csv"
        ref={inFile}
        onChange={getFile}
        style={{ display: "none" }}
      />
    </div>
  );
};

function parseCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      console.log(results);
      const tnodes = results.data.filter(
        ({ FromUuid, ToUuid }) => FromUuid === null && ToUuid === null,
      );
      const tedges = results.data.filter(
        ({ FromUuid, ToUuid }) => FromUuid != null && ToUuid != null,
      );
      const nodes = tnodes.map((node) => {
        return {
          id: node.Uuid,
          note: node.Title,
          x: node.PositionX * 1.5,
          y: node.PositionY * 1.5,
          z: node.PositionZ * 1.5,
          color: "#" + node.Color,
          val: node.Size,
        };
      });
      const edges = tedges.map((edge) => {
        return {
          source: edge.FromUuid,
          target: edge.ToUuid,
          color: "#" + edge.Color,
        };
      });
      const newGraph = { nodes: nodes, links: edges };
      console.log("ParseCSv", newGraph);
      const allText = results.data.map((obj) => obj.Title); // Assuming 'Title' is the correct property
      const joinedText = allText.join(". "); // Join with a space
      console.log("Joined Text", joinedText);
      callback(newGraph, joinedText);
      // setGraph(newGraph);
      // console.log("ParseCSv", newGraph);
      // navigate("/graph");
    },
    error: function (error) {
      console.log(error);
      alert("Error parsing CSV file");
    },
  });
}
