import { AdminProvider } from "@/context/Admin.context";
import "@/styles/globals.css";
import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <AdminProvider>
        <Head>Donor Admin</Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AdminProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover={false}
      />
    </React.Fragment>
  );
}
