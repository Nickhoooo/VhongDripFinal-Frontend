import Banner from "../Components/Banner/Banner";
import HomeProduct from "../Components/HomeProduct/HomeProduct";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
function HomePage(){
    return(
        <div>
            <Header/>
            <Banner/>
            <HomeProduct/>
            <Footer/>
        </div>
    );
}
export default HomePage;