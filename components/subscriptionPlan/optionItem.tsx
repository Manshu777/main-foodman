import React from "react";
import cls from "./subscription.module.scss";
import Price from "components/price/price";
import { useAuth } from "contexts/auth/auth.context";
import { useRouter } from "next/router";

const OptionItem = ({ item, setId, handleOpenWaitingModal }: any) => {
  const { user } = useAuth();
  const { push } = useRouter();
  return (
    <div className={cls.optionItem}>
      <div className={cls.optionTitle}>{item.title}</div>
      <div className={cls.time}>{`${item.month} month`}</div>
      <div className={cls.price}>
        <Price number={item.price} />
      </div>
      <ul className={cls.option}>
        {item.subscriptionOptions.map((item: any, key: any) => (
          <li key={key}>{item?.translation?.title}</li>
        ))}
      </ul>
      <div
        className={cls.optionBtn}
        onClick={() => {
          if (user && user?.role === "seller") {
            setId(item.id);
            handleOpenWaitingModal();
          } else push("/be-seller");
        }}
      >
        Get Now
      </div>
    </div>
  );
};

export default OptionItem;
