import {initialBooks} from '../../books';
import {filterBooks} from '../../components/BookList';

describe('Tests Search Functionality', () => {
    it('should give filtered books based on authors',()=>{
      const authors =['Jane Smith']
      const filteredBooks = filterBooks(initialBooks,authors, [], []); 
      expect(filteredBooks.length).toBe(2); 
    })
    it('should give filtered books based on publishers',()=>{
      const publishers =['Nature Explorers']
      const filteredBooks = filterBooks(initialBooks,[], publishers, []); 
      expect(filteredBooks.length).toBe(4); 
    })
    it('should give filtered books based on genres',()=>{
      const genres =['Adventure']
      const filteredBooks = filterBooks(initialBooks,[], [], genres); 
      expect(filteredBooks.length).toBe(1); 
    })
    it('should give filtered books based on authors and publishers',()=>{
      const authors =['Jane Smith']
      const publishers =['Nature Explorers']
      const filteredBooks = filterBooks(initialBooks,authors, publishers, []); 
      expect(filteredBooks.length).toBe(0); 
    })
    it('should give filtered books based on authors and genres',()=>{
      const authors =['Jane Smith']
      const genres =['Adventure']
      const filteredBooks = filterBooks(initialBooks,authors, [], genres); 
      expect(filteredBooks.length).toBe(0); 
    })
    it('should give filtered books based on publishers and genres',()=>{
      const publishers =['Nature Explorers']
      const genres =['Adventure']
      const filteredBooks = filterBooks(initialBooks,[], publishers, genres); 
      expect(filteredBooks.length).toBe(0); 
    })
    it('should give filtered books based on authors, publishers and genres',()=>{
      const authors =['John Doe']
      const publishers =['ABC Publishing']
      const genres =['Adventure']
      const filteredBooks = filterBooks(initialBooks,authors, publishers, genres); 
      expect(filteredBooks.length).toBe(1); 
    })
    it('Should give all the books if the none of the parameters are provided',()=>{
      const filteredBooks = filterBooks(initialBooks,[], [], []); 
      expect(filteredBooks.length).toBe(20);
    })
});




