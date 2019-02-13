using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class SaleController : Controller
    {
        MVCEntities db = new MVCEntities();

        // GET: Sale
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetSales()
        {
            var allCustomers = db.Customers.Select(x => new { x.Id, x.Name}).ToList();
            var allProducts = db.Products.Select(x => new { x.Id, x.Name}).ToList();
            var allStores = db.Stores.Select(x => new { x.Id, x.Name }).ToList();

            var getSales = (from sale in db.Sales
                            join c in db.Customers on sale.CustomerId equals c.Id
                            join p in db.Products on sale.ProductId equals p.Id
                            join s in db.Stores on sale.StoreId equals s.Id
                            select new { Customer = c.Name, Product = p.Name, Store = s.Name, sale.DateSold, sale.Id }).ToList();


            return Json(new { allCustomers, allProducts, allStores, getSales, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddSales(Sale sale)
        {
            if (ModelState.IsValid)
            {
                Sale newSale = new Sale
                {
                    CustomerId = sale.CustomerId,
                    ProductId = sale.ProductId,
                    StoreId = sale.StoreId,
                    DateSold = sale.DateSold
                };
                db.Sales.Add(newSale);
                db.SaveChanges();
            }
            //var allSales = db.Sales.Select(x => new { x.CustomerId, x.ProductId, x.StoreId, x.DateSold }).ToList();

            return Json(new { /*allSales,*/ success = "true"}, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditSales(Sale sale)
        {
            if (ModelState.IsValid)
            {
                var editingSale = db.Sales.Where(x => x.Id == sale.Id).FirstOrDefault();
                if(editingSale != null)
                {
                    editingSale.CustomerId = sale.CustomerId;
                    editingSale.ProductId = sale.ProductId;
                    editingSale.StoreId = sale.StoreId;
                    editingSale.DateSold = sale.DateSold;
                    db.SaveChanges();
                }
            }
            //var allSales = db.Sales.Select(x => new { x.CustomerId, x.ProductId, x.StoreId, x.DateSold }).ToList();

            return Json(new { /*allSales,*/ success = "true" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteSales(int id)
        {
            if (ModelState.IsValid)
            {
                db.Sales.Remove(db.Sales.Where(x => x.Id == id).FirstOrDefault());
                db.SaveChanges();
            }
            //var allSales = db.Sales.Select(x => new { x.CustomerId, x.ProductId, x.StoreId, x.DateSold }).ToList();

            return Json(new { /*allSales,*/ success = "true" }, JsonRequestBehavior.AllowGet);
        }
    }
}
