document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("crudForm");
    const nameInput = document.getElementById("name");
    const listContainer = document.getElementById("dataList");
    let editIndex = null;
    
    function getData() {
        return JSON.parse(localStorage.getItem("crudData")) || [];
    }
    
    function saveData(data) {
        localStorage.setItem("crudData", JSON.stringify(data));
    }
    
    function renderData() {
        const data = getData();
        listContainer.innerHTML = "";
        data.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item} <button onclick="editData(${index})">Edit</button> <button onclick="deleteData(${index})">Delete</button>`;
            listContainer.appendChild(li);
        });
    }
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = getData();
        
        if (editIndex !== null) {
            data[editIndex] = nameInput.value;
            editIndex = null;
        } else {
            data.push(nameInput.value);
        }
        
        saveData(data);
        nameInput.value = "";
        renderData();
    });
    
    window.editData = (index) => {
        let data = getData();
        nameInput.value = data[index];
        editIndex = index;
    };
    
    window.deleteData = (index) => {
        let data = getData();
        data.splice(index, 1);
        saveData(data);
        renderData();
    };
    
    renderData();
});
