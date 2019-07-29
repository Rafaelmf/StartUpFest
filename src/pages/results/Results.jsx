import React, { Component } from 'react';
import RatingCard from './RatingCards';
import Firebase from '../../dataSource/fireBase';

import './Results.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedArrayDevelopment: [],
      sortedArrayIdea: [],
      sortedArrayPresentation: [],
    };
  }

  async componentWillMount() {
    const data = await Firebase.database()
      .ref('/rating')
      .once('value')
      .then(snapshot => snapshot.val());

    this.setState({
      sortedArrayDevelopment: Object.values(data).sort(
        (a, b) => b.rateDevelopment - a.rateDevelopment,
      ),
      sortedArrayIdea: Object.values(data).sort((a, b) => b.rateIdea - a.rateIdea),
      sortedArrayPresentation: Object.values(data).sort(
        (a, b) => b.ratePresentation - a.ratePresentation,
      ),
    });
  }

  render() {
    const { sortedArrayDevelopment, sortedArrayIdea, sortedArrayPresentation } = this.state;
    return (
      <div>
        <h1>Resultados</h1>
        <div className="cards-container">
          <RatingCard data={sortedArrayIdea} ratingField="rateIdea" title="Proposta" />
          <RatingCard
            data={sortedArrayDevelopment}
            ratingField="rateDevelopment"
            title="Desenvolvimento"
          />
          <RatingCard
            data={sortedArrayPresentation}
            ratingField="ratePresentation"
            title="Apresentação / Pitch"
          />
        </div>
      </div>
    );
  }
}

export default Home;
