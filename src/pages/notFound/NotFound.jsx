import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => (
  <Result
    status="404"
    title="404"
    subTitle="Desculpe, a pagina que você está tentando acessar não está disponível."
    extra={(
      <Link to="/home">
        <Button type="primary">Voltar para Home</Button>
      </Link>
)}
  />
);

export default Home;
