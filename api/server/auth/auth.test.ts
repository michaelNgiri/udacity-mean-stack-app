import AuthController from "./auth.controller";
import axios from 'axios'

const email = 'michaelngiri@gmail.com'
const password = 'secure-password'
const baseURL = 'http://localhost:5005/api/v1'
const firstName = "john";
const lastName = "doe";


test('can register a new user', () => {
  const randomEmail = uniqueString()+"@links.co"
 axios.post(`${baseURL}/auth/register`, {
            email:randomEmail,
            password,
            firstName: "john",
            lastName: "doe",
            phoneNumber: "+12345697890"
        }).then(function (response) {
          expect(response.status).toBe(200)
        })
})

test('should not register a user with an existing email', () => {
 axios.post(`${baseURL}/auth/register`, {
            email,
            password,
            firstName: "john",
            lastName: "doe",
            phoneNumber: "+12345697890"
 }).then(function (response) {
          expect(response.status).toBe(403)
        })
})

test('should not register a user if info is incomplete', () => {
 axios.post(`${baseURL}/auth/register`, {
            email,
 }).then(function (response) {
          expect(response.status).toBe(504)
        })
})

test('can login a user', () => {
 axios.post(`${baseURL}/auth/login`, {
            email,
            password
        }).then(function (response) {
          expect(response.status).toBe(200)
        })
})


test('fail if login info is incorrect', () => {
 axios.post(`${baseURL}/auth/login`, {
            email:'',
            password
        }).then(function (response) {
          expect(response.status).toBe(403)
        })
})



const uniqueString=()=>{
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
	}