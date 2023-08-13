import {initialBooks} from '../../books';
import {handleBookSearch} from '../../components/BookList';

describe('search functionality works', () => {

    it('Should give books that matched the query',()=>{
       const filteredBooks = handleBookSearch(initialBooks, 'adventure'); 
      expect(filteredBooks.length).toBe(3);
    })
});
