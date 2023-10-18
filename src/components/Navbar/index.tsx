import { Button, Menu } from "antd";
import Link from "next/link";
import styles from "./navbar.module.css";
import { MenuOutlined, HomeFilled, PayCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { primaryColor } from "@/utils/color";
import { removeFromLocalStorage } from "@/utils/local-store";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignout = () => {
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    router.push("/");
  };

  const isAlreadyLoggedIn = isLoggedIn();

  const { role } = getUserInfo() as any;

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      setIsUserLoggedIn(true);
    }
  }, [isUserLoggedIn]);

  const items = (
    <>
      <>
        {!isMobileMenuOpen && (
          <div style={{ margin: "0 20px" }}>
            <h2
              style={{
                margin: "0 20vw 0 10vw",
                color: primaryColor,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Fast Ticket
            </h2>
          </div>
        )}
      </>
      <Menu.Item icon={<HomeFilled />} className={styles["menu-item"]}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item icon={<PayCircleFilled />} className={styles["menu-item"]}>
        <Link href={role ? `/dashboard/${role}` : "/login"}>Buy Ticket</Link>
      </Menu.Item>
      <Menu.Item className={styles["menu-item"]}>
        <Link href="/contact">Contact</Link>
      </Menu.Item>
      <Menu.Item className={styles["menu-item"]}>
        <Link href="/all-bus">Bus & Review</Link>
      </Menu.Item>
      {isUserLoggedIn && (
        <Menu.Item className={styles["menu-item"]}>
          <Link href={`/dashboard/${role}`}>Dashboard</Link>
        </Menu.Item>
      )}

      {isUserLoggedIn ? (
        <Menu.Item className={styles["menu-item"]}>
          <Button
            onClick={() => {
              handleSignout();
              setIsUserLoggedIn(false);
            }}
          >
            Log out
          </Button>
        </Menu.Item>
      ) : (
        <Menu.Item className={styles["menu-item"]}>
          <Link href="/login">Login</Link>
        </Menu.Item>
      )}
    </>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles["mobile-only"]}>
        <div className={styles["mobile-section"]}>
          <div style={{ margin: "0 20px" }}>
            <h2>Fast Ticket</h2>
          </div>
          <Button
            icon={<MenuOutlined />}
            onClick={toggleMobileMenu}
            className={`${styles["mobile-menu-button"]} ${
              isMobileMenuOpen ? styles["hide-icon"] : ""
            }`}
          />
        </div>
        {isMobileMenuOpen && (
          <div className={styles["mobile-menu"]}>
            <Menu mode="vertical">{items}</Menu>
          </div>
        )}
      </div>

      <div className={styles["desktop-only"]}>
        <div>
          <Menu
            style={{
              borderWidth: 0,
            }}
            mode="horizontal"
          >
            {items}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
