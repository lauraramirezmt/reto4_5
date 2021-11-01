/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
     if (searchParams.has('id')){
        // console.log("entre"+ searchParams.get('id'));
        var id5 = searchParams.get('id')
        $("#idCat").val(id5);  
    }
    console.log(id5);

    
});