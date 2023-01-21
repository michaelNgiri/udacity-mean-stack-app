// import { NextFunction, Request, Response } from "express";
import AuthController from "./auth.controller";
import axios from 'axios'
// import userController from "../user/user.controller";
// import { DataResponse } from "../../utils/types";

const email = 'michaelngiri@gmail.com'
const password = 'secure-password'
const baseURL = 'http://localhost:5005/api/v1'
const firstName = "john";
const lastName = "doe";
const phoneNumber = "+12345697890"
  let data = new FormData()
  data.append('email', 'michaelngiri@gmail.com');
  data.append('password', password);
  data.append('firstName', firstName);
  data.append('lastName', lastName);
data.append('phoneNumber', phoneNumber);
  

test('can register a new user from the user registration functions', async () => {
  const randomEmail = "mail@links.co"
  await AuthController._createUser(email, password, firstName, lastName).then((resp) => {
    console.log(resp)
    // expect(typeof (resp)).toBe(DataResponse)
    // expect(Promise.resolve).toBe(true)
    expect(resp['status']).toBe(201)
  })  
})


// test('can register a new user using the routes', () => {
//   const randomEmail = uniqueString()+"@links.co"
//  axios.post(`${baseURL}/auth/register`, {
//             email:randomEmail,
//             password,
//             firstName: "john",
//             lastName: "doe",
//             phoneNumber: "+12345697890"
//         }).then(function (response) {
//           expect(response.status).toBe(200)
//         }).catch((err) => {
//           expect(err.status).toBe(403)
//         })
// })


// test('can register a new user from the user registration functions', async () => {
//   const randomEmail = uniqueString() + "@links.co"
//   await AuthController._createUser(email, password, firstName, lastName).then((resp) => {
//     console.log(resp)
//     // expect(typeof (resp)).toBe(DataResponse)
//     // expect(Promise.resolve).toBe(true)
//     expect(resp['status']).toBe(201)
//   })  
// })


// test('should not register a user with an existing email', () => {
//  axios.post(`${baseURL}/auth/register`, {
//             email,
//             password,
//             firstName: "john",
//             lastName: "doe",
//             phoneNumber: "+12345697890"
//  }).then(function (response) {
//           expect(response.status).toBe(403)
//     })
// })

// test('should not register a user if info is incomplete', () => {
//   axios.post(`${baseURL}/auth/register`, { email })
//     .then(function (response) {
//           expect(response.status).toBe(504)
//         })
// })


// test('can login a user', () => {
//  axios.post(`${baseURL}/auth/login`, {
//             email,
//             password
//         }).then(function (response) {
//           expect(response.status).toBe(200)
//     })
// })


// test('fail if login info is incorrect', () => {
//  axios.post(`${baseURL}/auth/login`, {
//             email:'',
//             password
//         }).then(function (response) {
//           expect(response.status).toBe(403)
//         })
// })



// const uniqueString=()=>{
// 	let text = "";
// 	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 	for (let i = 0; i < 5; i++)
// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	return text;
// 	}