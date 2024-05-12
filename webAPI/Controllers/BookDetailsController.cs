using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webAPI.Data;
using System.Data.Entity;
using System.Data.Entity;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetBookDetails()
        {
            return Ok(_dbContext.book.ToList());
        }
        //GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetBookDeltails(int id)
        {
            var books=_dbContext.book.FirstOrDefaultAsync(m =>m.BookID==id);
            if(books==null)
            {
                return NotFound();
            }
            return Ok(books);
        }
        [HttpPost]
        public IActionResult PostBookDetails([FromBody] BookDetails books)
        {
            _dbContext.book.Add(books);
            _dbContext.SaveChanges();
            //_UserDetails.Add(user);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutBookDetails(int id,[FromBody] BookDetails books)
        {
            var oldBook=_dbContext.book.FirstOrDefault(m => m.BookID==id);
            if(oldBook==null)
            {
                return NotFound();
            }
            //oldUsers.CardNumber=users.CardNumber;
            oldBook.BookName=books.BookName;
            oldBook.AuthorName=books.AuthorName;
            oldBook.BookCount=books.BookCount;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DelecteBookDetails(int id)
        {
            var books=_dbContext.book.FirstOrDefault(m =>m.BookID==id);
            if(books==null)
            {
                return NotFound();
            }
            _dbContext.book.Remove(books);
            _dbContext.SaveChanges();
            //_UserDetails.Remove(user);
            return Ok();
        }
        // private readonly ILogger<BookDetailsController> _logger;

        // public BookDetailsController(ILogger<BookDetailsController> logger)
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