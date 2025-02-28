import React from "react";
interface CoinIconProps {
  className?: string;
}

const CoinIcon: React.FC<CoinIconProps> = ({ className }) => {
  return (
    <svg
    className={className}
      height="24px"
      version="1.1"
      viewBox="0 0 256 256"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <desc />
      <defs />
      <g
        fill="none"
        fillRule="evenodd"
        id="Classic"
        stroke="none"
        strokeWidth="1"
      >
        <g
          fill="#F3BA2F"
          id="Binance-Coin"
          transform="translate(-1570.000000, -2488.000000)"
        >
          <g transform="translate(1570.000000, 2488.000000)">
            <polygon
              id="Fill-3"
              points="8.30912153 147.721013 48.4291093 147.721013 48.4291093 107.601025 8.30912153 107.601025"
              transform="translate(28.369115, 127.661019) rotate(-45.000000) translate(-28.369115, -127.661019) "
            />
            <polygon
              id="Fill-3"
              points="206.892929 147.721013 247.012917 147.721013 247.012917 107.601025 206.892929 107.601025"
              transform="translate(226.952923, 127.661019) rotate(-45.000000) translate(-226.952923, -127.661019) "
            />
            <polygon
              id="Fill-3"
              points="107.601025 147.721013 147.721013 147.721013 147.721013 107.601025 107.601025 107.601025"
              transform="translate(127.661019, 127.661019) rotate(-45.000000) translate(-127.661019, -127.661019) "
            />
            <path
              d="M182.826002,42.9100781 L182.826002,22.8500842 L72.4960362,22.8500842 L72.4960362,62.970072 L142.706015,62.970072 L142.706015,133.180051 L182.826002,133.180051 L182.826002,42.9100781 Z"
              id="Combined-Shape"
              transform="translate(127.661019, 78.015067) rotate(-45.000000) translate(-127.661019, -78.015067) "
            />
            <path
              d="M182.826002,142.201982 L182.826002,122.141988 L72.4960362,122.141988 L72.4960362,162.261976 L142.706015,162.261976 L142.706015,232.471954 L182.826002,232.471954 L182.826002,142.201982 Z"
              id="Combined-Shape"
              transform="translate(127.661019, 177.306971) rotate(-225.000000) translate(-127.661019, -177.306971) "
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CoinIcon;
