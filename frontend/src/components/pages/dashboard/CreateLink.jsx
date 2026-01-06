import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRandom } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Success from "../../utilities/Success";
import Error from "../../utilities/Error";
import CreateImage from "../../../assets/images/create.png";
import useAxiosSecure from "../../../hooks/useAxiosSecureInstance";
import { Link } from "react-router";
const SUCCESS_LOTTIE =
  "https://lottie.host/027b3643-28c4-4f6e-b7d9-5836e3d33a90/gqu4sL4del.json";

const CreateLink = () => {
  const axiosSecure = useAxiosSecure();

  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [originalURL, setOriginalURL] = useState(null);
  const [shortenedURL, setShortenedURL] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      setServerError(null);

      try {
        await axiosSecure.post("/shorten", {
          targetURL: data.targetURL.trim(),
          shortenTag: data.shortenTag.trim(),
        });
        setIsCreated(true);
        setShowSuccessModal(true);
        setOriginalURL(data.targetURL.trim());
        setShortenedURL(data.shortenTag.trim());
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to create short link"
        );
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure]
  );

  const generateRandom = useCallback(() => {
    let result = "";
    for (let i = 0; i < import.meta.env.VITE_RANDOM_TAG_LENGTH; i++) {
      result += import.meta.env.VITE_ALPHANUMERIC_CHARS[
        Math.floor(
          Math.random() * import.meta.env.VITE_ALPHANUMERIC_CHARS.length
        )
      ];
    }
    setValue("shortenTag", result, { shouldValidate: true });
  }, [setValue]);

  const resetAll = useCallback(() => {
    reset();
    setIsCreated(false);
    setServerError(null);
    setLoading(false);
    setOriginalURL(null);
    setShortenedURL(null);
  }, [reset]);

  const copyURL = useCallback(() => {
    const fullShortenedURL = `${window.location.origin}/${shortenedURL}`;
    navigator.clipboard.writeText(fullShortenedURL).then(
      () => {
        alert("Shortened URL copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy the URL: ", err);
      }
    );
  }, [shortenedURL]);

  const validateURL = useCallback((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return "Please enter a valid URL";
    }
  }, []);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 4100);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);
  useEffect(() => {
    generateRandom();
  }, [generateRandom]);

  return (
    <div className="h-screen">
      <div className="card lg:card-side bg-base-200 shadow-sm min-w-75 max-w-5xl flex items-center justify-center mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <figure className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <img src={CreateImage} alt="Create Link" className="max-h-120" />
        </figure>

        <div className="card-body lg:w-1/2">
          <div className="flex justify-center">
            <h2 className="card-title">Create Link</h2>
          </div>

          {serverError && <Error message={serverError} />}

          {!isCreated ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <div>
                  <label className="label">Target URL</label>
                  <input
                    type="text"
                    className={`input w-full ${
                      errors.targetURL ? "input-error" : ""
                    }`}
                    placeholder="https://example.com/very-long-url"
                    disabled={loading}
                    {...register("targetURL", {
                      required: "Target URL is required",
                      validate: validateURL,
                    })}
                  />
                  {errors.targetURL && (
                    <p className="text-error text-sm mt-1">
                      {errors.targetURL.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Shorten URL (Tag)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className={`input w-full ${
                        errors.shortenTag ? "input-error" : ""
                      }`}
                      placeholder="short"
                      readOnly
                      {...register("shortenTag", {
                        required: "Short tag is required",
                        minLength: {
                          value: 6,
                          message: "Must be at least 6 characters",
                        },
                        maxLength: {
                          value: 8,
                          message: "Must be at most 8 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only alphanumeric characters are allowed",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn btn-primary btn-circle"
                      onClick={generateRandom}
                      disabled={loading}
                      aria-label="Generate random tag"
                    >
                      <FaRandom />
                    </button>
                  </div>
                  {errors.shortenTag && (
                    <p className="text-error text-sm mt-1">
                      {errors.shortenTag.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-info mt-4 hover:btn-success"
                  disabled={loading}
                >
                  {loading ? "Shortening..." : "Create Link"}
                </button>
              </fieldset>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Success message="Link created successfully!" />

              <div>
                <label className="label">Original URL</label>
                <input
                  type="url"
                  id="originalURL"
                  className="input w-full"
                  name="originalURL"
                  defaultValue={originalURL}
                  readOnly
                />
              </div>
              <div>
                <label className="label">Shortened URL</label>
                <input
                  type="url"
                  id="shortenedURL"
                  className="input w-full"
                  name="shortenedURL"
                  defaultValue={shortenedURL}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={copyURL} className="btn btn-success">
                  Copy URL
                </button>
                <a
                  href={`/${shortenedURL}`}
                  className="btn btn-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Link
                </a>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resetAll}
                >
                  Create Another
                </button>
                <Link to="/dashboard" className="btn btn-info">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <dialog className="modal modal-open">
          <div className="modal-box flex items-center justify-center">
            <DotLottieReact
              src={SUCCESS_LOTTIE}
              autoplay
              loop={false}
              className="w-80 h-80"
            />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CreateLink;
