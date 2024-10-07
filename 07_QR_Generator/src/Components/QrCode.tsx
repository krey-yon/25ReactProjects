import QRCode from "react-qr-code";
import React from "react";

function QrCode() {
  const [qrValue, setQrValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

    function HandleGenerateQrCode() {
    setQrValue(inputValue);
    }

  return (
    <div>
      <h1>Qr code generate</h1>
      <div>
        <input
          type="text"
          name="qr-code"
          placeholder="enter your value here"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
        disabled={inputValue && inputValue.trim() !== "" ? false : true}
        onClick={HandleGenerateQrCode} >Generate</button>
      </div>
      <div>
        <QRCode id="qr-code-value" value={qrValue} size={400} bgColor="#fff" />
      </div>
    </div>
  );
}

export default QrCode;
