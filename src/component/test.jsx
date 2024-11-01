import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const App = () => (
  <div style={overlayStyle}>
    <div className="loading-dots">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  </div>
);

export default App;

// Style for the overlay and dots
const overlayStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.1)", // สีเทาจาง ๆ
  zIndex: 1000,
};

const dotStyle = `
  .loading-dots {
    display: flex;
    gap: 10px;
  }
  .dot {
    width: 12px;
    height: 12px;
    background-color: #1890ff;
    border-radius: 50%;
    animation: bounce 1.5s infinite;
  }
  .dot:nth-child(1) { animation-delay: 0s; }
  .dot:nth-child(2) { animation-delay: 0.3s; }
  .dot:nth-child(3) { animation-delay: 0.6s; }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = dotStyle;
document.head.appendChild(styleSheet);
