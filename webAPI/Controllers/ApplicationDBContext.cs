using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data;

namespace webAPI.Controllers
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    public DbSet<UserDetails> users{get; set;}
    public DbSet<BorrowDetails> borrow{get; set;}
    public DbSet<BookDetails> book{get; set;}
        
    }
}