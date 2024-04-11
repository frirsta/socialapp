import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const initialValues = { email: "" };
  const { resetPassword, error } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const handleReset = async (event) => {
    event.preventDefault();
    const { email } = formik.values;
    if (formik.isValid === true) {
      try {
        setLoading(true);
        await resetPassword(email);
        setSent(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields");
    }
  };
  const formik = useFormik({ initialValues, validationSchema });

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
        {error && (
          <Alert color="red" className="text-sm z-50">
            {error}
          </Alert>
        )}
        {sent ? (
          <Box>
            <Typography>
              If a user exists with this email a password reset link will be
              sent to your email
            </Typography>
          </Box>
        ) : (
          <Paper
            elevation={1}
            sx={{ padding: 3, textAlign: "center", maxWidth: "80vw" }}
          >
            <Typography variant="h4">Reset password</Typography>
            <Box
              onSubmit={handleReset}
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

              <Button
                sx={{ width: "35ch", margin: 2, padding: 1 }}
                variant="contained"
                type="submit"
              >
                Reset
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Grid>
  );
};

export default ResetPassword;
