import React from 'react'
import API from "../../../api";


test('fails if user is not registered',async ()=>{
  let res = await API.post( 'user_master/login',
    {
      username: 'Takiiz',
      password: 'pwd',
      user_id: 1
    } )
  expect(res.data['username']).toBe('Takiiz');
  console.log(res)
},20000);
