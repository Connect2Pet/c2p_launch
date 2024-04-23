import { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";

const Digits = ({ number, label }) => {
  const bars = [
    ["end", "top"],
    ["side", "top", "left"],
    ["side", "top", "right"],
    ["middle"],
    ["side", "bottom", "left"],
    ["side", "bottom", "right"],
    ["end", "bottom"],
  ];
  const digits = String(number)
    .padStart(2, "0")
    .split("")
    .map((digit, index) => (
      <div key={index} className="mx-3 group">
        <figure className="digit h-[1.5rem] md:h-[4rem]" data-digit={digit}>
          {bars.map((classes, barIndex) => (
            <span key={barIndex} className={classes.join(" ")}></span>
          ))}
        </figure>
      </div>
    ));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row digits">{digits}</div>
      <div className="ml-2 text-lg">{label}</div>
    </div>
  );
};

const Colon = () => (
  <div className="colon-group">
    <figure className="colon">
      <span></span>
    </figure>
    <figure className="shadow colon shadow1">
      <span></span>
    </figure>
    <figure className="shadow colon shadow2">
      <span></span>
    </figure>
  </div>
);

const getTargetDate = () => {
  const now = new Date();
  const year =
    now.getMonth() > 4 && now.getDate() > 25
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, 4, 26); // Month is 0-indexed, 4 = May
};

const WaitList = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = getTargetDate();
    const updateCountdown = () => {
      const now = new Date();
      const timeLeft = Math.max(0, targetDate - now); // Ensure we don't go negative
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };

    const timerID = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    const isSafari =
      /^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(
        navigator.userAgent
      );
    if (isSafari) {
      document.body.classList.add("safari");
    }
  }, []);

  return (
    <Section id="features" className="w-full">
      <div className="container relative w-full pb-32 z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Conecta vidas alrededor del mundo y sálvalas!"
        />

        <div className="flex flex-col gap-24 xl:flex-row">
          <div className="flex flex-col items-center justify-center w-full gap-8">
            <h1 className="max-w-3xl mx-auto mb-6 body-1 text-n-2 lg:mb-8">
              Tiempo hasta el lanzamiento
            </h1>
            <div className="wrapper">
              <div className="w-full xl:hidden">
                <main className="items-center justify-center w-full containerDiv">
                  <Digits number={countdown.days} label="Days" />
                </main>
                <main className="items-center justify-center w-full my-10 containerDiv">
                  <Digits number={countdown.hours} label="Hours" />
                  <Colon />
                  <Digits number={countdown.minutes} label="Minutes" />
                  <Colon />
                  <Digits number={countdown.seconds} label="Seconds" />
                </main>
              </div>

              <div className="hidden w-full xl:flex">
                <main className="w-full containerDiv">
                  <Digits number={countdown.days} label="Days" />
                  <Colon />
                  <Digits number={countdown.hours} label="Hours" />
                  <Colon />
                  <Digits number={countdown.minutes} label="Minutes" />
                  <Colon />
                  <Digits number={countdown.seconds} label="Seconds" />
                </main>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start w-full gap-8">
            <h1 className="max-w-3xl mx-auto mb-6 text-center body-1 text-n-2 lg:mb-8">
              ¿Quieres ser parte de este movimiento? déjanos tus datos abajo
            </h1>
            <div className="flex flex-col items-center justify-center w-full gap-6">
              <input
                type="text"
                placeholder="Email"
                className="w-full max-w-xs input input-bordered input-primary"
              />
              <input
                type="text"
                placeholder="Nombre"
                className="w-full max-w-xs input input-bordered input-info"
              />
              <input
                type="text"
                placeholder="Perfil preferido"
                className="w-full max-w-xs input input-bordered input-secondary"
              />
              <button className="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WaitList;

// import { useEffect, useState } from "react";
// import Heading from "./Heading";
// import Section from "./Section";

// const Digits = ({ number, label }) => {
//   const bars = [
//     ["end", "top"],
//     ["side", "top", "left"],
//     ["side", "top", "right"],
//     ["middle"],
//     ["side", "bottom", "left"],
//     ["side", "bottom", "right"],
//     ["end", "bottom"],
//   ];
//   const digits = String(number)
//     .padStart(2, "0")
//     .split("")
//     .map((digit, index) => (
//       <div key={index} className="mx-3 group">
//         <figure className="digit" data-digit={digit}>
//           {bars.map((classes, barIndex) => (
//             <span key={barIndex} className={classes.join(" ")}></span>
//           ))}
//         </figure>
//       </div>
//     ));

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="flex flex-row digits">{digits}</div>
//       <div className="ml-2 text-lg">{label}</div>
//     </div>
//   );
// };

// const Colon = () => (
//   <div className="mx-2 colon-group">
//     <figure className="colon">
//       <span></span>
//     </figure>
//   </div>
// );

// const getTargetDate = () => {
//   const now = new Date();
//   const year =
//     now.getMonth() > 4 && now.getDate() > 25
//       ? now.getFullYear() + 1
//       : now.getFullYear();
//   return new Date(year, 4, 26); // Month is 0-indexed, 4 = May
// };

// const WaitList = () => {
//   const [countdown, setCountdown] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const targetDate = getTargetDate();
//     const updateCountdown = () => {
//       const now = new Date();
//       const timeLeft = Math.max(0, targetDate - now); // Ensure we don't go negative
//       const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
//       const seconds = Math.floor((timeLeft / 1000) % 60);
//       setCountdown({ days, hours, minutes, seconds });
//     };

//     const timerID = setInterval(updateCountdown, 1000);
//     return () => clearInterval(timerID);
//   }, []);

//   return (
//     <Section id="features" className="w-full">
//       <div className="container relative w-full z-2">
//         <Heading
//           className="md:max-w-md lg:max-w-2xl"
//           title="Connect lives worldwide, and save them!"
//         />

//         <div className="wrapper">
//           <main className="flex items-center justify-center text-2xl containerDiv">
//             <Digits number={countdown.days} label="Days" />
//             <Colon />
//             <Digits number={countdown.hours} label="Hours" />
//             <Colon />
//             <Digits number={countdown.minutes} label="Minutes" />
//             <Colon />
//             <Digits number={countdown.seconds} label="Seconds" />
//           </main>
//         </div>
//         <div className="flex flex-wrap gap-10 mb-10"></div>
//       </div>
//     </Section>
//   );
// };

// export default WaitList;
