using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class DetalleOrdenCompra
    {
        public int IdDetalle { get; set; }
        public string CodOrdCompra { get; set; }
        public string CodMedicamento { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }
    }
}