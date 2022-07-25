/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import React, { useMemo } from "react";
import { trpc } from "../utils/trpc";
import getRandomNumber from "../utils/getRandomNumber";
import Image from "next/image";

export default function IndexPage() {
  const [ranNum, setRanNum] = React.useState(getRandomNumber);

  const pokemon = trpc.useQuery(["get-pokemon-by-id", { id: ranNum }]);

  return (
    <div>
      {pokemon.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img
            src={pokemon.data?.sprites.front_default}
            alt="pokemon picture"
          />
          <p>{pokemon.data?.name}</p>
        </div>
      )}
      <button type="submit" onClick={() => setRanNum(getRandomNumber())}>
        huh
      </button>
    </div>
  );
}
