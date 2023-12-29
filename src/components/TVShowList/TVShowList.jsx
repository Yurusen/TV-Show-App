import { TVShowListItem } from "../TVShowListItem/TVShowListItem";
import s from "./s.module.css";

export function TVShowList({ tvShowList, onClickItem }) {
  return (
    <div>
      <div className={s.title}>You'll probably like these!</div>
      <div className={s.list}>
        {tvShowList.map((tvShow) => {
          return (
            <span key={tvShow.id} className={s.tvshow_item}>
              <TVShowListItem onClick={onClickItem} tvShow={tvShow} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
