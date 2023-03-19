/* eslint-disable default-case */
import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import { SearchIcon, FilterIcon } from "@heroicons/react/outline";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  keywords: yup.string().required(),
  category: yup.string(),
  source: yup.string(),
  date: yup.mixed().when("type", (type, schema) => {
    switch (type) {
      case type !== undefined:
        schema = yup.date().nullable();
        break;
      case type:
        schema = yup.string().nullable();
        break;
    }
    return schema;
  }),
});

function SearchFilter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleSearch = (data) => {
    navigate(`/search?q=${data.keywords}&date=${data.date ? data.date : ""}`);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg pl-1">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center flex-grow">
          <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full outline-none text-gray-700"
            placeholder="Search for articles..."
            {...register("keywords")}
          />
        </div>
        {errors.keywords && (
          <p className="text-red-500 text-sm">{errors.keywords.message}</p>
        )}
      </div>
      <div className="relative ml-2">
        <Popover as="div" className="relative">
          {({ open }) => (
            <>
              <div>
                <Popover.Button className="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-bg-[#42b58d]">
                  <FilterIcon className="h-5 w-5 text-gray-400" />
                </Popover.Button>
              </div>
              <Transition
                open={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-bg-[#42b58d] focus:border-bg-[#42b58d] sm:text-sm"
                        {...register("category")}
                      >
                        <option value="">All</option>
                        <option value="politics">Politics</option>
                        <option value="technology">Technology</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div className="px-4 py-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Source
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#54cfa4] focus:border-[#42b58d] sm:text-sm"
                        {...register("source")}
                      >
                        <option value="">All</option>
                        <option value="cnn">CNN</option>
                        <option value="bbc">BBC</option>
                        <option value="nyt">NYT</option>
                        <option value="wsj">WSJ</option>
                      </select>
                      {errors.source && (
                        <p className="text-red-500 text-sm">
                          {errors.source.message}
                        </p>
                      )}
                    </div>
                    <div className="px-4 py-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#54cfa4] focus:border-[#54cfa4] sm:text-sm"
                        {...register("date")}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <button
        className="bg-[#42b58d] text-white rounded-lg px-4 py-2 ml-2 hover:bg-[#54cfa4] focus:outline-none focus:bg-[#54cfa4]"
        onClick={handleSubmit(handleSearch)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchFilter;
