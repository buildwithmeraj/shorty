import React, { useState } from "react";
import toast from "react-hot-toast";
import Error from "../../utilities/Error";
import Info from "../../utilities/Info";
import CreateImage from "../../../assets/images/create.png";
import Loading from "../../utilities/Loading";
import { FaRandom } from "react-icons/fa";

const CreateLink = () => {
  const [error, setError] = useState(null);
  const handleForm = (e) => {
    e.preventDefault();
    setError(null);

    const targetURL = e.target.target.value.trim();
    const shortenTag = e.target.short.value.trim();
  };
  const generateRandom = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 5;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    document.getElementById("tag").value = result;
  };
  return (
    <div>
      <div className="h-screen">
        <div className="card lg:card-side bg-base-200 shadow-sm min-w-75 max-w-5xl flex items-center justify-center mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <figure className="hidden lg:flex lg:w-1/2">
            <img src={CreateImage} alt="Create Link" className="max-h-150" />
          </figure>
          <div className="card-body lg:w-1/2">
            <div className="flex justify-center">
              <h2 className="card-title">Create Link</h2>
            </div>
            {error && <Error message={error} />}
            <form onSubmit={handleForm}>
              <fieldset className="fieldset">
                <div>
                  <label className="label">Target URL</label>
                  <input
                    type="url"
                    id="target"
                    className="input w-full"
                    placeholder="https://example.com/very-long-url"
                    name="target"
                    required
                  />
                </div>
                <div>
                  <label className="label">Shorten URL</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      id="tag"
                      className="input w-full"
                      placeholder="/short"
                      name="tag"
                      required
                    />
                    <button
                      className="btn btn-primary btn-circle"
                      onClick={generateRandom}
                      type="button"
                    >
                      <FaRandom />
                    </button>
                  </div>
                </div>

                <button className="btn btn-info mt-4 hover:btn-success">
                  Create Link
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
