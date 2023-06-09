import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { TerminalOutput } from "../../Redux/Actions/Terminal_Actions";
export const General_Chat = () => {
  const contentRef = React.useRef(null);
  const logs_data = useSelector(
    (state) => state.terminal_data.terminal_messages
  );
  const opacity = useSelector((state) => state.style_data.widgets_opacity);
  useEffect(() => {
    changeTab("Logs");
  });

  const changeTab = (tab) => {
    if (tab) {
      const not_active = document.querySelectorAll(".general-chat-widget-tabs");
      not_active.forEach((element) => {
        element.classList.add("opacity-50");
      });
      const active = document.getElementById(tab);
      active.classList.remove("opacity-50");
      const contentNode = contentRef.current;
      contentNode.innerHTML = ""; // Clear existing content
      switch (tab) {
        case "Logs":
          logs_data.forEach((log) => {
            const logNode = document.createElement("div");
            logNode.classList.add(".mt-10");
            logNode.textContent = log.message;
            contentNode.appendChild(logNode); // Append new log node
          });

          break;

        default:
          break;
      }
    }
  };
  return (
    <div
      className="monospace widget text-white"
      style={{
        height: "250px",
        width: "450px",
        right: "50px",
        bottom: "50px",
        opacity: opacity,
      }}
    >
      <div
        className=""
        style={{
          display: "flex",
          height: "30px",
          width: "100%",
          borderBottom: "1px solid rgb(255, 255, 255, 0.1)",
        }}
      >
        {["General Chat", "Planet Chat", "Location Chat", "Logs"].map(
          (tab, index) => {
            return (
              <div
                key={index}
                className="p-1 cursor-pointer text-center grow opacity-50 general-chat-widget-tabs"
                id={tab}
                onClick={changeTab.bind(null, tab)}
                style={{
                  borderRight: "1px solid rgb(255, 255, 255, 0.2)",
                  borderLeft: "1px solid rgb(255, 255, 255, 0.2)",
                }}
              >
                {tab}
              </div>
            );
          }
        )}
      </div>
      <div className="p-2" style={{ height: "220px", overflow: "auto" }}>
        <div ref={contentRef}></div>
      </div>
    </div>
  );
};
