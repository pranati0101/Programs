'use strict';
var express = require("express");
var route = express.Router();
var controller = require('../controllers/controller.js');
	//  Routes
route.route('/').get(controller.home);
route.route('/chat').get(controller.chat);
route.route('/logout').post(controller.logout_user);
route.route('/newUser').post(controller.new_user);
route.route('/chklogin').post(controller.chk_login);
route.route('/login').get(controller.login_user);
route.route('/delete').post(controller.delete_user);
route.route('/update').post(controller.update_user);
route.route('/search').post(controller.search_user);
route.route('/encodemsg').post(controller.encode_msg);
module.exports = route;
