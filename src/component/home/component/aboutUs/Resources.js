import React, { useEffect } from 'react'
import './resources.css'
import axios from 'axios'
import { useState } from 'react'
import {Row,Col } from 'react-bootstrap'
import moment from 'moment'
import { Avatar, Card, Link, Typography } from '@mui/material'


const demoNewsImag = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
export default function Resources() {
    const [news, setnews] = useState([])
    const cryptoNewsHeaders = {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': '9598c130b9msh328293c50ad072cp12d403jsn637fb2cb897f'
    }
    useEffect(()=>{
        axios.get('https://bing-news-search1.p.rapidapi.com/news/search?q=socialmedia&safeSearch=Off&textFormat=Raw&freshness=Day&count=5',{headers : cryptoNewsHeaders})
        .then((res)=>{
            setnews(res.data.value)
        })   
    },[])

  return (
    <div className='resources-container'>
        <h5>Resources</h5>
        {
            news.map((news,i)=>{
                return(
                        <>
                        <Card className="resources-box" hoverable>
                            <a href={news.url} taget = 'blank' rel= "noreferrer">
                            <div >
                                <img src={news?.image?.thumbnail?.contentUrl || demoNewsImag} alt="news" className='resources-img'/>
                                
                            </div>
                                <h5 >{news.name}</h5>
                            <p>
                                
                                {
                                news?.description?.length > 100 
                                ? `${news.description.substring(0,100)}...`
                                :`${news.description}`
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                <Avatar src = {news.provider[0].image?.thumbnail?.contentUrl || demoNewsImag } alt='new'></Avatar>
                                <Typography>{news.provider[0]?.name}</Typography>
                                </div>
                                <Typography>
                                {moment(news.datePublished).startOf('ss').fromNow()}
                                </Typography>
                            </div>
                    
                            </a>

                        </Card><br/>
                        </>
                )
            })
        }
        
    </div>
  )
}

{/* <div  key={index}>
                    <div className='resources-box'>
                        <div>
                            <img src={`images/${i.image}`} className='resources-img'/>
                        </div>
                        <h5>{i.title}</h5>
                       
                        <p>
                            {   
                                i.description.length > 100 
                                ? `${i.description.substring(0,100)}...`
                                :`${i.description}`
                                
                            }
                        </p>
                    </div><br/>
                    </div> */}