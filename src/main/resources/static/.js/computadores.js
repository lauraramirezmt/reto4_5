/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

function consultar(){
    $.ajax({
        url: ""/api/computer/"all",
        type: 'GET',
        dataType: 'JSON',
        success: function(respuesta){
            console.log(respuesta);
         pintarRespuesta(respuesta.items);         
        }

    });


}

function pintarRespuesta(items){

    let myTable="<table border=1> <Tr> <td>id</td> <td>Brand</td> <td>Model</td> <td>Category_id</td> <td>Name</td> <td>Acciones</td> </Tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td> <a href='detalleCom.html?id="+items[i].id+"'>"+items[i].brand+"</a>"+"</td>";
        myTable+="<td>"+items[i].model+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='borrarElementoCompu("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#myTable").append(myTable);

}
