import { useState } from 'react';
import css from './TeacherCard.module.css';

export default function TeacherCard({ teacher, onToggleFavorite, isFavorite }) {
    const [expanded, setExpended] = useState(false);

    const {
        name,
        surname,
        languages,
        levels,
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
        onToggleFavorite(teacher);
    }

    const toggleExpand = () => setExpended(prev => !prev);




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

                        <div className={css.levelsContainer}>
                            {levels.map((level, index) => (
                                <span
                                    key={index}
                                    className={`${css.levelTag} ${index === 0 ? css.levelTagPrimary : ''}`}
                                >
                                    {level}
                                </span>
                            ))}
                        </div>
                        {expanded && (
                            <button className={css.bookTrialButton}>Book trial lesson</button>
                        )}
                    </div>
                </div>

            </div>
        </div>


    )
}