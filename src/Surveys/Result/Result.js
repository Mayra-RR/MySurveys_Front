import React, { Component } from "react";
import axios from "axios";
import { surveyItem } from "../items/surveyItem";
import querystring from "query-string";
import "./Result.css";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Result extends Component {
  state = {
    survey: [],
  };

  componentDidMount() {
    this.fetchSurvey();
  }

  fetchSurvey() {
     console.log(querystring.parse(this.props.location.search));
     
    const { group_id } =  querystring.parse(this.props.location.search);
    const { id } = this.props.match.params;
    
    const URI = `http://localhost:9001/surveys/getSurveyAnswers/${id}?group_id=${group_id}`;

    axios
      .get(URI)
      .then(res => this.setState({ survey: new surveyItem(res.data) }))
      .then(() => setTimeout(console.dir(this.state.survey)))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="result">
        <div className="resultContainer">
          <h1>Thank you for submitting the survey, here's your result:</h1>
          <FormControl>
            <div className="row">
              <div className="col-md-12">
                {
                this.state.survey.questions && this.state.survey.questions.map((question) => {
                      return <div>
                        <label className="questionR"> {question.question} </label>
                        <br />
                      <ul>
                        <li>  
                        <label className="answerR"> {question.answer.answer} </label>
                        </li>
                      </ul>  
                      </div>
                })}
              </div>
              <Link to="/Surveys_Project" >
              <Button variant="contained"
                  id="button"
                  color="danger"
                  onClick={""}
                >
                  Delete
                </Button>
                </Link>
            </div>
          </FormControl>
        </div>
      </div>
    );
  }
}
export default Result;
