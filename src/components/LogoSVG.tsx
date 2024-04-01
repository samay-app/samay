import * as React from "react";
import { SVGProps } from "react";

const LogoSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 1000 1000"
    {...props}
  >
    <style>
      {
        ".st1{stroke:#000;stroke-width:100;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
      }
    </style>
    <path
      d="M672.5 929.5h-344c-141.9 0-257-115.1-257-257v-344c0-141.9 115.1-257 257-257h344c141.9 0 257 115.1 257 257v344c0 141.9-115.1 257-257 257z"
      style={{
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 115,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <circle cx={662.5} cy={337.5} r={82.5} className="st1" />
    <circle cx={337.5} cy={662.5} r={82.5} className="st1" />
    <circle cx={662.5} cy={662.5} r={82.5} className="st1" />
    <circle cx={337.5} cy={337.5} r={82.5} className="st1" />
    <path
      d="M571 639H428c-37.6 0-68-30.4-68-68V428c0-37.6 30.4-68 68-68h143c37.6 0 68 30.4 68 68v143c0 37.6-30.4 68-68 68z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);

export default LogoSVG;
