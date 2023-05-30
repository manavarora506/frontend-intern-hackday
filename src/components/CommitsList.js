import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Paper, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHeader = styled(Typography)({
  marginBottom: "10px",
  textAlign: "center",
});

const TimelineItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CommitList = ({ repoName, commits, goBack }) => (
  <div>
    <StyledHeader variant="h4">Commits for {repoName}</StyledHeader>
    <Button variant="contained" onClick={goBack}>Back</Button>
    <Box sx={{ marginTop: 2 }}>
      <Stack spacing={2}>
        {commits.map((commit) => (
          <TimelineItem key={commit.sha}>
            <Typography variant="subtitle1">Commit Hash: {commit.sha}</Typography>
            <Typography variant="body1">Message: {commit.commit.message}</Typography>
            <Typography variant="body1">Author: {commit.commit.author.name}</Typography>
            <Typography variant="body1">Date: {commit.commit.author.date}</Typography>
          </TimelineItem>
        ))}
      </Stack>
    </Box>
  </div>
);

CommitList.propTypes = {
  repoName: PropTypes.string.isRequired,
  commits: PropTypes.array.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default CommitList;

