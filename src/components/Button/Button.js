import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button className={s.btn} type="button" onClick={loadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
