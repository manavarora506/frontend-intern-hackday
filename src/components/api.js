import axios from "axios";

const BASE_URL = "https://api.github.com";

// export const getRepositories = async (orgName, accessToken) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/search/repositories`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         q: `org:${orgName}`,
//       },
//     });
//     return response.data.items;
//   } catch (error) {
//     console.error('Error fetching repositories:', error);
//     return [];
//   }
export const getRepositories = async (orgName, accessToken) => {
  try {
    const perPage = 100; 
    let page = 1;
    let allRepositories = [];
    let hasMoreRepositories = true;

    while (hasMoreRepositories) {
      const response = await axios.get(`${BASE_URL}/search/repositories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: `org:${orgName}`,
          per_page: perPage,
          page: page,
        },
      });

      const repositories = response.data.items;
      allRepositories = allRepositories.concat(repositories);

      if (repositories.length < perPage) {
        // Reached the last page
        hasMoreRepositories = false;
      } else {
        page++;
      }
    }

    return allRepositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};



export const getCommitsForRepo = async (repoFullName, accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/repos/${repoFullName}/commits`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${repoFullName}:`, error);
    return [];
  }
};
