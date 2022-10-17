// import { useCallback, useContext, useEffect, useState } from "react";

// function Search() {
//     const [myArticles, setMyArticles] = useState(null);



//     const getArticles = useCallback(() => {
//         api().get(`/articles?userId=${userId}`)
//             .then((articles) => {
//                 if (!props.value) { setTab(0) }
//                 const filteredArticles = articles.data.filter((el) => !el.parentId);
//                 setMyArticles(filteredArticles);
//             })
//             .catch((err) => console.log(err));
//     }, [userId, props.value]);
//     useEffect(() => {
//         getArticles();
//     }, [getArticles]);

//     return (
//         <div className="Profile">
//             <input
//                 type="text"
//                 name="searchBar"
//                 id="searchBar"
//                 placeholder="searchBar"
//             />
//             <div className="searchResult">
//                 {articles.data.map((article) => <div className="searchResult">{article.content}</div>)}

//             </div>
//         </div>
//     );
// }

// export default Search;