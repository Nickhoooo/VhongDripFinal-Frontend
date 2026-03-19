import DropsBanner from "../Components/DropsBanner/DropsBanner";
import DropsMain from "../Components/DropsMain/DropsMain";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
function Drops(){
    return(
        <div>
            <Header/>
           <DropsBanner/>
           <DropsMain/>
           <Footer/>
        </div>
    );
}
export default Drops;