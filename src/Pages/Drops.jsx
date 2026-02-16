import DropsBanner from "../Components/DropsBanner/DropsBanner";
import DropsMain from "../Components/DropsMain/DropsMain";
import Header from "../Components/Header/Header";
function Drops(){
    return(
        <div>
            <Header/>
           <DropsBanner/>
           <DropsMain/>
        </div>
    );
}
export default Drops;