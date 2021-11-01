/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

function consultar(){
    $.ajax({
        url: "/api/Computer/all",
        type: 'GET',
        dataType: 'JSON',
        success: function(respuesta){
            console.log(respuesta);
         pintarRespuesta(respuesta);         
        }

    });


}

function pintarRespuesta(items){

    let myTable="<table border=1> <Tr> <td>id</td> <td>Brand</td> <td>Year</td> <td>Category</td> <td>Name</td> <td>Acciones</td> </Tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td> <a href='detalleCom.html?id="+items[i].id+"'>"+items[i].brand+"</a>"+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].category.name+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='borrarElementoCompu("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#myTable").append(myTable);

}


function borrarElementoCompu(idElemento){
    let myData={
        id:idElemento
    };
    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Computer/"+idElemento,
        type: "DELETE",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se ha eliminado el registro");
            limpiarInformacionCompu();
                           
    }
});
}

function limpiarInformacionCompu(){
    $("#myTable").empty();
    $("#id").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#category_id").val("");
    $("#name").val("");
    consultar();
}

function guardarInformacion() {
    let myData = {
        
        brand:$("#brand").val(),
        year:+$("#year").val(),
        category:{id:+$("#category_id").val()},
        name:$("#name").val(),
        description:$("#description").val()

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({contentType: "application/json; charset=utf-8",
        url: "/api/Computer/save",
        type: "POST",
        data: dataTosend,
        datatype: "JSON",
           success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente un nuevo computador");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}


function actualizarComputador() {
    let myData = {
        id:$("#id").val(),
        brand:$("#brand").val(),
        year:+$("#year").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Computer/update",
        type: "PUT",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se ha editado el registro satisfactoriamente");
            limpiarInformacionCompu();
        }
    });
}

function consultarClientes(){
    $.ajax({
        url: "/api/Client/all",
        type: 'GET',
        dataType: 'JSON',
        success: function(respuesta){
            console.log(respuesta);
        pintarRespuestaClientes(respuesta);         
        }

    });


}

function pintarRespuestaClientes(items){

    let myTable="<table border=1> <Tr> <td>ID</td> <td>NAME</td> <td>EMAIL</td> <td>PASSWORD</td> <td>AGE</td> <td>Acciones</td> </Tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td> <a href='detalle.html?id="+items[i].idClient+"&nombre="+items[i].name+"'>"+items[i].name+"</a></td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='borrarClientes("+items[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#myTableClientes").append(myTable);

}



function borrarClientes(idElemento){
    let myData={
        id:idElemento
    };
    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Client/"+idElemento,
        type: "DELETE",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se ha eliminado el registro");
            eliminarClientes();
                           
    }
});
}

function eliminarClientes(){
    $("#myTableClientes").empty();
    $("#idc").val("");
    $("#namec").val("");
    $("#email").val("");
    $("#password").val("");
    $("#age").val("");
    consultarClientes();
}

function guardarClientes() {
    let myData = {
        
        name:$("#namec").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val()
        

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({contentType: "application/json; charset=utf-8",
        url: "/api/Client/save",
        type: "POST",
        data: dataTosend,
        datatype: "JSON",
           success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente un nuevo cliente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarClientes() {
    let myData = {
        idClient:+$("#idEdit").val(),
        name:$("#nameEdit").val(),
        email:$("#emailEdit").val(),
        password:$("#passwordEdit").val(),
        age:+$("#ageEdit").val()

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Client/update",
        type: "PUT",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se actualizo cliente satisfactoriamente");
            $("#formularioCliente").empty();
            $("#myTableClientes").empty();
            consultarClientes();
        }
    });
}

function consultarMensajes(){
    $.ajax({
        url: "/api/Message/all",
        type: 'GET',
        dataType: 'JSON',
        success: function(respuesta){
            console.log(respuesta);
         pintarRespuestaMensajes(respuesta);         
        }

    });


}

function pintarRespuestaMensajes(items){

    let myTableMensajes="<table border=1> <Tr> <td>id</td> <td>Mensaje</td> <td>Computer</td> <td>Cliente</td>   <td>Acciones</td> </Tr>";
    for(i=0;i<items.length;i++){
        myTableMensajes+="<tr>";
        myTableMensajes+="<td>"+items[i].idMessage+"</td>";
        myTableMensajes+="<td> <a href='detalleMen.html?id="+items[i].idMessage+"'>"+items[i].messageText+"</a>"+"</td>";
        myTableMensajes+="<td>"+items[i].computer.name+"</td>";
        myTableMensajes+="<td>"+items[i].client.name+"</td>";
        myTableMensajes+="<td> <button onclick='borrarMensajes("+items[i].idMessage+")'>Borrar</button>";
        myTableMensajes+="</tr>";
    }
    myTableMensajes+="</table>";
    $("#myTableMensajes").append(myTableMensajes);

}


function borrarMensajes(idElemento){
    let myData={
        id:idElemento
    };
    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Message/"+idElemento,
        type: "DELETE",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultadoM").empty();
            alert("Se ha eliminado el mensaje");
            limpiarMensajes();
                           
    }
});
}

function limpiarMensajes(){
    $("#myTableMensajes").empty();
    
    $("#mensaje").val("");
    $("#computer_id");
     $("#client_id");
    
    consultarMensajes();
}

function guardarMensajes() {
    let myData = {
        
        messageText:$("#mensaje").val(),
        computer:{id:+$("#computer_id").val()},
        client:{idClient:+$("#client_id").val()}
        

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({contentType: "application/json; charset=utf-8",
        url: "/api/Message/save",
        type: "POST",
        data: dataTosend,
        datatype: "JSON",
           success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo un nuevo mensaje correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}


function actualizarMensajes() {
    let myData = {
        idMessage:$("#idM").val(),
        messageText:$("#mensaje").val(),
        computer:{id:+$("#computer_id").val()},
        client:{idClient:+$("#client_id").val()}
        

    };

    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: "/api/Message/update",
        type: "PUT",
        data: dataTosend,
        contentType: "application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $("#resultadoM").empty();
            $("#idM").val("");
            $("#mensaje").val("");
            $("#computer_id");
            $("#client_id");
            
            alert("Se actualizo el Mensaje satisfactoriamente");
            limpiarMensajes();
        }
    });
}

function traerInformacionCategorias(){
    $.ajax({
        url:"/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategoria(respuesta);
        }
    });
}



    function pintarRespuestaCategoria(items){

        let myTableCategoria="<table border=1> <Tr> <td>id</td> <td>Name</td> <td>Description</td> <td>Acciones</td> </Tr>";
        for(i=0;i<items.length;i++){
            myTableCategoria+="<tr>";
            myTableCategoria+="<td>"+items[i].id+"</td>";
            myTableCategoria+="<td>"+items[i].name+"</td>";
            
            myTableCategoria+="<td> <a href='detalleCat.html?id="+items[i].id+"'>"+items[i].description+"</a>"+"</td>";
          
            myTableCategoria+="<td> <button onclick='borrarCategoria("+items[i].id+")'>Borrar</button>";
            myTableCategoria+="</tr>";
        }
        myTableCategoria+="</table>";
        $("#myTableCategoria").append(myTableCategoria);
    
    }

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo una nueva categoria correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idCat").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se actualizo  categoria satisfactoriamente")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            limpiarInformacionCategoria();
            alert("Se ha Eliminado una categoria")
        }
    });

}
function limpiarInformacionCategoria(){
    $("#myTableCategoria").empty();
    $("#Cname").val("");
    $("#Cdescription").val("");
    
    traerInformacionCategorias();

}

function traerInformacionReservas(){
    $.ajax({
        url:"/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservas(respuesta);
        }
    });
}



    function pintarRespuestaReservas(items){

        let myTableReservas="<table border=1> <Tr> <td>id</td> <td>Inicio</td> <td>Devolucion</td> <td>Status</td> <td>Computador</td> <td>Cliente</td> <td>Acciones</td> </Tr>";
        for(i=0;i<items.length;i++){
        myTableReservas+="<tr>";
        myTableReservas+="<td>"+items[i].idReservation+"</td>";
        myTableReservas+="<td> <a href='detalleReservas.html?id="+items[i].idReservation+"'>"+items[i].startDate+"</a>"+"</td>";
        myTableReservas+="<td>"+items[i].devolutionDate+"</td>";
        myTableReservas+="<td>"+items[i].status+"</td>";
        myTableReservas+="<td>"+items[i].computer.name+"</td>";
        myTableReservas+="<td>"+items[i].client.name+"</td>";
        myTableReservas+="<td> <button onclick='borrarReservas("+items[i].idReservation+")'>Borrar</button>";
        myTableReservas+="</tr>";
        }
        myTableReservas+="</table>";
        $("#myTableReservas").append(myTableReservas);
    
    }

function guardarInformacionReservas(){
    let var2 =  {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        computer:{id:+$("#computer_id_r").val()},
        client:{idClient:+$("#client_id_r").val()},
        status:$("#status").val()
        };
        console.log(var2);
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
                
            console.log("Se guardo correctamente");
            alert("Se guardo una nueva reserva correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionReservas(){
    let myData={
        idReservation:$("#idR").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        
        status:$("#status").val()
        

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#computer_id_r");
            $("#client_id_r");
            $("#status").val("");
            traerInformacionReservas();
            alert("se actualizo la Reserva satisfactoriamente")
        }
    });

}

function borrarReservas(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            limpiarInformacionReservas();
            alert("Se ha Eliminado la reserva")
        }
    });

}
function limpiarInformacionReservas(){
    $("#myTableReservas").empty();
    $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#computer_id_r");
            $("#client_id_r");
            $("#status").val("");
    traerInformacionReservas();

}