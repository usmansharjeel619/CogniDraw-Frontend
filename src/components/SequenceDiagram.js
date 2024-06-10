import React from "react";

// Define a data structure to represent a participant
class Participant {
  constructor(name) {
    this.name = name;
  }
}

// Define a data structure to represent a message
class Message {
  constructor(from, to, text) {
    this.from = from;
    this.to = to;
    this.text = text;
  }
}

// Function to parse the pseudocode and generate participants and messages
const parsePseudocode = (pseudocode) => {
  const participants = [];
  const messages = [];

  const lines = pseudocode.split("\n").map((line) => line.trim());

  lines.forEach((line) => {
    if (line.startsWith("participant")) {
      const participantName = line.split(" ")[1];
      participants.push(new Participant(participantName));
    } else if (line.includes("->>")) {
      const [from, arrow, to] = line
        .split(/->>|-->>|<<--/)
        .map((item) => item.trim());
      const text = arrow.trim();
      messages.push(new Message(from, to, text));
    } else if (line.includes("-->>")) {
      const [from, arrow, to] = line
        .split(/-->>|<<--/)
        .map((item) => item.trim());
      const text = arrow.trim();
      messages.push(new Message(from, to, text));
    }
  });

  return { participants, messages };
};

// Function to generate SVG elements for participants
const generateParticipantElements = (
  participants,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];
  let currentY = startY;

  participants.forEach((participant) => {
    elements.push(
      <g key={participant.name}>
        <rect
          x={startX}
          y={currentY}
          width={boxWidth}
          height={boxHeight}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="2"
        />
        <text
          x={startX + boxWidth / 2}
          y={currentY + boxHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {participant.name}
        </text>
      </g>
    );
    currentY += boxHeight + boxPadding;
  });

  return elements;
};

// Function to generate SVG elements for messages
const generateMessageElements = (
  messages,
  participants,
  startX,
  startY,
  boxWidth,
  boxHeight,
  boxPadding
) => {
  const elements = [];

  messages.forEach((message, index) => {
    const fromParticipant = participants.find(
      (participant) => participant.name === message.from
    );
    const toParticipant = participants.find(
      (participant) => participant.name === message.to
    );
    if (fromParticipant && toParticipant) {
      const fromX = startX + boxWidth;
      const fromY =
        startY +
        participants.indexOf(fromParticipant) * (boxHeight + boxPadding) +
        boxHeight / 2;
      const toX = startX + boxWidth;
      const toY =
        startY +
        participants.indexOf(toParticipant) * (boxHeight + boxPadding) +
        boxHeight / 2;
      const textX = fromX + (toX - fromX) / 2;
      const textY = fromY + (toY - fromY) / 2;

      elements.push(
        <line
          key={index}
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="#000000"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
      elements.push(
        <text
          key={`${index}-text`}
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {message.text}
        </text>
      );
    }
  });

  return elements;
};

const SequenceDiagram = ({ pseudocode }) => {
  const boxWidth = 140;
  const boxHeight = 40;
  const boxPadding = 20;
  const startX = 50;
  const startY = 50;

  const { participants, messages } = parsePseudocode(pseudocode);

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
      {generateParticipantElements(
        participants,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
      {generateMessageElements(
        messages,
        participants,
        startX,
        startY,
        boxWidth,
        boxHeight,
        boxPadding
      )}
    </svg>
  );
};

export default SequenceDiagram;
