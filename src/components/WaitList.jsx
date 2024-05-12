import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import CustomDropdown from "./CustomDropdown";
import { sendFormData } from "../lib/utils";
import { useForm } from "react-hook-form";
import useCountdown from "../lib/hooks/useCountdown";
import useSubmissionStore from "../lib/stores/useFormSubmissionStore";

const Digits = React.memo(({ number, label }) => {
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
});

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

//   const now = new Date();
//   const year =
//     now.getMonth() > 4 && now.getDate() > 25
//       ? now.getFullYear() + 1
//       : now.getFullYear();
//   return new Date(year, 4, 26); // Month is 0-indexed, 4 = May
// };

// const sendFormData = (formData) => {
//   fetch(
//     "https://script.google.com/macros/s/AKfycbz-AfbPqHqc6-dR2YGd6zdzlLBwSVYEdRihDMpM647T58LesT87N8GWhC35arbnEW2mgQ/exec",
//     {
//       method: "POST",
//       body: formData,
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       setFormData({ email: "", name: "", profileType: "" });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const WaitList = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    profileType: "adopter",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      profileType: "adopter",
    },
  });

  const addSubmission = useSubmissionStore((state) => state.addSubmission);
  const hasSubmitted = useSubmissionStore((state) => state.hasSubmitted);

  const countdown = useCountdown();
  const email = watch("email");
  const alreadySubmitted = hasSubmitted(email);

  const onSubmit = async (data) => {
    if (alreadySubmitted) {
      alert("You have already submitted the form.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Email", data.email);
    formData.append("Name", data.name);
    formData.append("Profiletype", data.profileType);

    try {
      await sendFormData(formData);
      reset(); // Clear form fields after submission
      setSubmitted(true); // Update state to reflect submission status
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      addSubmission(data.email);
      setLoading(false);
    }
  };

  useEffect(() => {
    const isSafari =
      /^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(
        navigator.userAgent
      );
    if (isSafari) {
      document.body.classList.add("safari");
    }
  }, []);

  useEffect(() => {
    console.log("Initial profile type:", formData.profileType);
    // Optionally set an initial state if not set
    if (!formData.profileType) {
      setFormData((prevState) => ({
        ...prevState,
        profileType: "adopter",
      }));
    }
  }, []);

  const options = [
    { value: "adopter", label: "Quiero adoptar 🤲" },
    { value: "holder", label: "Quiero poner en adopción 😎" },
    { value: "explorer", label: "Solo quiero ver animales lindos 🥹" },
  ];

  return (
    <Section id="waitlist" className="w-full">
      <div className="container relative w-full pb-32 pt-[12rem] -mt-[5.25rem] z-2">
        <Heading
          className="text-center md:max-w-md lg:max-w-2xl"
          title="Conecta vidas alrededor del mundo y sálvalas!"
        />

        <div className="flex flex-col gap-24 xl:flex-row">
          <div className="flex flex-col items-center justify-center w-full gap-8">
            <h1 className="max-w-3xl mx-auto mb-6 body-1 text-n-2 lg:mb-8">
              Tendrás acceso a Connect2Pet en:
            </h1>
            <div className="wrapper">
              <div className="w-full xl:hidden">
                <main className="items-center justify-center w-full containerDiv">
                  <Digits number={countdown.days} label="Días" />
                </main>
                <main className="items-center justify-center w-full my-10 containerDiv">
                  <Digits number={countdown.hours} label="Horas" />
                  <Colon />
                  <Digits number={countdown.minutes} label="Minutos" />
                  <Colon />
                  <Digits number={countdown.seconds} label="Segundos" />
                </main>
              </div>

              <div className="hidden w-full xl:flex">
                <main className="w-full containerDiv">
                  <Digits number={countdown.days} label="Días" />
                  <Colon />
                  <Digits number={countdown.hours} label="Horas" />
                  <Colon />
                  <Digits number={countdown.minutes} label="Minutos" />
                  <Colon />
                  <Digits number={countdown.seconds} label="Segundos" />
                </main>
              </div>
            </div>
          </div>
          {!submitted ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-start w-full gap-8"
            >
              <h1 className="max-w-3xl mx-auto mb-6 text-center body-1 text-n-2 lg:mb-8">
                ¿Quieres ser uno de los primeros usuarios beta en Connect2Pet?
                Déjanos tus datos abajo y únete a la lista de espera
              </h1>
              <input
                disabled={loading}
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-required="true"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address.",
                  },
                })}
                className={`input input-bordered input-primary w-full max-w-xs bg-[#1D232A] ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
              <input
                disabled={loading}
                type="text"
                placeholder="Nombre"
                aria-label="Nombre"
                aria-required="true"
                {...register("name", { required: "Name is required." })}
                className={`input input-bordered input-info w-full max-w-xs bg-[#1D232A] ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
              <CustomDropdown
                disabled={loading}
                label="¿Qué te gustaría hacer en Connect2Pet?"
                options={options}
                {...register("profileType", {
                  required: "Profile type is required.",
                })}
                classNames={`dropdown bg-[#1D232A] ${
                  errors.profileType ? "dropdown-error" : ""
                }`}
              />
              {errors.profileType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.profileType.message}
                </p>
              )}
              <button
                type="submit"
                className="text-white btn btn-primary"
                disabled={loading}
              >
                {`${loading ? "Enviando..." : "Enviar"}`}
              </button>
              {alreadySubmitted && (
                <p className="mt-1 text-md text-info animate-pulse">
                  Ya hemos recibido tus datos, estate atent@ a tu correo!
                </p>
              )}
            </form>
          ) : (
            <div className="flex items-center justify-center w-full">
              <h1 className="max-w-3xl mx-auto mb-6 text-center body-1 text-n-2 lg:mb-8">
                Tus datos se han guardado exitosamente. Gracias por querer ser
                parte de este gran movimiento creciente!
              </h1>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default WaitList;
