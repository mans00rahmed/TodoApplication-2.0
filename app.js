var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function (data) {
    var li = document.createElement("li");
    li.setAttribute('class', 'li');
    var litext = document.createTextNode(data.val().value);
    // created li tag with text node

    //  delete button create
    var delBtn = document.createElement("button");
    var deltxt = document.createTextNode("DELETE");
    delBtn.setAttribute("class", "btn btn-outline-danger");
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.setAttribute('id', data.val().key)
    delBtn.appendChild(deltxt);

    // edit button
    var editbtn = document.createElement("button");
    var edittxt = document.createTextNode("EDIT");
    editbtn.appendChild(edittxt);
    editbtn.setAttribute('onclick', 'edititem(this)');
    editbtn.setAttribute('class', 'btn btn-outline-info');
    editbtn.setAttribute('id', data.val().key)
    

    li.appendChild(litext);
    li.appendChild(delBtn);
    li.appendChild(editbtn);
    list.appendChild(li);
    //console.log(li);
    // we use append child instead of innerHTML;

})

// Functions():

function addtodo() {
    var todoItem = document.getElementById("todo-item");
    var key = firebase.database().ref('todos').push().key;
    var todo = {
        value: todoItem.value,
        key: key
    }

    firebase.database().ref('todos').child(key).set(todo)
    todoItem.value=""
}


function deleteItem(w) {
    firebase.database().ref('todos').child(w.id).remove()
    w.parentNode.remove()
};

function deleteAll() {
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}


function edititem(e) {
    var r = prompt("enter value to be change",e.parentNode.firstChild.nodeValue)

    var editTodo = {
        value: r,
        key: e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = r
}

// enter key working !!!!!
var input = document.getElementById("todo-item");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});































