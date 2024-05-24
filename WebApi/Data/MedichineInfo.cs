using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Data
{
     [Table("MedichineInfo", Schema = "public")]
    public class MedichineInfo
    {
        [Key]
     public int MedichineID{get; set;}
     public string MedichineName{get; set;}
     public int MedichineCount{get; set;}
     public double MedicinePrice{get; set;}
     public string MedicineExpiryDate{get; set;}
     
    }
}