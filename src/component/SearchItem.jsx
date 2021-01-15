import React, { memo } from 'react'
import { format } from '../util/help'
import LazyLoad from 'react-lazyload';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const SearchItem = item => {
    const image = item.multimedia?.find(item => item.type === 'image' && item.subtype === 'master180');
    return (
      <LazyLoad>
        <Card className="news-list-item"

        >
          <div className="news-list-item-top">
            {image && <CardMedia
              component="img"
              height="300"
              image={image.url}
            />}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className="news-list-item-top-title">
                {item.headline?.main}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {format(new Date(item.pub_date), 'yyyy-MM-dd hh:mm:ss')}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="news-list-item-top-context">
                {item.abstract}
              </Typography>
            </CardContent>
          </div>
          <CardActions className="news-list-item-footer">
            <Link href={item.web_url} className="news-list-item-footer-link">
              see more
            </Link>
          </CardActions>
        </Card>
    </LazyLoad>
  )
}

export default memo(SearchItem)