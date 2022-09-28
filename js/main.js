let formSubmit = document.querySelector('.form__book');
let inputTitle = document.querySelector('.title');
let inputPenerbit = document.querySelector('.penerbit');
let inputTime = document.querySelector('.time__book');
let elementPar = null;
let bookList = document.querySelector('.book-list');
let btn = document.querySelector('.btn');

formSubmit.addEventListener('submit',(e) => {
  e.preventDefault();
  if(!inputTitle.value || !inputPenerbit.value || !inputTime.value){
    window.alert('Isi form dengan benar, jangan kosong!');
  }else{
    if(elementPar === null){
      let getId = () => {
        return Math.floor(Math.random() * 1000);
      }
      let objData = new createObj(inputTitle.value,inputPenerbit.value,inputTime.value,getId());
      createElement.showElement(objData);
      local.saveLocalStorage(objData)
      inputTitle.value = "";
      inputPenerbit.value = "";
      inputTime.value = ""
      elementPar = null;
    }else{
      createElement.editElsObj()
      elementPar = null;
    }
  }
});

bookList.addEventListener('click',(e)=>{
  createElement.deleteRow(e.target);
  createElement.editEls(e.target);
});

window.addEventListener('DOMContentLoaded',() => {
  let getObj = local.getLocalStorage();
  getObj.forEach((item) => {
    createElement.showElement(item)
  })
})
class createObj{
  constructor(inputTitle,inputPenerbit,inputTime,id){
    this.id = id
    this.Title = inputTitle;
    this.Penerbit = inputPenerbit;
    this.Time = inputTime;
  }
}

class createElement{
  static showElement(data){
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${data.Title}</td>
                    <td>${data.Penerbit}</td>
                    <td>${data.Time}</td>
                    <td>
                    <button class="edit" type="button">Edit</button>
                    <button class="delete" type="button">Delete</button>
                    </td>
    `;
    bookList.appendChild(tr);

  }
  static deleteRow(e){
    if(e.classList.contains('delete')){
      let targetRemove = e.parentElement.parentElement;
      targetRemove.remove();
      local.deleteLocalStorage(targetRemove);
    }
  }
  static editEls(e){
    if(e.classList.contains('edit')){
      btn.innerHTML = "Edit"
        elementPar = e.parentElement.parentElement;
        inputTitle.value = elementPar.children[0].textContent;
        inputPenerbit.value = elementPar.children[1].textContent;
        inputTime.value = elementPar.children[2].textContent;
    }
  }
  static editElsObj(){
    let getTitle =  elementPar.children[0].textContent
    local.updateLocalStorage(getTitle)
    elementPar.children[0].innerHTML = inputTitle.value;
    elementPar.children[1].innerHTML = inputPenerbit.value;
    elementPar.children[2].innerHTML = inputTime.value;
    btn.innerHTML = "Booking Book"
    inputTitle.value = "";
    inputPenerbit.value = "";
    inputTime.value = "";
  }
}

class local{
  static saveLocalStorage(data){
    console.log(data)
    let Books;
    if(localStorage.getItem('Books') === null){
      Books = [];
    }else{
      Books = JSON.parse(localStorage.getItem('Books'))
    }
    Books.push(data);
    localStorage.setItem('Books',JSON.stringify(Books))
  }
  static getLocalStorage(){
    let Books;
    if(localStorage.getItem('Books') === null){
      Books = [];
    }else{
      Books = JSON.parse(localStorage.getItem('Books'))
    }
    return Books;
  }
  static deleteLocalStorage(data){
    let Books;
    if(localStorage.getItem('Books') === null){
      Books = [];
    }else{
      Books = JSON.parse(localStorage.getItem('Books'))
    }
    let targetDelete = data.children[0].textContent;
    let getIndex = Books.findIndex((itemIndex) => {
       return itemIndex.Title === targetDelete
    });
    Books.splice(getIndex,1);
    localStorage.setItem('Books',JSON.stringify(Books))
  }
  static updateLocalStorage(data){
    let Books;
    if(localStorage.getItem('Books') === null){
      Books = [];
    }else{
      Books = JSON.parse(localStorage.getItem('Books'))
    }
    let updateObj =  Books.map((itempUpdate) => {
        if(itempUpdate.Title === data){
           itempUpdate.Title = inputTitle.value;
           itempUpdate.Penerbit = inputPenerbit.value;
           itempUpdate.Time = inputTime.value;
        }
        return  itempUpdate;
   });
   localStorage.setItem('Books',JSON.stringify(updateObj))
  }
}