import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  width: 100%;
  height: auto;
`;

export function LogoOnly({ style = {} }) {
  return (
    <SVG viewBox="40, 30, 325, 197" style={style}>
      <g id="svgg">
        <path
          id="path1"
          d="M38.567 27.580 C 38.354 27.836,38.295 48.433,38.343 105.743 L 38.407 183.558 136.031 183.687 L 233.654 183.815 233.720 204.728 C 233.767 219.660,233.868 225.740,234.073 225.987 C 234.473 226.470,364.270 226.507,364.753 226.024 C 365.202 225.575,365.202 27.989,364.753 27.540 C 364.303 27.091,176.737 27.091,176.288 27.540 C 175.842 27.986,175.842 66.041,176.288 66.487 C 176.613 66.812,185.559 66.948,186.363 66.639 C 186.727 66.500,186.769 65.029,186.769 52.669 C 186.769 41.364,186.833 38.803,187.117 38.567 C 187.374 38.354,209.376 38.295,270.675 38.343 L 353.886 38.407 353.950 127.281 C 354.002 198.210,353.950 216.195,353.693 216.358 C 353.131 216.716,245.496 216.620,245.138 216.262 C 244.689 215.813,244.689 101.207,245.138 100.758 C 245.375 100.520,255.540 100.450,289.326 100.450 L 333.205 100.450 333.205 94.541 L 333.205 88.632 236.275 88.632 C 161.227 88.632,139.275 88.562,139.037 88.324 C 138.813 88.100,138.728 86.178,138.728 81.286 C 138.728 75.387,138.678 74.538,138.322 74.401 C 138.098 74.316,135.854 74.245,133.333 74.245 C 130.813 74.245,128.568 74.316,128.345 74.401 C 127.988 74.538,127.938 75.389,127.938 81.306 C 127.938 86.650,127.866 88.115,127.592 88.342 C 127.344 88.549,120.127 88.648,101.966 88.695 L 76.686 88.760 76.686 94.541 L 76.686 100.321 155.170 100.451 C 198.337 100.522,233.684 100.609,233.720 100.643 C 233.755 100.678,233.755 116.863,233.720 136.609 L 233.654 172.511 141.570 172.576 C 68.071 172.627,49.444 172.576,49.281 172.319 C 48.923 171.756,49.019 38.945,49.377 38.587 C 49.854 38.110,127.248 38.142,127.644 38.619 C 127.823 38.834,127.953 40.799,127.997 43.950 L 128.067 48.940 133.333 48.940 L 138.600 48.940 138.667 38.296 C 138.720 29.951,138.664 27.607,138.410 27.445 C 137.790 27.052,38.894 27.185,38.567 27.580 "
          stroke="none"
          fill="currentColor"
          fillRule="evenodd"
        ></path>
      </g>
    </SVG>
  );
}
