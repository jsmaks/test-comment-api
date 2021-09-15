import Spinner from '../Spinner/Spinner';
import './CommentsList.css';

export default function CommentsList({ list, loading }) {
  return (
    <div className="comments">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="comments__list">
          {list.map(el => (
            <li className="comments__list-item" key={el.id}>
              <p className="comments__list-name">Имя: {el.name}</p>

              <span className="comments__list-text">
                Коментарий: {el.text.slice(0, 30)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
