"use client";
import {
    Banner,
    BestSeller,
    Footer,
    FooterMenu,
    HeroSection,
    LastViewed,
    MiniBanner,
    SuggestedProducts,
} from "@/components";
import { Card, ProductBanner, SliderItem, Text } from "@/components/ui";
import { category, miniBanner1, slider1 } from "@/utils/data";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-4">
      <Link href="/productsList">
        <HeroSection />
      </Link>
      <section className="flex bg-cardSecondary gap-5 p-6">
        <SliderItem
          key={1}
          imageSrc="/assets/images/profile.png"
          title={session?.user.name}
          description="Рекомендации для вас"
        />

        {slider1.map((data) => (
          <SliderItem
            key={data.id}
            title={data.title}
            imageSrc={data.src}
            description={data.desc}
          />
        ))}
      </section>

      <section>
        <Text variant="productTitle">Категории</Text>
        <div className="flex gap-4 mt-6">
          {category.map((data) => (
            <Card
              key={data.id}
              src={data.src}
              title={data.title}
              type="category"
            />
          ))}
        </div>
      </section>

      <section className="flex gap-4">
        {miniBanner1.map((data) => (
          <MiniBanner
            key={data.id}
            title={data.title}
            src={data.src}
            desc={data.desc}
          />
        ))}
      </section>

      <Banner
        title="Bulberries доставка"
        desc="Доставка по всему миру. Мы доставляем товары в более чем 100 стран и регионов, прямо к вашей двери."
        src="/assets/images/orderBox.png"
      />

      <LastViewed />

      <BestSeller />

      <section className="flex gap-4">
        <ProductBanner />
        <ProductBanner />
      </section>

      <SuggestedProducts />

      <section className="flex gap-4 bg-cardSecondary p-6">
        {slider1.map((data) => (
          <SliderItem
            key={data.id}
            imageSrc={data.src}
            title={data.title}
            description={data.desc}
          />
        ))}
      </section>

      <FooterMenu />
      <Footer />
    </div>
  );
};

export default Home;
