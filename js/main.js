class Book{
  constructor(title,penerbit,time__book){
    this.title = title;
    this.penerbit = penerbit;
    this.time__book = time__book;
  }
}
// add submit event
let submitBtn = document.querySelector('.btn__submit');
submitBtn.addEventListener('click',(e) => {
  e.preventDefault();
  let title = document.querySelector('.title').value;
  let penerbit  = document.querySelector('.penerbit').value;
  let timeBooking = document.querySelector('.time__book').value;
  let now = new Date();
  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let today = (day)+"-"+(month)+"-"+now.getFullYear();
  timeBooking.value = today;
  if(title === '' || penerbit === '' || timeBooking === ""){
      addBooks.showAlert('Isi field ini dengan benar','danger')      
  }else{
        // memasukkan ke object book
        let book = new Book(title,penerbit,timeBooking);
        // menambahkan book ke addbooks class
        addBooks.addBookToList(book);
        //ssimpan ke local storage
        Store.saveBookList(book);
        // menghapus sebuah value yang telah dibuat
        addBooks.clearStatic(book)
        addBooks.showAlert('List booking telah terbuat','success')   
  }
})
class addBooks{
    static displayBook(){
      let books = Store.getBooks();

      books.forEach((book) => addBooks.addBookToList(book));
    }
    static addBookToList(item){
      let list = document.querySelector('#book-list')
      let row = document.createElement('tr');
       
      row.innerHTML = `
       <td>${item.title}</td>
       <td>${item.penerbit}</td>
       <td>${item.time__book}</td>
       <td><a href="#" class="btn btnDelete btn-danger btn-sm delete">Delete</a></td>
      `;
      list.appendChild(row);
    }
    static clearStatic(book){
      document.querySelector('.title').value = "";
      document.querySelector('.penerbit').value = "";
      document.querySelector('.time__book').value = "";
    }
    static deleteElement(hapus){
      if(hapus.classList.contains('btnDelete')){
        hapus.parentElement.parentElement.remove();
        addBooks.showAlert('Field telah terhapus','success')
      }
    }
    static showAlert(pesan,classname){
      let container = document.querySelector('.apps__book');
      let form = document.querySelector('.form__book');
      let alert = document.createElement('div');
      alert.className = `alert alert-${classname}`
      alert.appendChild(document.createTextNode(pesan))
      container.insertBefore(alert,form)
      setTimeout(() => {
        let alert = document.querySelector('.alert');
        alert.remove()
      },1500)
    }
}
document.addEventListener('DOMContentLoaded',addBooks.displayBook);
// save booklist
class Store{
  static saveBookList(book){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books));
  }
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }
  static removeBooksList(hapus){
    let removeBook = hapus;
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    books.splice(books.indexOf(removeBook), 1);
    localStorage.setItem('books', JSON.stringify(books))
  }
}

let bookList = document.querySelector('#book-list');
bookList.addEventListener('click', (e) => {
  e.preventDefault();
  addBooks.deleteElement(e.target)
  Store.removeBooksList(e.target.parentElement.parentElement)
})
