import React from "react";

export default function LoadingSpinner({ size = 20, color = "white" }) {
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-${color}-500`}
      style={{ width: size, height: size }}
    ></div>
  );
}
