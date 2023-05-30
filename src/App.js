import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import RepositoryList from "./components/RepositoryList";

const StyledContainer = styled(Container)({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledForm = styled("form")({
  display: "flex",
  marginBottom: "20px",
});

const StyledButton = styled(Button)({
  marginLeft: "10px",
});
const StyledHeader2 = styled(Typography)({
  marginBottom: "10px",
  textAlign: "center",
});

function App() {
  const [search, setSearch] = useState("");
  const [orgName, setOrgName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOrgName(search);
    setAccessToken("");

    // Simulating loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <StyledContainer>
      <StyledHeader2 variant="h3">Search for a GitHub organization</StyledHeader2>
      <StyledForm onSubmit={handleFormSubmit}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          label="Search for a GitHub Organization"
          variant="outlined"
          size="small"
        />
        <StyledButton type="submit" variant="contained" color="primary">
          {isLoading ? "Loading..." : "Search"}
        </StyledButton>
      </StyledForm>
      {orgName && (
        <Box width="80%">
          <RepositoryList orgName={orgName} accessToken={accessToken} />
        </Box>
      )}
    </StyledContainer>
  );
}

export default App;

