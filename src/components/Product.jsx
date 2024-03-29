import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderItem from "./SliderItem";
import Data from "../slider.json";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../Redux/Products/action";
import data from "../mainData.json";
import sliderData from "../slider.json";
import { saveToLocal, loadFromLocal } from "../Utils/LocalStorage";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#F16E49",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#F16E49",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const Product = () => {
  const caraouselOne = () =>
    Data.sliderData.map((item) => <SliderItem {...item} key={item.id} />);
  
  const navigate = useNavigate();
  
  
  
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(data.Data));
  }, []);
  
  const curData = useSelector((state) => state.prod.products);
  const [itemData, setItemData] = useState({});
  const { id } = useParams();
  const slideData = sliderData.sliderData;
  
  const allData = [...slideData, ...curData];
  const singleData = allData.filter((el) => el.id === parseInt(id));
  
  useEffect(() => {
    setItemData({ ...singleData[0] });
  }, [id, singleData[0]]);
  
  const cartData = loadFromLocal("cartData") || [];
  const [cart, setCart] = useState(cartData);

  if(!cart){
   
  }
   useEffect(() => {
     if(cart) saveToLocal("cartData", cart);
   }, [cart]);
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.sub}>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651606316855_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651252617427_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651252617130_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651252616871_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651252617659_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
            <div className={styles.sub_image}>
              <img
                src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/bashh/bashh3036434574/bashh3036434574_1651252617014_2-0._UX40_QL90_.jpg"
                alt=""
              />
            </div>
          </div>

          <div className={styles.pinterest}>
            <img
              src="https://m.media-amazon.com/images/G/01/Shopbop/p/pcs/media/3/images/footer/Pinterest_grey_1-0.jpg"
              alt=""
            />
          </div>
        </div>

        <div className={styles.product_main}>
          <img src={itemData.image} alt="" />
        </div>

        <div className={styles.product_details}>
          <p className={styles.head}>{itemData.brand}</p>
          <p className={styles.title}>{itemData.title}</p>
          <p className={styles.price}>₹ {itemData.price}</p>
          <div className={styles.info}>
            <ul>
              <li>Fabric: Lightweight, non-stretch technical weave</li>
              <li>Floral print and gathered seams</li>
              <li>Square neck</li>
              <li>Hidden zip at side</li>
              <li>Shell: 100% polyester</li>
              <li>Unlined</li>
              <li>Dry clean</li>
              <li>Imported, Romania</li>
            </ul>
          </div>
          <button
            className={styles.bag}
            onClick={() => {
              setCart([...cart, itemData]);
              setTimeout(() => { navigate("/cart"); }, 100);
            }}
          >
            Add To Bag
          </button>
          <button className={styles.wishlist}>Add To Wish List</button>
          <h6 className={styles.return}>
            FREE express international delivery and EASY Returns
          </h6>
        </div>
      </div>

      <div className={styles.caraousel}>
        <Slider
          dots={false}
          slidesToShow={5}
          slidesToScroll={5}
          autoplay={true}
          autoplaySpeed={3000}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          responsive={[
            {
              breakpoint: 480,
              settings: { slidesToShow: 4, slidesToScroll: 4 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 4, slidesToScroll: 4 },
            },
            {
              breakpoint: 1024,
              settings: { slidesToShow: 5, slidesToScroll: 5 },
            },
          ]}
        >
          {caraouselOne()}
        </Slider>
      </div>
    </>
  );
};

export default Product;
