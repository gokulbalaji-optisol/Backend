import { Router } from "express";
import { Userroles } from "../config/config";
import AdminController from "../controllers/AdminController";
import BookGenreController from "../controllers/BookGenreController";
import PaymentController from "../controllers/PaymentController";
import { checkJwt } from "../middleware/auth/checkJwt";
import { checkRole } from "../middleware/auth/checkRole";

const router = Router();

//view books,users,orders,genres

router.get(
  "/getBooks",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.getBooks
);
router.get(
  "/getUsers",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.getUsers
);
router.get(
  "/getOrders",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.getOrders
);
router.get(
  "/getGenres",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  BookGenreController.getAll
);

router.get(
  "/delBook/:id",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.delBook
);
router.get(
  "/delUser/:id",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.delUser
);
router.get(
  "/delOrder/:id",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.delGenre
);
router.get(
  "/delGenre/:id",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  AdminController.delOrder
);

//create book

//deletebook

//edit book

//coupons

//list
router.get(
  "/listAllCoupon",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.listAllCoupon
);
//add coupon
router.post(
  "/createCoupon",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.createCoupon
);

//promo code

//list
router.get(
  "/listAllPromoCode",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.listAllPromoCode
);
//add coupon
router.post(
  "/createPromoCode",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.createPromoCode
);

//update promocode

router.post(
  "/updatePromoCode",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.updatePromoCode
);

//delete coupon
router.post(
  "/deleteCoupon",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.deleteCoupon
);

//getPromoCOdeById

router.get(
  "/getPromoCodeByCouponId",
  checkJwt,
  checkRole([Userroles.ADMIN]),
  PaymentController.getPromoCodeByCouponId
);
export default router;
