import React from "react";
import cls from "./style.module.scss";
import Link from "next/link";
const ServiceItem = ({ item }: any) => {
  return (
    <div className={cls.itemCard}>
      <div className={cls.itemHeader}>
        <div className={cls.itemHeaderBody}>
          <div className={cls.itemTitle}>{item.title}</div>
          <div className={cls.itemLink}>
            <Link href={item.link}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
              >
                <path
                  d="M26.006 15.2981L12.0203 29.2838L9.72223 26.9857L23.7079 13H11.3811V9.75H29.256V27.625H26.006V15.2981Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className={cls.itemDesc}>{item.desc}</div>
      <div className={cls.itemBanner}>
        <img src={item.img} alt="banenr" />
      </div>
    </div>
  );
};

export default ServiceItem;
