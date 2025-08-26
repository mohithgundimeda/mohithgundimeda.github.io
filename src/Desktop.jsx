import React from "react";

export default function Desktop({ onLogout }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ff0000ff",
      }}
    >
      <h1>Desktop Component</h1>
      <button
        onClick={onLogout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
