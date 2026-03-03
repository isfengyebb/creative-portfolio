/*
 * @Author: isfengyebb
 * @Date: 2026-03-03 10:14:10
 * @LastEditTime: 2026-03-03 11:00:01
 * @LastEditors: isfengyebb
 * @Description: description
 */
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './RootLayout.module.css';

function RootLayout() {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
