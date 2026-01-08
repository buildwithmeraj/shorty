import React, { useEffect, useState } from "react";
import Loading from "../../utilities/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecureInstance";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCopy } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecureInstance = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  const showDeleteModal = (link) => {
    return () => {
      setLinkToDelete(link);
      setShowModal(true);
    };
  };

  const handleDelete = () => {
    axiosSecureInstance
      .delete(`/links/${linkToDelete.shortenTag}`)
      .then(() => {
        toast.success("Link deleted successfully!");
        fetchLinks();
      })
      .catch((error) => {
        console.error("Error deleting link:", error);
        toast.error("Failed to delete the link.");
      })
      .finally(() => {
        setShowModal(false);
        setLinkToDelete(null);
      });
  };

  const fetchLinks = async () => {
    axiosSecureInstance
      .get("/links")
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching links:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLinks();
    document.title = `Dashboard - ${import.meta.env.VITE_SITE_NAME}`;
  });

  if (loading) return <Loading />;
  return (
    <>
      <h2 className="text-center mb-6">Dashboard</h2>
      <div className="flex flex-col md:flex-row items-center justify-between my-3">
        <h3 className="font-bold text-2xl">
          Your Links ({links.length}/{import.meta.env.VITE_MAX_LINKS_PER_USER})
        </h3>
        <Link className="btn btn-primary" to="/shorten">
          <FaPlus />
          Shorten
        </Link>
      </div>
      {links.length === 0 ? (
        <p>No links created yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-content/20 bg-base-100/40 backdrop-blur-sm">
          <table className="table">
            <thead className="bg-base-content/10">
              <tr>
                <th>Original URL</th>
                <th>Shorten Tag</th>
                <th>Shortened URL</th>
                <th>Hits</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.shortenTag}>
                  <td className="max-w-s">
                    <div
                      className="tooltip tooltip-top wrap-anywhere"
                      data-tip={link.targetURL}
                    >
                      <span className="block truncate max-w-xs cursor-help">
                        {link.targetURL}
                      </span>
                    </div>
                  </td>

                  <td>{link.shortenTag}</td>
                  <td>
                    <a
                      href={`${import.meta.env.VITE_SITE_URL}/${
                        link.shortenTag
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {`${import.meta.env.VITE_SITE_URL}/${link.shortenTag}`}
                    </a>
                  </td>
                  <td>{link.hits}</td>
                  <td>{new Date(link.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary text-white mr-2"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${import.meta.env.VITE_SITE_URL}/${link.shortenTag}`
                        );
                        toast.success("Shortened URL copied to clipboard!");
                      }}
                    >
                      <BiSolidCopy />
                      Copy
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={showDeleteModal(link)}
                    >
                      <MdDelete />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <dialog className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Link</h3>
            <p className="text-error mt-4">
              Are you sure you want to delete this link? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-error text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn btn-soft"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Dashboard;
