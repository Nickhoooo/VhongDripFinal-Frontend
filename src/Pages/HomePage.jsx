import Banner from "../Components/Banner/Banner";
import HomeProduct from "../Components/HomeProduct/HomeProduct";
import Header from "../Components/Header/Header";
function HomePage(){
    return(
        <div>
            <Header/>
            <Banner/>
            <HomeProduct/>
        </div>
    );
}
export default HomePage;