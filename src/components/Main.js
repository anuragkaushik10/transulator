import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Loading from "./Loading";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import axios from "axios";
import Footer from "./Footer";
export default function Main() {
  const [languages, setLanguages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [input1, setInput1] = React.useState("en");
  const [input2, setInput2] = React.useState("hi");

  async function fetchData() {
    setLoading(true);
    await fetch("https://libretranslate.de/languages")
      .then((res) => res.json())
      .then((json) => setLanguages(json));
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
    console.log(languages);
  }, []);

  if (loading) {
    return <Loading />;
  }
  function handleChange1(e) {
    setInput1(e.target.value);
  }

  function handleChange2(e) {
    setInput2(e.target.value);
  }

  function handleIcon() {
    let temp = input1;
    setInput1(input2);
    setInput2(temp);
  }

  function translate() {
    let data = {
      q: input,
      source: input1,
      target: input2,
    };
    axios
      .post("https://libretranslate.de/translate", data)
      .then((res) => setOutput(res.data.translatedText))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Box sx={{ width: "100%", height: "50vh" }}>
        <Box sx={{ width: "45%", display: "inline" }}>
          <Typography
            variant="h2"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Google translate
          </Typography>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={input1}
              onChange={handleChange1}
            >
              {languages.map((lang) => (
                <MenuItem value={lang.code}>{lang.name}</MenuItem>
              ))}
            </Select>
            <textarea
              rows="8"
              cols="100%"
              required
              onInput={(e) => setInput(e.target.value)}
            ></textarea>
          </FormControl>
        </Box>
        <br />
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <ChangeCircleIcon onClick={handleIcon} />
        </div>
        <Box sx={{ width: "45%", display: "inline" }}>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={input2}
              onChange={handleChange2}
            >
              {languages.map((lang) => (
                <MenuItem value={lang.code}>{lang.name}</MenuItem>
              ))}
            </Select>
            <textarea rows="8" cols="100%" value={output} disabled></textarea>
          </FormControl>
        </Box>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginBottom: "10px" }}
            variant="contained"
            color="secondary"
            onClick={(e) => translate()}
          >
            Translate
          </Button>
        </div>
        <Footer />
      </Box>
    </div>
  );
}
