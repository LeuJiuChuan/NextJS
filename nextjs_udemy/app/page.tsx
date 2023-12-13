import Image from "next/image";
import Link from "next/link";
import homeImg from "@/public/home.jpg";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div>
     <Hero imgData={homeImg} imgAlt="car factyory" title="Professional Cloud Hosting"/>
     
    </div>
  );
}
