import react from "react";
import hospitalMap from "../images/hospital-map.png";



const Home = () => {
return (
    <>
     <h1 className='welcometext'>Welcome to the New Hospital's Children's Wing</h1>

     <div className="hospital-map-info">
     <p className="hospitalmapinfo">Here is a hospital map for you to take a look at!</p>
     <img className="hospital-map" src={hospitalMap} alt="Child-friendly hospital map" />
     </div>
     </>
    
)
}

export default Home;
