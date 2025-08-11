"use client";
import { useState } from 'react';
import { TodoItem } from './TodoItem';

interface TodoItemData {
    text: string;
    completed: boolean;
}

interface TodoListProps {
    list: TodoItemData[];
    onAddItem: (item: string) => void;
    onRemoveItem: (item: string) => void;
    onToggleItem: (item: string) => void;
    onCompleteDay: () => void;
    date: string;
    isDayCompleted: boolean;
}

export function TodoList({ list, onAddItem, onRemoveItem, onToggleItem, onCompleteDay, isDayCompleted }: TodoListProps) {
    const [newItem, setNewItem] = useState("");

    function handleAddItem() {
        if (newItem.trim() !== "") {
            onAddItem(newItem);
            setNewItem("");
        }
    }

    return (
        <div className="p-1">
            <div className="flex mb-1">
                <input 
                    type="text" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)} 
                    className="flex-grow min-w-0 p-1 border border-pink-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs"
                    placeholder="Add plans"
                />
                <button 
                    onClick={handleAddItem}
                    className="bg-pink-400 text-white px-1 py-0.5 rounded-r-md hover:bg-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs"
                >
                    Add
                </button>
            </div>
            <div className="text-xs">
                {list.map(item => (
                    <TodoItem 
                        key={item.text}
                        item={item}
                        onToggle={() => onToggleItem(item.text)}
                        onRemove={() => onRemoveItem(item.text)}
                    />
                ))}
            </div>
            <button 
                onClick={onCompleteDay}
                disabled={isDayCompleted}
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-xs mt-1 disabled:bg-blue-200 w-full"
            >
                {isDayCompleted ? "Day Completed" : "Complete Day"}
            </button>
        </div>
    );
}