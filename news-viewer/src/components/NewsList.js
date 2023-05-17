import React, {useEffect, useState} from "react";
import styled from "styled-components";
import NewsItem  from "./NewsItem";
import axios from "axios";

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto; //중앙정렬
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = () => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoding] = useState(null);

    useEffect(()=>{
        //async 비동기 함수 호출
        const fetchData = async ()=>{
            //api 호출 시간동안 보여줄 로딩바
            setLoding(true)
            //try catch문 에러 처리
            try{
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=afda249a1ccb482fa0944d12a295021b',
                );
                //api 데이터 state 저장
                setArticles(response.data.articles)
            }catch(e){
                console.log(e)
            }
            setLoding(false)
        };
        fetchData();
    },{});

    //대기 중
    if (loading){
        return <NewsItemBlock>대기 중 입니다....</NewsItemBlock>
    }
    //articles 값이 설정 안될 경우
    if(!articles){
        return null;
    }

    //articles 같이 유효할 때
    return(
        <NewsItemBlock>
            {articles.map(v=>(
                <NewsItem key={v.url} article={v}/>
                ))}
        </NewsItemBlock>
    );
};

export default NewsList;