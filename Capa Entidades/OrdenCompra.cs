using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class OrdenCompra
    {
        public int IdOrdCompra { get; set; }
		public string CodOrdCompra { get; set; }
        public string FecOrdCompra { get; set; }
        public decimal Igv { get; set; }
        public decimal Total { get; set; }
		public long RucPro { get; set; }
	}
}
