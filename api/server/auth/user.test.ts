import axios from 'axios'
const baseURL = 'http://localhost:5005/api/v1'




test('can fetch a user with valid id', () => {
  axios.get(`${baseURL}/auth/user/1`, {
    params: {
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pY2hhZWxuZ2lyaUBnbWFpbC5jb20iLCJkYXRlQ3JlYXRlZCI6IjIwMjItMDgtMjNUMTk6MjY6MzIuMTA2WiIsImlhdCI6MTY2MTI4Mjc5Mn0.F0LfQGuV4mTngIKimqtHkHOdJG86Ut-bxR_3dE-7H9s'
    }
  }).then((res) => {
    expect(res.status).toBe(200)
  })
    
})
