import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <Box>
        <AppBar>
          <Toolbar>
            <Grid container>
              <Grid item xs={4} sm={4} md={4} sx={{ textAlign: "center" }}>
                <Link
                  key="home"
                  to={"/admin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ textAlign: "center" }}>
                <Link
                  key="reports"
                  to={"/admin/reports"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Reports
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ textAlign: "center" }}>
                <Link
                  key="lagout"
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Toolbar />
      </Box>
    </>
  );
}

export default Header;
