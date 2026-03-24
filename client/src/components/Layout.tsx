import { Button, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "70%",
          }}
        >
          <Button component={NavLink} to="/">
            home
          </Button>
          <Button component={NavLink} to="/login">
            login
          </Button>
          <Button component={NavLink} to="/signup">
            signup
          </Button>
          <Button component={NavLink} to="/">
            logout
          </Button>
        </Stack>
        <Stack
          sx={{
            justifyContent:'center',
            alignItems: "center",
            width:'100%',
            height:'100%',
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
}

export default Layout;
