for(let i=0; i<categories.length; i++){
    document.querySelector(".filter").innerHTML += `
        <button class="btn btn-outline-primary text-capitalize col-2" onclick="fetchProducts('${categories[i]}')">${categories[i]}</button>
    `
}

function fetchProducts(filterName){
    document.querySelector(".productsSection .row").innerHTML = "";
    
    if(filterName === "all"){
        for(let i=0; i<products.length; i++){
            document.querySelector(".productsSection .row").innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                    <div class="card shadow">
                        <img src="images/${products[i].pImage}" class="card-img-top cardImage" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${products[i].pName}</h5>
                            <p class="card-text text-secondary">Price: Rs ${products[i].pPrice}</p>
                            <a href="#" class="btn btn-primary">Buy</a>
                            <a href="products-detail.html?id=${i}" class="btn btn-outline-primary">Read More</a>
                        </div>
                    </div>
                </div>
            `
        }
    } else {
        for(let i=0; i<products.length; i++){
            if(products[i].pCategory === filterName){
                document.querySelector(".productsSection .row").innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <div class="card shadow">
                            <img src="images/${products[i].pImage}" class="card-img-top cardImage" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${products[i].pName}</h5>
                                <p class="card-text text-secondary">Price: Rs ${products[i].pPrice}</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="products-detail.html?id=${i}" class="btn btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }

}

fetchProducts("all");

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
    didClose: (toast) =>{
        sessionStorage.removeItem("loginStatus");
        window.location.href = "login.html";
    }
});

if(document.querySelector("#loginBtn")){
    if(sessionStorage.getItem("loginStatus")){
        document.querySelector("#loginBtn").innerHTML = "Logout";
        document.querySelector("#loginBtn").classList.replace("btn-primary","btn-danger");
        document.querySelector("#loginBtn").removeAttribute("href");
        document.querySelector("#loginBtn").onclick = ()=>{
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!"
              }).then((result) => {
                if (result.isConfirmed) {
                    Toast.fire({
                        icon: "success",
                        title: "Logout successfully!"
                    });
                }
              });
        }
    }
}
