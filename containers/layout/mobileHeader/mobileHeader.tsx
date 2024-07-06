import React, { useContext } from "react";
import Link from "next/link";
import cls from "./mobileHeader.module.scss";
import { BrandLogo, BrandLogoDark } from "components/icons";
import { ThemeContext } from "contexts/theme/theme.context";

export default function MobileHeader() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <header className={`container ${cls.header}`}>
      <div className={cls.navItem}>
        <Link href="/" className={cls.brandLogo}>
          {isDarkMode ? <BrandLogoDark /> : <BrandLogo />}
        </Link>
      </div>
    </header>
  );
}
