
import Exlusive from "../Components/Exlusive/Exlusive";
import Hero from "../Components/Hero/Hero";
import HotProduct from "../Components/HotProduct/HotProduct";
import "../Pages/CSS/LandingPage.css";

function LandingPage() {

    return (
        <div>
          <Hero/>
          <HotProduct/>
          <Exlusive/>
        </div>
    );
}

export default LandingPage;
