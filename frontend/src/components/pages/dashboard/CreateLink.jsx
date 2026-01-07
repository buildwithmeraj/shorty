import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaRandom } from "react-icons/fa";
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

const CreateLink = () => {
  const axiosSecure = useAxiosSecure();
  const [isCreated, setIsCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedTag, setShortenedTag] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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
      const res = await axiosSecure.get("/links/total");
      setTotalLinks(res.data.totalLinks ?? 0);
    } catch (err) {
      console.error("Failed to fetch total links", err);
    }
  }, [axiosSecure]);

  const resetAll = useCallback(() => {
    reset();
    setIsCreated(false);
    setServerError(null);
    setOriginalURL("");
    setShortenedTag("");
  }, [reset]);

  const copyURL = useCallback(() => {
    const fullURL = `${window.location.origin}/${shortenedTag}`;
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
    document.title = `Create Link - ${import.meta.env.VITE_SITE_NAME}`;
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
    ? `${window.location.origin}/${shortenedTag}`
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
          <h2 className="card-title justify-center">Create Link</h2>

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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="currentTag"
                      readOnly
                      className={`input w-full ${
                        errors.shortenTag ? "input-error" : ""
                      }`}
                      {...register("shortenTag", {
                        required: true,
                        minLength: 6,
                        maxLength: 8,
                        pattern: /^[a-zA-Z0-9]+$/,
                      })}
                    />
                    <button
                      type="button"
                      className="btn btn-primary btn-circle"
                      onClick={generateRandomTag}
                      disabled={submitting}
                    >
                      <FaRandom />
                    </button>
                  </div>
                </div>

                <div className="alert alert-success alert-soft rounded-lg mt-4 font-semibold">
                  <BsStars className="inline -mr-3" size={18} /> Shortened URL:{" "}
                  {window.location.origin}/
                  {document.getElementById("currentTag")?.value}
                </div>

                <button
                  type="submit"
                  className="btn btn-info mt-4"
                  disabled={
                    submitting ||
                    totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER
                  }
                >
                  {submitting ? "Shortening..." : "Create Link"}
                </button>
                {totalLinks >= import.meta.env.VITE_MAX_LINKS_PER_USER && (
                  <>
                    <Warning message="You have reached the maximum number of links allowed. You must upgrade your plan or delete some existing links to create more links." />
                    <p className="text-center">
                      <Link className="btn btn-primary" to="/dashboard">
                        Dashboard
                      </Link>
                    </p>
                  </>
                )}
              </fieldset>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <Success message="Link created successfully!" />

              <input className="input w-full" readOnly value={originalURL} />

              <input className="input w-full" readOnly value={fullShortURL} />

              <div className="flex gap-2 justify-center">
                <button className="btn btn-success" onClick={copyURL}>
                  Copy URL
                </button>
                <a
                  href={fullShortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info"
                >
                  Visit
                </a>
              </div>

              <div className="flex gap-2 justify-center">
                <button className="btn btn-primary" onClick={resetAll}>
                  Create Another
                </button>
                <Link to="/dashboard" className="btn btn-outline">
                  Dashboard
                </Link>
              </div>

              <p className="text-sm opacity-70">
                Total links created: {totalLinks}
              </p>
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

export default CreateLink;
