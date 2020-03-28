import React from "react";
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
import { surveyItem } from "../items/surveyItem";
import { dataContainer } from "../items/dataContainer";
import axios from "axios";
import "./survey1.css";

export default class Survey_form extends React.Component {
  /* getSurveys(){
    axios.get(`http://localhost:9001/surveys/getSurvey`)
    .then(response => this.setState({items:response.data})).catch(err => console.log(err));
  }; */

  /*  formData = new answerContainer();*/
  state = {
    survey: null,
    redirect: false
  };

  /*   constructor(props) {
    super(props);

    
    this.state = {
      checked: props.defaultChecked,
      questions:[],
      result:[]
    };
  } */

  /*  onChange = e => {
    const { showQuestions, value } = e.target;
    this.setState({
      [showQuestions]: value
    });
  }; */

  componentWillUnmount() {
    const { survey } = this.state;
    if (survey) {
      dataContainer.clearSurvey(survey.id);
    }
  }
  handleOnChange(question, answer) {
    const { id } = this.state.survey;
    dataContainer.addAnswer(id, question, answer);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:9001/surveys/getSurveys/${id}`)
      /* .then(response => this.setState({item:response.data})) */
      .then(({ data }) => {
        this.setState({ survey: new surveyItem(data) });
      })
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  
  const { id } = this.props.match.params;
  const URI = `http://localhost:9001/surveys/postSurvey/${id}`;
  const dataCollecter = dataContainer.collectSurveyData(this.state.survey.id);

  console.log(id);

  console.log(dataCollecter);
  return axios
    .post(URI, dataCollecter)
    
    .then((response) => {
      this.setState({redirect: true, group_id:response.data[0].group_id})
    })
    .catch(console.error);


  }


  showSelect(question) {
    return (!question.id || question.type !== "dropdown") ? null : (
      <Select className="fieldwidth" onChange={select => this.handleOnChange(question, select.target.value)}>
        {question.options.map((option, i) => (
          <MenuItem value={option} key={`item-${i}`} selected={question.answer && question.answer.answer}>
            <em>{option}</em>
          </MenuItem>
        ))}
      </Select>
    );
  }
  showCheckboxes(question) {
    return !question.id || question.type !== "checkbox" ? null : (
      <FormGroup row onChange={this.onChange}>
        {question.options.map(option => (
          <FormControlLabel 
            control={
              <Checkbox
                onChange={check =>
                  this.handleOnChange(question, check.target.value)
                }
                name="option"
                value={option}
                checked={question.answer && question.answer.answer}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    );
  }

  showRadios(question) {
    return (!question.id || question.type !== "radiobutton") ? null : 
      <RadioGroup row name="customized-radios" >
        {question.options.map((option, i) => (
          <FormControlLabel key={`radio-control-${i}`}
            onChange={check => this.handleOnChange(question, check.target.value)}
            value={option}
            label={option}
            control={<Radio checked={question.answer && question.answer.answer}/>}
            
          />
        ))}
      </RadioGroup>
    } 

  render() {
    const { id } = this.props.match.params
    const { survey, redirect } = this.state;
    const route = `/Result/${id}?group_id=${this.state.group_id}`;

    if (!survey) {
      return null;
    } else if(survey && redirect) {
      return <Redirect to={route} />
    } else {

    return <div className="survey1">
        <div className="surveyContainer">
          <h1 className="description">{survey.description}</h1>
          <FormControl>
            <div className="row">
              <div className="col-md-12">
                {survey.questions.map(question => (
                  /* console.log(showQuestions) */
                  <div className="questionM" key={question.question_id}>
                    <div className="row">
                      <div className="col-md-12">
                        {question.question}
                        {this.showSelect(question)}
                        {this.showCheckboxes(question)}
                        {this.showRadios(question)}
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="contained"
                  id="button"
                  onClick={this.handleSubmit.bind(this)}
                  
                >
                  Send
                </Button>
              </div>
            </div>
          </FormControl>
        </div>
      </div>
  }
}};