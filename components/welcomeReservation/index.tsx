import React from "react";
import cls from "./reservation.module.scss";
import Link from "next/link";
const WelcomeReservation = () => {
  return (
    <div className="welcome-container">
      <div className={cls.container}>
        <div className={cls.left}>
          <img src="/images/reservation.png" alt="" />
        </div>
        <div className={cls.right}>
          <div className={cls.top}>
            <div className={cls.label}>Advantages</div>
            <div className={cls.title}>
              Online <br />
              table reservation
            </div>
            <div className={cls.icon}>
              <img src="/images/logo.svg" alt="" />
            </div>
          </div>
          <div className={cls.bottom}>
            <div className={cls.bottomTitle}>
              Find your table for any occasion
            </div>
            <Link className={cls.bottomBtn} href="/reservations">
              Explore more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeReservation;
