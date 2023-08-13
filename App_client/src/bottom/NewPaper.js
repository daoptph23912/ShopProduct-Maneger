import { Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import NewItem from "../common/NewItem";
import { GET_ALL_NEWS } from "../../api";
import axios from "axios";
const NewPaper = () => {
  const [arrNews, setArrNews] = useState([]);

  const getAllNew = () => {
    axios
      .get(GET_ALL_NEWS)
      .then((res) => {
        if (res.data.errCode === 0) {
          setArrNews(res.data.news);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllNew();
  }, []);
  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <Header title="News" />

      <ScrollView>
        {arrNews.map((item) => {
          return <NewItem key={item.id} arrNews={item} />;
        })}
      </ScrollView>
    </ScrollView>
  );
};
export default NewPaper;
