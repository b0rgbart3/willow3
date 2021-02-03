import logo from './logo.svg';
import './App.css';
import Slider from "./components/Slider";

function App() {
  return (
    <div className="App">

      <div className="Main">
              <div className="Tagline">
              Love  <span className='star'>*</span>  Empower <span className='star'>*</span>  Heal <span className='star'>*</span>  Create <span className='star'>*</span>  Transform
              </div>
              <div className="logoBox">WILLOW<span className="halfspace"></span>KELLY.COM</div>
              <div className="mainLinks">
                <a href="about">About Willow</a>
                <span className="mainLinkDivider">|</span>
                <a href="classroom">Enter the Classroom</a>
              </div>
              <div className="join">
                Subscribe
              </div>
       
         
              <Slider />
     
             
              <footer>
                Bringing the Magic of Love to Life and Death
              </footer>

 
      </div>

    </div>
  );
}

export default App;
