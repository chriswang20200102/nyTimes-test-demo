import React, {memo,useEffect, useState} from 'react'
import {useLocation} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {getSearch} from '../actions/newsActions'
import {Spinner} from 'react-bootstrap';
import SearchItem from '../component/SearchItem'
import PaginationList from '../component/PaginationList'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { pathOr } from 'ramda';


const SearchPage = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(useLocation().search).get('q')
    const search = useSelector(state => state?.search);
    const searchData = pathOr([], ['data', `${query}`, 'docs'], search)
    const { loading, asyncMessage } = useSelector(state => state.async);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=> {
      if(!pathOr(false, ['data', `${query}`], search)) {
          dispatch(getSearch(query,1))
      }
    }, [query, dispatch])

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

    const pageChangeHandle = num => {
        setCurrentPage(num)
        dispatch(getSearch(query,num))
    }

    return (
        <Container className='news-list-container'>
            <Grid container spacing={3}> 
                {searchData.map((item) => {
                    return <Grid item xs={4} key={item.web_url}><SearchItem key={item.web_url} {...item }/></Grid>
                })}
            </Grid>

            <PaginationList data={searchData} currentPage={currentPage} pageChangeHandle={pageChangeHandle} searchPage={true}/>

        </Container>
    )
}
export default memo(SearchPage)
