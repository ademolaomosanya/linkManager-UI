import * as React from "react"
const LinkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#121417"
        fillRule="evenodd"
        d="M8 1.833H2v8.889h6v4.445h6V6.278H8V1.833Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default LinkIcon
