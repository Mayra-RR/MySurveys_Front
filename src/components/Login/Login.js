import * as React from "react";
import { GlobalContext } from "./GlobalContextProvider";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { username, password } = React.useContext(GlobalContext);
  const [userInput, setUser] = React.useState("");
  const [passwordInput, setPassword] = React.useState("");

  const validLog = useHistory();

  return (
    <>
      <div className="loginBody">
        <FormGroup className="loginField">
          <h1 id="header">Survey Access</h1>
          <div>
            <TextField
              label="username"
              onChange={userIn => setUser(userIn.target.value)}
              className ="textLlog"
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              onChange={passwordIn => setPassword(passwordIn.target.value)}
              className ="textLlog"

            />
          </div>
          <div>
            <Button id="logButton"
              onClick={() => {
                if (username === userInput && password === passwordInput) {
                  /* console.log("Successfull login"); */
                  validLog.push("/SurveyMenu");
                } else {
                  console.log("Unsuccessfull login");
                }
              }}
            >
              Log in
            </Button>
          </div>
        </FormGroup>
      </div>
    </>
  );
};

export default Login;
