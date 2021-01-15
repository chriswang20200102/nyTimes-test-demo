import React, {memo,useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {getNewsList} from '../actions/newsActions'
import {Spinner} from 'react-bootstrap';
import NewsListItem from '../component/NewsListItem'
import PaginationList from '../component/PaginationList'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { pathOr } from 'ramda';


const NewsList = () => {
    const dispatch = useDispatch()
    const category = pathOr('home', [`category`], useParams())
    const stories = useSelector(state => state?.stories)
    const { loading, asyncMessage } = useSelector(state => state.async);
    const newsListData = pathOr([], [`${category}`, 'results'], stories)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if (!pathOr(false, [`${category}`], stories)) {
            dispatch(getNewsList(category))
        }
      }, [category, dispatch]);

    if (asyncMessage) {
        return (
            <div className='center-body container'>{asyncMessage.message}</div>
        );
      }

    if (loading) {
        return (
          <div
            style={{
              margin: '10% 50%'
            }}>
            <Spinner animation="border" />
          </div>
        );
      }

    const getDisplayList = (newsListData,currentPage) => {
        let startNum = currentPage > 0 ? (currentPage - 1) * 10 : 0;
        return newsListData.slice(startNum, startNum + 10)
    }

    const pageChangeHandle = num => {
        setCurrentPage(num)
    }

    return (
        <Container className='news-list-container'>
            <Grid container spacing={3}> 
                {getDisplayList(newsListData,currentPage).map((item) => {
                    return <Grid item xs={12} lg={4} key={item.uri}><NewsListItem key={item.uri} {...item }/></Grid>
                })}
            </Grid>

            <PaginationList data={newsListData} currentPage={currentPage} pageChangeHandle={pageChangeHandle}/>

        </Container>
    )
}
export default memo(NewsList)
