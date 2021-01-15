import React, { memo, useState} from 'react'
import { format } from '../util/help'
import LazyLoad from 'react-lazyload';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import {getCommentsData} from '../actions/newsActions'
import { pathOr } from 'ramda';


const NewsListItem = article => {
    const dispatch = useDispatch();
    const image = article.multimedia?.find(item => item.format === 'Normal');
    const [expanded, setExpanded] = useState(false);
    const comments = useSelector(state => state?.comments);
    const commentsData = pathOr([], [`${article?.url}`, 'results', 'comments'], comments)
    const handleExpandClick = () => {
      setExpanded(!expanded);
      if (article?.url && !pathOr(false, [`${article?.url}`], comments)) {
        dispatch(getCommentsData(article.url))
      }
    };
    return (
      <LazyLoad>
        <Card className="news-list-item"

        >
          <div className="news-list-item-top">
            {image && <CardMedia
              component="img"
              alt={article.caption}
              height="300"
              image={image.url}
              title={article.caption}
            />}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className="news-list-item-top-title">
                {article.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {format(new Date(article.published_date), 'yyyy-MM-dd hh:mm:ss')}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="news-list-item-top-context">
                {article.abstract}
              </Typography>
            </CardContent>
          </div>
          <CardActions className="news-list-item-footer">
            <Link href={article.url} className="news-list-item-footer-link">
              see more
            </Link>
            <IconButton
              className={`${expanded ? 'expandOpen' : 'expand'}`}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Comments:</Typography>
              {commentsData.map((item) => {
                    return <Typography paragraph>{item.commentBody}</Typography>
              })}
            </CardContent>
          </Collapse>
        </Card>
    </LazyLoad>
  )
}

export default memo(NewsListItem)