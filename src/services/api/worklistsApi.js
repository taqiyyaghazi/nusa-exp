// Need to use the React-specific entry point to allow generating React hooks
import { BASE_URL_API_V1 } from '@/constant';
import { getCookieValue } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const worklistsApi = createApi({
    reducerPath: 'worklistsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API_V1 }),
    endpoints: (build) => ({
        getWorklistsPlaces: build.query({
            query: () => ({
                url: `worklists/places`,
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + getCookieValue('token'),
                },
            }),
        }),
        getWorklistsPlacesById: build.query({
            query: (id) => ({
                url: `worklists/places?id=${id}`,
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + getCookieValue('token'),
                },
            }),
        }),
        publishPlace: build.mutation({
            query: (id) => ({
                url: `worklists/places/approval?id=${id}`,
                method: 'PATCH',
                headers: {
                    authorization: 'Bearer ' + getCookieValue('token'),
                },
            }),
        }),
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
    useGetWorklistsPlacesQuery,
    useGetWorklistsPlacesByIdQuery,
    usePublishPlaceMutation,
} = worklistsApi;
