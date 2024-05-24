using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Data;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        // private static List<UserDetails> _User = new List<UserDetails>
        // {
        //     // Add more Contacts here if needed
        //     new UserDetails {UserId=2, UserName = "Ravi", PassWord = "Ravi", WalletBalance = 5000, PhoneNumber = 1234567890 },
        //     new UserDetails {UserId=3, UserName = "Chandran", PassWord = "Chandran", WalletBalance = 3000, PhoneNumber = 1234567890 },
        //     new UserDetails {UserId=4, UserName = "Baskaran", PassWord = "baskar", WalletBalance = 2000, PhoneNumber = 1234567890 },
        // };
         // GET: api/Contacts
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_dbContext.users.ToList());
        }
         // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetUsers(int id)
        {
            var user = _dbContext.users.FirstOrDefaultAsync(m => m.UserID == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
           //_User.Add(user);
            // You might want to return CreatedAtAction or another appropriate response
            //return Ok();
        }
        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id, [FromBody] UserDetails user)
        {
            var oldUsers = _dbContext.users.FirstOrDefault(m => m.UserID== id);
            if (oldUsers == null)
            {
                return NotFound();
            }
            oldUsers.UserName=user.UserName;
            oldUsers.Password=user.Password;
            oldUsers.WalletBalance=user.WalletBalance;
            oldUsers.PhoneNumber=user.PhoneNumber;
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        //amount update
        
         [HttpPut("{id}/{amount}")]
        public IActionResult PutAmount(int id,double amount)
        {
            var index=_dbContext.users.FirstOrDefault(m => m.UserID==id);
            
            if(index!=null)
            {
            index.WalletBalance=amount;
            _dbContext.SaveChanges();
            }
            return Ok();
        }
        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUsetr(int id)
        {
            var user = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            //_User.Remove(user);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        // private readonly ILogger<UserDetailsController> _logger;

        // public UserDetailsController(ILogger<UserDetailsController> logger)
        // {
        //     _logger = logger;
        // }

        // public IActionResult Index()
        // {
        //     return View();
        // }

        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        // public IActionResult Error()
        // {
        //     return View("Error!");
        // }
    }
}