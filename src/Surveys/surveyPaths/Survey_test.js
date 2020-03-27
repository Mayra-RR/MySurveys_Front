import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import { API_URL } from '../../constants/api';
import { SurveyEntity } from '../../entity/SurveyEntity';
import { SurveyDataContainer } from '../../DataContainer/SurveyDataContainer';

import axios from "axios";
import "./survey1.css";

export default class Survey_test extends Component {
  state = {
    survey: null,
    redirect: false,
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  componentWillUnmount() {
    const {survey} = this.state;

    if (survey) {
      SurveyDataContainer.clearSurvey(survey.id);
    }
  }

  handleOnChange(question, answer) {
    const { id } = this.state.survey;

    SurveyDataContainer.addAnswer(id, question, answer);
  };
  
  fetchSurvey() {
    const { id } = this.props.match.params;
    const uri = `${API_URL}surveys/${id}`;
    
    axios
      .get(uri)
      .then((res) => this.setState({ survey: new SurveyEntity(res.data) }))
      .then(() => setTimeout(console.dir(this.state.survey), 3e3))
      .catch(err => console.log(err));
  };

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const { id } = this.props.match.params;
    const uri = `${API_URL}surveys/${id}`;
    const payload = SurveyDataContainer.prepareSurveyPayload(this.state.survey.id);

    console.log(payload);
    return axios
      .post(uri, payload)
      .then(console.log)
      .then(() => this.setState({redirect: true}))
      .catch(console.error);
  };

  drawCheckboxes(question) {
    return (!question.id || question.type !== 'checkbox')
      ? null
      : <FormGroup row>
        {question.options.map(option => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={ev => this.handleOnChange(question, ev.target.value)}
                name="option"
                value={option}
                checked={question.answer && question.answer.contains(option)}
              />
            }
            label={option}
          />
        )
        )}
      </FormGroup>
      ;
  }

  drawRadios(question) {
    return (!question.id || question.type !== 'radiobutton')
      ? null
      : <RadioGroup row name="customized-radios">
        {question.options.map((option, i) => (
          <FormControlLabel key={`radio-control-${i}`}
            onChange={ev => this.handleOnChange(question, ev.target.value)}
            value={option}
            label={option}
            control={<Radio checked={question.answer && question.answer.contains(option)} />}
          // className="formLabel"
          />
        ))}
      </RadioGroup>
  }

  drawSelect(question) {
    return (!question.id || question.type !== "dropdown")
      ? null
      : <Select className="fieldwidth" onChange={ev => this.handleOnChange(question, ev.target.value)}>
        {question.options.map((option, i) => (
          <MenuItem value={option} key={`item-${i}`} selected={question.answer && question.answer.contains(option)}>
            <em>{option}</em>
          </MenuItem>
        )
        )}
      </Select>;
  }

  drawFormFields(survey) {
    return survey.questions.map((question) => (
      <div className="questionM" key={question.question_id}>
        <div className="row">
          <div className="col-md-12">
            {question.question}
            {this.drawSelect(question)}
            {this.drawRadios(question)}
            {this.drawCheckboxes(question)}
          </div>
        </div>
      </div>)
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { survey, redirect } = this.state;
    const route = '/Result/' + id;

    if (!survey) {
      return null;
    } else if(survey && redirect) {
      return <Redirect to={route} />
    } else {
    return <div className="survey1">
        <div className="surveyContainer">
          <h1>{survey.description}</h1>
          <FormControl>
            <div className="row">
              <div className="col-md-12">
                {this.drawFormFields(survey)}
                <Button variant="contained" id="button" onClick={this.handleSubmit.bind(this)}>Send</Button>
              </div>
            </div>
          </FormControl>
        </div>
      </div>;
    };
  }
};
