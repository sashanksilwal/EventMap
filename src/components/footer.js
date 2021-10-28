import * as React from "react";
import { Typography } from "@mui/material";
import "./footer.css";

function Copyright() {
  return (
    <Typography variant="body2" className="company-name">
      {"Copyright © "}
      <span className="company-name"> EventMaster </span>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        Logo
        <div className="copyright">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
