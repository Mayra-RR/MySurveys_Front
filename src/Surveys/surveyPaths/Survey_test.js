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
import { surveyItem } from '../items/surveyItem';
import { answerContainer } from '../items/answerContainer';
import axios from "axios";
import "./survey1.css";

export default class Survey_test extends React.Component {
  /* getSurveys(){
    axios.get(`http://localhost:9001/surveys/getSurvey`)
    .then(response => this.setState({items:response.data})).catch(err => console.log(err));
  }; */

  formData = new answerContainer();
  state = {
    survey: null
  }

/*   constructor(props) {
    super(props);

    
    this.state = {
      checked: props.defaultChecked,
      questions:[],
      result:[]
    };
  } */

  onChange = e => {
    const { showQuestions, value } = e.target;
    this.setState({
      [showQuestions]: value
    });
  };


  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:9001/surveys/getSurveys/${id}`)
      /* .then(response => this.setState({item:response.data})) */
      .then(({ data }) => {
        this.setState({survey: new surveyItem(data)});
      })
      .catch(err => console.log(err));
  };

  submit(e) {
    console.dir(this.formData.getAnswers());
    e.preventDefault();
    e.stopPropagation();
   /*  const id = this.state; */
    //
     axios
      .post(`http://localhost:9001/surveys/Result`)
      .then(function(response) {
      /*   console.log(response); */
      this.props.history.push("/Result")
      })
      .catch(function(err) {
        console.log(err);
      }); 
  };

 onClick(){

 }

 showSelect({id, type = '', options = []}) {
  return (type !== "dropdown")
    ? null
    : <Select className="fieldwidth"  >
        {options.map(option => (
        <MenuItem value={option} >
          <em>{option}</em>
        </MenuItem>
      )
      )}
    </Select>;
}
 showCheckboxes({id, type = '', options = []}) {
  return (!id || type !== 'checkbox')
    ? null
    : <FormGroup row onChange={this.onChange} >
      {options.map(option => (
        <FormControlLabel
          control={
            <Checkbox
            onClick={() => this.formData.putAnswer(id, option)}  
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

showRadios({id, type = '', options = []}) {
  return (type !== 'radiobutton')
    ? null
    : <RadioGroup row name="customized-radios">
      {options.map(option => (
        <FormControlLabel
          onChange={this.handleChange}
          value={option}
          label={option}
          control={<Radio />}
        // className="formLabel"
        />
      ))}
    </RadioGroup>
}
   render() {
    const {  survey } = this.state;  

    return (!survey) ? null : ( 
      <div className="survey1">

        <div className="surveyContainer">
          <h1>{survey.description}</h1>
          <FormControl >
            <div className="row">
            <div className="col-md-12">
                {survey.questions.map((question) => ( 
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
                <Button onClick={this.submit.bind(this)} variant="contained" id="button">               
                  Send
                </Button>
            </div>
          </div>
          </FormControl>    
        </div>
      </div>

    );
}};
