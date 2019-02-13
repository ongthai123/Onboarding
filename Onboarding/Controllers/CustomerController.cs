using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class CustomerController : Controller
    {
        MVCEntities db = new MVCEntities();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCustomers()
        {
            var allCustomers = db.Customers.Select(x => new {x.Id, x.Name, x.Address }).ToList();

            return Json(allCustomers);
        }

        [HttpPost]
        public ActionResult AddCustomers(Customer customer)
        {
            if(ModelState.IsValid){
                Customer newCustomer = new Customer
                {
                    Name = customer.Name,
                    Address = customer.Address
                };
                db.Customers.Add(newCustomer);
                db.SaveChanges();
            }

            var allCustomers = db.Customers.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new {allCustomers, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditCustomers(Customer customer)
        {
            if (ModelState.IsValid)
            {
                Customer editingCustomer = db.Customers.Where(x => x.Id == customer.Id).FirstOrDefault();
                if(editingCustomer != null)
                {
                    editingCustomer.Name = customer.Name;
                    editingCustomer.Address = customer.Address;
                    db.SaveChanges();
                }
            }
            var allCustomers = db.Customers.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new { allCustomers, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteCustomers(int id)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Remove(db.Customers.Where(x => x.Id == id).FirstOrDefault());
                db.SaveChanges();
            }
            var allCustomers = db.Customers.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new { allCustomers, success = "true" }, JsonRequestBehavior.AllowGet);
        }
    }
}