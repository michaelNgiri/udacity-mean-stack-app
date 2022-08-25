import  LinkController from "./link.controller";
import axios from 'axios'

const email = 'michaelngiri@gmail.com'
const password = 'secure-password'
const baseURL = 'http://localhost:5005/api/v1'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pY2hhZWxuZ2lyaUBnbWFpbC5jb20iLCJkYXRlQ3JlYXRlZCI6IjIwMjItMDgtMjNUMTk6MjY6MzIuMTA2WiIsImlhdCI6MTY2MTI4Mjc5Mn0.F0LfQGuV4mTngIKimqtHkHOdJG86Ut-bxR_3dE-7H9s'

test('can fetch a link', () => {
  axios.get(`${baseURL}/link/1`, {
    params: {
      token
    }
  }).then((res) => {
    expect(res.status).toBe(200)
  })
    
})

test('can fetch all links', () => {
  axios.get(`${baseURL}/1/my-links`, {
    params: {
      token
    }
  }).then((res) => {
    expect(res.status).toBe(200)
  })
    
})

test('can fetch all links', () => {
  axios.get(`${baseURL}/1/my-links`, {
    params: {
      token
    }
  }).then((res) => {
    expect(res.status).toBe(200)
  })
    
})

test('should be able to create a fresh link', () => {
 axios.post(`${baseURL}/link/create`, {
            link:'https://just-a-long-link-created-during-test',
            userID:1,
            token,
 }).then(function (response) {
          expect(response.status).toBe(403)
        })
})

test('should be able to update link', () => {
 axios.post(`${baseURL}/link/1/update`, {
            newLink:'https://another-new-long-link-for-updating-during-test',
            linkID:1,
            token,
 }).then(function (response) {
          expect(response.status).toBe(200)
        })
})