import React from "react";
import ModalContainer from "containers/modal/modal";
import { useTranslation } from "react-i18next";
import PrimaryButton from "components/button/primaryButton";
import RcSelect from "components/pickers/rcSelect";
import { Grid } from "@mui/material";
import BankCardLineIcon from "remixicon-react/BankCardLineIcon";
import { useQuery } from "react-query";
import paymentService from "services/payment";
import { useFormik } from "formik";
import subscriptionService from "services/subscription";
import { error } from "components/alert/toast";

type Props = {
  id: number;
  open: boolean;
  handleClose: () => void;
};

export default function HandleSubscriptionModal({
  open,
  handleClose,
  id,
}: Props) {
  const { t } = useTranslation();

  const { data: payments } = useQuery("payments", () =>
    paymentService.getAll()
  );

  const formatCategories = (list: any) => {
    if (!list?.length) {
      return [];
    }
    return list.map((item: any) => ({
      label: item.type || t(item.tag),
      value: item.id,
      data: item,
    }));
  };

  const getSubscription = (payment_id: number) => {
    subscriptionService
      .create(id)
      .then((res) => {
        paymentService
          .subscriptionTransaction(res.data.subscription_id, {
            payment_sys_id: payment_id,
          })
          .then((res) => {
            window.location.replace(res.data.data.url);
            handleClose();
            formik.resetForm();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        error(err.data.message);
      });
  };
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any, { setSubmitting }) => {
      getSubscription(values.payment_type_id);
    },
    validate: (values: any) => {
      const errors: any = {};
      return errors;
    },
  });

  return (
    <ModalContainer open={open} onClose={handleClose}>
      <div className="buy-subscription-modal-body">
        <Grid container spacing={1} columns={{ xs: 12, md: 12, lg: 15 }}>
          <Grid item xs={12} lg={15} md={12}>
            <RcSelect
              type="outlined"
              icon={<BankCardLineIcon />}
              name="payment_type_id"
              label={t("payment.type")}
              options={formatCategories(payments?.data)}
              value={formik.values.payment_type_id}
              onChange={(event: any) => formik.handleChange(event)}
              error={!!formik.errors.payment_type_id}
            />
          </Grid>
          <Grid item xs={12} lg={15} md={12}>
            <PrimaryButton onClick={() => formik.submitForm()}>
              {t("buy")}
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    </ModalContainer>
  );
}
