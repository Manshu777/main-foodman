import React from "react";
import cls from "./style.module.scss";
import ServiceItem from "./serviceItem";
import Link from "next/link";
export default function HowDoesItWork() {
  const cardList = [
    {
      title: "You place products",
      link: "/",
      desc: "What should be placed in the institution?",
      img: "/images/service1.png",
    },
    {
      title: "QR Scanning",
      link: "/",
      desc: "Or attaches the phone to an NFC chip",
      img: "/images/service2.png",
    },
    {
      title: "Opening the menu",
      link: "/",
      desc: "Does not require installation",
      img: "/images/service3.png",
    },
  ];
  return (
    <div className="welcome-container">
      <div className={cls.container}>
        <div className={cls.title}>How does it work?</div>
        <div className={cls.serviceItems}>
          {cardList.map((item, key) => (
            <ServiceItem key={key} item={item} />
          ))}
        </div>
        <div className={cls.bottomContent}>
          <div className={cls.left}>
            <div className={cls.text}>
              Easily guided, the customer selects suitable dishes and makes an
              order.
            </div>
            <Link href="/about">
              <div className={cls.seeAllBtn}>See All</div>
            </Link>
          </div>
          <div className={cls.right}>
            Everything your customers need in one service
          </div>
        </div>
      </div>
    </div>
  );
}
