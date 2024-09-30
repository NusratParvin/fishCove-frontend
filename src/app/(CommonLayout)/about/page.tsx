import About from "./components/about";
import Team from "./components/team";

const AboutSection = () => {
  return (
    <div className="md:w-10/12 mx-auto w-full">
      <About />
      <Team />
    </div>
  );
};

export default AboutSection;
