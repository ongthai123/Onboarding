using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class ProductController : Controller
    {
        MVCEntities db = new MVCEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProducts()
        {
            var allProducts = db.Products.Select(x => new { x.Id, x.Name, x.Price }).ToList();

            return Json(allProducts);
        }

        [HttpPost]
        public ActionResult AddProducts(Product product)
        {
            if (ModelState.IsValid)
            {
                Product newProduct = new Product
                {
                    Name = product.Name,
                    Price = product.Price
                };
                db.Products.Add(newProduct);
                db.SaveChanges();
            }

            var allProducts = db.Products.Select(x => new { x.Id, x.Name, x.Price }).ToList();

            return Json(new { allProducts, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditProducts(Product product)
        {
            if (ModelState.IsValid)
            {
                Product editingProduct = db.Products.Where(x => x.Id == product.Id).FirstOrDefault();
                if (editingProduct != null)
                {
                    editingProduct.Name = product.Name;
                    editingProduct.Price = product.Price;
                    db.SaveChanges();
                }
            }
            var allProducts = db.Products.Select(x => new { x.Id, x.Name, x.Price }).ToList();

            return Json(new { allProducts, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteProducts(int id)
        {
            if (ModelState.IsValid)
            {
                db.Products.Remove(db.Products.Where(x => x.Id == id).FirstOrDefault());
                db.SaveChanges();
            }
            var allProducts = db.Products.Select(x => new { x.Id, x.Name, x.Price }).ToList();

            return Json(new { allProducts, success = "true" }, JsonRequestBehavior.AllowGet);
        }
    }
}
