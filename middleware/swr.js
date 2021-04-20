import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const getClubData = (id) => {
  const { data, error } = useSWR(`/api/clubs/${id}`, fetcher);

  return {
    clubData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getFaqData = () => {
  const { data, error } = useSWR(`/api/data/getFaqData`, fetcher);

  return {
    faq: data,
    isFaqLoading: !error && !data,
    isFaqError: error,
  };
};

export const getApplications = () => {
  const { data, error } = useSWR(
    "/api/applications/getAllApplications",
    fetcher
  );
  console.log("applications", data);
  return {
    applications: data,
    isApplicationsLoading: !error && !data,
    isApplicationsError: error,
  };
};

export const getClubs = () => {
  const { data, error } = useSWR("/api/clubs/getAllClubs", fetcher);

  return {
    clubs: data,
    isClubsLoading: !error && !data,
    isClubsError: error,
  };
};

export const getUsers = () => {
  const { data, error } = useSWR("/api/users/getUsers", fetcher);

  return {
    users: data,
    isUsersLoading: !error && !data,
    isUsersError: error,
  };
};

export const getRoles = () => {
  const { data, error } = useSWR("/api/users/getRoles", fetcher);

  return {
    roles: data,
    isRolesLoading: !error && !data,
    isRolesError: error,
  };
};
