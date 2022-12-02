const foodInp = document.getElementById('green-inp')
const foodBtn = document.getElementById('green-btn')
const drinkInp = document.getElementById('blue-inp')
const drinkBtn = document.getElementById('blue-btn')

const foodContainer = document.getElementById('food-container')
const drinkContainer = document.getElementById('drink-container')


const onLoad = ()=>{
    fetch('http://localhost:3000/food')
        .then(data => data.json())
        .then(parsedData => {
            render('food' , parsedData)
        })
        .catch(err => console.log(err))

    fetch('http://localhost:3000/drink')
        .then(data => data.json())
        .then(parsedData => {
            render("drink" , parsedData)
        })
        .catch(err => console.log(err))


}

onLoad()

const render = (type , data)=>{
    type === 'food' ? foodContainer.innerHTML = "" : drinkContainer.innerHTML = ""
    data.forEach(item =>{
        type === 'food'
            ? foodContainer.innerHTML += `<p>${item.name}</p> <button onclick="deleteItem('food',${item.id})" class="bg-white border">delete</button>`
            : drinkContainer.innerHTML += `<p>${item.name}</p> <button onclick="deleteItem('drink',${item.id})" class="bg-white border">delete</button>`
    })
}

const addNewItem = (type , name)=>{
    fetch(`http://localhost:3000/${type}` , {
        method : "POST",
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify({name})
    })
        .then(data => onLoad())
        .catch(err => console.log(err))
}

const deleteItem = (type , id)=>{
    fetch(`http://localhost:3000/${type}/${id}` , {
        method : "DELETE",
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(data => onLoad())
        .catch(err => console.log(err))
}

const editItem = (type , id , newContent)=>{
    fetch(`http://localhost:3000/${type}/${id}` , {
        method : "PUT",
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify(newContent)
    })
        .then(data => onLoad())
        .catch(err => console.log(err))
}

foodBtn.addEventListener("click" , ()=>{
    if (foodInp.value.length !==0){
        addNewItem("food",foodInp.value)
        foodInp.value = ""
    }
})

drinkBtn.addEventListener("click" , ()=>{
    if (drinkInp.value.length !==0){
        addNewItem("drink",drinkInp.value)
        drinkInp.value = ""
    }
})