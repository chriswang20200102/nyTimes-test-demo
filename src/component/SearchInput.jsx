import React, { useState, memo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router-dom"
import {FormControl, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {updateSearchHistory} from '../util/help'

const SearchInput = () => {
    const [show, setShow] = useState(false)
    const history = useHistory()
    const inputRef = useRef(null);
    const searchHistory = useSelector(state => state?.search?.history);

    const onKeyDown = e => {
        if(e.keyCode === 13) {
            searchStart()
        }
    }
    const searchStart = (text) => {
        const searchText = text ? text : inputRef?.current?.value
        if (!searchText) return;
        updateSearchHistory(searchText)
        history.push(`/search?q=${encodeURIComponent(searchText)}`)
    }

    const onSearchHistory = text => {
        searchStart(text)
    }

    const onFocus = () => {
        if (searchHistory.length > 0) {
            setShow(true)
        }
    }
    
    return (
        <>
            <OverlayTrigger
                key='bottom'
                placement='bottom'
                show={show}
                overlay={
                    <Popover id={`popover-positioned-bottom`} className="recent-search-content">
                    <Popover.Title as="h3">search history</Popover.Title>
                        <Popover.Content >
                            {searchHistory.map(item => <div className="history-item" onMouseDown = {() => onSearchHistory(item)} key={item}>{item}</div>)}
                        </Popover.Content>
                    </Popover>
                }
            >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onKeyDown={onKeyDown} onFocus={onFocus} onBlur={()=> setShow(false)} ref={inputRef}/>
            </OverlayTrigger>
            <Button variant="outline-light" onClick={() => searchStart()}>Search</Button>
        </>
    );
}

export default memo(SearchInput)
