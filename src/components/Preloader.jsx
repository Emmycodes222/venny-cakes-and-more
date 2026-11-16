import { useEffect, useState } from "react";
import { business } from "../config";

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress(current => Math.min(current + 2.5, 100));
    }, 90);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return undefined;
    const timer = window.setTimeout(onFinish, 1000);
    return () => window.clearTimeout(timer);
  }, [progress, onFinish]);

  const step = progress >= 92
    ? "Fresh and ready!"
    : progress >= 72
      ? "Adding the cherries"
      : progress >= 48
        ? "Whipping the cream"
        : progress >= 22
          ? "Baking the layers"
          : "Whisking the batter";

  return (
    <div id="pre" className={progress === 100 ? "done" : ""} role="status" aria-label={`Loading ${business.name}`}>
      <div className="panel l" />
      <div className="panel r" />
      <div className="stage">
        <svg className="bake" viewBox="0 0 240 230" aria-hidden="true" focusable="false">
          <g className="plate">
            <ellipse cx="120" cy="207" rx="104" ry="15" fill="#a86a12" />
            <ellipse cx="120" cy="202" rx="104" ry="15" fill="#f2b134" />
            <ellipse cx="120" cy="199" rx="86" ry="9" fill="#fff8ea" />
          </g>
          <g className="tier t1">
            <rect x="40" y="148" width="160" height="50" rx="10" fill="#f2b134" />
            <rect x="40" y="176" width="160" height="7" fill="#d6432b" />
            <rect x="36" y="140" width="168" height="18" rx="9" fill="#fff8ea" />
            <ellipse cx="62" cy="160" rx="5.5" ry="9" fill="#fff8ea" />
            <ellipse cx="96" cy="162" rx="5.5" ry="12" fill="#fff8ea" />
            <ellipse cx="134" cy="160" rx="5.5" ry="8" fill="#fff8ea" />
            <ellipse cx="168" cy="163" rx="5.5" ry="11" fill="#fff8ea" />
          </g>
          <g className="tier t2">
            <rect x="62" y="104" width="116" height="46" rx="9" fill="#fff0cf" />
            <rect x="62" y="130" width="116" height="6" fill="#f2b134" />
            <rect x="58" y="96" width="124" height="17" rx="8.5" fill="#d6432b" />
            <ellipse cx="80" cy="114" rx="5" ry="8" fill="#d6432b" />
            <ellipse cx="112" cy="116" rx="5" ry="10" fill="#d6432b" />
            <ellipse cx="146" cy="114" rx="5" ry="7" fill="#d6432b" />
            <ellipse cx="164" cy="115" rx="5" ry="9" fill="#d6432b" />
          </g>
          <g className="tier t3">
            <rect x="86" y="64" width="68" height="42" rx="8" fill="#f2b134" />
            <rect x="86" y="88" width="68" height="5" fill="#fff8ea" />
            <rect x="82" y="56" width="76" height="15" rx="7.5" fill="#fff8ea" />
            <ellipse cx="100" cy="72" rx="4.5" ry="8" fill="#fff8ea" />
            <ellipse cx="120" cy="73" rx="4.5" ry="11" fill="#fff8ea" />
            <ellipse cx="140" cy="72" rx="4.5" ry="7" fill="#fff8ea" />
          </g>
          <g className="topping">
            <rect x="116" y="26" width="8" height="31" rx="3" fill="#d6432b" />
            <rect x="116" y="34" width="8" height="4" fill="#fff8ea" />
            <rect x="116" y="43" width="8" height="4" fill="#fff8ea" />
            <g className="flame">
              <path d="M120 5C128 15 129 24 120 25C111 24 112 15 120 5Z" fill="#f2b134" />
              <path d="M120 12C124 17 124 21 120 23C116 21 116 17 120 12Z" fill="#fff8ea" />
            </g>
            <circle cx="70" cy="89" r="8" fill="#d6432b" />
            <circle cx="67.5" cy="85.5" r="2.2" fill="#fff" opacity=".75" />
            <path d="M70 81q1-7 7-8" fill="none" stroke="#6aa84f" strokeWidth="2" strokeLinecap="round" />
            <circle cx="170" cy="89" r="8" fill="#d6432b" />
            <circle cx="167.5" cy="85.5" r="2.2" fill="#fff" opacity=".75" />
            <path d="M170 81q1-7 7-8" fill="none" stroke="#6aa84f" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="spr">
            <circle className="sp s1" cx="28" cy="128" r="3.2" fill="#f2b134" />
            <circle className="sp s2" cx="212" cy="118" r="3.2" fill="#d6432b" />
            <circle className="sp s3" cx="46" cy="70" r="3" fill="#6aa84f" />
            <circle className="sp s4" cx="196" cy="62" r="3" fill="#f2b134" />
            <circle className="sp s5" cx="22" cy="176" r="3" fill="#fff8ea" />
            <circle className="sp s6" cx="220" cy="170" r="3.2" fill="#6aa84f" />
            <circle className="sp s7" cx="84" cy="30" r="3" fill="#d6432b" />
            <circle className="sp s8" cx="160" cy="34" r="3" fill="#fff8ea" />
          </g>
        </svg>
        <div className="pname" id="pname" aria-hidden="true">
          {Array.from(business.name).map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>
          ))}
        </div>
        <p className="pstep">{step}</p>
        <div className="bar" aria-hidden="true">
          <i className="bar-progress" />
        </div>
        <span aria-hidden="true">{Math.round(progress)}%</span>
        <button id="skip" type="button" onClick={onFinish}>Skip</button>
      </div>
    </div>
  );
}
