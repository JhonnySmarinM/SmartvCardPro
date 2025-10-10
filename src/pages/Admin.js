import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Admin.module.css";
import { ClipLoader } from "react-spinners";

const Admin = () => {
  const emailClient = (() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email;
    }
    return null;
  })();

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://startapp360.com/api/v1/qr/")
      .then((res) => {
        console.log("Fetched data:", res.data);
        const filteredData = res.data.filter((item) => item.emailClient === emailClient);
        setLinks(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Error fetching data");
      })
      .finally(() => setIsLoading(false));
  }, [emailClient]);

  const saveTemplate = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.delete(`https://artemisacrea.ddns.net/api/v1/qr/${id}/`);
      setLinks((prev) => prev.filter((item) => item.id !== id));
      toast.success("Eliminado con éxito");
    } catch (error) {
      toast.error(`Error al eliminar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Cerrando sesión...");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      {/* Auth Header - Solo visible si está autenticado */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => window.location.href = '/admin'}
          className="px-4 py-2 bg-gradient-to-r from-turquesa-500 to-turquesa-600 hover:from-turquesa-600 hover:to-turquesa-700 text-white rounded-lg transition-all font-medium shadow-glow-turquesa hover:shadow-luxury shine-effect"
        >
          Admin
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-carbon-600 hover:bg-carbon-700 text-texto rounded-lg transition-all font-medium shadow-luxury"
        >
          Out
        </button>
      </div>
      <h2 className={styles.title}>Admin Panel</h2>
      <div className={styles.listContainer}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
          </div>
        ) : links.length > 0 ? (
          <ul className={styles.list}>
            <li className={`${styles.listItem} ${styles.listItemHeader}`}>
              <span>ID</span>
              <span>BUSINESS NAME</span>
              <span>ACTION</span>
            </li>
            {links.map((link, index) => (
              <li key={index} className={styles.listItem}>
                <span>{link.id}</span>
                <span>{link.businessName}</span>
                <span>
                  <button className={styles.button} onClick={(e) => saveTemplate(e, link.id)} disabled={isLoading}>
                    Delete
                  </button>
                  <button className={styles.button} onClick={() => window.location.href = `/${link.id}`}>
                    Edit
                  </button>
                  <button className={styles.button} onClick={() => window.open(`/qrDisplay/${link.id}`, '_blank')}>
                    View
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.messageTable}>No hay páginas guardadas</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
