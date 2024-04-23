import { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import CustomDropdown from "./CustomDropdown";

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

const sendFormData = (formData) => {
  fetch(
    "https://script.google.com/macros/s/AKfycbz-AfbPqHqc6-dR2YGd6zdzlLBwSVYEdRihDMpM647T58LesT87N8GWhC35arbnEW2mgQ/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setFormData({ email: "", name: "", profileType: "" });
    })
    .catch((error) => {
      console.log(error);
    });
};

const WaitList = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    profileType: "adopter",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    profileType: "",
  });

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors["email"] = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Email is invalid.";
    }

    // Name validation
    if (!formData.name) {
      formIsValid = false;
      errors["name"] = "Name is required.";
    }

    // Profile Type validation
    if (!formData.profileType) {
      formIsValid = false;
      errors["profileType"] = "Profile type is required.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      const formDataObj = new FormData();
      formDataObj.append("Email", formData.email);
      formDataObj.append("Name", formData.name);
      formDataObj.append("Profiletype", formData.profileType);
      sendFormData(formDataObj);

      setFormData({ email: "", name: "", profileType: "" });
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
            <div className="flex flex-col items-center justify-start w-full gap-8">
              <h1 className="max-w-3xl mx-auto mb-6 text-center body-1 text-n-2 lg:mb-8">
                ¿Quieres ser uno de los primeros usuarios beta en Connect2Pet?
                Déjanos tus datos abajo y únete a la lista de espera
              </h1>
              <form className="flex flex-col items-center justify-center w-full gap-6">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full max-w-xs text-white input input-bordered input-primary"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full max-w-xs text-white input input-bordered input-info"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
                <CustomDropdown
                  label="Qué te gustaria hacer en Connect2Pet?"
                  options={options}
                  name="profileType"
                  onChange={handleChange}
                  value={formData.profileType}
                />
                {errors.profileType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.profileType}
                  </p>
                )}
                <button
                  className="text-white btn btn-primary"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              </form>
            </div>
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
