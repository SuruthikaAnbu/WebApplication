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
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetBorrowsDetails()
        {
            return Ok(_dbContext.borrow.ToList());
        }
         //GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetBorrowsDetails(int id)
        {
            var borrows=_dbContext.borrow.FirstOrDefault(m =>m.BorrowID==id);
            if(borrows==null)
            {
                return NotFound();
            }
            return Ok(borrows);
        }
        //POST:api/Contacts
        [HttpPost]
        public IActionResult PostBorrowsDetails([FromBody] BorrowDetails borrows)
        {
            _dbContext.borrow.Add(borrows);
            _dbContext.SaveChanges();
            //_UserDetails.Add(user);
            return Ok();
        }
        //PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutBorrowsDetails(int id,[FromBody] BorrowDetails borrows)
        {
            var oldBorrow=_dbContext.borrow.FirstOrDefault(m => m.BorrowID==id);
            if(oldBorrow==null)
            {
                return NotFound();
            }
            //oldUsers.CardNumber=users.CardNumber;
            oldBorrow.BookID=borrows.BookID;
            oldBorrow.UserID=borrows.UserID;
            oldBorrow.BorrowedDate=borrows.BorrowedDate;
            oldBorrow.BorrowedBookCount=borrows.BorrowedBookCount;
            oldBorrow.Status=borrows.Status;
            oldBorrow.PaidFineAmount=borrows.PaidFineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DelecteBorrowDetails(int id)
        {
            var borrows=_dbContext.borrow.FirstOrDefault(m =>m.BorrowID==id);
            if(borrows==null)
            {
                return NotFound();
            }
            _dbContext.borrow.Remove(borrows);
            _dbContext.SaveChanges();
            //_UserDetails.Remove(user);
            return Ok();
        }
        
        // private readonly ILogger<BorrowDetailsController> _logger;

        // public BorrowDetailsController(ILogger<BorrowDetailsController> logger)
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