import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  Close: (props: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
      </svg>
    );
  },
  Check: (props: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8483 5.65152C21.317 6.12015 21.317 6.87995 20.8483 7.34858L9.84834 18.3486C9.37972 18.8172 8.61992 18.8172 8.15129 18.3486L3.65128 13.8486C3.18265 13.3799 3.18265 12.6202 3.65128 12.1515C4.1199 11.6829 4.8797 11.6829 5.34833 12.1515L8.99981 15.803L19.1513 5.65152C19.6199 5.18289 20.3797 5.18289 20.8483 5.65152Z"
        />
      </svg>
    );
  },
};
