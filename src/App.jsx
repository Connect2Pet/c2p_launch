import ButtonGradient from "./assets/customSvg/ButtonGradient";
import WaitList from "./components/WaitList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { motion } from "framer-motion";

const App = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"
      >
        <Header />
        <Hero />
        <WaitList />
        <Footer />
      </motion.div>

      <ButtonGradient />
    </>
  );
};

export default App;
