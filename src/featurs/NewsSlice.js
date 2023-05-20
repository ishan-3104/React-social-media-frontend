import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '9598c130b9msh328293c50ad072cp12d403jsn637fb2cb897f'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url)=>({url,headers : cryptoNewsHeaders})

export const cryptonewApi = createApi({
    reducerPath : 'cryptonews',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews : builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const{
    useGetCryptoNewsQuery
}=cryptonewApi