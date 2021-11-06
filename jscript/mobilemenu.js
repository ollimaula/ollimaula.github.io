function nav_onclick() {

    var linkit = document.getElementById("links");
        if (linkit.style.display === "block") 
            {linkit.style.display = "none";} 
        else 
            {linkit.style.display = "block";}

    var burger = document.getElementsByClassName('icon');
    var item;
        for (item = 0; item < burger.length; item++)
            {burger[item].style.display = "none";} 

}