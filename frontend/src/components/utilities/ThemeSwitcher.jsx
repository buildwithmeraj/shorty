import { useEffect, useState } from "react";
import styled from "styled-components";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <Wrapper>
      <label className="switch">
        <span className="sun">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="#ffd43b">
              <circle cx="12" cy="12" r="5" />
              <path d="m21 13h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2zm-17 0h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29z" />
            </g>
          </svg>
        </span>

        <span className="moon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
        </span>

        <input
          type="checkbox"
          className="input"
          checked={theme === "dark"}
          onChange={handleToggle}
          aria-label="Toggle theme"
        />

        <span className="slider" />
      </label>
    </Wrapper>
  );
};

export default ThemeSwitcher;

const Wrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 64px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #73c0fc;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 30px;
    width: 30px;
    left: 2px;
    bottom: 2px;
    background-color: #e8e8e8;
    transition: 0.4s;
    border-radius: 20px;
    z-index: 2;
  }

  .sun svg {
    position: absolute;
    top: 6px;
    left: 36px;
    width: 24px;
    height: 24px;
    z-index: 1;
    animation: rotate 15s linear infinite;
  }

  .moon svg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 24px;
    height: 24px;
    fill: #73c0fc;
    z-index: 1;
    animation: tilt 5s linear infinite;
  }

  .input:checked + .slider {
    background-color: #183153;
  }

  .input:checked + .slider::before {
    transform: translateX(30px);
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes tilt {
    0%,
    100% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }
`;
