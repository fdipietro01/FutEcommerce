import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loading from "../Loading/loading";
import { getAllProducts } from "../../services/productServices";
import { errorNavigateRedirect } from "../../hooks/serviceErrorRedirect";

const ItemListContainer = () => {
  const { dataErrorRedirect } = errorNavigateRedirect();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    sort: 1,
    category: id,
    status: true,
  });

  const getNextPreviosProds = (situation) => {
    const newPage = situation === "next" ? params.page + 1 : params.page - 1;
    setParams({ ...params, page: newPage });
  };

  const setNewParams = (field, value) => {
    if (field === "limit") {
      if (value < 1 || value > 10) return;
      params.page = 1;
    }
    params[field] = value;
    setParams({ ...params });
  };

  const getProds = async () => {
    const { data, status } = await getAllProducts({
      ...params,
      category: id ? id : undefined,
    });
    if (status !== 200) {
      dataErrorRedirect();
    }
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    getProds();
  }, [params, id]);

  return loading ? (
    <Loading />
  ) : (
    <ItemList
      items={productos}
      setPage={getNextPreviosProds}
      setNewParams={setNewParams}
    />
  );
};

export default ItemListContainer;
