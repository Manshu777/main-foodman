import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQuery } from "react-query";
import subscriptionService from "services/subscription";
import Price from "components/price/price";
import HandleSubscriptionModal from "./buy-subscription";
import useModal from "hooks/useModal";

const PricingThree = () => {
  const [openWaitingModal, handleOpenWaitingModal, handleCloseWaitingModal] =
    useModal();

  const [planType, setPlanType] = useState("monthly");
  const [id, setId] = useState(0);

  const { data } = useQuery("subscriptions", () =>
    subscriptionService.getAll()
  );

  return (
    <div className="welcome-container">
      <div className="radio-group">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(_, value: string) => {
              setPlanType(value);
            }}
            defaultValue="monthly"
          >
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="Monthly"
            />
            <FormControlLabel
              value="yearly"
              control={<Radio />}
              label="Yearly"
            />
            <FormControlLabel
              value="lifetime"
              control={<Radio />}
              label="Lifetime"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="pricing-wrapper">
        {data?.data.map((item: any, i) => (
          <div className="pricing-item" key={i}>
            <div className={`pr-table-wrapper`}>
              <div className={`pack-name font-slab pc${i}`}>
                <span>{item.title}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <div className="price font-slab">
                  <Price number={item?.price} />
                </div>
                <p className="user-condition">{`/${planType}`}</p>
              </div>
              <ul>
                {item.subscriptionOptions.map((val: any, i: any) => (
                  <li key={i}>{`${val.limit} ${val.translation?.title}`}</li>
                ))}
              </ul>
              <div
                className="subscribe-btn font-rubik"
                onClick={() => {
                  handleOpenWaitingModal();
                  setId(item.id);
                }}
              >
                Subscribe Now
              </div>
            </div>
          </div>
        ))}
      </div>
      <HandleSubscriptionModal
        id={id}
        open={openWaitingModal}
        handleClose={handleCloseWaitingModal}
      />
    </div>
  );
};

export default PricingThree;
