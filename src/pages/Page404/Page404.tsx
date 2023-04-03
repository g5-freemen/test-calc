import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Page404.module.css';

export const Page404 = () => (
  <div className={styles.wrapper}>
    <span className={styles.sadSmile} role="img" aria-label="sad smile">
      ☹️
    </span>
    <div className={styles.bigTxt}>404</div>
    <h1>Page not found</h1>
    <div className={styles.smallTxt}>The Page you are looking for doesn`t exist</div>
    <Link to="/" className={styles.link}>
      Back to homepage
    </Link>
  </div>
);
