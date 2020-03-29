import "./surveyMenu.css";
import Grid from "@material-ui/core/Grid";
import feedback from "../../Imgs/feedback.png";
import light from "../../Imgs/light.png";
import bike from "../../Imgs/bike.png"
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../surveyPaths/survey_form";

class SurveyMenu extends React.Component {
  
  getSurveys(){
    const { id } = this.props.match.params;
    axios.get(`http://localhost:9001/surveys/getSurvey/${id}`)
    .then(response => this.setState({items:response.data})).catch(err => console.log(err));
  };
  render() {
    return (
      <>
        <div className="surveyM">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item={true} xs={3}>
              <div class="miniContainer">
                <Link to="/survey_form/1">
                  <img alt="survey1" src={feedback} className="surveyImg" />
                </Link>
                <label class="imageText">
                  <h1><u>Survey 1</u></h1>
                </label>
              </div>
            </Grid>
            <Grid item={true} xs={3}>
              <div class="miniContainer">
                <Link to="/survey_form/2">
                  <img alt="survey2" src={bike} className="surveyImg" />
                </Link>
                <label class="imageText">
                <h1><u>Survey 2</u></h1>
                </label>
              </div>
            </Grid>
             <Grid item={true} xs={3}>
              <div class="miniContainer">
                <Link to="/survey_form/3">
                  <img alt="survey3" src={light} className="surveyImg" />
                </Link>
                <label class="imageText">
                <h1><u>Survey 3</u></h1>
                </label>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
export default SurveyMenu;
