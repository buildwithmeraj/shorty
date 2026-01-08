import React, { useState } from "react";
import { ImArrowRight } from "react-icons/im";
import { HiOutlineRefresh } from "react-icons/hi";
const generateRandomTag = () => {
  let result = "";
  for (let i = 0; i < Number(import.meta.env.VITE_RANDOM_TAG_LENGTH); i++) {
    result += import.meta.env.VITE_ALPHANUMERIC_CHARS[
      Math.floor(Math.random() * import.meta.env.VITE_ALPHANUMERIC_CHARS.length)
    ];
  }
  return result;
};

const Example = () => {
  const longUrl =
    "https://www.example.com/articles/2025/01/08/this-is-a-very-long-url-example-that-has-multiple-path-segments-and-query-params?utm_source=newsletter&utm_medium=email&utm_campaign=very_long_url_demo&ref=homepage#section-deep-link";

  const [tag, setTag] = useState(generateRandomTag());
  const shortUrl = `${import.meta.env.VITE_SITE_URL.replace(/\/$/, "")}/${tag}`;

  return (
    <div className="max-w-7xl mx-auto my-6">
      <h2 className="mb-6 text-center">Shortening Example</h2>

      <div className="grid md:grid-cols-2 gap-4 relative">
        <div className="rounded-lg break-all p-4 bg-base-200">
          <div className="text-sm mb-2">Original (very long) URL</div>
          <div className="text-xs leading-relaxed link">{longUrl}</div>
        </div>

        <div className="rounded-lg bg-base-200 flex flex-col gap-3 items-start p-4">
          <div className="text-sm">Shortened URL (generated)</div>
          <div className="flex items-center gap-3">
            <a rel="noreferrer" className="text-primary font-mono text-lg link">
              {shortUrl}
            </a>

            <button
              onClick={() => setTag(generateRandomTag())}
              className="btn btn-sm btn-soft"
              title="Regenerate tag"
            >
              <HiOutlineRefresh />
              Regenerate
            </button>
          </div>
        </div>
        <div className="absolute bottom-[50%] left-[50%] h-1">
          <ImArrowRight
            size={24}
            className="-ml-3 -mt-3 lg:-mt-2 opacity-35 rotate-90 lg:rotate-0 text-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Example;
