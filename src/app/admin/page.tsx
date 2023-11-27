'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setUser, resetSession } from "../redux/features/sessionSlice";
import secretKey from "@/helpers/secretKey";

export default function Admin() {

  const router = useRouter();

  const dispatch = useDispatch();

  const { email, admin } = useAppSelector(state => state.sessionReducer.value.user);

  const jwt = require('jsonwebtoken');
  const key = secretKey();

  useEffect(() => {
    const usernameCookie = getCookie("user");
    if (usernameCookie) {
      const decodedUser = jwt.verify(usernameCookie, key);
      dispatch(setUser({ email: decodedUser.username, admin: decodedUser.admin }));
      if (!decodedUser.admin) {
        router.push("/");
      }
    } else {
      dispatch(resetSession());
      router.push("/login");
    }
  }, []);

  return (
    <div>
      {`User: ${email}`}
      <br />
      {`Admin status: ${admin}`}
    </div>
  );
}