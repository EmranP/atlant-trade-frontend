"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Dealership() {
  const [formData, setFormData] = useState({
    companyName: "",
    inn: "",
    region: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-4">Дилерство</h1>
      <p className="text-xl mb-8">
        Мы приглашаем к сотрудничеству торгующие организации во всех регионах
        России
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Преимущества:</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">—</span>
            <span>
              Эксклюзивность по дилерству нашей продукции в вашем регионе
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">—</span>
            <span>
              Уникальные программы по продвижению, рекламная и маркетинговая
              поддержка
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Цель компании:</h2>
        <ul className="space-y-6">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Информирование конечных покупателей о преимуществах использования
              нашей продукции, а также возможности приобрести их удобно и по
              оптимальной цене.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Неотъемлемой частью нашей работы является качественный сервис, мы
              делаем все от нас зависящее чтобы не подвести наших клиентов
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Создание эффективной дилерской сети на всей территории РФ
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-4xl font-bold mb-8">
          Оставьте заявку на дилерство
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Название компании"
            className="bg-gray-100 p-6 rounded-md"
          />

          <Input
            name="inn"
            value={formData.inn}
            onChange={handleChange}
            placeholder="ИНН"
            className="bg-gray-100 p-6 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Регион"
            className="bg-gray-100 p-6 rounded-md"
          />

          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="bg-gray-100 p-6 rounded-md"
          />
        </div>

        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Сообщение"
          className="w-full h-40 bg-gray-100 p-6 rounded-md mb-8"
        />

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="bg-black hover:bg-gray-800 text-white px-12 py-6 rounded-full text-lg font-medium"
          >
            ОТПРАВИТЬ
          </Button>
        </div>
      </div>
    </div>
  );
}
