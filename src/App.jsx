import ButtonGradient from "./assets/customSvg/ButtonGradient";
import WaitList from "./components/WaitList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <WaitList />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
