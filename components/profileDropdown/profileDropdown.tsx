import React from "react";
import cls from "./profileDropdown.module.scss";
import PopoverContainer from "containers/popover/popover";
import { IUser } from "interfaces/user.interface";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import FileList3LineIcon from "remixicon-react/FileList3LineIcon";
import LogoutCircleRLineIcon from "remixicon-react/LogoutCircleRLineIcon";
import UserStarLineIcon from "remixicon-react/UserStarLineIcon";
import { useAuth } from "contexts/auth/auth.context";
import usePopover from "hooks/usePopover";
import { useQuery } from "react-query";
import Avatar from "components/avatar";
import profileService from "services/profile";
import { useAppSelector } from "hooks/useRedux";
import { selectCurrency } from "redux/slices/currency";

type Props = {
  data: IUser;
};

export default function ProfileDropdown({ data }: Props) {
  const { t } = useTranslation();
  const [open, anchorEl, handleOpen, handleClose] = usePopover();
  const { logout, setUserData } = useAuth();
  const currency = useAppSelector(selectCurrency);

  useQuery(
    ["profile", currency?.id],
    () => profileService.get({ currency_id: currency?.id }),
    {
      staleTime: 0,
      onSuccess: (data) => {
        setUserData(data.data);
      },
    }
  );

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <button className={cls.profileBtn} onClick={handleOpen}>
        <div className={cls.imgWrapper}>
          <Avatar data={data} key={data.img} />
        </div>
      </button>

      <PopoverContainer
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className={cls.wrapper}>
          <header className={cls.header}>
            <div className={cls.naming}>
              <h4 className={cls.title}>
                {data.firstname} {data.lastname?.charAt(0)}.
              </h4>
              <Link
                href={"/profile"}
                className={cls.link}
                onClick={handleClose}
              >
                {t("view.profile")}
              </Link>
            </div>
            <div className={cls.profileImage}>
              <Avatar data={data} key={data.img} />
            </div>
          </header>
          <div className={cls.body}>
            <Link
              href={"/reservations"}
              className={cls.flex}
              onClick={handleClose}
            >
              <div className={cls.item}>
                <FileList3LineIcon />
                <span className={cls.text}>{t("reservations")}</span>
              </div>
            </Link>
            <Link
              href={"/be-seller"}
              className={cls.flex}
              onClick={handleClose}
            >
              <div className={cls.item}>
                <UserStarLineIcon />
                <span className={cls.text}>{t("be.seller")}</span>
              </div>
            </Link>
            <Link href={"/login"} className={cls.flex} onClick={handleLogout}>
              <div className={cls.item}>
                <LogoutCircleRLineIcon />
                <span className={cls.text}>{t("log.out")}</span>
              </div>
            </Link>
          </div>
        </div>
      </PopoverContainer>
    </>
  );
}
