import React, { Component } from "react";
import Appbar from "./components/Navbar/Navbar";
import Container from "./components/container/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomeLog from "./components/Login/HomeLog";
import SurveyMenu from "./Surveys/SurveyMenu/SurveyMenu";

import "flexboxgrid"
import Result from "./Surveys/Result/Result";
import Survey_form from "./Surveys/surveyPaths/survey_form";

class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <BrowserRouter>
            <Appbar />
              
                        
              <Switch>
              <Route path="/login" component={HomeLog} />
              <Route path="/SurveyMenu" component={ SurveyMenu } />
              <Route path="/survey_form/:id" component={ Survey_form } />
              
              <Route path="/Result/:id" component={ Result } />
              <Route exact path="/Surveys_Project" component={Container} />

            </Switch>

            <Footer />
          </BrowserRouter>
        </div>
      </>
    );
  }
}

export default App;
