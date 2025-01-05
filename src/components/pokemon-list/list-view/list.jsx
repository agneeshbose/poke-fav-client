import { useContext, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";

import pokeBallImg from "../../../assets/images/Pokeball_2.png";
import favFillIcon from "../../../assets/images/fav-fill.svg";
import { DataProviderContext } from "../../../contexts/data-provider.context";
import { useAllPokemon } from "../../../hooks/pokeman";

const List = () => {
  const {
    favourites,
    activeFilter,
    updateActivePreviewItem,
    activePreviewItem,
  } = useContext(DataProviderContext);

  const pokemon = useAllPokemon();
  const observerRef = useRef(null);

  const showAll = activeFilter === "ALL";
  const isLoading = showAll ? pokemon.isLoading : favourites.isLoading;
  const activeList = showAll ? pokemon.data : favourites.data;
  const loadMore = showAll ? pokemon.loadMore : null;
  const hasMore = showAll ? pokemon.hasMore : false;

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottom = scrollHeight === scrollTop + clientHeight;

    if (activeList?.length > 0 && bottom && hasMore && !isLoading) {
      loadMore();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          activeList?.length > 0
        ) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore, isLoading, activeList?.length]);

  if (isLoading && !activeList?.length) {
    return (
      <div>
        <Skeleton
          count={6}
          height="2.8rem"
          width="92%"
          baseColor="rgb(37 117 187)"
          borderRadius={12}
          containerClassName="list-loader"
          style={{ marginBottom: 6, marginTop: 12 }}
        />
      </div>
    );
  }

  return (
    <div className="list" onScroll={handleScroll}>
      {activeList?.map(({ name, url }) => {
        const isFavourite = favourites.data?.some((item) => item.name === name);
        const isActive = activePreviewItem?.name === name;

        return (
          <div
            className={`list-item ${isActive ? "active" : ""}`}
            key={name}
            onClick={() => updateActivePreviewItem({ name, url })}
          >
            <div className="list-item-title">
              <img src={pokeBallImg} alt="poke ball image" width="30rem" />
              {name}
            </div>
            {isFavourite && (
              <img src={favFillIcon} alt="poke ball image" width="25rem" />
            )}
          </div>
        );
      })}
      {isLoading && <p>Loading...</p>}
      <div ref={observerRef} />
    </div>
  );
};

export default List;
