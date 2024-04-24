import { google_cloud_logo } from "../assets";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="mb-6 text-center tagline text-n-1/50">Respaldado por</h5>
      <ul className="flex">
        {/* {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={logo} width={134} height={28} alt={logo} />
          </li>
        ))} */}
        <li className="flex flex-row gap-4 items-center justify-center flex-1 h-[8.5rem]">
          <img
            src={google_cloud_logo}
            width={100}
            height={28}
            alt="google_cloud_logo"
          />
          <h2 className="text-xl">Google Cloud</h2>
        </li>
      </ul>
    </div>
  );
};

export default CompanyLogos;
