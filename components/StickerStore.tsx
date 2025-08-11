"use client";

interface StickerStoreProps {
    onSelectSticker: (sticker: string) => void;
    currentPoints: number;
}

export function StickerStore({ onSelectSticker, currentPoints }: StickerStoreProps) {
    const stickers = ['/file.svg', '/globe.svg', '/next.svg', '/vercel.svg', '/window.svg', '/sticker1.svg', '/sticker2.svg', '/sticker3.svg'];

    const handleStickerClick = (sticker: string) => {
        if (currentPoints < 20) {
            alert("Nuh uh go complete more plans that you should've completed");
            return;
        }
        onSelectSticker(sticker);
    };

    return (
        <div className="my-4">
            <h3 className="text-lg font-bold text-center text-pink-800">Choose a Sticker</h3>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
                {stickers.map(sticker => (
                    <button 
                        key={sticker} 
                        onClick={() => handleStickerClick(sticker)} 
                        className="p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPoints < 20}
                    >
                        <img src={sticker} alt={sticker} className="w-12 h-12" />
                    </button>
                ))}
            </div>
        </div>
    );
}