// Blog Class: Represents a Blog
class Blog {
    constructor(title,content){
      
        this.title = title;
        this.content = content;
    }
}
id = 1
// Local Storage
class Store {
     static getBlog() {
         let blogs;
         if(localStorage.getItem('blogs') === null){

            blogs = [];
         }
         else {
             blogs = JSON.parse(localStorage.getItem('blogs'));
         }
         return blogs;
     }
     static addBlogsToLocal(blog){
         let blogs = Store.getBlog();
         
         blogs.push(blog);
         localStorage.setItem('blogs', JSON.stringify(blogs));
     }
     // delete from local storage
     static removeBlog(title){
         const blogs = Store.getBlog();

         blogs.forEach((blog, index) => {
             if(blog.title === title){
                 blogs.splice(index, 1);
             }
         });
         localStorage.setItem('blogs', JSON.stringify(blogs));
     }
}

///UI class: All Ui fuctions

class UI {
    static displayBlog(){
      

        const blogs = Store.getBlog();

        blogs.forEach((blog) => UI.addBlog(blog));
        
    }
    // Adiing blog to UI fuction
    static addBlog(blog) {
        const display = document.getElementById('blog-list');

        const row = document.createElement('div');

        row.innerHTML =  `<div ><h4>${blog.title} </h4><a href="#"class="btn btn-danger btn-sm delete">X</a><p>${blog.content}</p></div>`;
       
        display.appendChild(row);
    }
    static deleteBlog(el) {
        if(el.classList.contains('delete')){
            el.parentElement.remove();
        }
    }
    // Display alert fuction
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('#blogForm').parentNode;
        const form = document.getElementById('blogForm');

        container.insertBefore(div, form);


        setTimeout(() => document.querySelector('.alert').remove(), 2000 );
        
    }
}






//Display blogs
document.addEventListener("DOMContentLoaded", UI.displayBlog);


//Add a blog by form

document.getElementById('blogForm').addEventListener('submit', (e) => {
    //Prevent default submit
    e.preventDefault();
    
    //Get form values
    const title = document.getElementById('my-title').value;
    const content = document.getElementById('my-textarea').value;

    //Valdaton of the form

    if(title === '' || content === ''){

       UI.showAlert("Please fill in the form", 'danger');
    }
    else {
         //Instantiate

    const blog = new Blog(title, content);

    console.log(blog);

    //Add to form content to UI

    UI.addBlog(blog);
    
    // Add blog to store
    Store.addBlogsToLocal(blog);
    //show success alert
    UI.showAlert('Thanks for blogging', 'success');
    
    //Clear Form
    document.getElementById('blogForm').reset();
    }
   
});

//Delete blog
document.querySelector('#blog-list').addEventListener('click', (e) => {
    e.preventDefault();
  UI.deleteBlog(e.target)


  // Delete from store
  Store.removeBlog(e.target.previousElementSibling.textContent);


  UI.showAlert('Blog removed', 'success');
});

