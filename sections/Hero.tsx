import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <Image
        src="/images/banner.png"
        alt="Truck tire"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-4">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold pl-8 md:pl-10 lg:pl-12">
              Грузовые шины и диски
              <br />
              под ваши задачи
            </h1>
            <div className="w-full h-px bg-white/70 mt-6 md:mt-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
