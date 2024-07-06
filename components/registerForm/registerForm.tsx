import React, { useEffect, useState } from "react";


import cls from "./registerForm.module.scss";
import styles from "./registerForm.module.scss";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import TextInput from "components/inputs/textInput";
import PrimaryButton from "components/button/primaryButton";
import { useFormik } from "formik";
import authService from "services/auth";
import { error } from "components/alert/toast";
import { useAuth } from "contexts/auth/auth.context";
import axios from 'axios'
type RegisterViews = "REGISTER" | "VERIFY" | "COMPLETE";
type Props = {
  onSuccess: (data: any) => void;
  changeView: (view: RegisterViews) => void;
};
interface formValues {
  email: string;
  countryCode?: string;
}

interface Country {
  cca2: string;
  idd: {
    root: string;
    suffixes?: string[];
  };
}

interface CountryCode {
  shortName: string;
  dialCode: string;
}



export default function RegisterForm({ onSuccess, changeView }: Props) {

  const { t } = useTranslation();
  const { phoneNumberSignIn } = useAuth();
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then((data: Country[]) => {
        const codes: CountryCode[] = data.map(country => ({
          shortName: country.cca2,
          dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
        })).filter(country => country.dialCode);
        setCountryCodes(codes);
      })
      .catch(error => console.error('Error fetching country codes:', error));
  }, []);




  const formik = useFormik({
    initialValues: {
      email: "",
      
    },
    onSubmit: (values: formValues, { setSubmitting }) => {
      if (values.email?.includes("@")) {
        authService
          .register(values)
          .then((res) => {
            onSuccess({ ...res, email: values.email });
            changeView("VERIFY");
          })
          .catch(() => {
            error(t("email.inuse"));
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else {
        const fullPhoneNumber = `${values.countryCode}${values.email}`;
        console.log(`${values.countryCode}${values.email}`)
        phoneNumberSignIn(fullPhoneNumber)
          .then((confirmationResult) => {
            onSuccess({
              email: values.email,
              callback: confirmationResult,
            });
            changeView("VERIFY");
          })
          .catch((err) => {
            error(t("sms.not.sent"));
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    },

    validate: (values: formValues) => {
      const errors = {} as formValues;
      if (!values.email) {
        errors.email = t("required");
      }
      if (
        values.email.includes("@") &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = t("must.be.valid");
      }
      if (values.email?.includes(" ")) {
        errors.email = t("should.not.includes.empty.space");
      }
      return errors;
    },
  });

  return (
    <form className={cls.wrapper} onSubmit={formik.handleSubmit}>
      <div className={cls.header}>
        <h1 className={cls.title}>{t("sign.up")}</h1>
        <p className={cls.text}>
          {t("have.account")} <Link href="/login">{t("login")}</Link>
        </p>
      </div>
      <div className={cls.space} />


      <div>
        <select
          id="countryCode"
          name="countryCode"
          onChange={formik.handleChange}
          className={styles.selectCountryCode}
          value={formik?.values?.countryCode}
        >
          <option value="">Select Country Code</option>
          {countryCodes?.map((country, index) => (
            <option key={index} value={country.dialCode}>
              {country.shortName} ({country.dialCode})
            </option>
          ))}
        </select>
      </div>


      <TextInput
        name="email"
        label={t("phone")}
        placeholder={t("type.here")}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={!!formik.errors.email}
        helperText={formik.errors.email}
      />
      <div className={cls.space} />
      <div className={cls.action}>
        <PrimaryButton
          id="sign-in-button"
          type="submit"
          loading={formik.isSubmitting}
        >
          {t("sign.up")}
        </PrimaryButton>
      </div>
    </form>
  );
}
