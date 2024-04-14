import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { changePassword, reauthenticate, currentUser } =
    useContext(AuthContext);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("Required")
      .min(8, "Password is too short, must be at least 8 characters"),
    newPassword: Yup.string()
      .required("Required")
      .min(8, "Password is too short, must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Required")
      .min(8, "Password is too short, must be at least 8 characters")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      await reauthenticate(currentUser.email, currentPassword);
      await changePassword(newPassword);
      alert("Password changed successfully.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError("Failed to change password. Please try again.");
      console.error(error);
    }
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <Box sx={{ margin: "auto" }}>
      <h2>Change Password</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-current-password">
            Current Password
          </InputLabel>
          <OutlinedInput
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
            id="outlined-adornment-current-password"
            type={showCurrentPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...formik.getFieldProps("currentPassword")}
          />

          {formik?.errors?.currentPassword &&
            formik?.touched?.currentPassword && (
              <Typography color="red" className="text-sm">
                {formik?.errors?.currentPassword}
              </Typography>
            )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-new-password">
            New Password
          </InputLabel>
          <OutlinedInput
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
            id="outlined-adornment-new-password"
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...formik.getFieldProps("newPassword")}
          />

          {formik?.errors?.newPassword && formik?.touched?.newPassword && (
            <Typography color="red" className="text-sm">
              {formik?.errors?.newPassword}
            </Typography>
          )}
        </FormControl>{" "}
        <FormControl sx={{ m: 1, width: "31ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...formik.getFieldProps("confirmPassword")}
          />

          {formik?.errors?.confirmPassword &&
            formik?.touched?.confirmPassword && (
              <Typography color="red" className="text-sm">
                {formik?.errors?.confirmPassword}
              </Typography>
            )}
        </FormControl>
        <Button variant="contained" type="submit">
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
