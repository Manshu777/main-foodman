/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import cls from "./v1.module.scss";
import { Grid, useMediaQuery } from "@mui/material";
import { BrandLogo, BrandLogoDark } from "components/icons";
import { ThemeContext } from "contexts/theme/theme.context";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { META_TITLE } from "constants/config";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import TwitterFillIcon from "remixicon-react/TwitterFillIcon";
import InstagramLineIcon from "remixicon-react/InstagramLineIcon";
import { useSettings } from "contexts/settings/settings.context";

type Props = {};

export default function Footer({}: Props) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:576px)");
  const { settings } = useSettings();
  const isReferralActive = settings.referral_active == 1;

  return (
    <div className="welcome-container">
      <footer className={cls.footer}>
        <div className="container">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} order={isMobile ? 3 : 0}>
              <div className={cls.main}>
                <div className={cls.logoWrapper}>
                  <BrandLogoDark />
                </div>
                <address>
                  4517 Washington Ave. Manchester, <br /> Kentucky 39495 USA{" "}
                  <br />
                  +1-202-600-0011 , (555) 000-1212
                </address>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <ul className={cls.column}>
                <li className={cls.columnItem}>
                  <Link href="/about" className={cls.listItem}>
                    {t("about")} {META_TITLE}
                  </Link>
                </li>
                <li className={cls.columnItem}>
                  <Link href="/careers" className={cls.listItem}>
                    {t("careers")}
                  </Link>
                </li>
                <li className={cls.columnItem}>
                  <Link href="/be-seller" className={cls.listItem}>
                    {t("add.your.restaurant")}
                  </Link>
                </li>
                <li className={cls.columnItem}>
                  <Link href="/blog" className={cls.listItem}>
                    {t("blog")}
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>

          <div className={cls.bottom}>
            <Grid
              container
              spacing={4}
              flexDirection={isMobile ? "column" : "row"}
            >
              <Grid item xs={12} md={6}>
                <div className={cls.social}>
                  <a
                    href={settings?.instagram_url}
                    className={cls.socialItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramLineIcon />
                  </a>
                  <a
                    href={settings?.twitter_url}
                    className={cls.socialItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterFillIcon />
                  </a>
                  <a
                    href={settings?.facebook_url}
                    className={cls.socialItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookCircleFillIcon />
                  </a>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className={cls.flex}>
                  <Link href="/privacy" className={cls.mutedLink}>
                    {t("privacy.policy")}
                  </Link>
                  <Link href="/terms" className={cls.mutedLink}>
                    {t("terms")}
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <p className={cls.text}>
                  &copy; {new Date().getFullYear()} {settings?.footer_text}
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      </footer>
    </div>
  );
}
