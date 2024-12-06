const name = document.querySelector("#courseName");
const cartegory = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");

const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidDescription = document.querySelector(".invalid-description");

const deleteBtn = document.querySelector("#deleteBtn");


let courses = [];

if(localStorage.getItem("courses")!=null){ // اذا في داتا في اللوكال حطها بالارري واعرضها واذا فش عادي روح ضيف من الاول وثاني وثالث مرة بكونن موجودات
    courses = JSON.parse(localStorage.getItem("courses")); // convert to Array of objects from JSON
    displayCourses();
}

const addBtn = document.querySelector("#click");

addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let isValid = true;

    const namePattern = /^[A-Z][a-z]{2,10}$/; // لكن لازم يكون عدد احرف السمول من 2-10 a-z ومن ثم اجباري حرف سمول من  A-Z بدي سترنج اجباري الابتداء بحرف كابيتال من 
    console.log(namePattern.test(name.value));
    if(!namePattern.test(name.value)){
        invalidName.innerHTML = "this name is invalid!! it must start with a capital letter and contain 2-10 small letters.";
        name.classList.add("is-invalid");
        isValid = false;
    }
    else{
        invalidName.innerHTML=""; 
        name.classList.remove("is-invalid"); 
        name.classList.add("is-valid"); 
    }

    const categoryPattern = /^[A-Z][a-z]{2,8}$/; // لكن لازم يكون عدد احرف السمول من 2-8 a-z ومن ثم اجباري حرف سمول من  A-Z بدي سترنج اجباري الابتداء بحرف كابيتال من 
    console.log(categoryPattern.test(name.value));
    if(!categoryPattern.test(cartegory.value)){
        invalidCategory.innerHTML = "this category is invalid!! it must start with a capital letter and contain 2-8 small letters.";
        cartegory.classList.add("is-invalid");
        isValid = false;
    }
    else{
        invalidCategory.innerHTML=""; 
        cartegory.classList.remove("is-invalid"); 
        cartegory.classList.add("is-valid"); 
    }

    const pricePattern = /^[0-9]{1,4}$/; // لازم يبدا وينتهي بارقام من 0-9 بشرط ان يكون عددها من 1-4 خانات
    console.log(pricePattern.test(price.value));
    if(!pricePattern.test(price.value)){
        invalidPrice.innerHTML = "this price is invalid!! it must start with a numbers 0-9 and contain 1-4 digits.";
        price.classList.add("is-invalid");
        isValid = false;
    }
    else{
        invalidPrice.innerHTML=""; 
        price.classList.remove("is-invalid"); 
        price.classList.add("is-valid"); 
    }

    const descriptionPattern = /^.{5,199}\.$/; // يجب ان يبدا باي اشي ما عدا سطر جديد من خلال(.) ويحتوي على كاراكتر 5-199 وينتهي اجباري ب (.) وبس
    console.log(descriptionPattern.test(description.value));
    if(!descriptionPattern.test(description.value)){
        invalidDescription.innerHTML = "this description is invalid!! it must contain letters counting from 6-200 characters including (.) at the end";
        description.classList.add("is-invalid");
        isValid = false;
    }
    else{
        invalidDescription.innerHTML=""; 
        description.classList.remove("is-invalid"); 
        description.classList.add("is-valid"); 
    }


    
    if(isValid) {
        const course = {
            name:name.value,
            cartegory:cartegory.value,
            price:price.value,
            description:description.value,
            capacity:capacity.value,
        }
    
        courses.push(course);
        console.log(courses);
    
        localStorage.setItem("courses", JSON.stringify(courses)); // convert from Object to String , cuz localStorage doesn't accept anything just String)
    
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "new course added successfully"
          });
    
    
        displayCourses(); // every click on Add Course will display All Courses
        invalidName.innerHTML=""; // عشان ضفنا صح اذا الخط الاحمر تحت الاسم ينشال
        name.classList.remove("is-invalid"); 
        name.classList.add("is-valid"); 
    }
   

});

// console.log(name,cartegory,price,description,capacity);


function displayCourses(){ // decleration function not expression because declaration can be hoisting when revoking it
    const result = courses.map((course,index)=>{
        return `
            <tr>
                <td>${index}</td>
                <td>${course.name}</td>
                <td>${course.cartegory}</td>
                <td>${course.price}</td>
                <td>${course.description}</td>
                <td>${course.capacity}</td>
                <td>
                    <button class="btn btn-danger" onclick='deleteCourse(${index})'>delete</button>
                </td>
            </tr>
        `
    }).join(' ');

    document.querySelector('#data').innerHTML = result;
};



function deleteCourse(index){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) { 
            // بحذف العنصر Confirmed بس يكبس اليوز ع 
            courses.splice(index,1); // remove 1 item from array at index 
            localStorage.setItem("courses", JSON.stringify(courses)); // convert from Array to String , كمان احنا منعملها سيت عشان لما يحذف هو بقرا اصلا من اللوكال ستوريج لازم نخليه نخلي اللوكال توخذ من الارري كمان مرة
            displayCourses(); // display all courses after deletion
        
            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
}


deleteBtn.addEventListener("click", ()=>{

    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {   // بحذف العنصر Confirmed بس يكبس اليوز ع 

            courses = []; // لمسح جميع محتويات الارري
            localStorage.setItem("courses", JSON.stringify(courses)); // convert from Array to String , كمان احنا منعملها سيت عشان لما يحذف هو بقرا اصلا من اللوكال ستوريج لازم نخليه نخلي اللوكال توخذ من الارري كمان مرة
            displayCourses(); // display all courses after deletion
        
            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

});



/*
const arrObjects = [ // not all is strings
    {
        id:"1",
        name:"php",
    },
    {
        id:2,
        name:"js",
    },
];

const arrJson = [ // all is strings => from API
    {"id":"1","name":"php"},
    {"id":"2","name":"js"}
]
*/