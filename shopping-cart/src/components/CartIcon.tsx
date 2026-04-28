export default function CartIcon({value} : any) {
    const cartCount : number = 0;
    return (
        <>
            <div className="relative text-xl cursor-pointer">
                🛒
                {cartCount >= 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                        {value}
                    </span>
                )}
            </div>
        </>
    )
}