import { TimeEntries } from "@/types/api.types";

const BASE_URL = window.location.href === 'https://left-time.august1.dev/' 
  ? 'https://iaxds7xhni.execute-api.eu-west-1.amazonaws.com/prod/v1'
  : '/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export const endpoints = {
  timeEntries: '/time-entries'
} as const;

export const api = {
  getTimeEntries: () => apiClient.get<TimeEntries[]>(endpoints.timeEntries),
  postTimeEntry: (data: TimeEntries) => apiClient.post<TimeEntries>(endpoints.timeEntries, data)
};