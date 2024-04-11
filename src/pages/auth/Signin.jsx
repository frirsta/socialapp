import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { onAuthStateChanged, auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import google from "../../assets/icons/google.png";

const Signin = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmailAndPassword, signInWithGoogle } =
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
        // navigate("/");
        setLoading(false);
      } else {
        // navigate("/signin");
        setLoading(false);
      }
    });
  }, []);
  console.log(currentUser);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Please fill in all fields");
    }
    console.log(formik.values);
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
          <Typography variant="h4">Sign in</Typography>
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
              Sign in
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
              Don't have an account? <a href="/signup">Sign up</a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Signin;
