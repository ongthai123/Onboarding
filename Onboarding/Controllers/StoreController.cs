using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class StoreController : Controller
    {
        MVCEntities db = new MVCEntities();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetStores()
        {
            var allStores = db.Stores.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(allStores);
        }

        [HttpPost]
        public ActionResult AddStores(Store store)
        {
            if (ModelState.IsValid)
            {
                Store newStore = new Store
                {
                    Name = store.Name,
                    Address = store.Address
                };
                db.Stores.Add(newStore);
                db.SaveChanges();
            }

            var allStores = db.Stores.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new { allStores, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditStores(Store store)
        {
            if (ModelState.IsValid)
            {
                Store editingStore = db.Stores.Where(x => x.Id == store.Id).FirstOrDefault();
                if (editingStore != null)
                {
                    editingStore.Name = store.Name;
                    editingStore.Address = store.Address;
                    db.SaveChanges();
                }
            }
            var allStores = db.Stores.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new { allStores, success = "true" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteStores(int id)
        {
            if (ModelState.IsValid)
            {
                db.Stores.Remove(db.Stores.Where(x => x.Id == id).FirstOrDefault());
                db.SaveChanges();
            }
            var allStores = db.Stores.Select(x => new { x.Id, x.Name, x.Address }).ToList();

            return Json(new { allStores, success = "true" }, JsonRequestBehavior.AllowGet);
        }
    }
}