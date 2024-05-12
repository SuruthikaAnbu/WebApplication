using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.Entity;
using webAPI.Data;

namespace webAPI.Controllers
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
        [HttpGet]
        public IActionResult GetUserDetails()
        {
            return Ok(_dbContext.users.ToList());
        }
        //GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetUserDeltailsByID(int id)
        {
            var users=_dbContext.users.FirstOrDefault(m =>m.UserID==id);
            if(users==null)
            {
                return NotFound();
            }
            return Ok(users);
        }
        //POST:api/Contacts
        [HttpPost]
        public IActionResult PostUserDetails([FromBody] UserDetails users)
        {
            _dbContext.users.Add(users);
            _dbContext.SaveChanges();
            //_UserDetails.Add(user);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutUSerDetails(int id,[FromBody] UserDetails users)
        {
            var oldUsers=_dbContext.users.FirstOrDefault(m => m.UserID==id);
            if(oldUsers==null)
            {
                return NotFound();
            }
            //oldUsers.CardNumber=users.CardNumber;
            oldUsers.UserName=users.UserName;
            oldUsers.PassWord=users.PassWord;
            oldUsers.Gender=users.Gender;
            oldUsers.Department=users.Department;
            oldUsers.MobileNumber=users.MobileNumber;
            oldUsers.EmailID=users.EmailID;
            oldUsers.WalletBalance=users.WalletBalance;
            oldUsers.Photo=users.Photo;
            _dbContext.SaveChanges();
            return Ok();
        }
        
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
        [HttpDelete("{id}")]
        public IActionResult DelecteUSerDetails(int id)
        {
            var users=_dbContext.users.FirstOrDefault(m =>m.UserID==id);
            if(users==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(users);
            _dbContext.SaveChanges();
            //_UserDetails.Remove(user);
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