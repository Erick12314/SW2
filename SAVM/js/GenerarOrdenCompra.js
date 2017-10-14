
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

	ObtenerNroOC();
	$("#txtfechaOC").val(hoy);
});

function ObtenerNroOC() {
	$.ajax({
		type: "POST",
		url: "GenerarOrdenCompra.aspx/GenerarNroOC",
		data: {},
		contentType: "application/json",
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
		},
		success: function (respuesta) {
			$("#txtnumocOC").val(respuesta.d);
		}
	});
}

$('body').on('click', '#btnAgregarOC', function (e) {

	if ($("#txtcodmedicamentoOC").val() == "") {
		alert("Busque el medicamento a agregar");
		return false;
	}
	var _cantidad = $("#txtcantidadOC").val().indexOf(".");
	if ($("#txtcantidadOC").val() == "" || Number($("#txtcantidadOC").val()) < 1 || _cantidad != -1) {
		alert("Ingrese la cantidad del medicamento");
		return false;
	}
	var codmedicamento = $("#txtcodmedicamentoOC").val();
	var medicamento = $("#txtnombreOC").val();
	var precio = $("#txtprecioOC").val();
	var cantidad = $("#txtcantidadOC").val();
	var subtotal = parseFloat(precio * cantidad).toFixed(2);
	var botonEliminar = "<button id='btnEliminarOC' type='button' class='btn btn-danger btn-md' style='color:white;'>Eliminar</button>";
	$('#tableDetalleBodyOC').append("<tr>" +
		"<td>" + codmedicamento + "</td>" +
		"<td>" + medicamento + "</td>" +
		"<td>" + precio + "</td>" +
		"<td>" + cantidad + "</td>" +
		"<td>" + subtotal + "</td>" +
		"<td>" + botonEliminar + "</td>" +
		"</tr > ");
	ActualizarMontosSumarOC(subtotal);
});

function ActualizarMontosSumarOC(subtotal) {
	var anterior = $("#txtmontototalOC").val();
	if (anterior == "") {
		anterior = "0";
	}
	$("#txtmontototalOC").val((Number(anterior) + Number(subtotal)).toFixed(2));
	calcularIGVMontoOC($("#txtmontototalOC").val());
}

$('#tableDetalleBodyOC').on('click', '#btnEliminarOC', function () {
	var respuesta = confirm("¿Está seguro de eliminar el medicamento de la grilla?");
	if (respuesta == true) {
		var fila = $(this).closest('tr');
		fila.remove();
		var subtotal = Number(fila.find('td:eq(4)').text());
		ActualizarMontosRestarOC(subtotal);
	}
});

function ActualizarMontosRestarOC(subtotal) {
	var anterior = $("#txtmontototalOC").val();
	if (anterior == "") {
		anterior = "0";
	}
	$("#txtmontototalOC").val((Number(anterior) - Number(subtotal)).toFixed(2));
	calcularIGVMontoOC($("#txtmontototalOC").val());
}

function calcularIGVMontoOC(monto) {
	var monto_sin_igv = (monto * 0.82).toFixed(2);
	var igv = (monto * 0.18).toFixed(2);
	$("#txtmontoOC").val(monto_sin_igv);
	$("#txtigvOC").val(igv)
}

$("#btnGrabarOC").click(function (e) {
	e.preventDefault();
	var flag = ValidarCamposOC();
	var resultado = false;
	if (flag) {
		RegistrarOCAJAX();
		alert("La Orden de Compra se grabó exitosamente");
		RegistrarDetalleOC();
		LimpiarOC();
		ObtenerNroOC();
	}
});

function RegistrarOCAJAX() {

	var resultado = false;

	var obj = JSON.stringify({
		_CodOc: $("#txtnumocOC").val(),
		_FecOC: $("#txtfechaOC").val(),
		_Igv: $("#txtigvOC").val(),
		_Total: $('#txtmontototalOC').val(),
		_Ruc: $('#txtrucOC').val()
	});

	$.ajax({
		type: "POST",
		url: "GenerarOrdenCompra.aspx/RegistrarOC",
		data: obj,
		dataType: "json",
		contentType: "application/json",
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
			resultado = false;
		},
		success: function (respuesta) {
			//alert("Venta Registrada");
			console.log(respuesta);
			resultado = true;
		}
	});
	return resultado;
}

function RegistrarDetalleOC() {
	$("#tableDetalleBodyOC tr").each(function () {
		var fila = $(this).closest('tr');
		var precio = Number(fila.find('td:eq(2)').text());
		var cantidad = Number(fila.find('td:eq(3)').text());
		var subtotal = Number(fila.find('td:eq(4)').text());
		var codmedicamento = fila.find('td:eq(0)').text();
		var codoc = $("#txtnumocOC").val();
		RegistrarDetalleAJAXOC(precio, cantidad, subtotal, codmedicamento, codoc);
	});
}

function RegistrarDetalleAJAXOC(precio, cantidad, subtotal, codmedicamento, codoc) {
	var obj = JSON.stringify({
		_precio: precio,
		_cantidad: cantidad,
		_subtotal: subtotal,
		_codmedicamento: codmedicamento,
		_codoc: codoc
	});
	$.ajax({
		type: "POST",
		url: "GenerarOrdenCompra.aspx/RegistrarDetalleOC",
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

function ValidarCamposOC() {
	if ($("#txtrucOC").val() == "" || Number($("#txtrucOC").val()) < 1 || $("#txtrucOC").val() == "") {
		alert("Busque el proveedor para la Orden de Compra");
		return false;
	}
	var filas = Number($('#tableDetalleBodyOC tr').length);
	if (filas <= 0) {
		alert("Agrege al menos un medicamento a la grilla");
		return false;
	}
	
	return true;
}

function LimpiarOC() {
	$("#txtnumocOC").val("");
	$("#txtrucOC").val("");
	$("#txtrazonsocialOC").val("");
	$("#txtcontactoOC").val("");
	$("#txtcodmedicamentoOC").val("");
	$("#txtnombreOC").val("");
	$("#txtprecioOC").val("");
	$("#txtcantidadOC").val("");
	$("#txtmontoOC").val("");
	$("#txtigvOC").val("");
	$("#txtmontototalOC").val("");
	$("#tableDetalleBodyOC").empty();
}