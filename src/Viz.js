import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import * as THREE from "three";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./App";

export const Viz = () => {
  const forceGraphRef = useRef(null);

  // Access the whole context
  const { graph } = useContext(AppContext);

  useEffect(() => {
    if (forceGraphRef.current) {
      // Adjust link distance
      forceGraphRef.current.d3Force("link").distance(5);
      // Re-heat the simulation to apply the changes
      forceGraphRef.current.d3ReheatSimulation();
    }
  }, [graph]); // Use `graph` directly from the context

  const isGraphEmpty = graph.nodes === null;
  const nodeClick = (node, _) => {
    console.log("Node clicked", node);
    const fg = forceGraphRef.current;

    // Assumes node's coordinates are at {x, y, z}

    // This sets the new camera position to be slightly offset from the node position
    // Adjust the offset as needed, here shown as slightly towards +z for better visibility.
    // The `lookAt` parameter is used to make the camera focus on the node.
    // Duration for this motion is set to 1000ms.
    fg.cameraPosition(
      { x: node.x, y: node.y, z: node.z + 100 }, // Position slightly in front of the node
      { x: node.x, y: node.y, z: node.z }, // Look at the node
      1000, // Transition duration in ms
    );
  };

  return (
    <div className="absolute inset-0">
      {isGraphEmpty ? (
        <ForceGraph3D backgroundColor="rgba(0, 0, 0, 0)" />
      ) : (
        <ForceGraph3D
          graphData={graph}
          backgroundColor="rgba(0, 0, 0, 0)"
          nodeAutoColorBy="group"
          ref={forceGraphRef}
          onNodeClick={nodeClick}
          linkWidth={3}
          linkOpacity={1.0}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
          nodeThreeObject={(node) => {
            // Create a group to hold both the sprite and the mesh
            const group = new THREE.Group();

            // Create the sprite for the text
            const sprite = new SpriteText(wrapText(node.note ?? "", 45));

            // sprite.color = node.color ?? "white"; // Default color if none provided
            sprite.textHeight = node.val / 2; // Adjust as needed
            sprite.backgroundColor = "rgb(92, 90, 90)";
            sprite.color = "black"; // Set the sprite text color to black
            // sprite.backgroundColor = "#1D4ED8"; // Background color
            sprite.padding = 5; // Padding around the text
            sprite.borderWidth = 0.3; // Border width
            sprite.borderRadius = 4; // Border radius
            sprite.borderColor = "#ce5d97"; // Border color
            sprite.position.y = -node.val; // Adjust position to be below the node shape
            group.add(sprite); // Add sprite to group

            // Create the mesh (e.g., a sphere) to represent the node
            const geometry = new THREE.SphereGeometry(node.val / 2); // Radius size
            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(node.color ?? "lightblue"),
            });
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh); // Add mesh to group

            return group;
          }}
        />
      )}
    </div>
  );
};

function wrapText(text, maxLineLength) {
  const words = text.split(" ");
  let result = "";
  let lineLength = 0;

  words.forEach((word) => {
    if (lineLength + word.length >= maxLineLength) {
      result += "\n"; // Start a new line
      lineLength = 0; // Reset line length
    } else if (result) {
      result += " "; // Add space before word if it's not at the start
      lineLength += 1; // Account for the space
    }
    result += word;
    lineLength += word.length;
  });

  return result;
}
