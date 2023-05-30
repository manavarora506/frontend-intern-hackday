import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getRepositories, getCommitsForRepo } from './Api';
import CommitList from './CommitsList';

const StyledListItem = styled(Grid)({
  cursor: 'pointer',
  marginBottom: '10px',
});

const StyledHeader = styled(Typography)({
  color: 'blue',
  textDecoration: 'underline',
});

const StyledHeader2 = styled(Typography)({
  marginBottom: "10px",
  
});

const RepositoryList = ({ orgName, accessToken }) => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const repos = await getRepositories(orgName, accessToken);
      setRepositories(repos);
    };

    fetchRepositories();
  }, [orgName, accessToken]);

  const sortedRepositories = repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);

  const handleRepoClick = async (repo) => {
    setSelectedRepo(repo);
    const repoCommits = await getCommitsForRepo(repo.full_name, accessToken);
    setCommits(repoCommits);
  };

  const handleGoBack = () => {
    setSelectedRepo(null);
    setCommits([]);
  };

  const sortedCommits = commits.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));

  if (selectedRepo) {
    return (
      <CommitList repoName={selectedRepo.name} commits={sortedCommits} goBack={handleGoBack} />
    );
  }

  return (
    <div>
      {/* <h1>Repositories for {orgName}</h1> */}
      <StyledHeader2 variant="h4">Repositories for {orgName}</StyledHeader2>
      <Grid container spacing={2}>
        {sortedRepositories.map((repo) => (
          <StyledListItem item xs={12} key={repo.id} onClick={() => handleRepoClick(repo)}>
            <Grid item xs={12}>
              <StyledHeader variant="h3">{repo.name}</StyledHeader>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Language: {repo.language}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Description: {repo.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Stars: {repo.stargazers_count}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Forks: {repo.forks_count}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Created at: {repo.created_at}</Typography>
            </Grid>
          </StyledListItem>
        ))}
      </Grid>
    </div>
  );
};

RepositoryList.propTypes = {
  orgName: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default RepositoryList;
