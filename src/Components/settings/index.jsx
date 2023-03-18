import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Layout from "../layout";

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const Settings = () => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [cookies, removeCookie] = useCookies(["auth"]);
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const auth = cookies["auth"];
  const onSubmitEmail = async (data) => {
    console.log("Email:", data.email); // do something with email data
    setEmailLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/update-user-info`,
        data,
        { headers: { Authorization: `Bearer ${auth?.access_token}` } }
      );
      toast.success("Email Update Success!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setEmailLoading(false);
    }
  };

  const onSubmitPassword = async (data) => {
    console.log(
      "Password:",
      data.currentPassword,
      data.newPassword,
      data.confirmPassword
    ); // do something with password data

    setPasswordLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/update-user-password`,
        data,
        { headers: { Authorization: `Bearer ${auth?.access_token}` } }
      );
      toast.success("Password Update Success!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg mx-auto border p-4 border-gray-200 rounded-2xl mt-10">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errorsEmail.email && "border-red-500"
            }`}
            type="text"
            id="email"
            name="email"
            // defaultValue={"Admin"}
            {...registerEmail("email")}
          />
          {errorsEmail.email && (
            <p className="text-red-500 text-xs mt-1">
              {errorsEmail.email.message}
            </p>
          )}
        </div>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54cfa4] hover:bg-[#42b58d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring[#54cfa4]"
          onClick={handleSubmitEmail(onSubmitEmail)}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {emailLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.485A7.962 7.962 0 018 20.291V16a4 4 0 004-4V0l-4.938 4.938A7.963 7.963 0 014 12h8v8.485z"
                ></path>
              </svg>
            )}
          </span>
          Update Email
        </button>
      </div>
      <div className="w-full max-w-lg mx-auto mb-10 border p-4 border-gray-200 rounded-2xl">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            className={`${
              errorsPassword.currentPassword ? "border-red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="currentPassword"
            type="password"
            name="currentPassword"
            {...registerPassword("currentPassword")}
          />
          {errorsPassword.currentPassword && (
            <p className="text-red-500 text-xs italic">
              {errorsPassword.currentPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className={`${
              errorsPassword.newPassword ? "border-red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="newPassword"
            type="password"
            name="newPassword"
            {...registerPassword("newPassword")}
          />
          {errorsPassword.newPassword && (
            <p className="text-red-500 text-xs italic">
              {errorsPassword.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className={`${
              errorsPassword.confirmPassword ? "border-red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            {...registerPassword("confirmPassword")}
          />
          {errorsPassword.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errorsPassword.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54cfa4] hover:bg-[#42b58d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring[#54cfa4]"
          onClick={handleSubmitPassword(onSubmitPassword)}
        >
          Update Password
        </button>
      </div>
    </Layout>
  );
};

export default Settings;
