import React from "react";
import { Layout } from "antd";
import styles from "./Footer.module.css";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: "#fff" }} className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2 className={styles.title}>Fast Ticket</h2>
          <p>
            Fast Ticket is committed to making your life convenient, easier, and
            smarter.
          </p>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.linkSection}>
          <h3 className={styles["sub-title"]}>Company</h3>
          <a className={styles.link} href="/about">
            About Us
          </a>
          <a className={styles.link} href="/contact">
            Contact Us
          </a>
          <a className={styles.link} href="/terms">
            Terms of Use
          </a>
          <a className={styles.link} href="/privacy">
            Privacy Policy
          </a>
        </div>
        <div className={styles.linkSection}>
          <h3 className={styles["sub-title"]}>Services</h3>
          <a className={styles.link} href="/bus-tickets">
            Bus Tickets
          </a>
          <a className={styles.link} href="/launch-tickets">
            Launch Tickets
          </a>
          <a className={styles.link} href="/train-tickets">
            Train Tickets
          </a>
        </div>
        <div className={styles.linkSection}>
          <h3 className={styles["sub-title"]}>Social</h3>
          <a className={styles.link} href="https://www.facebook.com/fastticket">
            Facebook
          </a>
          <a className={styles.link} href="https://www.twitter.com/fastticket">
            Twitter
          </a>
          <a
            className={styles.link}
            href="https://www.instagram.com/fastticket"
          >
            Instagram
          </a>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
