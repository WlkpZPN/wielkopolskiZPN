import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useClubData = (id) => {
  const { data, error } = useSWR(`/api/clubs/${id}`, fetcher);

  return {
    clubData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFaqData = () => {
  const { data, error } = useSWR(`/api/data/getFaqData`, fetcher);

  return {
    faq: data,
    isFaqLoading: !error && !data,
    isFaqError: error,
  };
};

export const useApplications = () => {
  const { data, error, mutate } = useSWR('/api/applications/getAllApplications', fetcher, {
    refreshInterval: 3000,
  });

  return {
    applications: data,
    mutateApplications: mutate,
    isApplicationsLoading: !error && !data,
    isApplicationsError: error,
  };
};

export const useClubs = () => {
  const { data, error } = useSWR('/api/clubs/getAllClubs', fetcher);

  return {
    clubs: data,
    isClubsLoading: !error && !data,
    isClubsError: error,
  };
};

export const useUsers = () => {
  const { data, error } = useSWR('/api/users/getUsers', fetcher);

  return {
    users: data,
    isUsersLoading: !error && !data,
    isUsersError: error,
  };
};

export const useRoles = () => {
  const { data, error } = useSWR('/api/users/getRoles', fetcher);

  return {
    roles: data,
    isRolesLoading: !error && !data,
    isRolesError: error,
  };
};

export const useStats = (type) => {
  const { data, error } = useSWR(`/api/fetch/stats/${type}`);

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  };
};
