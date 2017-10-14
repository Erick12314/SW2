﻿
$(document).ready(function () {
	var hoy = new Date();
	var dia = hoy.getDate();
	var mes = hoy.getMonth() + 1; 
	var year = hoy.getFullYear();

	if (dia < 10) {
		dia = '0' + dia
	}

	if (mes < 10) {
		mes = '0' + mes
	}

	hoy = dia + '/' + mes + '/' + year;

	ObtenerNroVenta();
	$("#txtfecha").val(hoy);
});

function ObtenerNroVenta() {s
	$.ajax({
		type: "POST",
		url: "GenerarVenta.aspx/GenerarNroVenta",
		data: {},
		contentType: "application/json",
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
		},
		success: function (respuesta) {
			$("#txtnumventa").val(respuesta.d);
		}
	});  
}

$('body').on('click', '#btnAgregar', function (e) {

	if ($("#txtcodmedicamento").val() == "") {
		alert("Busque el medicamento a agregar");
		return false;
	}
	var _cantidad = $("#txtcantidad").val().indexOf(".");
	if ($("#txtcantidad").val() == "" || Number($("#txtcantidad").val()) < 1 || _cantidad != -1) {
		alert("Ingrese la cantidad del medicamento");
		return false;
	}
	var codmedicamento = $("#txtcodmedicamento").val();
	var medicamento = $("#txtnombre").val();
	var precio = $("#txtprecio").val();
	var cantidad = $("#txtcantidad").val();
	var subtotal = parseFloat(precio * cantidad).toFixed(2);
	var botonEliminar = "<button id='btnEliminar' type='button' class='btn btn-danger btn-md' style='color:white;'>Eliminar</button>";
	$('#tabladetalleventa').append("<tr>" +
		"<td>" + codmedicamento + "</td>" +
		"<td>" + medicamento +"</td>" +
		"<td>" + precio +"</td>" +
		"<td>" + cantidad +"</td>" +
		"<td>" + subtotal +"</td>" +
		"<td>" + botonEliminar +"</td>" +
		"</tr > ");
	ActualizarMontosSumar(subtotal);
});

function ActualizarMontosSumar(subtotal) {
	var anterior = $("#txtmontototal").val();
	if (anterior == "") {
		anterior = "0";
	}
	$("#txtmontototal").val((Number(anterior) + Number(subtotal)).toFixed(2));
	calcularIGVMonto($("#txtmontototal").val());
}

$('#tabladetalleventa').on('click', '#btnEliminar', function () {
	var respuesta = confirm("¿Está seguro de eliminar el medicamento de la grilla?");
	if (respuesta == true) {
		var fila = $(this).closest('tr');
		fila.remove();
		var subtotal = Number(fila.find('td:eq(4)').text());
		ActualizarMontosRestar(subtotal);
	} 
});

function ActualizarMontosRestar(subtotal) {
	var anterior = $("#txtmontototal").val();
	if (anterior == "") {
		anterior = "0";
	}
	$("#txtmontototal").val((Number(anterior) - Number(subtotal)).toFixed(2));
	calcularIGVMonto($("#txtmontototal").val());
}

function calcularIGVMonto(monto) {
	var monto_sin_igv = (monto * 0.82).toFixed(2);
	var igv = (monto * 0.18).toFixed(2);
	$("#txtmonto").val(monto_sin_igv);
	$("#txtigv").val(igv)
}

$("#btnGrabar").click(function (e) {
	e.preventDefault();
	var flag = ValidarCampos();
	var resultado = false;
	if (flag) {
		RegistrarVentaAJAX();
		alert("La venta se grabó exitosamente");
		RegistrarDetalle();
		Limpiar();
		ObtenerNroVenta();
	}
});

function RegistrarVentaAJAX() {

	var resultado = false;

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
			resultado =  false;
		},
		success: function (respuesta) {
			//alert("Venta Registrada");
			console.log(respuesta);
			resultado =  true;
		}
	});
	return resultado;
}

function RegistrarDetalle() {
	$("#tabladetalleventa tr").each(function () {
		var fila = $(this).closest('tr');
		var precio = Number(fila.find('td:eq(2)').text());
		var cantidad = Number(fila.find('td:eq(3)').text());
		var subtotal = Number(fila.find('td:eq(4)').text());
		var codmedicamento = fila.find('td:eq(0)').text();
		var codventa = $("#txtnumventa").val();
		RegistrarDetalleAJAX(precio, cantidad, subtotal, codmedicamento, codventa);
	});
}

function RegistrarDetalleAJAX(precio, cantidad, subtotal, codmedicamento, codventa) {
	var obj = JSON.stringify({
		_precio: precio,
		_cantidad: cantidad,
		_subtotal: subtotal,
		_codmedicamento: codmedicamento,
		_codventa: codventa
	});
	$.ajax({
		type: "POST",
		url: "GenerarVenta.aspx/RegistrarDetalleVenta",
		data: obj,
		dataType: "json",
		contentType: "application/json",
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
		},
		success: function (respuesta) {
		}
	});
}

function ValidarCampos() {
	if ($("#txtnumdoc").val() == "" || Number($("#txtnumdoc").val()) < 1 || $("#txtrs").val() == "") {
		alert("Ingrese los datos del cliente");
		return false;
	}
	var filas = Number($('#tabladetalleventa tr').length);
	if (filas <= 0){
		alert("Agrege al menos un medicamento a la grilla");
		return false;
	}
	return true;
}

function Limpiar() {
	$("#txtnumdoc").val("");
	$("#txtrs").val("");
	$("#txtcodmedicamento").val("");
	$("#txtnombre").val("");
	$("#txtprecio").val("");
	$("#txtcantidad").val("");
	$("#txtnumventa").val("");
	$("#txtmonto").val("");
	$("#txtigv").val("");
	$("#txtmontototal").val("");
	$("#tabladetalleventa").empty();
}