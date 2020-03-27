import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

import { SurveyEntity } from '../../entity/SurveyEntity';
import { SurveyDataContainer } from '../../DataContainer/SurveyDataContainer';

// import { Link } from "react-router-dom";
//import Result from "../Result/Result";
import axios from "axios";
import "./survey1.css";
/* import { useHistory } from "react-router-dom" */;

export default class Survey_test extends React.Component {
  state = {
    survey: null
  }

  componentDidMount() {
    this.getDatafromEndpoint();
  }

  componentWillUnmount() {
    SurveyDataContainer.clearSurvey(this.state.survey.id);
  }

  handleOnChange(question, answer) {
    const { id } = this.state.survey;

    SurveyDataContainer.addAnswer(id, question, answer);
  };
  
  getDatafromEndpoint() {
    const { id } = this.props.match.params;
    
    axios
      // .get(`http://localhost:9001/surveys/getSurveys/${id}`)
      .get(`http://bf82eb0f.ngrok.io/surveys/getSurveys/${id}`)
      .then((res) => this.setState({ survey: new SurveyEntity(res.data) }))
      .catch(err => console.log(err));
  };

  submit(e) {
    e.preventDefault();
    e.stopPropagation();

    const payload = SurveyDataContainer.prepareSurveyPayload(this.state.survey.id);
    console.dir(JSON.stringify(payload,null,3))

    /*  const id = this.state; */
    //
    return;
    // axios
    //   .post(`http://localhost:9001/surveys/Result`)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
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
            control={<Radio />}
          // className="formLabel"
          />
        ))}
      </RadioGroup>
  }

  drawSelect(question) {
    return (!question.id || question.type !== "dropdown")
      ? null
      : <Select className="fieldwidth" onChange={ev => this.handleOnChange(question, ev.target.value)} >
        {question.options.map((option, i) => (
          <MenuItem value={option} key={`item-${i}`}>
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
    const { survey } = this.state;

    return (!survey)
      ? null
      : <div className="survey1">
        <div className="surveyContainer">
          <h1>{survey.description}</h1>
          <FormControl>
            <div className="row">
              <div className="col-md-12">
                {this.drawFormFields(survey)}
                <Button variant="contained" id="button" onClick={this.submit.bind(this)}>Send</Button>
              </div>
            </div>
          </FormControl>
        </div>
      </div>;
  }
};
