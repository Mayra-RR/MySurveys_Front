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


import "./survey1.css";
 const survey = [
  {
    survey_id: "1",
    title: "Product Satisfaction Survey",
    description: "Product satisfaction",
    questions: [
      {
        q_id: "1",
        question: "Choose product",
        type: "dropdown",
        options: ["1|Product1", "2|Product2", "3|Product3"]
      },
      {
        q_id: "2",
        question: "Would you recommend the product?",
        type: "radiobutton",
        options: ["1|Would recommend", "2|Would not recommend"]
      },
      {
        q_id: "3",
        question:
          "Which of the following words would you use to describe our products? ",
        type: "checkbox",
        options: [
          "1|Reliable",
          "2|High Quality",
          "3|Usefull",
          "4|Impractical",
          "5|Poor quelity"
        ]
      }
    ],
    start_date: "date",
    end_date: "date",
    created_at: "date",
    deleted_at: "date"
  }
]; 
export default function Survey1() {

  const [state, setState] = React.useState({
    reliable: true,
    highQuality: false,
    usefull: false,
    impractical: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  /* const handleSubmit = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }; */

  const { reliable, highQuality, usefull, impractical, poorQuality } = state;
  const error =
    [reliable, highQuality, usefull, impractical, poorQuality].filter(v => v)
      .length !== 2;

  const surveyM = survey.map(survey => (
    <div className="surveyTitle" key={survey.survey_id}>
      <h1>{survey.title}</h1>
    </div>
  ));

  return (
    <div className="survey1">
      <div className="surveyContainer">
        {surveyM}
        <div className="row">
          <div className="col-xs-10">
            {survey[0].questions.map(question => {
              return (
                <div className="questionM" key={question.q_id}>
                  <div className="row">
                    <div className="col-xs-12">
                      {question.question}

                      {question.type === "dropdown" ? (
                        <Select className="fieldwidth">
                          {question.choices.map(choice => {
                            return (
                              <MenuItem value={choice}>
                                <em>{choice}</em>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      ) : null}

                      {question.type === "radiobutton" ? (
                        <FormControl id="radiobutton">
                          {question.choices.map(choice => {
                            return (
                              <RadioGroup name="customized-radios">
                                <FormControlLabel
                                  value={choice}
                                  label={choice}
                                  control={<Radio />}
                                >
                                  <em>{choice}</em>
                                </FormControlLabel>
                              </RadioGroup>
                            );
                          })}
                        </FormControl>
                      ) : null}

                      {/*       {question.type === "radiobutton" ? (
                        <FormControl id="radiobutton" >
                        <RadioGroup name="customized-radios" >
                            <FormControlLabel
                              value="Would recommend"
                              label="Would recommend"
                              control={<Radio color="warning" />}
                            />
                            <FormControlLabel
                              value="Would not recommend"
                              label="Would not recommend"
                              control={<Radio color="warning" />}
                            />
                          </RadioGroup>
                        </FormControl>
                      ) : null} */}

                      {question.type === "checkbox" ? (
                        <FormControl
                          required
                          error={error}
                          component="fieldset"
                          id="formControl"
                        >
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={reliable}
                                  onChange={handleChange}
                                  name="reliable"
                                />
                              }
                              label="Reliable"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={highQuality}
                                  onChange={handleChange}
                                  name="highQuality"
                                />
                              }
                              label="High Quality"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={usefull}
                                  onChange={handleChange}
                                  name="usefull"
                                />
                              }
                              label="Usefull"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={impractical}
                                  onChange={handleChange}
                                  name="impractical"
                                />
                              }
                              label="Impractical"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={poorQuality}
                                  onChange={handleChange}
                                  name="poor quality"
                                />
                              }
                              label="Poor Quality"
                            />
                          </FormGroup>
                        </FormControl>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          
              <Button onClick={""} variant="contained" id="button">
                {" "}
                Send
              </Button>
            
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
