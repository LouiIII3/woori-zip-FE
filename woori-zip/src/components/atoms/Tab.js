"use client";

import React, { useState } from "react";

function Tab({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "300px",
        margin: "0 auto",
        backgroundColor: "#0065C4", 
      }}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activeTab === index ? "#fff" : "transparent",
            color: activeTab === index ? "#4285f4" : "#fff",
            border: activeTab === index ? "2px solid #add8e6" : "none",
            fontWeight: "bold",
            flex: 1,
            outline: "none",
            transition: "all 0.3s ease",
            borderRadius: activeTab === index ? "6px" : "4px", // 활성화된 탭의 모서리를 약간 더 둥글게 설정
            boxSizing: "border-box",
            margin: activeTab === index ? "0" : "3px", // 비활성화된 탭이 작아 보이도록 약간의 여백 추가
          }}
          onMouseEnter={(e) => {
            if (activeTab !== index) {
              e.target.style.backgroundColor = "#5a9ff4";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== index) {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tab;
