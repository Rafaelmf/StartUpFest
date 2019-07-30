import React, { Component } from 'react';
import { Card, Input, Checkbox, Divider, Spin } from 'antd';
import { withApollo } from 'react-apollo';
import { ALL_SEGMENTS } from '../../dataSource/requests';
import './Startups.css';
import noLogo from '../../img/no-logo.jpg';
import RatingModal from './RatingModal';

const { Meta } = Card;
const { Search } = Input;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false,
    };
  }

  componentDidMount() {
    // withApollo injects client props that is used to fecth data
    const { client } = this.props;

    // Query to retrieve information for the page
    client
      .query({
        query: ALL_SEGMENTS,
      })
      .then(result => {
        // This holds all segments loaded from graphQl
        const allSegments = result.data.allSegments;
        // List with segment names to create Check Box naming list
        const segmentNames = allSegments.map(segment => segment.name);
        this.setState({
          isLoading: false,
          allSegments,
          displaySegments: allSegments,
          segmentNames,
        });
      });
  }

  onChangeCheckbox = checkedValues => {
    const { allSegments } = this.state;
    // If none of the checkbox is active, then display all
    if (checkedValues.length === 0) {
      this.setState({
        displaySegments: allSegments,
      });
    } else {
      // Filter segments that its corresponding checkbox is active
      const newDisplaySegments = allSegments.filter(segment =>
        checkedValues.includes(segment.name),
      );
      this.setState({
        displaySegments: newDisplaySegments,
      });
    }
  };

  onSearch = value => {
    const { allSegments, isLoading } = this.state;
    // Avoid search while date is not ready
    if (!isLoading) {
      const newDisplaySegments = allSegments.map(segments => {
        //Filter startups that contains the text inserted on Search bar
        const filteredStartups = segments.Startups.filter(startup => {
          return startup.name.toLowerCase().search(value.toLowerCase()) !== -1;
        });
        // Return filtered segments object
        return {
          ...segments,
          Startups: filteredStartups,
        };
      });
      this.setState({ displaySegments: newDisplaySegments });
    }
  };

  // This function is passed by props to the Modal in order to close it
  handleCancelModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const {
      isLoading,
      displaySegments,
      segmentNames,
      selectedSegment,
      selectedStartup,
      modalVisible,
    } = this.state;
    return (
      <div className="startup-container">
        {/* Here I added some search and filter tools. The search bar is by startup
        name and the Checkbox group filter the startups by their segment. Note here that
        Both filters are still not working together, and each can overide the other.
        */}
        <div className="search-header">
          <Search
            placeholder="Pesquise o nome da Startup"
            onSearch={value => this.onSearch(value)}
            enterButton
          />
          <h1 className="span-filter">Filtre por segmento:</h1>
          <Checkbox.Group options={segmentNames} onChange={this.onChangeCheckbox} />
        </div>

        <Divider />

        <div className="spin-container">
          {isLoading ? (
            <Spin />
          ) : (
            <div className="card-container">
              {/* Iterate on array with already filtered objects with information for
              generating Cards */}
              {displaySegments.map(segment =>
                segment.Startups.map(startup => (
                  <Card
                    // On click needs to fill state with data from startup selected
                    // in order to display modal for rating
                    onClick={() =>
                      this.setState({
                        selectedSegment: segment,
                        selectedStartup: startup,
                        modalVisible: true,
                      })
                    }
                    key={segment.id}
                    className="card"
                    hoverable
                    cover={
                      <img
                        className="card-image"
                        // On Error function to handle images with broken url.
                        onError={e => {
                          e.target.onError = null;
                          e.target.src = noLogo;
                        }}
                        alt="example"
                        src={startup.imageUrl}
                      />
                    }
                  >
                    <Meta title={startup.name} description={segment.name} />
                  </Card>
                )),
              )}
            </div>
          )}
        </div>
        {/* This modal will be displayed only when some Card is clicked and proper
        states are filled with data used here */}
        <RatingModal
          modalVisible={modalVisible}
          selectedSegment={selectedSegment}
          selectedStartup={selectedStartup}
          onCancel={this.handleCancelModal}
        />
      </div>
    );
  }
}

export default withApollo(Home);
