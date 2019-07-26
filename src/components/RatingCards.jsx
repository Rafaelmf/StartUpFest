import React from 'react';
import { Card, Rate } from 'antd';
import PropTypes from 'prop-types';
import './RatingCards.css';
import noLogo from '../img/no-logo.jpg';

const { Meta } = Card;
const mockedData = {
  name: 'FireGames',
  segment: 'Games',
  imgUrl: 'http://www.sevna.com.br/site/wp-content/uploads/2018/08/MarcasAceleradas_predify.png',
  rating: 3,
};
export default function RatingCard(props) {
  const { loading, title } = props;
  return (
    <Card loading={loading}>
      <Meta title={title} />
      <div className="card-content">
        <CardRow
          imgUrl={mockedData.imgUrl}
          name={mockedData.name}
          segment={mockedData.segment}
          rating={mockedData.rating}
        />
        <CardRow
          imgUrl={mockedData.imgUrl}
          name={mockedData.name}
          segment={mockedData.segment}
          rating={mockedData.rating}
        />
        <CardRow
          imgUrl={mockedData.imgUrl}
          name={mockedData.name}
          segment={mockedData.segment}
          rating={mockedData.rating}
        />
      </div>
    </Card>
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
        <Rate className="description-rating" disabled defaultValue={rating} />
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
  rating: PropTypes.number,
};

RatingCard.defaultProps = {
  loading: {},
  title: {},
};

RatingCard.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
};
