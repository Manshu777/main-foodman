import React from "react";
import Link from "next/link";
import cls from "./footerMenu.module.scss";
import RestaurantFillIcon from "remixicon-react/RestaurantFillIcon";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useScrollDirection } from "hooks/useScrollDirection";
import { useAuth } from "contexts/auth/auth.context";
import ReservedLineIcon from "remixicon-react/ReservedLineIcon";
import useModal from "hooks/useModal";
import ModalContainer from "containers/modal/modal";
import ReservationFind from "components/reservationFind/reservationFind";

type Props = {};

export default function FooterMenu({}: Props) {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const scrollDirection = useScrollDirection();
  const { isAuthenticated } = useAuth();
  const [openReservation, handleOpenReservation, handleCloseReservation] =
    useModal();

  return (
    <div className={cls.root}>
      <div className={`${cls.scroll} ${cls[scrollDirection]}`}>
        <div className={cls.flex}>
          <div className={cls.wrapper}>
            <ul className={cls.list}>
              <li className={cls.item}>
                <Link
                  href={"/"}
                  className={`${cls.link} ${
                    pathname === "/" ? cls.active : ""
                  }`}
                >
                  <RestaurantFillIcon />
                  <span className={cls.text}>{t("home")}</span>
                </Link>
              </li>
              <li className={cls.item}>
                <Link
                  href={"/"}
                  className={cls.link}
                  onClick={handleOpenReservation}
                >
                  <ReservedLineIcon />
                  <span className={cls.text}>{t("reservation")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ModalContainer open={openReservation} onClose={handleCloseReservation}>
        <ReservationFind handleClose={handleCloseReservation} />
      </ModalContainer>
    </div>
  );
}
