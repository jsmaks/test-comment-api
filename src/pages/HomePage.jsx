import axios from 'axios';
import { useEffect, useState } from 'react';

import Form from '../components/FormComments/Form';
import CommentsList from '../components/CommentsList/CommentsList';
import Pagination from 'rc-pagination';
import ButtonOnMore from '../components/ButtonOnMore/ButtonOnMore';

import './HomePage.css';
import './Pagination.css';

export default function HomePage() {
  const [commentsData, setCommentsData] = useState({
    list: [],
    currentPage: '',
    lastPage: '',
    perPage: '',
    total: '',
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://jordan.ashton.fashion/api/goods/30/comments?page=${currentPage}`,
        );
        const { data, current_page, last_page, total, per_page } = res.data;
        setCommentsData({
          list: data,
          currentPage: current_page,
          lastPage: last_page,
          perPage: per_page,
          total: total,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [currentPage]);

  const addComment = async comment => {
    try {
      const res = await axios.post(
        `https://jordan.ashton.fashion/api/goods/30/comments`,
        comment,
      );
      if (res.status === 200) {
        alert('Ваш коментарий добавлен');
      }
      setCurrentpage(commentsData.lastPage);
    } catch (error) {
      console.log(error);
    }
  };

  const pagination = page => setCurrentpage(page);
  const nextPage = () => setCurrentpage(prev => prev + 1);
  const prevPage = () => setCurrentpage(prev => prev - 1);
  const checkLastPage = commentsData.currentPage < commentsData.lastPage;

  return (
    <div className="home-page">
      <h1 className="home-title">Форма для отправки комментария</h1>
      <Form addComment={addComment} />
      <CommentsList list={commentsData.list} loading={loading} />
      <ButtonOnMore nextPage={nextPage} checkLastPage={checkLastPage} />
      <Pagination
        current={commentsData.currentPage}
        total={commentsData.total}
        pageSize={commentsData.perPage}
        onChange={pagination}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}
