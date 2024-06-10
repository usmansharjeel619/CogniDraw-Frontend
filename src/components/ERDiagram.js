import React from "react";

// Define a data structure to represent an entity
class Entity {
  constructor(name, attributes = []) {
    this.name = name;
    this.attributes = attributes;
  }
}

// Define a data structure to represent a relationship
class Relationship {
  constructor(from, to, type) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
}

// Function to parse the pseudocode and generate entities and relationships
const parsePseudocode = (pseudocode) => {
  const entities = [];
  const relationships = [];

  const lines = pseudocode.split("\n").map((line) => line.trim());

  let currentEntity = null;
  lines.forEach((line) => {
    if (line.startsWith("entity")) {
      const entityName = line.split(" ")[1];
      currentEntity = new Entity(entityName);
      entities.push(currentEntity);
    } else if (line.includes("||--") || line.includes("--|")) {
      const [from, arrow, to] = line
        .split(/(\|\|--)|--\|{|}--/)
        .map((item) => item.trim());
      const type = arrow.includes("o") ? "one-to-many" : "one-to-one";
      relationships.push(new Relationship(from, to, type));
    } else if (line.includes("}|--")) {
      const [from, arrow, to] = line
        .split(/}--|--{/)
        .map((item) => item.trim());
      const type = arrow.includes("o") ? "many-to-one" : "many-to-many";
      relationships.push(new Relationship(from, to, type));
    } else if (line.includes("}||--")) {
      const [from, arrow, to] = line
        .split(/}--|--{|/)
        .map((item) => item.trim());
      const type = arrow.includes("o") ? "many-to-many" : "one-to-one";
      relationships.push(new Relationship(from, to, type));
    }
  });

  return { entities, relationships };
};

// Function to generate SVG elements for entities
const generateEntityElements = (
  entities,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];
  let currentX = startX;
  let currentY = startY;

  entities.forEach((entity) => {
    elements.push(
      <g key={entity.name}>
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
          {entity.name}
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
  entities,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];

  relationships.forEach((relationship) => {
    const fromEntity = entities.find(
      (entity) => entity.name === relationship.from
    );
    const toEntity = entities.find((entity) => entity.name === relationship.to);
    if (fromEntity && toEntity) {
      const startX =
        startX +
        (entities.indexOf(fromEntity) % 3) * (boxWidth + boxPadding) +
        boxWidth / 2;
      const startY =
        startY +
        Math.floor(entities.indexOf(fromEntity) / 3) *
          (boxHeight + boxPadding) +
        boxHeight;
      const endX =
        startX +
        (entities.indexOf(toEntity) % 3) * (boxWidth + boxPadding) +
        boxWidth / 2;
      const endY =
        startY +
        Math.floor(entities.indexOf(toEntity) / 3) * (boxHeight + boxPadding) +
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
          {relationship.type}
        </text>
      );
    }
  });

  return elements;
};

const ERDiagram = ({ pseudocode }) => {
  const boxWidth = 140;
  const boxHeight = 40;
  const boxPadding = 20;
  const startX = 50;
  const startY = 50;

  const { entities, relationships } = parsePseudocode(pseudocode);

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
      {generateEntityElements(
        entities,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
      {generateRelationshipElements(
        relationships,
        entities,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
    </svg>
  );
};

export default ERDiagram;
