import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Typography } from "@mui/material";
export default function Footer() {
  return (
    <div className="footer">
      <CopyrightIcon />
      <Typography variant="h6" style={{ color: "purple" }}>
        Anurag Kaushik
      </Typography>
    </div>
  );
}
