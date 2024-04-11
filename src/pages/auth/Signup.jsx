import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { onAuthStateChanged, auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import google from "../../assets/icons/google.png";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signupUserWithEmailAndPassword, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Required")
      .min("6", "Username is too short, must be at least 6 characters"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("8", "Password is too short, must be at least 8 characters"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formik.values;
    if (formik.isValid === true) {
      signupUserWithEmailAndPassword(username, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Please fill in the form correctly");
    }
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <Grid item xs={12} sx={{ height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={1}
          sx={{ padding: 3, textAlign: "center", maxWidth: "80vw" }}
        >
          <Typography variant="h4">Sign up</Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
              />

              {formik?.touched?.email && formik?.errors?.email && (
                <Typography color="red" className="text-sm">
                  {formik?.errors?.email}
                </Typography>
              )}
            </FormControl>
            <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
              <InputLabel>Username</InputLabel>
              <OutlinedInput
                name="username"
                type="text"
                {...formik.getFieldProps("username")}
              />

              {formik?.errors?.username && formik?.touched?.username && (
                <Typography color="red" className="text-sm">
                  {formik?.errors?.username}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password1">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                id="outlined-adornment-password1"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps("password")}
              />

              {formik?.errors?.password && formik?.touched?.password && (
                <Typography color="red" className="text-sm">
                  {formik?.errors?.password}
                </Typography>
              )}
            </FormControl>

            <Button
              sx={{ width: "35ch", margin: 2, padding: 1 }}
              variant="contained"
              type="submit"
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                width: "35ch",
                backgroundColor: "#fff",
                color: "#5a7abe",
                padding: 1,
              }}
              variant="contained"
            >
              <img width={24} src={google} alt="google icon" />{" "}
              <Typography sx={{ marginLeft: 1, fontSize: 12 }}>
                Continue with Google
              </Typography>
            </Button>
          </Box>
          <Box sx={{ margin: 2 }}>
            <Typography variant="body1">
              Already have an account? <a href="/signin">Sign in</a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Signup;
