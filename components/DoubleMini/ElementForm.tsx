/* eslint-disable jsx-a11y/label-has-associated-control */
import { DoubleMiniElement } from '@prisma/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: any;
  setShowForm: any
  element: DoubleMiniElement | null;
}

const AddElementForm = ({ onSubmit, element, setShowForm }: Props) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    ...(element && { defaultValues: element }),
  });

  useEffect(() => {
    if (element) {
      reset(element);
    }
  }, [element, reset]);

  return (
    <div className="p-5 rounded border m-2 md:m-10">
      <button type="button" onClick={() => setShowForm(false)}>❌</button>
      <form className="w-full mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Naam
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Salto A"
              {...register('name', { required: true })}
            />
            {errors.name && <p>Name is required</p>}
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="figCode">
              FIG code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="figCode"
              type="text"
              placeholder="4 - /"
              {...register('figCode', { required: true })}
            />
            {errors.figCode && <p>figCode is required</p>}
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="difficulty">
              Moeilijkheidsgraad
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="difficulty"
              type="number"
              placeholder="4"
              {...register('difficulty', { required: true })}
            />
            {errors.difficulty && <p>difficulty is required</p>}
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 mt-8">
            <button className="text-white bg-green-400 py-1 px-2 rounded hover:bg-green-500" type="submit">
              Opslaan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddElementForm;
