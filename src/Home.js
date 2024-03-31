import React from 'react';
import './home.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
  <img src='./home.jpg' className='women'></img>
  <a href="#" className="pic"><img src='./hells.jpg' alt="Heels"></img></a>
  <a href="#" className="pic"><img src='./shoes.jpg' alt="Shoes"></img></a>
  <a href="/list/ballerina" className="pic"><img src='./ballerinas.jpg' alt="Ballerinas"></img></a>
  <a href="/list/loafers" className="pic"><img src='./loafers.jpg' alt="Loafers"></img></a>
</div>

    </>
  );
};

export default Home;
