import { Badge } from '@material-ui/core'
import React from 'react'
import ContentModal from './ContentModal/ContentModal'
import './SingleContent.css'

function SingleContent({
  id,
  title,
  backdrop,
  poster,
  mediaType,
  date,
  voteAverage,
}) {
  const img_300 = 'https://image.tmdb.org/t/p/w300'

  return (
    <ContentModal media_type={mediaType} id={id}>
      <Badge
        badgeContent={voteAverage}
        color={voteAverage > 6 ? 'primary' : 'secondary'}
      />
      <img className='poster' src={`${img_300}/${poster}`} alt={title} />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {mediaType === 'tv' ? 'TV Series' : 'Movies'}
        <span className='subTitle'>{date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent
