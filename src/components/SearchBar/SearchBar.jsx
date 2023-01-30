import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';

import styles from './search-bar.module.css';

export class SearchBar extends Component {
  state = {
    search : "",
  };

  handleChange = ({target}) => {
    const {name, value} = target;
    this.setState({ [name] : value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {onSubmit} = this.props;
    const {search} = this.state;
    if (search.trim() === '') {
      toast.warn('Enter words to search for!');
      return;
    };
    onSubmit(search);
  };

  reset() {
    this.setState({
      search: "",
    });
  };

  render() {
    const {search} = this.state;
    const {handleChange, handleSubmit} = this;

    return (<header className={styles.searchBar}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <button type="submit" className={styles.button}>
        <span className={styles.label}>Search</span>
      </button>
      <input
        onChange={handleChange}
        className={styles.input}
        type="text"
        name='search'
        value={search}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        required
      />
    </form>
  </header>)
    };
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};