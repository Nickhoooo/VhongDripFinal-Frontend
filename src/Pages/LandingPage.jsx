
import Exlusive from "../Components/Exlusive/Exlusive";
import Hero from "../Components/Hero/Hero";
import HotProduct from "../Components/HotProduct/HotProduct";
import "../Pages/CSS/LandingPage.css";
import Footer from "../Components/Footer/Footer";

function LandingPage() {

    return (
        <div>
          <Hero/>
          <HotProduct/>
          <Exlusive/>
          <Footer/>
        </div>
    );
}

export default LandingPage;
