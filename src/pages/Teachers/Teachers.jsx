import { useCallback, useEffect, useState } from "react";
import { ref, get } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import TeacherFilters from "../../components/TeacherFilters/TeacherFilters";
import Header from "../../components/Header/Header";

import css from './Teachers.module.css';



export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({
        languages: [],
        levels: [],
        prices: [],
    });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersRef = ref(database);
                const snapshot = await get(teachersRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const teachersArray = Object.values(data);
                    setTeachers(teachersArray);

                    const languages = [...new Set(teachersArray.flatMap(t => t.languages))];
                    const levels = [...new Set(teachersArray.flatMap(t => t.levels))];
                    const prices = [...new Set(teachersArray.map(t => t.price_per_hour))].sort((a, b) => a - b);

                    setFilterOptions({ languages, levels, prices });
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

        fetchTeachers();
    }, []);

    const handleToggleFavorite = useCallback((teacherData) => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];

        const isCurrentlyFavorite = saved.some(teacher => teacher.name === teacherData.name && teacher.surname === teacherData.surname);

        let updatedList;

        if (isCurrentlyFavorite) {
            updatedList = saved.filter(teacher => !(teacher.name === teacherData.name && teacher.surname === teacherData.surname));
        } else {
            const newTeacher = {
                ...teacherData,
                uniqueId: teacherData.uniqueId || crypto.randomUUID()
            }
            updatedList = [...saved, newTeacher];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedList));

        setFavorites(updatedList);
    }, []);

    const isTeacherFavorite = (teacher) =>
        favorites.some(fav => fav.name === teacher.name && fav.surname === teacher.surname);

    const handleFilter = (values) => {
        setFilters(values);
    };

    const filteredTeachers = teachers.filter(t => {
        const matchLanguage = !filters.language || t.languages.includes(filters.language);
        const matchLevel = !filters.level || t.levels.includes(filters.level);
        const matchPrice = !filters.price || t.price_per_hour <= Number(filters.price);
        return matchLanguage && matchLevel && matchPrice;
    });

    const visibleTeachers = filteredTeachers.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className={css.container}>
                <TeacherFilters options={filterOptions} onFilter={handleFilter} />


                <div className={css.list}>
                    {visibleTeachers.map((teacher, index) => (
                        <TeacherCard
                            key={teacher.name + teacher.surname + index}
                            teacher={teacher}
                            onToggleFavorite={handleToggleFavorite}
                            isFavorite={isTeacherFavorite(teacher)}
                            selectedLevel={filters.level}
                        />
                    ))}
                </div>

                {visibleCount < teachers.length && (
                    <button onClick={handleLoadMore} className={css.loadMoreBtn}>
                        Load more
                    </button>
                )}

                {filteredTeachers.length === 0 && !loading && (
                    <p>No teachers match your filters.</p>
                )}
            </div>
        </>

    );
}