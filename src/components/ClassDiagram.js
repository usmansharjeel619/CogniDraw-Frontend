import React from "react";

// Define a data structure to represent a class
class Class {
  constructor(name, attributes = []) {
    this.name = name;
    this.attributes = attributes;
  }
}

// Define a data structure to represent a relationship
class Relationship {
  constructor(from, to, label) {
    this.from = from;
    this.to = to;
    this.label = label;
  }
}

// Function to parse the pseudocode and generate classes and relationships
const parsePseudocode = (pseudocode) => {
  const classes = [];
  const relationships = [];

  const lines = pseudocode.split("\n").map((line) => line.trim());

  let currentClass = null;
  lines.forEach((line) => {
    if (line.startsWith("class")) {
      const className = line.split(" ")[1];
      currentClass = new Class(className);
      classes.push(currentClass);
    } else if (line.startsWith("-")) {
      if (currentClass) {
        const attribute = line.split(" ")[1];
        currentClass.attributes.push(attribute);
      }
    } else if (line.includes("--")) {
      const [from, to, label] = line.split(" ");
      relationships.push(new Relationship(from, to, label));
    }
  });

  return { classes, relationships };
};

// Function to generate SVG elements for classes
const generateClassElements = (
  classes,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];
  let currentX = startX;
  let currentY = startY;

  classes.forEach((clazz) => {
    elements.push(
      <g key={clazz.name}>
        <rect
          x={currentX}
          y={currentY}
          width={boxWidth}
          height={boxHeight}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="2"
        />
        <text
          x={currentX + boxWidth / 2}
          y={currentY + boxHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {clazz.name}
        </text>
      </g>
    );
    currentX += boxWidth + boxPadding;
    if (currentX > 600) {
      currentX = startX;
      currentY += boxHeight + boxPadding;
    }
  });

  return elements;
};

// Function to generate SVG elements for relationships
const generateRelationshipElements = (
  relationships,
  classes,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];

  relationships.forEach((relationship) => {
    const fromClass = classes.find((clazz) => clazz.name === relationship.from);
    const toClass = classes.find((clazz) => clazz.name === relationship.to);
    if (fromClass && toClass) {
      const startX =
        startX +
        (classes.indexOf(fromClass) % 3) * (boxWidth + boxPadding) +
        boxWidth / 2;
      const startY =
        startY +
        Math.floor(classes.indexOf(fromClass) / 3) * (boxHeight + boxPadding) +
        boxHeight;
      const endX =
        startX +
        (classes.indexOf(toClass) % 3) * (boxWidth + boxPadding) +
        boxWidth / 2;
      const endY =
        startY +
        Math.floor(classes.indexOf(toClass) / 3) * (boxHeight + boxPadding) +
        boxHeight +
        boxPadding;

      elements.push(
        <line
          key={`${relationship.from}-${relationship.to}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#000000"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
      elements.push(
        <text
          key={`${relationship.from}-${relationship.to}-text`}
          x={(startX + endX) / 2}
          y={(startY + endY) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {relationship.label}
        </text>
      );
    }
  });

  return elements;
};

const ClassDiagram = ({ pseudocode }) => {
  const boxWidth = 140;
  const boxHeight = 40;
  const boxPadding = 20;
  const startX = 50;
  const startY = 50;

  const { classes, relationships } = parsePseudocode(pseudocode);

  return (
    <svg width="800" height="600">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
        </marker>
      </defs>
      {generateClassElements(
        classes,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
      {generateRelationshipElements(
        relationships,
        classes,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
    </svg>
  );
};

export default ClassDiagram;
