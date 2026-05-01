type Props = {
  value: number;
};

export default function CartIcon({ value }: Props) {
  return (
    <div className="relative inline-block text-2xl cursor-pointer">
      🛒

      {value > 0 && (
        <span className="
          absolute -top-2 -right-2
          bg-red-500 text-white text-[10px]
          min-w-[18px] h-[18px]
          flex items-center justify-center
          rounded-full
        ">
          {value}
        </span>
      )}
    </div>
  );
}