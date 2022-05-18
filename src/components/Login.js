import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, Link } from "react-router-dom";

export default function Login(props) {
  const {setLoggedIn} = props
  const [body, setBody] = useState({
    user_name: "",
    user_password: "",
  });
  const [error, setError] = useState(false);

  const navigate = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    setError(false);
    console.log("click");
    let response = await fetch(
      "https://app-final-checkpoint.herokuapp.com/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      return setError(true);
    }
    let data = await response.json();
    document.cookie = `token=${data}`;
    document.cookie = "loggedIn=true"
    setLoggedIn(true)
    navigate.push("/clients");
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: "50px auto auto auto",
          width: 400,
          height: "auto",
        },
      }}
    >
      {console.log(body)}
      <Paper>
        <h3 style={{ textAlign: "center" }}>Login</h3>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            There was an error with username and/or password
          </p>
        )}
        <form className="login-form">
          <TextField
            id="username"
            label="UserName"
            variant="outlined"
            onChange={handleChange}
            name="user_name"
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handleChange}
            name="user_password"
            required
          />
          <Button
            style={{ alignSelf: "center" }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to={"/register"} style={{textDecoration:"none", color:"white", alignSelf:"center"}}>
            <Button style={{ alignSelf: "center" }} variant="contained">
              Register
            </Button>
          </Link>
        </form>
      </Paper>
    </Box>
  );
}
