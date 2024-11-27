import React from 'react';

interface InputNameProps {
  value: string;
  onChange: (value: string) => void;
}

const InputName: React.FC<InputNameProps> = ({ value, onChange }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); 
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="firstname"
        className="block text-sm font-medium text-purple-500"
      >
        Firstname
      </label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
        value={value}  
        onChange={handleChange} 
        required
      />
    </div>
  );
};

export default InputName;
/*
"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "./Nav";
import CountrySelect from "./countryList";
import React from "react";
import InputName from '@/components/userForm/nameInput';
*/