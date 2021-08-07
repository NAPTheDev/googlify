import { useHistory, useLocation, useRouteMatch, Route, Switch } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import axios from "axios";

import { useContext, useEffect } from "react";
import { userContext } from "../../App";

import Folders from "./Folders";
import NotFound from "../NotFound";

function DriveRoute() {
  useEffect(() => (document.querySelector("link[rel='shortcut icon']").href = "https://i.imgur.com/7UhjvWJ.png"), []);

  const { currentUser, setCurrentUser } = useContext(userContext);

  const { path } = useRouteMatch();

  const history = useHistory();
  const location = useLocation();

  const handleSignOut = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "auth/sign-out")
      .then((res) => {
        setCurrentUser(null);
      })
      .catch((err) => {
        console.log(err, err.response);
        alert("Failed to sign out, try to delete the cookie");
      });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={location.pathname.startsWith("/forms/edit") ? 0 : 1}>
        <Toolbar>
          <IconButton onClick={() => history.push("/drive")} edge="start" color="inherit" aria-label="menu">
            <img height={30} src="https://i.imgur.com/7UhjvWJ.png" />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <Typography onClick={() => history.push("/drive")} variant="h6" style={{ cursor: "pointer", display: "inline" }}>
              Google Drive Clone
            </Typography>
          </div>
          {currentUser && (
            <Tooltip title="Sign out">
              <IconButton onClick={handleSignOut} color="secondary">
                <ExitToApp />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path={`${path}`} exact>
          <Folders />
        </Route>
        <Route path={`${path}/folder/:id`} component={Folders}></Route>
        <Route path={`${path}/*`}>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default DriveRoute;
