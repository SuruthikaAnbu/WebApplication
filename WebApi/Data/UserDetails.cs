using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Data
{
    [Table("UserDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
     public int UserID{get;set;}
     public string UserName{get;set;}
     public string Password{get;set;}
     public double WalletBalance{get;set;}
     public long PhoneNumber{get;set;}
    }
}