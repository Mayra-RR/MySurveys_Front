import React from "react";
import "./Footer.css";


class Footer extends React.Component {
  render() { 
    return<>
  <footer className="footer">
  
    <div className="container">
  
      <div className="row">
  
        <div className="col-md-12 py-5">
          <div className="mb-5 flex-center">
  
            <a href='./' >
              <i > </i>
            </a>
           
          </div>
        </div>
  
      </div>
  
    </div>
  
    <div className='footerText'>© 2020 Copyright:
      <a href="https://mayra-rr.github.io/Surveys_Project/"> My Surveys</a>
    </div>
  
  </footer>
  </>
}
}
export default Footer;