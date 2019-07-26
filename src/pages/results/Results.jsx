import React, { PureComponent } from 'react';
import RatingCard from '../../components/RatingCards';
import './Results.css';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>Resultados</h1>
        <div className="cards-container">
          <RatingCard title="Desenvolvimento" loading={loading} />
          <RatingCard title="Apresentação / Pitch" loading={loading} />
          <RatingCard title="Desenvolvimento" loading={loading} />
        </div>
      </div>
    );
  }
}

export default Home;
