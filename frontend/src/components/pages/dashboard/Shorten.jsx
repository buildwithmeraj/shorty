import React, { useState, useEffect, useCallback } from "react";
import { set, useForm, useWatch } from "react-hook-form";
import { FaExternalLinkSquareAlt, FaRandom } from "react-icons/fa";
import { Link } from "react-router";
import Warning from "../../utilities/Warning";
import Success from "../../utilities/Success";
import Error from "../../utilities/Error";
import CreateImage from "../../../assets/images/create.png";
import WarningImage from "../../../assets/images/warning.png";
import DoneImage from "../../../assets/images/done.png";
import useAxiosSecure from "../../../hooks/useAxiosSecureInstance";
import { BsStars } from "react-icons/bs";
import "animate.css";
import { FaGear } from "react-icons/fa6";
import { BiSolidCopy } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";

const Shorten = () => {
  const axiosSecure = useAxiosSecure();
  const [isCreated, setIsCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedTag, setShortenedTag] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const shortenTagValue = useWatch({
    control,
    name: "shortenTag",
    defaultValue: "",
  });

  const generateRandomTag = useCallback(() => {
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

  const validateURL = useCallback((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return "Please enter a valid URL";
    }
  }, []);

  const fetchTotalLinks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/links/total");
      setTotalLinks(res.data.totalLinks ?? 0);
    } catch (err) {
      console.error("Failed to fetch total links", err);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  const resetAll = useCallback(() => {
    reset();
    setIsCreated(false);
    setServerError(null);
    setOriginalURL("");
    setShortenedTag("");
    generateRandomTag();
  }, [reset, generateRandomTag]);

  const copyURL = useCallback(() => {
    const fullURL = `${import.meta.env.VITE_SITE_URL}/${shortenedTag}`;
    navigator.clipboard.writeText(fullURL);
  }, [shortenedTag]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setServerError(null);

    try {
      await axiosSecure.post("/shorten", {
        targetURL: data.targetURL.trim(),
        shortenTag: data.shortenTag.trim(),
      });

      setOriginalURL(data.targetURL.trim());
      setShortenedTag(data.shortenTag.trim());
      setIsCreated(true);
      setShowSuccessModal(true);
      fetchTotalLinks();
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Failed to create short link"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    generateRandomTag();
    fetchTotalLinks();
    document.title = `Shorten Link - ${import.meta.env.VITE_SITE_NAME}`;
  }, [generateRandomTag, fetchTotalLinks]);

  useEffect(() => {
    if (totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER) {
      setShowLimitModal(true);
    }
  }, [totalLinks]);

  useEffect(() => {
    if (!showSuccessModal) return;
    const timer = setTimeout(() => setShowSuccessModal(false), 4100);
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const fullShortURL = shortenedTag
    ? `${import.meta.env.VITE_SITE_URL}/${shortenedTag}`
    : "";

  return (
    <div className="h-[78dvh]">
      <div className="card lg:card-side bg-base-200 shadow-sm min-w-75  max-w-5xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <figure className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <img
            key={
              totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER
                ? "limit"
                : isCreated
                ? "done"
                : "create"
            }
            src={
              totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER
                ? WarningImage
                : isCreated
                ? DoneImage
                : CreateImage
            }
            alt="Create Link"
            className="max-h-120 object-contain animate__animated animate__bounceIn"
          />
        </figure>

        <div className="card-body lg:w-1/2 flex items-center justify-center">
          <h2 className="card-title justify-center">Shorten Link</h2>

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
                    placeholder="https://example.com"
                    disabled={submitting}
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
                  <label className="label">Shorten Tag</label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      id="currentTag"
                      readOnly
                      className={`input w-full ${
                        errors.shortenTag ? "input-error" : ""
                      }`}
                      {...register("shortenTag", {
                        required: "Shorten tag is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                        maxLength: {
                          value: 8,
                          message: "Maximum 8 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only alphanumeric characters allowed",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn btn-soft btn-circle"
                      onClick={generateRandomTag}
                      disabled={submitting}
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

                <div className="alert alert-success alert-soft rounded-lg mt-4 font-semibold text-center relative">
                  <BsStars
                    className="absolute top-2 left-3 opacity-20"
                    size={24}
                  />
                  Shortened URL:
                  <br />
                  {import.meta.env.VITE_SITE_URL}/{shortenTagValue}
                  <BsStars
                    className="absolute bottom-3 right-2 opacity-40"
                    size={32}
                  />
                </div>

                <div className="flex items-center gap-4 my-2">
                  <div>
                    Tier: Free ({totalLinks}/
                    {import.meta.env.VITE_MAX_LINKS_PER_USER})
                  </div>
                  <div>
                    {loading ? (
                      <progress className="progress w-56"></progress>
                    ) : (
                      <progress
                        className="progress progress-success w-56 mr-2"
                        value={totalLinks}
                        max={import.meta.env.VITE_MAX_LINKS_PER_USER}
                      ></progress>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success text-white mt-4"
                  disabled={
                    submitting ||
                    totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER
                  }
                >
                  {submitting ? (
                    <>
                      <FaGear className="animate-spin" />
                      Shortening..."
                    </>
                  ) : (
                    <>
                      <FaGear />
                      Shorten
                    </>
                  )}
                </button>
                <div className="divider">OR</div>
                <Link className="btn btn-primary" to={`/dashboard`}>
                  <ImStatsDots />
                  Visit Dashboard
                </Link>
                {totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER && (
                  <>
                    <Warning message="You have reached the maximum number of links allowed. You must upgrade your plan or delete some existing links to create more links." />
                  </>
                )}
              </fieldset>
            </form>
          ) : (
            <div className="space-y-4">
              <Success message="Link created successfully!" />
              <div>
                <label className="label">Original URL:</label>
                <input className="input w-full" readOnly value={originalURL} />
              </div>
              <div>
                <label className="label">Shortened URL:</label>
                <input className="input w-full" readOnly value={fullShortURL} />
              </div>
              <div className="flex gap-2 justify-center items-center">
                <button
                  className="btn btn-success flex-1 text-white"
                  onClick={copyURL}
                >
                  <BiSolidCopy />
                  Copy URL
                </button>
                <Link to="/dashboard" className="btn btn-info text-white">
                  <ImStatsDots />
                  Dashboard
                </Link>
              </div>
              <div className="divider">OR</div>
              <div className="flex gap-2 justify-center">
                <button className="btn btn-primary flex-1" onClick={resetAll}>
                  <FaGear />
                  Short Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLimitModal && (
        <dialog className="modal modal-open">
          <div className="modal-box flex flex-col items-center text-center">
            <img
              src={WarningImage}
              alt="Warning"
              className="w-72 h-72 object-contain"
            />

            <p className="text-warning mt-4">
              You have reached the maximum number of links allowed. Upgrade your
              plan or delete existing links to continue.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setShowLimitModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Shorten;
