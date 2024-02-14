"use client";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { FC } from "react";
import BecomeSeller from "./subNavbar/BecomeSeller";
import Text from "./ui/Text";

interface SubNavbarProps {}

const SubNavbar: FC<SubNavbarProps> = ({}) => {
  return (
    <div className="flex container justify-between mx-auto pt-3">
      <Text variant="infoXs">Валюта</Text>
      <div>
        <ul className="flex gap-5">
          <li className="subNavLink">
            <LocationOnOutlinedIcon fontSize="small" /> Беларусь
          </li>
          <li className="subNavLink">
            <LanguageOutlinedIcon fontSize="small" />
            РУС
          </li>
          <li className="subNavLink">Бел. руб</li>
          <BecomeSeller />
        </ul>
      </div>
    </div>
  );
};

export default SubNavbar;
