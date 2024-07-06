import React from "react";
import cls from "./welcomeHeader.module.scss";
import Link from "next/link";
import { BrandLogo } from "components/icons";
import useLocale from "hooks/useLocale";
import { useAuth } from "contexts/auth/auth.context";
import ProfileDropdown from "components/profileDropdown/profileDropdown";
import SecondaryButton from "components/button/secondaryButton";
import { useRouter } from "next/router";

type Props = {};

export default function WelcomeHeader({}: Props) {
  const { t } = useLocale();
  const { push } = useRouter();
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="welcome-container">
      <header className={cls.header}>
        <div className={cls.navItem}>
          <div className={cls.actions}>
            <Link href="/about" className={cls.itemLink}>
              {t("about")}
            </Link>
            <Link href="/blog" className={cls.itemLink}>
              {t("blog")}
            </Link>
            <Link href="/careers" className={cls.itemLink}>
              {t("careers")}
            </Link>
          </div>
        </div>
        <div className={cls.navItem}>
          <Link href="/" className={cls.brandLogo}>
            <BrandLogo />
          </Link>
        </div>
        {isAuthenticated ? (
          <ProfileDropdown data={user} />
        ) : (
          <button className={cls.loginBtn} onClick={() => push("/login")}>
            {t("login")}
          </button>
        )}
      </header>
    </div>
  );
}
