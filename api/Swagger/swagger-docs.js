/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Coffee Shop API
 *   version: 1.0.0
 *   description: مستندات API پروژه کافه
 *
 * tags:
 *   - name: Auth
 *     description: مسیرهای احراز هویت
 *   - name: Blog
 *     description: مدیریت وبلاگ‌ها
 *   - name: Category
 *     description: مدیریت دسته‌بندی‌ها
 *   - name: Product
 *     description: مدیریت محصولات
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *
 *     Blog:
 *       type: object
 *       required: [title, description]
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         description: { type: string }
 *         images:
 *           type: array
 *           items: { type: string }
 *         categoryId: { type: string }
 *         author: { type: string }
 *         isActive: { type: boolean }
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Category:
 *       type: object
 *       required: [title]
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         images:
 *           type: array
 *           items: { type: string }
 *         parentCategory: { type: string }
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Product:
 *       type: object
 *       required: [name, description, price]
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         description: { type: string }
 *         price: { type: number }
 *         images:
 *           type: array
 *           items: { type: string }
 *         isActive: { type: boolean }
 *         categoryId: { type: string }
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * security:
 *   - bearerAuth: []
 */

/* -------------------------------------------------------------------------- */
/*                                 AUTH ROUTES                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Auth]
 *     summary: ارسال کد یا بررسی داشتن پسورد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *     responses:
 *       200:
 *         description: موفقیت
 */

/**
 * @swagger
 * /otp:
 *   post:
 *     tags: [Auth]
 *     summary: تایید کد و لاگین/ساخت کاربر
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *               code: { type: string }
 *               newAccount: { type: boolean }
 *     responses:
 *       200:
 *         description: تایید شد
 */

/**
 * @swagger
 * /checkPassword:
 *   post:
 *     tags: [Auth]
 *     summary: لاگین با پسورد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: لاگین موفق
 */

/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     tags: [Auth]
 *     summary: تغییر پسورد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *               code: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: پسورد تغییر کرد
 */

/**
 * @swagger
 * /resendCode:
 *   post:
 *     tags: [Auth]
 *     summary: ارسال دوباره کد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *     responses:
 *       200:
 *         description: ارسال شد
 */

/**
 * @swagger
 * /adminLogin:
 *   post:
 *     tags: [Auth]
 *     summary: لاگین ادمین
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: ادمین وارد شد
 */

/* -------------------------------------------------------------------------- */
/*                                 BLOG ROUTES                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/blog:
 *   post:
 *     tags: [Blog]
 *     security: [ { bearerAuth: [] } ]
 *     summary: ایجاد وبلاگ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: ساخته شد
 *
 *   get:
 *     tags: [Blog]
 *     summary: دریافت لیست وبلاگ‌ها
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: لیست وبلاگ‌ها
 */

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     tags: [Blog]
 *     summary: دریافت وبلاگ
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: موفق
 *
 *   patch:
 *     tags: [Blog]
 *     security: [ { bearerAuth: [] } ]
 *     summary: آپدیت وبلاگ
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: آپدیت شد
 *
 *   delete:
 *     tags: [Blog]
 *     security: [ { bearerAuth: [] } ]
 *     summary: حذف وبلاگ
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: حذف شد
 */

/* -------------------------------------------------------------------------- */
/*                              CATEGORY ROUTES                               */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: ایجاد دسته‌بندی جدید
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: دسته‌بندی ساخته شد
 *
 *   get:
 *     summary: دریافت همه دسته‌بندی‌ها
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: لیست دسته‌بندی‌ها
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: دریافت یک دسته‌بندی
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: موفق
 *
 *   patch:
 *     summary: ویرایش دسته‌بندی
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: آپدیت موفق
 *
 *   delete:
 *     summary: حذف دسته‌بندی
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: حذف موفق
 */

/* -------------------------------------------------------------------------- */
/*                                PRODUCT ROUTES                               */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: ایجاد محصول جدید
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: محصول ساخته شد
 *
 *   get:
 *     summary: دریافت همه محصولات
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: لیست محصولات
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: دریافت یک محصول
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: موفق
 *       404:
 *         description: پیدا نشد
 *
 *   patch:
 *     summary: بروزرسانی محصول
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: بروزرسانی موفق
 *
 *   delete:
 *     summary: حذف محصول
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: حذف موفق
 */
/**
 * @swagger
 * tags:
 *   name: Slider
 *   description: Slider management
 */

/**
 * @swagger
 * /api/slider:
 *   post:
 *     summary: ایجاد اسلایدر جدید
 *     tags: [Slider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "اسلایدر شماره ۱"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: اسلایدر با موفقیت ساخته شد
 *       400:
 *         description: خطای درخواست
 *
 *   get:
 *     summary: دریافت تمام اسلایدرها
 *     tags: [Slider]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: لیست اسلایدرها
 */

/**
 * @swagger
 * /api/slider/{id}:
 *   get:
 *     summary: دریافت یک اسلایدر
 *     tags: [Slider]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: اسلایدر دریافت شد
 *       404:
 *         description: اسلایدر پیدا نشد
 *
 *   patch:
 *     summary: ویرایش اسلایدر
 *     tags: [Slider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "اسلایدر ویرایش شده"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["img1.jpg", "img2.jpg"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: اسلایدر آپدیت شد
 *       404:
 *         description: اسلایدر پیدا نشد
 *
 *   delete:
 *     summary: حذف اسلایدر
 *     tags: [Slider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: اسلایدر حذف شد
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: مدیریت کاربران
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         _id:
 *           type: string
 *           example: 67aa044176f4568f02e79f61
 *         fullName:
 *           type: string
 *           example: حسین رضایی
 *         username:
 *           type: string
 *           example: hossein_r
 *         phoneNumber:
 *           type: string
 *           example: 09123456789
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: دریافت همه کاربران
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: لیست کاربران
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: دریافت یک کاربر
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: جزئیات کاربر
 *       400:
 *         description: کاربر پیدا نشد
 *       403:
 *         description: دسترسی غیرمجاز
 *
 *   patch:
 *     summary: آپدیت کاربر
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: حسین رضایی
 *               username:
 *                 type: string
 *                 example: hossein_r
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: آپدیت موفق
 *       400:
 *         description: کاربر پیدا نشد
 *       403:
 *         description: دسترسی غیرمجاز
 */
