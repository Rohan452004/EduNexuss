import React from "react";

const HighlightText = ({ text }) => {
  return (
    <div>
      <span className="highlight-text">{text}</span>

      <style jsx>{`
        .highlight-text {
          background: linear-gradient(to bottom, #1fa2ff, #12d8fa, #a6ffcb);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: normal;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes glow {
          0% {
            text-shadow: 0 0 5px #1fa2ff, 0 0 10px #12d8fa, 0 0 15px #a6ffcb;
          }
          50% {
            text-shadow: 0 0 15px #1fa2ff, 0 0 25px #12d8fa, 0 0 35px #a6ffcb;
          }
          100% {
            text-shadow: 0 0 5px #1fa2ff, 0 0 10px #12d8fa, 0 0 15px #a6ffcb;
          }
        }
      `}</style>
    </div>
  );
};

export default HighlightText;
