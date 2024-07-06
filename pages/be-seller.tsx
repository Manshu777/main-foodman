//@ts-nocheck
import React from "react";
import SEO from "components/seo";
import BeSellerContainer from "containers/beSeller/beSellerContainer";
import ShopForm from "components/shopForm/shopForm";
import ShopGeneralForm from "components/shopForm/shopGeneralForm";
import { useTranslation } from "react-i18next";
import ShopAddressForm from "components/shopForm/shopAddressForm";
import { useQuery } from "react-query";
import shopService from "services/shop";
import { Category } from "interfaces";

interface ListType {
  label: string;
  value: number;
  parent?: ListType;
}

type Props = {};
const formatCategories = (list: Category[] = []) => {
  const res: ListType[] = [];
  if (!list.length) {
    return [];
  }
  list.forEach((item) => {
    res.push({ label: item.translation?.title, value: item.id });
    item.children?.map((child) => {
      res.push({
        label: child.translation?.title,
        value: child.id,
        parent: { label: item.translation?.title, value: item.id },
      });
    });
  });
  return res;
};

export default function BeSeller({}: Props) {
  const { t } = useTranslation();
  const { data: tags } = useQuery("tags", () => shopService.getAllTags());

  return (
    <>
      <SEO />
      <BeSellerContainer>
        <ShopForm title={t("general")} xs={12} md={12}>
          <ShopGeneralForm tagList={formatCategories(tags?.data)} />
        </ShopForm>
        <ShopForm title={t("address")} xs={12}>
          <ShopAddressForm />
        </ShopForm>
      </BeSellerContainer>
    </>
  );
}
