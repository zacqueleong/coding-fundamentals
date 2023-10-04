class Library {
    constructor(name){
        this.name = name;
        this.books = [];
    }

    addBook(book){
        this.books.push(book);
    }

    getBooks(){
        // Use array method (map) to only map out all the book names.
        return this.books.map(book => book.name);
    }

    getBooksByCategory(category){
        // Chain the array methods (filter + map)
        const filteredArr = this.books
                            .filter(book => book.category === category)
                            .map(book => book.name);
        return filteredArr;
    }
  }
  
  class Book {
    constructor(name,author,category){
        this.name = name;
        this.author = author;
        this.category = category;
    }
  }
  
  const library = new Library('ABC')
  
  const bookA = new Book('Book A', 'Mr. A', 'Sci-Fi')
  const bookB = new Book('Book B', 'Mr. A', 'Sci-Fi')
  const bookC = new Book('Book C', 'Mr. B', 'Horror')
  library.addBook(bookA)
  library.addBook(bookB)
  library.addBook(bookC)
  
  const allBooks = library.getBooks()
  const horrorBooks = library.getBooksByCategory('Horror')
  
  console.log(allBooks) // ['Book A', 'Book B', 'Book C']
  console.log(horrorBooks) // ['Book C']