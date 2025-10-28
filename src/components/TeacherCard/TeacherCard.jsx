import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import BookingFormModal from '../BookingFormModal/BookingFormModal';
import css from './TeacherCard.module.css';

export default function TeacherCard({ teacher, onToggleFavorite, isFavorite, selectedLevel }) {
    const [expanded, setExpended] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { isLoggedIn } = useAuth();

    const {
        name,
        surname,
        languages,
        rating,
        reviews,
        price_per_hour,
        lessons_done,
        avatar_url,
        lesson_info,
        experience,
        conditions,
    } = teacher;

    const handleToggle = () => {
        if (!isLoggedIn) {
            toast.info("This functionality is available only to authorized users.");
            return;
        }

        onToggleFavorite(teacher);
    }

    const toggleExpand = () => setExpended(prev => !prev);

    const openBookingModal = () => setIsBookingModalOpen(true);
    const closeBookingModal = () => setIsBookingModalOpen(false);

    const getInitials = (fullName) => {

        if (!fullName) return '?';
        return fullName.charAt(0).toUpperCase();
    };

    return (
        <div className={css.wrapper}>
            <div className={css.info_wrapper}>
                <img src={avatar_url} alt={`${name} ${surname}`} className={css.avatar} />
                <div className={css.textContent}>
                    <div className={css.info}>
                        <div className={css.title_wrapper}>
                            <p className={css.text}>Languages</p>
                            <h3 className={css.title}>{name} {surname}</h3>
                        </div>
                        <div className={css.stats_bar}>
                            <div className={`${css.content} ${css.stat_item}`}>
                                <svg className={css.icon}><use href="/icons.svg#icon-open-book" /></svg>
                                <span className={css.book_text}>Lessons online</span>
                            </div>
                            <p className={`${css.book_text} ${css.stat_item}`}>Lessons done: {lessons_done}</p>
                            <div className={`${css.content} ${css.stat_item}`}>
                                <svg className={css.icon}><use href="/icons.svg#icon-star" /></svg>
                                <span className={css.book_text}>Rating: {rating} </span>
                            </div>
                            <p className={`${css.book_text} ${css.stat_item}`}>Price: ${price_per_hour}/hour</p>
                        </div>
                        <button
                            onClick={handleToggle}
                            className={`${css.heart} ${isFavorite ? css.active : ''} `}
                        >
                            <svg className={css.icon_heart}>
                                <use href="/icons.svg#icon-heart" />
                            </svg>
                        </button>
                    </div>

                    <div className={css.description}>
                        <p className={css.speaks_line}>
                            <strong className={css.speaks_label}>Speaks:</strong>
                            <span className={css.speaks_value}>
                                {languages.join(', ')}
                            </span>
                        </p>
                        <p className={css.text_info}><strong className={css.text}>Lesson Info:</strong> {lesson_info}</p>
                        <p className={css.text_info}><strong className={css.text}>Conditions:</strong> {conditions}</p>
                        {expanded && (
                            <>
                                <p className={css.textExperience}>{experience}</p>
                                <ul className={css.reviewsWrapper}>
                                    {reviews.map((reviews, index) => (
                                        <li key={index}>
                                            <div className={css.reviewerDetails}>
                                                <div className={css.initialsCircle}>
                                                    {getInitials(reviews.reviewer_name)}
                                                </div>

                                                <div>
                                                    <p className={css.text}>{reviews.reviewer_name}</p>
                                                    <div className={css.content}>
                                                        <svg className={css.icon}>
                                                            <use href="/icons.svg#icon-star" />
                                                        </svg>
                                                        <span>{reviews.reviewer_rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={css.reviewText}>{reviews.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <button onClick={toggleExpand} className={css.readMore}>
                            {expanded ? 'Hide details' : 'Read More'}
                        </button>

                        <div className={css.levels}>
                            {teacher.levels.map(level => (
                                <span
                                    key={level}
                                    className={`${css.levelTag} ${level === selectedLevel ? css.active : ''}`}
                                >
                                    {level}
                                </span>
                            ))}
                        </div>
                        {expanded && (
                            <button
                                className={css.bookTrialButton}
                                onClick={openBookingModal}
                            >
                                Book trial lesson
                            </button>
                        )}

                        {isBookingModalOpen && (
                            <BookingFormModal
                                teacher={{
                                    name: `${name} ${surname}`,
                                    avatar: avatar_url,
                                    languages: languages[0]
                                }}
                                onClose={closeBookingModal}
                            />
                        )}

                    </div>
                </div>

            </div>
        </div>


    )
}