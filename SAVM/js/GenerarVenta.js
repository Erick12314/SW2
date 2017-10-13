//var fecha = Date($("#txtfecha").val());
//dia = date.getDay();
//mes = date.getMonth() + 1;
//year = date.getFullYear();
//fecha = [dia, mes, year].join('/');

function RegistrarVentaAJAX() {
	
	//var fecha = Date($("#txtfecha").val());
	//dia = date.getDay();
	//mes = date.getMonth() + 1;
	//year = date.getFullYear();
	//fecha = [dia, mes, year].join('/');

	var obj = JSON.stringify({
		_Codventa: $("#txtnumventa").val(),
		_FecVenta: $("#txtfecha").val(),
		_Igv: $("#txtigv").val(),
		_Total: $('#txtmontototal').val()
	});

	$.ajax({
		type: "POST",
		url: "GenerarVenta.aspx/RegistrarVenta",
		data: obj,
		dataType: "json",
		contentType: "application/json",
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
		},
		success: function (respuesta) {
			alert("Venta Registrada");
			console.log(respuesta);
		}
	});
}



$("#btnGrabar").click(function (e) {
	e.preventDefault();
	RegistrarVentaAJAX();
});

$('body').on('click', '#btnAgregar',function (e) {
	var medicamento = $("#txtnombre").val();
	var precio = $("#txtprecio").val();
	var cantidad = $("#txtcantidad").val();
	var subtotal = parseFloat(precio * cantidad).toFixed(2);
	var botonEliminar = "<button id='btnEliminar' type='button' class='btn btn-danger btn-md' style='color:white;'>Eliminar</button>";
	$('#tabladetalleventa').append("<tr>" +
		"<td>" + medicamento +"</td>" +
		"<td>" + precio +"</td>" +
		"<td>" + cantidad +"</td>" +
		"<td>" + subtotal +"</td>" +
		"<td>" + botonEliminar +"</td>" +
		"</tr > ");
	$("#txtprecio").val("");
	ActualizarMontos(subtotal);
});

function ActualizarMontos(subtotal) {
	var anterior = $("#txtmonto").val();
	if (anterior == "") {
		anterior = "0";
	} 
	$("#txtmonto").val(Number(anterior) + Number(subtotal));
}
