import { curve, heroBackground, hero_dog } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundAnimals, BottomLine, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="mb-6 h1">
            {/* Unleash Compassion, Connect Hearts: Find Your Furry Soul Mate with{" "} */}
            Encuentra tu alma gemela peluda con{" "}
            <span className="relative inline-block">
              Connect2Pet
              <img
                src={curve}
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mb-6 body-1 text-n-2 lg:mb-8">
            {/* Seamlessly Explore, Match, and Connect with Your Ideal Pet
            Companion. Join a Thriving Community Dedicated to Celebrating Every
            Pet’s Unique Story and Fostering Lifelong Bonds. */}
            Explora, haz match y conéctate con tu mascota ideal, tu futuro
            Compañero.
          </p>
          <Button href="#waitlist">Únete a la lista de espera</Button>
          {/* <Button
            href="#pricing"
            onClick={() => {
              window.location.hash = "pricing";
            }}
          >
            Únete a la lista de espera
          </Button> */}
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={hero_dog}
                  className="w-full  md:-translate-y-[25%] scale-[1] md:scale-[0.5]"
                  width={1024}
                  height={490}
                  alt="hero_dog_image"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <div className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    <div className="flex flex-row items-center justify-center gap-2 p-3">
                      <span className="flex flex-col items-start justify-center gap-2">
                        <h6 className="text-xl font-semibold">Conoce a Milo</h6>

                        <p className="max-w-[250px]">
                          Una bola de pelo lleno de alegría al que le encantan
                          los abrazos, esperando pacientemente un nuevo hogar
                          cálido y amoroso.
                        </p>
                      </span>
                      <img
                        src="https://em-content.zobj.net/source/microsoft-teams/363/face-holding-back-tears_1f979.png"
                        alt=""
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Qué lindooo!!!"
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%] filter blur-md">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero_background_underlay_image"
            />
          </div>

          <BackgroundAnimals />
        </div>

        <CompanyLogos className="relative z-10 hidden mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
