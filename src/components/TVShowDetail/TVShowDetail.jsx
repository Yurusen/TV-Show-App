import s from "./style.module.css";
import { FiveStarRating } from "../FiveStarRating/FiveStarRating";

export function TVShowDetail({ tvShow }) {
  const rating = tvShow.vote_average / 2;

  return (
    <div className={s.tvShowDetailsPopular}>
      <div className={s.title}>{tvShow.title}</div>
      <div className={s.rating_container}>
        <div className={s.star_rating}>
          <FiveStarRating rating={rating} />
        </div>
        <span className={s.rating}>{rating}/5</span>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </div>
  );
}
