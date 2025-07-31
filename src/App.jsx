import { useState } from "react";
import QRCode from "react-qr-code";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const handleClear = () => setText("");

  const handleCopy = () => navigator.clipboard.writeText(text);

  const handleDownload = () => {
    const svg = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">

      <h1>QR Code Generator</h1>
      <p className="subtitle">Enter text URL to create a QR Code</p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text or URL"
      />

      <div className="qrcode">
        {text ? <QRCode value={text || " "} size={180} /> : <p>QRCode</p>}
      </div>

      <div className="buttons">
        <button className="btn" onClick={handleDownload}>
          <i>⇩</i> Download
        </button>
        <button className="btn" onClick={handleCopy}>
          <i>📄</i> Copy
        </button>
        <button className="btn" onClick={handleClear}>
          <i>✖</i> Clear
        </button>
      </div>
    </div>
  );
}

export default App;


