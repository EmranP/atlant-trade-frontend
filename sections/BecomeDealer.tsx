import Image from "next/image";
import Link from "next/link";

export default function BecomeDealer() {
  return (
    <section className="max-w-7xl my-16 mx-auto px-4 grid md:grid-cols-2 items-center gap-6">
      <div className="flex flex-col justify-betnween h-full pb-12">
        <div className="w-full h-full flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Хотите стать дилером?
          </h2>
          <p className="text-base text-black">
            Мы активно растём, и поэтому приглашаем стать частью дилерской сети
            по всей стране
          </p>
        </div>
        <Link
          href="/dealership"
          className="inline-block bg-[#A92F2F] text-white font-bold text-sm rounded-full px-10 py-4 transition hover:bg-[#8c2626]"
        >
          ПОДРОБНЕЕ
        </Link>
      </div>

      <div className="w-full h-full">
        <Image
          src="/images/banner2.png"
          alt="Truck dealer"
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
