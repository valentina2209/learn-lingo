import { useEffect, useState } from "react";
import { ref, get } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import css from './Teachers.module.css';
import Header from "../../components/Header/Header";

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersRef = ref(database);
                const snapshot = await get(teachersRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const teachersArray = Object.values(data);
                    setTeachers(teachersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    if (loading) return <p>Loading...</p>;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const visibleTeachers = teachers.slice(0, visibleCount);

    return (
        <>
            <Header />
            <div className={css.container}>
                <div className={css.list}>
                    {visibleTeachers.map((teacher, index) => (
                        <TeacherCard key={index} teacher={teacher} />
                    ))}

                </div>

                {visibleCount < teachers.length && (
                    <button onClick={handleLoadMore} className={css.loadMoreBtn}>
                        Load more
                    </button>
                )}
            </div>
        </>

    );
}