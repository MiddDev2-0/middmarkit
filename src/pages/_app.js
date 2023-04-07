/* eslint-disable */
import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";
import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/MainApp.module.css";

import { useRouter } from "next/router";

function MainApp({ Component, pageProps }) {
  const props = {
    ...pageProps,
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Midd Markit</title>
      </Head>
      <main>
        <Component {...props} />
      </main>

      <footer></footer>
    </div>
  );
}

export default MainApp;
MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
