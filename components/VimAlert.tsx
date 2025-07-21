"use client";
import React from "react"; 

export function VimAlert(): React.JSX.Element {
    return (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--bg-alt, #23272e)",
            border: "2px solid var(--primary, #7fd1b9)",
            borderRadius: "8px",
            padding: "12px 20px",
            color: "var(--text, #f4f4f4)",
            fontFamily: "'Fira Mono', monospace",
            fontSize: "14px",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            animation: "slideDown 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>⌨️</span>
            <span>Vim mode available! Press <kbd style={{
              backgroundColor: "var(--primary, #7fd1b9)",
              color: "var(--bg, #181c20)",
              padding: "2px 6px",
              borderRadius: "3px",
              fontWeight: "bold"
            }}>-</kbd> to enable, <kbd style={{
              backgroundColor: "var(--primary, #7fd1b9)",
              color: "var(--bg, #181c20)",
              padding: "2px 6px",
              borderRadius: "3px",
              fontWeight: "bold"
            }}>?</kbd> for help</span>
          </div>
        </div>
      )
}