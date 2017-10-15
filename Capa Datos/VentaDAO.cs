﻿using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidades;

namespace Capa_Datos
{
	public class VentaDAO
	{
		#region "PATRON SINGLETON"
		private static VentaDAO venta = null;

		private VentaDAO() { }
		public static VentaDAO GetInstance()
		{
			if (venta == null)
			{
				venta = new VentaDAO();
			}
			return venta;
		}
		#endregion

		public bool RegistrarVenta(Venta venta)
		{
			bool resultado = false;
			SqlConnection cn = null;
			SqlCommand cmd = null;

			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("SP_REGVENTA", cn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@CODVENTA", venta.CodVenta);
				cmd.Parameters.AddWithValue("@FECVENTA", venta.FecVenta);
				cmd.Parameters.AddWithValue("@IGV", venta.Igv);
				cmd.Parameters.AddWithValue("@TOTAL", venta.Total);
				cmd.Parameters.AddWithValue("@IDUSUARIO", venta.Usuario.Username);
				cn.Open();
				resultado = cmd.ExecuteNonQuery() >= 1 ? true : false;
			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}
			
			return resultado;
		}
		public bool RegistrarDetalleVenta(DetalleVenta obj)
		{
			bool resultado = false;
			SqlConnection cn = null;
			SqlCommand cmd = null;

			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("SP_REGDETALLEVENTA", cn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@PREUNITARIO", obj.Precio);
				cmd.Parameters.AddWithValue("@CANTIDAD", obj.Cantidad);
				cmd.Parameters.AddWithValue("@SUBTOTAL", obj.Subtotal);
				cmd.Parameters.AddWithValue("@CODMEDICAMENTO", obj.Medicamento.CodMedicamento);
				cmd.Parameters.AddWithValue("@CODVENTA", obj.Venta.CodVenta);
				cn.Open();
				resultado = cmd.ExecuteNonQuery() >= 1 ? true : false;

			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}

			return resultado;
		}
		public string GenerarNroVenta()
		{
			string resultado = "V";
			int valor = 0;
			SqlConnection cn = null;
			SqlCommand cmd = null;
			SqlDataReader dr = null;
			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("select top 1 CODVENTA FROM VENTA ORDER BY CODVENTA DESC", cn);
				cn.Open();
				dr = cmd.ExecuteReader();
				if (dr.Read())
				{
					valor = Convert.ToInt32(Convert.ToString(dr[0]).Replace("V", "")) + 1;
					resultado = string.Format(resultado + "{0}", valor);
				}
				else
				{
					resultado = "V1";
				}
			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}
			return resultado;

		}
	}
}
