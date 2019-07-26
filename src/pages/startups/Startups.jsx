import React, { PureComponent } from 'react';
import { Card, Input, Checkbox, Divider, Spin } from 'antd';
import { withApollo } from 'react-apollo';
import { ALL_SEGMENTS } from '../../dataSource/requests';
import './Startups.css';
import noLogo from './no-logo.jpg'; // Tell Webpack this JS file uses this image

const { Meta } = Card;
const { Search } = Input;
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { client } = this.props;
    client
      .query({
        query: ALL_SEGMENTS,
      })
      .then(result => {
        //Todos os segmentos carregados na página
        const allSegments = result.data.allSegments;
        //Lista com os nomes dos segmentos para gerar os checkbox
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
    //Se nenhum checkbox está ativo, mostrar todos
    if (checkedValues.length === 0) {
      this.setState({
        displaySegments: allSegments,
      });
    } else {
      // Filtrar os segmentos cujo nome está na lista de checkbox ativos
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
    //Evitar uma busca antes de ter os dados carregados.
    if (!isLoading) {
      //Iterando em todos segmentos
      const newDisplaySegments = allSegments.map(segments => {
        //Filtrando as Startups que tem o nome contendo a string inserida no campo de busca
        const filteredStartups = segments.Startups.filter(startup => {
          return startup.name.toLowerCase().search(value.toLowerCase()) !== -1;
        });
        //Retornando o objeto segments com o campo Startups alterado
        return {
          ...segments,
          Startups: filteredStartups,
        };
      });
      this.setState({ displaySegments: newDisplaySegments });
    }
  };

  render() {
    const { isLoading, displaySegments, segmentNames } = this.state;
    return (
      <div className="startup-container">
        <div className="search-header">
          <Search
            placeholder="Pesquise o nome da Startup"
            onSearch={value => this.onSearch(value)}
            enterButton
          />
          <div>
            <span className="span-filter">Filtre por segmento:</span>
            <Checkbox.Group options={segmentNames} onChange={this.onChangeCheckbox} />
          </div>
        </div>

        <Divider />

        <div className="spin-container">
          {isLoading ? (
            <Spin tip="Carregando..." />
          ) : (
            <div className="card-container">
              {displaySegments.map(segment =>
                segment.Startups.map(startup => (
                  <Card
                    key={segment.id}
                    className="card"
                    hoverable
                    style={{ width: 300 }}
                    cover={
                      <img
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
      </div>
    );
  }
}

export default withApollo(Home);
