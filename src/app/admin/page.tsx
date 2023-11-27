'use client';

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";



const jwt = require('jsonwebtoken');
const secretKey = 'baseOnBalls';

export default function Admin() {

  useEffect(() => {
    const usernameCookie = getCookie("username");
    if (usernameCookie) {
      const decodedUsername = jwt.verify(usernameCookie, secretKey).username;
    } else {
      return;
    }
  }, []);


  return (
    <div>Admin

    </div>
  );
}