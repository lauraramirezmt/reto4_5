/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
     if (searchParams.has('id')&& searchParams.has('nombre')){
        // console.log("entre"+ searchParams.get('id'));
        var id2 = searchParams.get('id')
        $("#idEdit").val(id2);
        $("#nameEdit").val(searchParams.get('nombre'));  
    }
    console.log(id2);

    
});
