import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full py-6 px-6 flex justify-center bg-[#F5F5F5] shadow-sm">
      <Link href="/" className="flex items-center">
        <div className="flex items-center">
          <div className="font-bold text-3xl text-black mr-2">PITIA</div>
          <div className="bg-black text-white px-3 py-1 rounded-md text-xl font-semibold">PERFORMANCE</div>
        </div>
      </Link>
    </header>
  );
};

export default Header; 