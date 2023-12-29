import { useEffect, useState } from "react";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./api/config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/Searchbar/Searchbar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendedList, setRecommendedList] = useState([]);

  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      alert("Something went wrong when fetching the popular TV shows");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendedListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendedListResp.length > 0) {
        setRecommendedList(recommendedListResp.slice(0, 10));
      }
    } catch (error) {
      alert("Something went wrong when fetching the recommended TV shows");
    }
  }

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  console.log(recommendedList);

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Something went wrong when fetching your search TV shows");
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}') no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              img={logoImg}
              title={"What to Watch"}
              subtitle={"Find a show you might like"}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_tv_shows}>
        {currentTVShow && (
          <TVShowList
            tvShowList={recommendedList}
            onClickItem={updateCurrentTVShow}
          />
        )}
      </div>
    </div>
  );
}
