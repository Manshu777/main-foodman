import React from "react";
import cls from "./orders.module.scss";

type Props = {
  title: string;
  children: any;
  refund?: boolean;
  wallet?: boolean;
  handleWalletClick?: () => void;
};

export default function OrdersContainer({ title, children }: Props) {
  return (
    <section className={cls.root}>
      <div className="container">
        <div className={cls.wrapper}>
          <h1 className={cls.title}>{title}</h1>
          <div className={cls.main}>{children}</div>
        </div>
      </div>
    </section>
  );
}
