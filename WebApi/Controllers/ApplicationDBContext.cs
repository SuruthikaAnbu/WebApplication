using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;

namespace WebApi.Controllers
{
    public class ApplicationDBContext:DbContext,IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options): base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    public DbSet<UserDetails> users{get; set;}
    public DbSet<MedichineInfo> Medicines{get; set;}
    public DbSet<OrderHistory> Orders{get; set;}
    }
}