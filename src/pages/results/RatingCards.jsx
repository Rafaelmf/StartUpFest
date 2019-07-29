import React from 'react';
import { Card, Rate, Spin } from 'antd';
import PropTypes from 'prop-types';
import './RatingCards.css';
import noLogo from '../../img/no-logo.jpg';

const { Meta } = Card;
export default function RatingCard(props) {
  const { title, data, ratingField } = props;
  return (
    <React.Fragment>
      {data.length === 0 ? (
        <Spin />
      ) : (
        <Card>
          <Meta title={title} />
          <div className="card-content">
            <CardRow
              imgUrl={data[0].imageUrl}
              name={data[0].startupName}
              segment={data[0].segmentName}
              rating={data[0][ratingField].toFixed(2)}
            />
            <CardRow
              imgUrl={data[1].imageUrl}
              name={data[1].startupName}
              segment={data[1].segmentName}
              rating={data[1][ratingField].toFixed(2)}
            />
            <CardRow
              imgUrl={data[2].imageUrl}
              name={data[2].startupName}
              segment={data[2].segmentName}
              rating={data[2][ratingField].toFixed(2)}
            />
          </div>
        </Card>
      )}
    </React.Fragment>
  );
}

function CardRow(props) {
  const {
    imgUrl, name, segment, rating,
  } = props;
  return (
    <React.Fragment>
      <h1 className="numbers">1º</h1>
      <img
        className="row-img"
        alt="exemplo"
        src={imgUrl}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noLogo;
        }}
      />
      <div className="description">
        <h4 className="description-name">{name}</h4>
        <p className="description-segment">{segment}</p>
        <Rate className="description-rating" disabled defaultValue={rating} allowHalf />
        <span>{`${rating}/5`}</span>
      </div>
    </React.Fragment>
  );
}

CardRow.defaultProps = {
  imgUrl: {},
  name: {},
  segment: {},
  rating: {},
};

CardRow.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  segment: PropTypes.string,
  rating: PropTypes.string,
};

RatingCard.defaultProps = {
  title: {},
  data: {},
  ratingField: {},
};

RatingCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({}),
  ratingField: PropTypes.string,
};
