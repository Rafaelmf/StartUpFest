import React, { PureComponent } from 'react';
import { Card, Input, Radio, Divider, Spin, Alert } from 'antd';
import { withApollo } from 'react-apollo';
import { ALL_SEGMENTS } from '../../dataSource/requests';
import './Startups.css';

const { Meta } = Card;
const { Search } = Input;
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardsData: [],
    };
  }

  componentDidMount() {
    const { client } = this.props;
    console.log(this.props);
    client
      .query({
        query: ALL_SEGMENTS,
      })
      .then(result => {
        const allSegments = result.data.allSegments;
        this.setState({ isLoading: false, allSegments });
      });
  }

  onChangeRadio = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      radio: e.target.value,
    });
  };

  render() {
    const { isLoading, radio, allSegments } = this.state;
    return (
      <div className="startup-container">
        <div className="search-header">
          <Search placeholder="Pesquise o nome da Startup" onSearch={value => console.log(value)} />
          <Radio.Group onChange={this.onChangeRadio} value={radio}>
            {allSegments &&
              allSegments.map(segment => <Radio value={segment.id}>{segment.name}</Radio>)}
          </Radio.Group>
        </div>

        <Divider />

        <div className="spin-container">
          {isLoading ? (
            <Spin tip="Carregando..." />
          ) : (
            <div className="card-container">
              {allSegments.map(segment =>
                segment.Startups.map(startup => (
                  <Card
                    key={segment.id}
                    className="card"
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src={startup.imageUrl} />}
                  >
                    <Meta title={startup.name} description={segment.name} />
                  </Card>
                )),
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withApollo(Home);
