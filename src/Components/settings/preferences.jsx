import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layout";

const schema = yup.object().shape({
  date: yup.date().nullable(),
  category: yup.string().nullable(),
  author: yup.string().nullable(),
});

const Preferences = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //   console.log("errors", errors);
  const categories = ["Guardian", "BBC", "NYT"];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="w-full max-w-lg mx-auto mt-5">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.date && "border-red-500"
            }`}
            type="date"
            id="date"
            name="date"
            defaultValue={new Date().toISOString().substr(0, 10)}
            {...register("date")}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.category && "border-red-500"
            }`}
            id="category"
            name="category"
            {...register}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.author && "border-red-500"
            }`}
            type="text"
            id="author"
            name="author"
            // defaultValue={"Admin"}
            {...register}
          />
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
          )}
        </div>
        <button
          className="bg-[#42b58d] hover:bg-[#54cfa4] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default Preferences;
