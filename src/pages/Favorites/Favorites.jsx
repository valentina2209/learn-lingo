import { useState, useEffect, useCallback } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Header from "../../components/Header/Header";
import style from "./Favorites.module.css";


export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(saved);
    }, []);

    const handleToggleFavorite = useCallback((teacherData) => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];

        const isCurrentlyFavorite = saved.some(teacher => teacher.uniqueId === teacherData.uniqueId);

        let updatedList;

        if (isCurrentlyFavorite) {
            updatedList = saved.filter(teacher => teacher.uniqueId !== teacherData.uniqueId);
        } else {
            const newTeacher = { ...teacherData, uniqueId: crypto.randomUUID() };
            updatedList = [...saved, newTeacher];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedList));

        setFavorites(updatedList);
    }, []);

    return (
        <>
            <Header />
            <div className={style.container}>
                {favorites.length > 0 ? (
                    <ul className={style.list}>
                        {favorites.map(teacher => (
                            <li key={teacher.uniqueId}>
                                <TeacherCard
                                    teacher={teacher}
                                    onToggleFavorite={handleToggleFavorite}
                                    isFavorite={true}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={style.text}>No favorites teacher yet.</p>
                )}
            </div>
        </>

    );
}