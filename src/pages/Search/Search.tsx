import { Logo } from '../../components/Logo';
import { SearchContainer } from '../../components/SearchContainer';
import './Search.css';

function Search() {
  return (
    <main className="search-wrapper">
      <Logo />
      <SearchContainer />
    </main>
  );
}

export default Search;
