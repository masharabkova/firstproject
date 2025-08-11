"use client";
import { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { Points } from './Points';
import { StickerStore } from './StickerStore';

interface TodoItemData {
    text: string;
    completed: boolean;
}

interface TodoListsState {
    [date: string]: TodoItemData[];
}

interface DailyCompletionState {
    [date: string]: boolean;
}

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todoLists, setTodoLists] = useState<TodoListsState>({});
    const [points, setPoints] = useState(0);
    const [dailyCompletion, setDailyCompletion] = useState<DailyCompletionState>({});
    const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

    useEffect(() => {
        const storedTodoLists = localStorage.getItem('todoLists');
        if (storedTodoLists) {
            setTodoLists(JSON.parse(storedTodoLists));
        }
        const storedPoints = localStorage.getItem('points');
        if (storedPoints) {
            setPoints(JSON.parse(storedPoints));
        }
        const storedDailyCompletion = localStorage.getItem('dailyCompletion');
        if (storedDailyCompletion) {
            setDailyCompletion(JSON.parse(storedDailyCompletion));
        }
        const storedStickers = localStorage.getItem('selectedStickers');
        if (storedStickers) {
            setSelectedStickers(JSON.parse(storedStickers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists));
    }, [todoLists]);

    useEffect(() => {
        localStorage.setItem('points', JSON.stringify(points));
    }, [points]);

    useEffect(() => {
        localStorage.setItem('dailyCompletion', JSON.stringify(dailyCompletion));
    }, [dailyCompletion]);

    useEffect(() => {
        localStorage.setItem('selectedStickers', JSON.stringify(selectedStickers));
    }, [selectedStickers]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handleAddItem = (date: string, item: string) => {
        const newItem = { text: item, completed: false };
        setTodoLists(prev => ({
            ...prev,
            [date]: [...(prev[date] || []), newItem]
        }));
    };

    const handleRemoveItem = (date: string, itemToRemove: string) => {
        setTodoLists(prev => ({
            ...prev,
            [date]: prev[date].filter(item => item.text !== itemToRemove)
        }));
    };

    const handleToggleItem = (date: string, itemToToggle: string) => {
        setTodoLists(prev => ({
            ...prev,
            [date]: prev[date].map(item => 
                item.text === itemToToggle ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const handleCompleteDay = (date: string) => {
        if (dailyCompletion[date]) {
            return; // Already completed
        }

        const completedItems = todoLists[date].filter(item => item.completed);
        const earnedPoints = completedItems.length * 2;
        setPoints(points + earnedPoints);
        setDailyCompletion(prev => ({ ...prev, [date]: true }));
    };

    const handleSelectSticker = (sticker: string) => {
        if (points >= 20 && !selectedStickers.includes(sticker)) {
            setSelectedStickers(prev => [...prev, sticker]);
            setPoints(points - 20); // Deduct points for selecting a sticker
        } else if (selectedStickers.includes(sticker)) {
            alert("You already have this sticker!");
        }
    };

    const renderCalendar = () => {
        const calendarDays = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="border border-pink-100 p-1 h-40 overflow-auto"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
            calendarDays.push(
                <div key={day} className="border border-pink-100 p-1 h-40 overflow-auto bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                    <p className="text-xs font-bold text-right text-pink-800">{day}</p>
                    <TodoList 
                        list={todoLists[date] || []}
                        onAddItem={(item) => handleAddItem(date, item)}
                        onRemoveItem={(item) => handleRemoveItem(date, item)}
                        onToggleItem={(item) => handleToggleItem(date, item)}
                        onCompleteDay={() => handleCompleteDay(date)}
                        date={date}
                        isDayCompleted={dailyCompletion[date]}
                    />
                </div>
            );
        }
        return calendarDays;
    };

    return (
        <div className="container mx-auto p-4">
            <Points points={points} />
            <StickerStore onSelectSticker={handleSelectSticker} currentPoints={points} />
            <div className="flex justify-between items-center mb-4">
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-200 text-sm font-semibold shadow-md" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>&lt; Prev</button>
                <div className="flex items-center">
                    {selectedStickers.map(sticker => (
                        <img key={sticker} src={sticker} alt="sticker" className="w-8 h-8 mr-2" />
                    ))}
                    <h2 className="text-2xl font-bold text-blue-800">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                </div>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-200 text-sm font-semibold shadow-md" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>Next &gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center font-semibold text-blue-800">{day}</div>
                ))}
                {renderCalendar()}
            </div>
        </div>
    );
}