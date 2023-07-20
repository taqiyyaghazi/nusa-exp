// Need to use the React-specific entry point to allow generating React hooks
import { BASE_URL_API_V1 } from '@/constant';
import { getCookieValue } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API_V1 }),
    endpoints: (build) => ({
        addPlace: build.mutation({
            query: (body) => ({
                url: `places`,
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + getCookieValue('token'),
                },
                body,
            }),
        }),
        getAllPlaces: build.query({
            query: () => ({
                url: `places`,
                method: 'GET',
            })
        }),
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useAddPlaceMutation, useGetAllPlacesQuery } = placesApi;
