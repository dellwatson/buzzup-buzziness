import React from "react";
import useFetchData from "@/hooks/useFetchData";
import useStore from "@/store/list-query";
import MainPublication from "@/components/Publication/MainPublication";
import { FlashList } from "@shopify/flash-list";

export default function Feeds() {
  useFetchData();
  const { data, setQuery } = useStore();
  return (
    <>
      {!!data?.length && (
        <FlashList
          data={data}
          renderItem={(item) => (
            <MainPublication
              key={item?.id}
              {...{ data: item?.item, test: item }}
            />
          )}
          estimatedItemSize={200}
        />
      )}
    </>
  );
}
