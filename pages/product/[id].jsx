import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({pizza}) => {
    const [size, setSize]= useState(0);
    const [price, setPrice] = useState(pizza.prices[0])
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity]=useState(1);
    const dispacth = useDispatch()

    const changePrice = (number) => {
        setPrice(price + number);
    }

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference)
    }


    const handleChange= (e, option ) => {

        const checked = e.target.checked;

        if(checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const handleClick = () => {
        dispacth(addProduct({...pizza, extras, price, quantity}))
    }

 
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={pizza.img} layout="fill" objectFit="contain" alt="" />
            </div>
        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>${price}</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}>Choose the size</h3>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={() => handleSize(0)}>
                    <Image src="/img/size.png" layout ="fill" alt="" />
                    <span className={styles.number}>Small</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(1)}>
                    <Image src="/img/size.png" layout ="fill" alt="" />
                    <span className={styles.number}>Medium</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(2)}>
                    <Image src="/img/size.png" layout ="fill" alt="" />
                    <span className={styles.number}>Large</span>
                </div>
            </div>
            
            {pizza.extraOptions.length==0 ? '':(<><h3 className={styles.choose}>Choose additional ingredients</h3><div className={styles.ingredients}>
                  {pizza.extraOptions.map((option) => (
                      <div className={styles.option} key={option._id}>
                          <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e,option)} />
                          <lable htmlFor="double">{option.text}</lable>
                      </div>
                  ))}
              </div></>)}
                    
                {/* </div>
                <div className={styles.option}>
                        <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="cheese"
                        name="cheese"
                        />
                        <label htmlFor="cheese">Extra Cheese</label>
                </div>
                <div className={styles.option}>
                        <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="spicy"
                        name="spicy"
                        />
                        <label htmlFor="spicy">Spicy Sauce</label>
                </div>
                <div className={styles.option}>
                        <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="garlic"
                        name="garlic"
                        />
                        <label htmlFor="garlic">Garlic Sauce</label> */}
                
           
            <div className={styles.add}>
                <input 
                    type="number" 
                    defaultValue={1} 
                    className={styles.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                <button className={styles.button} onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    </div>
    
  );
};


export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3001/api/products/${params.id}`);
    return {
      props: {
        pizza:res.data,
      }
    }
  }


export default Product