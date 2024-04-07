const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = express.Router();
const saltRounds = 10;
const secretKey = "SAJKDHASJKDHAjsdahnasd!@#!@asdjkabJBAS"; //local secert key
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { rateLimit } = require("express-rate-limit");
// Home page route.

const authLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 30,
	message: "You've exceeded the regular amount of requests kindly wait and try again after 1 hour.",
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/profilePictures");
	},
	filename: (req, file, cb) => {
		const originalname = `${uuidv4()}.jpg`;
		cb(null, originalname);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	},
});

auth.post("/signup", authLimiter, upload.single("profilePicture"), async (req, res) => {
	try {
		const request = req.body;
		const { username, email, password, phoneNumber, type, desc, aboutMe } = request;
		if (!username || !email || !phoneNumber || req.file == undefined) {
			return res.status(400).send({ response: "error", errorMessage: "Username, email, and phone number and Profile Picture are required fields" });
		}
		if (type == "Roomie") {
			if (!desc || !aboutMe) {
				fs.unlink("./uploads/profilePictures/" + req.file.filename, (err) => {
					if (err) {
						console.error("Error deleting file:", err);
					}
				});
				return res.status(400).send({ response: "error", errorMessage: "Username, email, and phone number and file are required fields" });
			} else {
				let hashedPassword = await bcrypt.hash(password, saltRounds); // regular user insert
				const user = await prisma.user.create({
					data: {
						username: username,
						email: email,
						password: hashedPassword,
						desc: desc,
						type: type,
						aboutMe: aboutMe,
						phoneNumber: phoneNumber,
						profilePicture: req.file.filename,
					},
				});
			}
		} else {
			let hashedPassword = await bcrypt.hash(password, saltRounds); // renter insert to Database
			const user = await prisma.user.create({
				data: {
					username: username,
					email: email,
					password: hashedPassword,
					type: type,
					phoneNumber: phoneNumber,
					profilePicture: req.file.filename,
				},
			});
		}

		res.status(200).send({ response: "ok" });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				if (e.meta.target == "User_phoneNumber_key") {
					fs.unlink("./uploads/profilePictures/" + req.file.filename, (err) => {
						if (err) {
							console.error("Error deleting file:", err);
						}
					});
					res.status(400).send({ response: "error", errorMessage: " Phone number is linked to another account" });
				} else if (e.meta.target == "User_username_key") {
					fs.unlink("./uploads/profilePictures/" + req.file.filename, (err) => {
						if (err) {
							console.error("Error deleting file:", err);
						}
					});
					res.status(400).send({ response: "error", errorMessage: "Username is linked to another account" });
				} else if (e.meta.target == "User_email_key") {
					fs.unlink("./uploads/profilePictures/" + req.file.filename, (err) => {
						if (err) {
							console.error("Error deleting file:", err);
						}
					});
					res.status(400).send({ response: "error", errorMessage: "Email is linked to another account" });
				}
			}
		} else {
			console.log(e);
			res.status(400).send({ response: "error", errorMessage: "Server error happened when trying to signup" });
		}
	}
});

auth.post("/login", authLimiter, async (req, res) => {
	try {
		const request = req.body;
		let token = "";
		const getUser = await prisma.user.findUnique({
			where: {
				username: request.userName,
			},
		});
		if (getUser == null || getUser === undefined) {
			return res.status(400).json({ success: false, message: "account does not exist" }); // handle if the account doesnt exist
		}
		bcrypt.compare(request.password, getUser.password, async function (err, result) {
			if (err) {
				return res.status(400).json({ success: false, message: "server error happened" });
			}
			if (result) {
				const userWithoutPassword = exclude(getUser, ["password"]);
				const username = getUser.username;
				if (getUser.admin == true) {
					token = jwt.sign({ id: userWithoutPassword.id, username: username, admin: true }, secretKey, { expiresIn: "3h" });
				} else {
					token = jwt.sign({ id: userWithoutPassword.id, username: username }, secretKey, { expiresIn: "3h" });
				}
				return res.status(200).json({ success: true, message: "logged in", user: userWithoutPassword, token: token });
			} else {
				// response is OutgoingMessage object that server response http request
				return res.status(400).json({ success: false, message: "passwords do not match" });
			}
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({ success: false, message: "Server Error when login" });
	}
});
function exclude(user, keys) {
	return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
module.exports = auth;
