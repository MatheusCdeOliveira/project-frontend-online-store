import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <section>
        <ul>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </ul>
      </section>
    );
  }
}

export default Home;
