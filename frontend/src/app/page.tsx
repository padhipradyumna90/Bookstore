import Banner from "@/components/home/Banner";
import DiscountSlider from "@/components/home/Discountslider";
import Herosection from "@/components/home/Herosection";
import Slider1 from "@/components/home/Slider1";
import Slider2 from "@/components/home/Slider2";
import Image from "next/image";

export default function Home() {
  return (
<div>
  <DiscountSlider/>
  <Herosection/>
  <Slider1/>
  <Slider2/>
  <Banner/>
</div>
  );
}
