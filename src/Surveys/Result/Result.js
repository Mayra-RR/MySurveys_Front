import React, { Component } from "react";
import axios from "axios";
import { SurveyEntity } from '../../entity/SurveyEntity';
import { API_URL } from '../../constants/api';
// import { SurveyDataContainer } from '../../DataContainer/SurveyDataContainer';

import "./Result.css";

export default class Result extends Component {
  state = {
    survey: null,
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  fetchSurvey() {
    const { id } = this.props.match.params;
    const uri = `${API_URL}surveys/${id}`;
    
    axios
      .get(uri)
      .then((res) => this.setState({ survey: new SurveyEntity(res.data) }))
      .then(() => setTimeout(console.dir(this.state.survey), 3e3))
      .catch(err => console.log(err));
  };

    render() {
     return <div className="result">
       <h1>Thank you for submitting the survey, here's your result:</h1>
          <pre>{JSON.stringify(this.state.survey, null, 3)}</pre>
      </div>
    
  }
}