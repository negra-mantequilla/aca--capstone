import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, Link } from "react-router-dom";

export default function Register() {
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

  const handleRegister = async () => {
    setError(false);
    console.log("click");
    try {
      let response = await fetch(
        "https://app-final-checkpoint.herokuapp.com/users",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error('Username or Password is incorrrect.')
      }

      let data = await response.json();

      navigate.push("/login");
      console.log(data);
    } catch (error) {
      return setError(true);
    }
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
      <Paper>
        <h3 style={{ textAlign: "center" }}>Register</h3>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            Someone may already be using that username
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
            onClick={handleRegister}
          >
            Register
          </Button>
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "white",
              alignSelf: "center",
            }}
          >
            <Button style={{ alignSelf: "center" }} variant="contained">
              Login Screen
            </Button>
          </Link>
        </form>
      </Paper>
    </Box>
  );
}
