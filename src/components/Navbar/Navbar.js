import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./Navbar.css";
import iconS from "../../Imgs/iconS.png";
import HomeLog from "../Login/HomeLog";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <AppBar className={"navBar"}>
        <Toolbar>
          <Link to="/Surveys_Project" className="icon">
            <Button edge="start" className="icon">
              <img alt="icon" src={iconS} width="80%" className="icon" />
            </Button>
          </Link>

          <div className="title" edge="start">
            <Typography variant="h6">
              <Link to="/Surveys_Project" className="surveys">
                <label> MySurveys </label>
              </Link>
            </Typography>
          </div>
          <div>
            <Link to="/login" className="loginBtn">
              <Button color="inherit" onclick={HomeLog}>
                <label>Login </label>
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
