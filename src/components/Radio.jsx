import PropTypes from 'prop-types';
import React from 'react';

class Radio extends React.Component {
  render() {
    const { categoriesList, radioHandleChange } = this.props;
    return (
      <nav className="radio">
        <ul className="listRadio">
          <div className="borderTitle">
            <h1>Categorias</h1>
          </div>
          {categoriesList.map((element) => (
            <li key={ element.id }>
              <label htmlFor={ element.id } data-testid="category">
                <input
                  type="radio"
                  name="category"
                  id={ element.id }
                  onChange={ radioHandleChange }
                  value={ element.id }
                />
                {element.name}
              </label>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Radio.propTypes = {
  categoriesList: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  radioHandleChange: PropTypes.func.isRequired,
};

export default Radio;
