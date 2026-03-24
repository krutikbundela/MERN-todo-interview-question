import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, type loginFormData } from "../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../redux/hook";
import { logIn } from "../redux/AuthSlice";

function Login() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: loginFormData) => {
    dispatch(logIn(data));
    console.log("🚀 ~ Login.tsx:34 ~ onSubmit ~ data:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            gap: "16px",
          }}
        >
          <Typography>Login</Typography>

          <Stack sx={{ gap: "8px", width: "350px" }}>
            {/* EMAIL */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" error={!!errors.password}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <Typography variant="caption" color="error">
                    {errors.password?.message}
                  </Typography>
                </FormControl>
              )}
            />

            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button variant="outlined" onClick={() => reset()}>
              reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export default Login;
