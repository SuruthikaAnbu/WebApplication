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
    public class OrderHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderHistoryController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        // private static List<OrderHistory> _Order = new List<OrderHistory>
        // {
        //     // Add more Contacts here if needed
        //     new OrderHistory {MedichineID=1,MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05),MedicineStatus="Ordererd" },
        //     new OrderHistory {MedichineID=2,MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05),MedicineStatus="Ordererd" },
        //     new OrderHistory {MedichineID=1,MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05),MedicineStatus="Ordererd" },
        //     new OrderHistory {MedichineID=2,MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05),MedicineStatus="Ordererd" },
   
        // };
         // GET: api/Contacts
        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.Orders.ToList());
        }
         // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _dbContext.Orders.FirstOrDefault(m => m.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostOrder([FromBody] OrderHistory order)
        {
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }
        //
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, [FromBody] OrderHistory order)
        {
            var oldOrder = _dbContext.Orders.FirstOrDefault(m => m.OrderID== id);
            if (oldOrder == null)
            {
                return NotFound();
            }
            //oldOrder.MedichineID=order.MedichineID;
            oldOrder.MedichineName=order.MedichineName;
            oldOrder.MedichineCount=order.MedichineCount;
            oldOrder.MedicinePrice=order.MedicinePrice;
            oldOrder.MedicineExpiryDate=order.MedicineExpiryDate;
            oldOrder.MedicineStatus=order.MedicineStatus;
            _dbContext.SaveChanges();
            
            //_Order[index] = order;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _dbContext.Orders.FirstOrDefault(m => m.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }
            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();
            //_Order.Remove(order);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        };
        // private readonly ILogger<OrderHistoryControllers> _logger;

        // public OrderHistoryControllers(ILogger<OrderHistoryControllers> logger)
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
