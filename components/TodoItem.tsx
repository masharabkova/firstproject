"use client";

interface TodoItemProps {
    item: {
        text: string;
        completed: boolean;
    };
    onToggle: () => void;
    onRemove: () => void;
}

export function TodoItem({ item, onToggle, onRemove }: TodoItemProps) {
    return (
        <div className="flex items-center justify-between p-1 mb-1 bg-pink-50 rounded-md">
            <div className="flex items-center">
                <input type="checkbox" checked={item.completed} onChange={onToggle} className="mr-2" />
                <p className={`text-gray-800 ${item.completed ? 'line-through' : ''}`}>{item.text}</p>
            </div>
            <button 
                onClick={onRemove}
                className="text-blue-500 hover:text-blue-700 focus:outline-none text-xs"
            >
                X
            </button>
        </div>
    );
}