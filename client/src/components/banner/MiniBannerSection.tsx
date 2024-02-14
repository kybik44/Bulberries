"use client";
import { FC } from "react";
import Banner from "./MiniBanner";

interface MiniBannerProps {}

const MiniBanner: FC<MiniBannerProps> = ({}) => {
  return (
    <section className="flex gap-4">
      <Banner
        title="Доска"
        src="/assets/images/controller.png"
        desc="Смотри акции, уценки и выгодные предложений"
      />
      <Banner
        title="Акции"
        src="/assets/images/clock.png"
        desc="Смотри акции, уценки и выгодные предложений"
      />
    </section>
  );
};

export default MiniBanner;
