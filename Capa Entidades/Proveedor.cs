using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class Proveedor
    {
        public int IdProveedor { get; set; }
		public long RUC { get; set; }
		public string RazonSocial { get; set; }
        public string Direccion { get; set; }
		public bool Estado { get; set; }
	}
}
