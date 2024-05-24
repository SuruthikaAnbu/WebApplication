using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Data;
using System.Data.Entity;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedichineInfoController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedichineInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        // private static List<MedichineInfo> _Medicine = new List<MedichineInfo>
        // {
        //     // Add more Contacts here if needed
        //     new MedichineInfo {MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05) },
        //      new MedichineInfo {MedichineName="colpol", MedichineCount = 30, MedicinePrice = 10, MedicineExpiryDate = new DateTime(2025,02,05) },
        //       new MedichineInfo {MedichineName="stepsil", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05) },
        //        new MedichineInfo {MedichineName="Paracitamal", MedichineCount = 50, MedicinePrice = 5, MedicineExpiryDate = new DateTime(2025,02,05) },
    
        // };
         // GET: api/Contacts
        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.Medicines.ToList());
        }
         // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetUsers(int id)
        {
            var medichine = _dbContext.Medicines.FirstOrDefault(m => m.MedichineID == id);
            if (medichine == null)
            {
                return NotFound();
            }
            return Ok(medichine);
        }
        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostUser([FromBody] MedichineInfo medichine)
        {
            _dbContext.Medicines.Add(medichine);
            _dbContext.SaveChanges();
            //_Medicine.Add(medichine);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }
        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id, [FromBody] MedichineInfo medichine)
        {
            var oldMedicine = _dbContext.Medicines.FirstOrDefault(m => m.MedichineID== id);
            if (oldMedicine==null)
            {
                return NotFound();
            }
            oldMedicine.MedichineName=medichine.MedichineName;
            oldMedicine.MedichineCount=medichine.MedichineCount;
            oldMedicine.MedicinePrice=medichine.MedicinePrice;
            oldMedicine.MedicineExpiryDate=medichine.MedicineExpiryDate;
            _dbContext.SaveChanges();
            //_Medicine[index] = medichine;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)
        {
            var medichine = _dbContext.Medicines.FirstOrDefault(m => m.MedichineID == id);
            if (medichine == null)
            {
                return NotFound();
            }
            _dbContext.Medicines.Remove(medichine);
            _dbContext.SaveChanges();
            //_Medicine.Remove(medichine);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
        };
        // private readonly ILogger<MedichineInfoControllers> _logger;

        // public MedichineInfoControllers(ILogger<MedichineInfoControllers> logger)
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
