using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class OrdenCompra
    {
        public int IdOrdenCompra { get; set; }
        public int IdProveedor { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estado { get; set; }
        public Decimal Igv { get; set; }
        public Decimal Total { get; set; }
    }
}
