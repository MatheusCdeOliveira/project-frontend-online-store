import React from 'react';
import PropTypes from 'prop-types';

class Evaluation extends React.Component {
  render() {
    const { inputEmail,
      textarea,
      avaliationInfo,
      inputValidation, handleCheck, handleEmail, handleSubmit, handleText } = this.props;
    return (
      <div>
        <section className="evaluation-form">
          <form>
            <label htmlFor="input-email">
              <input
                type="email"
                value={ inputEmail }
                data-testid="product-detail-email"
                name="input-email"
                id="input-email"
                placeholder="Email"
                onChange={ handleEmail }
              />
            </label>
            <label htmlFor="one">
              1
              <input
                data-testid="1-rating"
                type="checkbox"
                onChange={ handleCheck }
                name="one"
                value="1"
                id="one"
              />
            </label>
            <label htmlFor="two">
              2
              <input
                data-testid="2-rating"
                type="checkbox"
                onChange={ handleCheck }
                name="two"
                value="2"
                id="two"
              />
            </label>
            <label htmlFor="three">
              3
              <input
                data-testid="3-rating"
                type="checkbox"
                onChange={ handleCheck }
                name="three"
                value="3"
                id="three"
              />
            </label>
            <label htmlFor="four">
              4
              <input
                data-testid="4-rating"
                type="checkbox"
                onChange={ handleCheck }
                name="four"
                value="4"
                id="four"
              />
            </label>
            <label htmlFor="five">
              5
              <input
                data-testid="5-rating"
                type="checkbox"
                onChange={ handleCheck }
                name="five"
                value="5"
                id="five"
              />
            </label>
            <textarea
              name=""
              value={ textarea }
              placeholder="Mensagem (opcional)"
              id=""
              data-testid="product-detail-evaluation"
              cols="30"
              rows="10"
              onChange={ handleText }
            />
            <button
              data-testid="submit-review-btn"
              type="submit"
              // id={ rating }
              onClick={ handleSubmit }
            >
              Avaliar

            </button>
          </form>
        </section>
        {inputValidation && <p data-testid="error-msg">Campos inválidos</p>}
        <section className="review">
          <ul>
            {avaliationInfo.map((item, index) => (
              <li key={ index }>
                <div>
                  <p data-testid="review-card-email">{item.email}</p>
                  <p data-testid="review-card-rating">{item.rate}</p>
                  <p data-testid="review-card-evaluation">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

Evaluation.propTypes = {
  inputEmail: PropTypes.string,
  textarea: PropTypes.string,
  avaliationInfo: PropTypes.arrayOf(PropTypes.shape({})),
  inputValidation: PropTypes.bool,
}.isRequired;

export default Evaluation;
