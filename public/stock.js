let Cname = document.getElementById('Name');
let Cdesc = document.getElementById('Description');
let Cprice = document.getElementById('Price');
let Cquantity = document.getElementById('Quantity');
let ul = document.getElementById('candies');
let addBtn = document.getElementById('add');
const apiUrl = "http://localhost:3000";

addBtn.addEventListener('click', addToCloud);

function addToCloud(e) {  //(Function to add data to crudCrud)
    e.preventDefault();
    let stock = {
        Name: Cname.value,
        Description: Cdesc.value,
        Price: Cprice.value,
        Quantity: Cquantity.value,
    }
        fetch(`${apiUrl}/data`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(stock)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to add data: ${res.status}`);
            }
            return res.json();
        })
        .then((res) => {
            addToScreen(res);
            location.reload();
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function addToScreen(stock) {  //(Function to add details to Screen)
    //All About Candies
    if (!stock) {
        console.error('addToScreen called with undefined or null stock');
        return;
    }
    let li = document.createElement('li');
    let liText = document.createTextNode(`Name:${stock.Name}, Description:${stock.Description}, Price:${stock.Price}, Quantity:${stock.Quantity}`);
    li.appendChild(liText);
    ul.append(li);

    //Buy Buttons
    //buy1
    let buy1 = document.createElement('button');
    let buy1Name = document.createTextNode('BUY 1');
    buy1.className = 'btn btn-danger';
    buy1.appendChild(buy1Name);
    ul.append(buy1);

    //buy2
    let buy2 = document.createElement('button');
    let buy2Name = document.createTextNode('BUY 2');
    buy2.className = 'btn btn-success';
    buy2.appendChild(buy2Name);
    ul.append(buy2);

    //buy3
    let buy3 = document.createElement('button');
    let buy3Name = document.createTextNode('BUY 3');
    buy3.className = 'btn btn-danger';
    buy3.appendChild(buy3Name);
    ul.append(buy3);

    //eventListeners for buy btns
    buy1.addEventListener('click', (e) => update(e, stock, 1));
    buy2.addEventListener('click', (e) => update(e, stock, 2));
    buy3.addEventListener('click', (e) => update(e, stock, 3));
}



async function update(event, data, buyQuan) {
    // event.preventDefault();
    try {
        let updatedRes = await fetch(`${apiUrl}/data/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        if (!updatedRes.ok) {
            throw new Error(`Failed to fetch updated data: ${updatedRes.status}`);
        }
        
        let updataData = await updatedRes.json();
        let updatedObj = updataData[0];

        if (buyQuan > updatedObj.Quantity && updatedObj.Quantity != 0) {
            alert(`You have only ${updatedObj.Quantity} left`);
            buyQuan = updatedObj.Quantity;
        }

        if (updatedObj.Quantity == 0) {
            alert('NO STOCK');
            deleteFromCloud(event, updatedObj);
            location.reload();
        } else {
            const updateRes = await fetch(`${apiUrl}/data/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name: updatedObj.Name,
                    Description: updatedObj.Description,
                    Price: updatedObj.Price,
                    Quantity: updatedObj.Quantity - buyQuan  ,
                }),
            });

            console.log("Update Response Body:", await updateRes.json());

            if (!updateRes.ok) {
                console.log(`Failed to update data: ${updateRes.status}`);
            } else {
                // Handle successful update, if needed
                location.reload();
            }
        }
    } catch (err) {
        console.log("Error during update:", err.message);
    }
}



window.addEventListener('DOMContentLoaded', () => {
    fetch(`${apiUrl}/data`,{
        method:"GET",
    })
    .then(res => res.json())
    .then((res) => {
         // Log the response for debugging
            for (let i = 0; i < res.length; i++) {
                addToScreen(res[i]);
            }

    })
    .catch((err) => {
        console.error(err.message);
        // Handle the error or adjust the logic accordingly
    });
});


function deleteFromCloud(event,obj) {   //(Function to delete candyDetails from crudCrud)
    event.preventDefault();
    fetch(`${apiUrl}/data/${obj.id}`,{
        method:"DELETE",
    })  
        .then((res)=>res.json())
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err.message)
        })
}