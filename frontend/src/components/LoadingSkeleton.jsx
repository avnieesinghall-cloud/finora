import React from "react";

function LoadingSkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>

      <div className="skeleton-wide"></div>
      <div className="skeleton-wide"></div>
      <div className="skeleton-wide"></div>
    </div>
  );
}

export default LoadingSkeleton;