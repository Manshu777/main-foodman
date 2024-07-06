import React from "react";
import { Category } from "interfaces";
import cls from "./v3.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { selectShopFilter, setShopCategory } from "redux/slices/shopFilter";
import useLocale from "hooks/useLocale";
import { Swiper, SwiperSlide } from "swiper/react";
import FallbackImage from "components/fallbackImage/fallbackImage";
import { NextButton } from "components/carouselArrows/carouselArrows";
const settings = {
  spaceBetween: 10,
  preloadImages: false,
  className: "category-list-v3",
  slidesPerView: "auto" as "auto",
  breakpoints: {
    1140: {
      slidesPerView: 8,
      spaceBetween: 30,
    },
  },
};

type Props = {
  data?: Category;
};

export default function Navbar({ data }: Props) {
  const { t } = useLocale();
  const { category_id } = useAppSelector(selectShopFilter);
  const dispatch = useAppDispatch();

  function filterByCategory(event: any, id: any = null) {
    event.preventDefault();
    dispatch(setShopCategory(id));
  }

  return (
    <div className={cls.container}>
      <div className="container">
        <div className={cls.wrapper}>
          <h1 className={cls.title}>{data?.translation?.title}</h1>
          <ul className={cls.navbar}>
            <Swiper {...settings}>
              <SwiperSlide>
                <Link
                  href={`/shop-category`}
                  className={`${cls.item} ${category_id ? "" : cls.active}`}
                  onClick={(event) => filterByCategory(event, null)}
                >
                  <div className={cls.imgWrapper}>
                    <div className={cls.img}>
                      <FallbackImage
                        src={data?.img}
                        alt={data?.translation?.title}
                      />
                    </div>
                  </div>
                  <div className={cls.body}>
                    <span className={cls.text}>{t("all")}</span>
                  </div>
                </Link>
              </SwiperSlide>
              {data?.children?.map((item) => (
                <SwiperSlide key={"store" + item.id}>
                  <Link
                    href={`/shop-category/${item.uuid}`}
                    className={`${cls.item} ${
                      item.id === category_id ? cls.active : ""
                    }`}
                    onClick={(event) => filterByCategory(event, item.id)}
                  >
                    <div className={cls.imgWrapper}>
                      <div className={cls.img}>
                        <FallbackImage
                          src={item.img}
                          alt={item.translation?.title}
                        />
                      </div>
                    </div>
                    <div className={cls.body}>
                      <span className={cls.text}>
                        {item.translation?.title}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              {Number(data?.children?.length) > 7 && <NextButton />}
            </Swiper>
          </ul>
          <div className={cls.header}>
            <h2 className={cls.shopTitle}>
              {category_id
                ? data?.children?.find((item) => item.id === category_id)
                    ?.translation?.title
                : t("all")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
